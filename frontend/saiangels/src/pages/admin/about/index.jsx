import { useState, useEffect } from "react";

export default function Adminabout() {
  const [form, setForm] = useState({ name: "", designation: "", message: "", image: null });
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", designation: "", message: "", image: null, preview: null });

  // Fetch data
  const fetchData = () => {
    fetch("http://localhost:3000/api/about")
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  };

  useEffect(() => fetchData(), []);

  // ADD
  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.image) return alert("Image required");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("designation", form.designation);
    formData.append("message", JSON.stringify(form.message.split("\n")));
    formData.append("image", form.image);

    await fetch("http://localhost:3000/api/about", { method: "POST", body: formData });
    setForm({ name: "", designation: "", message: "", image: null });
    fetchData();
  };

  // DELETE
  const handleDelete = async id => {
    if (!window.confirm("Delete this entry?")) return;
    await fetch(`http://localhost:3000/api/about/${id}`, { method: "DELETE" });
    fetchData();
  };

  // START EDIT
  const handleEdit = item => {
    setEditId(item.id);
    setEditForm({
      name: item.name,
      designation: item.designation,
      message: item.message.join("\n"),
      image: null,
      preview: item.image
    });
  };

  // IMAGE CHANGE IN EDIT
  const handleEditImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setEditForm(prev => ({ ...prev, image: file, preview: URL.createObjectURL(file) }));
    }
  };

  // SAVE EDIT
  const handleSave = async id => {
    const formData = new FormData();
    formData.append("name", editForm.name);
    formData.append("designation", editForm.designation);
    formData.append("message", JSON.stringify(editForm.message.split("\n")));
    if (editForm.image) formData.append("image", editForm.image);

    await fetch(`http://localhost:3000/api/about/${id}`, { method: "PUT", body: formData });

    setEditId(null);
    fetchData();
  };

  return (
    <div className="container py-4">
      <h2>Faculty Admin Panel</h2>

      {/* ADD FORM */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input placeholder="Name" className="form-control mb-2" value={form.name} onChange={e => setForm({...form, name:e.target.value})}/>
        <input placeholder="Designation" className="form-control mb-2" value={form.designation} onChange={e => setForm({...form, designation:e.target.value})}/>
        <textarea placeholder="Message" className="form-control mb-2" value={form.message} onChange={e => setForm({...form, message:e.target.value})}/>
        <input type="file" className="form-control mb-2" onChange={e => setForm({...form,image:e.target.files[0]})}/>
        <button className="btn btn-primary">Add</button>
      </form>

      {/* TABLE */}
      <table className="table table-bordered">
        <thead>
          <tr><th>Image</th><th>Name</th><th>Designation</th><th>Message</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {data.length===0 && <tr><td colSpan="5">No data</td></tr>}
          {data.map(item => (
            <tr key={item.id}>
              {/* IMAGE */}
              <td>
                {editId===item.id ? (
                  <>
                    <img src={editForm.preview} width="60" height="60" style={{objectFit:"cover"}}/>
                    <input type="file" className="form-control mt-1" onChange={handleEditImageChange}/>
                  </>
                ) : (
                  <img src={`${item.image}?t=${Date.now()}`} width="60" height="60" style={{objectFit:"cover"}}/>
                )}
              </td>

              {/* NAME */}
              <td>{editId===item.id ? <input className="form-control" value={editForm.name} onChange={e=>setEditForm({...editForm,name:e.target.value})}/> : item.name}</td>

              {/* DESIGNATION */}
              <td>{editId===item.id ? <input className="form-control" value={editForm.designation} onChange={e=>setEditForm({...editForm,designation:e.target.value})}/> : item.designation}</td>

              {/* MESSAGE */}
              <td>{editId===item.id ? <textarea className="form-control" value={editForm.message} onChange={e=>setEditForm({...editForm,message:e.target.value})}/> : item.message.slice(0,2).map((p,i)=><p key={i}>{p}</p>)}</td>

              {/* ACTIONS */}
              <td>
                {editId===item.id ? (
                  <>
                    <button className="btn btn-success btn-sm me-2" onClick={()=>handleSave(item.id)}>Save</button>
                    <button className="btn btn-secondary btn-sm" onClick={()=>setEditId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-warning btn-sm me-2" onClick={()=>handleEdit(item)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(item.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}