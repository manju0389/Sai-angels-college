import { useState, useEffect } from "react";
import axios from "axios";

const AdminAchievements = () => {
  const [files, setFiles] = useState([]);
  const [year, setYear] = useState("");
  const [grouped, setGrouped] = useState({});

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

  const fetchAchievements = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/achievements");
      setGrouped(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => fetchAchievements(), []);

  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const oversized = selectedFiles.filter(f => f.size > MAX_FILE_SIZE);

    if (oversized.length) {
      alert(`These file(s) exceed 5 MB and will not be uploaded:\n${oversized.map(f => f.name).join(", ")}`);
    }

    // Only keep files <= 5 MB
    const validFiles = selectedFiles.filter(f => f.size <= MAX_FILE_SIZE);
    setFiles(validFiles);
  };

  const handleUpload = async () => {
    if (!year.trim()) return alert("Enter year");
    if (files.length === 0) return alert("Select files");

    const formData = new FormData();
    formData.append("year", year);
    files.forEach(f => formData.append("files", f));

    try {
      await axios.post("http://localhost:3000/api/achievements/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setFiles([]);
      setYear("");
      fetchAchievements();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteYear = async (yr) => {
    if (!window.confirm(`Delete all achievements for ${yr}?`)) return;
    try {
      await axios.delete(`http://localhost:3000/api/achievements/${yr}`);
      fetchAchievements();
    } catch (err) {
      console.error(err);
    }
  };

  const handleYearEdit = async (id, newYear) => {
    try {
      await axios.put(`http://localhost:3000/api/achievements/${id}/year`, { year: newYear });
      fetchAchievements();
    } catch (err) {
      console.error(err);
    }
  };

  const sortedYears = Object.keys(grouped).sort((a, b) => parseInt(b, 10) - parseInt(a, 10));

  return (
    <div>
      <h4>Achievements Admin</h4>

      <input
        type="text"
        placeholder="Enter Year (e.g. 2024-25)"
        className="form-control my-2"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <input
        type="file"
        name="files"
        multiple
        className="form-control mb-2"
        onChange={handleFilesChange}
      />

      <button className="btn btn-primary mb-4" onClick={handleUpload}>Upload</button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Year</th>
            <th>No. of Files</th>
            <th>Preview</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedYears.map(yr => (
            grouped[yr].map((item, idx) => (
              <tr key={item.id}>
                <td>
                  <input
                    type="text"
                    value={item.year}
                    onChange={(e) => handleYearEdit(item.id, e.target.value)}
                    className="form-control"
                  />
                </td>
                {idx === 0 && (
                  <>
                    <td rowSpan={grouped[yr].length}>{grouped[yr].length}</td>
                    <td rowSpan={grouped[yr].length}>
                      {grouped[yr].slice(0,3).map(img => (
                        <img key={img.id} src={img.url} width="50" height="50" style={{ objectFit: "cover", marginRight: "5px" }}/>
                      ))}
                    </td>
                    <td rowSpan={grouped[yr].length}>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteYear(yr)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAchievements;