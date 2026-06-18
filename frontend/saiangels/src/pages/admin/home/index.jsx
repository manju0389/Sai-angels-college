import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://sai-angels-college.onrender.com/api";

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [students, setStudents] = useState([]);

  const [bannerForm, setBannerForm] = useState({
    title: "",
    description: "",
    file: null,
  });

  const [studentForm, setStudentForm] = useState({
    name: "",
    stream: "",
    rank: "",
    file: null,
  });

  const [bannerPreview, setBannerPreview] = useState(null);
  const [studentPreview, setStudentPreview] = useState(null);

  const [editingBannerId, setEditingBannerId] = useState(null);
  const [editingStudentId, setEditingStudentId] = useState(null);

  const [editingBannerData, setEditingBannerData] = useState({});
  const [editingStudentData, setEditingStudentData] = useState({});

  const getImageUrl = (img) => {
    if (!img) {
      return "https://via.placeholder.com/100x100?text=No+Image";
    }
    return img;
  };

  useEffect(() => {
    fetchBanners();
    fetchStudents();
  }, []);

  // ================= FETCH =================
  const fetchBanners = async () => {
    const res = await axios.get(`${API}/banner`);
    setBanners(res.data || []);
  };

  const fetchStudents = async () => {
    const res = await axios.get(`${API}/student`);
    setStudents(res.data || []);
  };

  // ================= FILE =================
  const handleBannerFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setBannerForm({ ...bannerForm, file });
    setBannerPreview(URL.createObjectURL(file));
  };

  const handleStudentFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setStudentForm({ ...studentForm, file });
    setStudentPreview(URL.createObjectURL(file));
  };

  // ================= CREATE =================
  const handleBannerSubmit = async () => {
    const fd = new FormData();
    fd.append("title", bannerForm.title);
    fd.append("description", bannerForm.description);
    fd.append("image", bannerForm.file);

    await axios.post(`${API}/banner`, fd);

    setBannerForm({ title: "", description: "", file: null });
    setBannerPreview(null);
    fetchBanners();
  };

  const handleStudentSubmit = async () => {
    const fd = new FormData();
    fd.append("name", studentForm.name);
    fd.append("stream", studentForm.stream);
    fd.append("rank", studentForm.rank);
    fd.append("image", studentForm.file);

    await axios.post(`${API}/student`, fd);

    setStudentForm({ name: "", stream: "", rank: "", file: null });
    setStudentPreview(null);
    fetchStudents();
  };

  // ================= EDIT =================
  const handleBannerEdit = (b) => {
    setEditingBannerId(b._id);
    setEditingBannerData({
      title: b.title,
      description: b.description,
      file: null,
      preview: b.image,
    });
  };

  const handleStudentEdit = (s) => {
    setEditingStudentId(s._id);
    setEditingStudentData({
      name: s.name,
      stream: s.stream,
      rank: s.rank,
      file: null,
      preview: s.image,
    });
  };

  // ================= SAVE =================
  const handleBannerSave = async (id) => {
    const fd = new FormData();
    fd.append("title", editingBannerData.title);
    fd.append("description", editingBannerData.description);
    if (editingBannerData.file) fd.append("image", editingBannerData.file);

    await axios.put(`${API}/banner/${id}`, fd);

    setEditingBannerId(null);
    fetchBanners();
  };

  const handleStudentSave = async (id) => {
    const fd = new FormData();
    fd.append("name", editingStudentData.name);
    fd.append("stream", editingStudentData.stream);
    fd.append("rank", editingStudentData.rank);
    if (editingStudentData.file) fd.append("image", editingStudentData.file);

    await axios.put(`${API}/student/${id}`, fd);

    setEditingStudentId(null);
    fetchStudents();
  };

  // ================= DELETE =================
  const handleBannerDelete = async (id) => {
    if (!window.confirm("Delete banner?")) return;
    await axios.delete(`${API}/banner/${id}`);
    fetchBanners();
  };

  const handleStudentDelete = async (id) => {
    if (!window.confirm("Delete student?")) return;
    await axios.delete(`${API}/student/${id}`);
    fetchStudents();
  };

  return (
    <div className="container mt-3">

      {/* ================= BANNERS ================= */}
      <h4>Banner Admin</h4>

      <input
        className="form-control my-2"
        placeholder="Title"
        value={bannerForm.title}
        onChange={(e) =>
          setBannerForm({ ...bannerForm, title: e.target.value })
        }
      />

      <textarea
        className="form-control mb-2"
        placeholder="Description"
        value={bannerForm.description}
        onChange={(e) =>
          setBannerForm({ ...bannerForm, description: e.target.value })
        }
      />

      <input type="file" className="form-control mb-3" onChange={handleBannerFile} />

      {bannerPreview && <img src={bannerPreview} width="100" alt="" />}

      <button className="btn btn-primary mb-3" onClick={handleBannerSubmit}>
        Upload
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {banners.map((b) => (
            <tr key={b._id}>
              <td>
                {editingBannerId === b._id ? (
                  <input
                    className="form-control"
                    value={editingBannerData.title}
                    onChange={(e) =>
                      setEditingBannerData({
                        ...editingBannerData,
                        title: e.target.value,
                      })
                    }
                  />
                ) : (
                  b.title
                )}
              </td>

              <td>
                {editingBannerId === b._id ? (
                  <textarea
                    className="form-control"
                    value={editingBannerData.description}
                    onChange={(e) =>
                      setEditingBannerData({
                        ...editingBannerData,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  b.description
                )}
              </td>

              <td>
                <img src={getImageUrl(b.image)} width="100" alt="" />
              </td>

              <td>
                {editingBannerId === b._id ? (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleBannerSave(b._id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditingBannerId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleBannerEdit(b)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleBannerDelete(b._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      {/* ================= STUDENTS ================= */}
      <h4>Student Admin</h4>

      <input
        className="form-control my-2"
        placeholder="Name"
        value={studentForm.name}
        onChange={(e) =>
          setStudentForm({ ...studentForm, name: e.target.value })
        }
      />

      <input
        className="form-control my-2"
        placeholder="Stream"
        value={studentForm.stream}
        onChange={(e) =>
          setStudentForm({ ...studentForm, stream: e.target.value })
        }
      />

      <input
        className="form-control my-2"
        placeholder="Rank"
        value={studentForm.rank}
        onChange={(e) =>
          setStudentForm({ ...studentForm, rank: e.target.value })
        }
      />

      <input type="file" className="form-control" onChange={handleStudentFile} />

      {studentPreview && <img src={studentPreview} width="80" alt="" />}

      <button className="btn btn-primary mt-3" onClick={handleStudentSubmit}>
        Upload
      </button>

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Stream</th>
            <th>Rank</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>
                {editingStudentId === s._id ? (
                  <input
                    className="form-control"
                    value={editingStudentData.name}
                    onChange={(e) =>
                      setEditingStudentData({
                        ...editingStudentData,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  s.name
                )}
              </td>

              <td>
                {editingStudentId === s._id ? (
                  <input
                    className="form-control"
                    value={editingStudentData.stream}
                    onChange={(e) =>
                      setEditingStudentData({
                        ...editingStudentData,
                        stream: e.target.value,
                      })
                    }
                  />
                ) : (
                  s.stream
                )}
              </td>

              <td>
                {editingStudentId === s._id ? (
                  <input
                    className="form-control"
                    value={editingStudentData.rank}
                    onChange={(e) =>
                      setEditingStudentData({
                        ...editingStudentData,
                        rank: e.target.value,
                      })
                    }
                  />
                ) : (
                  s.rank
                )}
              </td>

              <td>
                <img src={getImageUrl(s.image)} width="70" alt="" />
              </td>

              <td>
                {editingStudentId === s._id ? (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleStudentSave(s._id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditingStudentId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleStudentEdit(s)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleStudentDelete(s._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Home;
