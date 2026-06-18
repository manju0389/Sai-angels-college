import axios from "axios";
import { useState, useEffect } from "react";

const API = "https://sai-angels-college.onrender.com/api";

const AdminVideos = () => {
  const [videos, setVideos] = useState([]);

  const [form, setForm] = useState({
    title: "",
    link: "",
    date: "",
  });

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    fetchVideos();
  }, []);

  // ================= FETCH =================
  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${API}/videos`);
      setVideos(res.data || []);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  // ================= ADD =================
  const handleAdd = async () => {
    if (!form.title || !form.link || !form.date) {
      return alert("Please fill all required fields");
    }

    try {
      await axios.post(`${API}/videos`, form);

      setForm({ title: "", link: "", date: "" });
      fetchVideos();
    } catch (err) {
      console.error(err);
      alert("Error adding video");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this video?")) return;

    try {
      await axios.delete(`${API}/videos/${id}`);
      fetchVideos();
    } catch (err) {
      alert("Error deleting video");
    }
  };

  // ================= EDIT START =================
  const handleEdit = (video) => {
    setEditId(video._id);
    setEditTitle(video.title);
  };

  // ================= UPDATE =================
  const handleUpdate = async (id) => {
    if (!editTitle.trim()) return alert("Enter title");

    try {
      await axios.put(`${API}/videos/${id}`, {
        title: editTitle,
      });

      setEditId(null);
      setEditTitle("");
      fetchVideos();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="container mt-3">
      <h4>Manage Videos</h4>

      {/* ADD FORM */}
      <input
        type="text"
        placeholder="Enter Title"
        className="form-control my-2"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Paste YouTube Link"
        className="form-control my-2"
        value={form.link}
        onChange={(e) =>
          setForm({ ...form, link: e.target.value })
        }
      />

      <input
        type="date"
        className="form-control my-2"
        value={form.date}
        onChange={(e) =>
          setForm({ ...form, date: e.target.value })
        }
      />

      <button className="btn btn-primary mb-3" onClick={handleAdd}>
        Add Video
      </button>

      {/* TABLE */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Preview</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {videos.map((video) => (
            <tr key={video._id}>
              {/* TITLE */}
              <td>
                {editId === video._id ? (
                  <input
                    className="form-control"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleUpdate(video._id);
                    }}
                  />
                ) : (
                  video.title
                )}
              </td>

              {/* DATE */}
              <td>{video.date}</td>

              {/* PREVIEW */}
              <td>
                <img
                  src={`https://img.youtube.com/vi/${video.videoId}/0.jpg`}
                  width="80"
                  alt={video.title}
                />
              </td>

              {/* ACTIONS */}
              <td>
                {editId === video._id ? (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleUpdate(video._id)}
                    >
                      Save
                    </button>

                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setEditId(null);
                        setEditTitle("");
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(video)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(video._id)}
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

export default AdminVideos;
