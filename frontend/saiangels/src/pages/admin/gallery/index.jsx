import { useState, useEffect } from "react";
import axios from "axios";

const API = "https://sai-angels-college.onrender.com/api/gallery";

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState("");
  const [files, setFiles] = useState([]);
  const [editCaption, setEditCaption] = useState(null);
  const [newCaption, setNewCaption] = useState("");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const res = await axios.get(API);
    setImages(res.data || []);
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (!caption.trim()) return alert("Enter caption");
    if (!files.length) return alert("Select files");

    const formData = new FormData();
    formData.append("caption", caption);
    files.forEach((f) => formData.append("files", f));

    await axios.post(`${API}/upload`, formData);

    setCaption("");
    setFiles([]);
    fetchImages();
  };

  const handleUpdateCaption = async (oldCap) => {
    if (!newCaption.trim()) return alert("Enter new caption");

    await axios.put(
      `${API}/${encodeURIComponent(oldCap)}`,
      { caption: newCaption }
    );

    setEditCaption(null);
    setNewCaption("");
    fetchImages();
  };

  const handleDelete = async (cap) => {
    if (!window.confirm(`Delete "${cap}"?`)) return;

    await axios.delete(`${API}/${encodeURIComponent(cap)}`);
    fetchImages();
  };

  const grouped = images.reduce((acc, img) => {
    if (!acc[img.caption]) acc[img.caption] = [];
    acc[img.caption].push(img);
    return acc;
  }, {});

  return (
    <div className="container mt-3">
      <h4>Gallery Admin</h4>

      {/* Upload Section */}
      <input
        className="form-control my-2"
        placeholder="Enter caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <input
        type="file"
        multiple
        className="form-control mb-2"
        onChange={handleFileChange}
      />

      <button className="btn btn-primary mb-3" onClick={handleUpload}>
        Upload
      </button>

      {/* Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Caption</th>
            <th>Images</th>
            <th>Preview</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {Object.keys(grouped).map((cap) => (
            <tr key={cap}>
              <td>
                {editCaption === cap ? (
                  <input
                    className="form-control"
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                  />
                ) : (
                  cap
                )}
              </td>

              <td>{grouped[cap].length}</td>

              <td>
                {grouped[cap].slice(0, 3).map((img, i) => (
                  <img
                    key={i}
                    src={img.url}
                    width="50"
                    height="50"
                    style={{ marginRight: 5, objectFit: "cover" }}
                    alt=""
                  />
                ))}
              </td>

              <td>
                {editCaption === cap ? (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleUpdateCaption(cap)}
                    >
                      Save
                    </button>

                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setEditCaption(null);
                        setNewCaption("");
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => {
                        setEditCaption(cap);
                        setNewCaption(cap);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(cap)}
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
}
