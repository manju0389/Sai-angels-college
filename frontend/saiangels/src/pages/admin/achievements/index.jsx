import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://sai-angels-college.onrender.com/api";

const AdminAchievements = () => {
  const [files, setFiles] = useState([]);
  const [year, setYear] = useState("");
  const [grouped, setGrouped] = useState({});

  const [editingId, setEditingId] = useState(null);
  const [editYear, setEditYear] = useState("");

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const res = await axios.get(`${API}/achievements`);
      setGrouped(res.data || {});
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async () => {
    if (!year || files.length === 0) {
      return alert("Fill all fields");
    }

    const fd = new FormData();
    fd.append("year", year);

    files.forEach((f) => fd.append("files", f));

    await axios.post(`${API}/achievements/upload`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setFiles([]);
    setYear("");
    fetchAchievements();
  };

  // ---------------- DELETE FIXED ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    await axios.delete(`${API}/achievements/${id}`);
    fetchAchievements();
  };

  // ---------------- EDIT ----------------
  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditYear(item.year);
  };

  const handleSave = async (id) => {
    await axios.put(`${API}/achievements/${id}`, {
      year: editYear,
    });

    setEditingId(null);
    fetchAchievements();
  };

  return (
    <div className="container">
      <h4>Achievements Admin</h4>

      <input
        className="form-control my-2"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <input
        type="file"
        multiple
        className="form-control"
        onChange={(e) => setFiles([...e.target.files])}
      />

      <button className="btn btn-primary mt-2" onClick={handleUpload}>
        Upload
      </button>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>Year</th>
            <th>Images</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {Object.keys(grouped)
            .sort((a, b) => b - a)
            .map((yr) =>
              grouped[yr].map((item, idx) => (
                <tr key={item.id}>
                  <td>
                    {editingId === item.id ? (
                      <input
                        className="form-control"
                        value={editYear}
                        onChange={(e) => setEditYear(e.target.value)}
                      />
                    ) : (
                      item.year
                    )}
                  </td>

                  {idx === 0 && (
                    <td rowSpan={grouped[yr].length}>
                      {grouped[yr].slice(0, 3).map((img) => (
                        <img
                          key={img.id}
                          src={img.url}
                          width="60"
                          height="60"
                          style={{ marginRight: 5 }}
                        />
                      ))}
                    </td>
                  )}

                  <td>
                    {editingId === item.id ? (
                      <>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleSave(item.id)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAchievements;
