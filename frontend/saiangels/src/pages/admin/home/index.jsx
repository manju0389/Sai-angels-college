import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/api";

const Home = () => {
  // ===================== STATES =====================
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

  const [bannerPreview, setBannerPreview] =
    useState(null);

  const [studentPreview, setStudentPreview] =
    useState(null);

  const [editingBannerId, setEditingBannerId] =
    useState(null);

  const [editingStudentId, setEditingStudentId] =
    useState(null);

  const [editingBannerData, setEditingBannerData] =
    useState({});

  const [editingStudentData, setEditingStudentData] =
    useState({});

  // ===================== IMAGE HELPER =====================
  const getImageUrl = (img) => {
    if (
      !img ||
      img === "undefined" ||
      img === "null" ||
      img === ""
    ) {
      return "https://via.placeholder.com/100x100?text=No+Image";
    }

    return img;
  };

  // ===================== FETCH =====================
  useEffect(() => {
    fetchBanners();
    fetchStudents();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await axios.get(
        `${API}/banner`
      );
      setBanners(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        `${API}/student`
      );
      setStudents(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // ===================== FILE =====================
  const handleBannerFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setBannerForm({
      ...bannerForm,
      file,
    });

    setBannerPreview(
      URL.createObjectURL(file)
    );
  };

  const handleStudentFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setStudentForm({
      ...studentForm,
      file,
    });

    setStudentPreview(
      URL.createObjectURL(file)
    );
  };

  // ===================== CREATE =====================
  const handleBannerSubmit =
    async () => {
      if (
        !bannerForm.title ||
        !bannerForm.description ||
        !bannerForm.file
      ) {
        return alert(
          "Fill all banner fields"
        );
      }

      const fd = new FormData();
      fd.append(
        "title",
        bannerForm.title
      );
      fd.append(
        "description",
        bannerForm.description
      );
      fd.append(
        "image",
        bannerForm.file
      );

      await axios.post(
        `${API}/banner`,
        fd
      );

      resetBanner();
      fetchBanners();
    };

  const handleStudentSubmit =
    async () => {
      if (
        !studentForm.name ||
        !studentForm.stream ||
        !studentForm.rank ||
        !studentForm.file
      ) {
        return alert(
          "Fill all student fields"
        );
      }

      const fd = new FormData();
      fd.append(
        "name",
        studentForm.name
      );
      fd.append(
        "stream",
        studentForm.stream
      );
      fd.append(
        "rank",
        studentForm.rank
      );
      fd.append(
        "image",
        studentForm.file
      );

      await axios.post(
        `${API}/student`,
        fd
      );

      resetStudent();
      fetchStudents();
    };

  // ===================== EDIT =====================
  const handleBannerEdit = (b) => {
    setEditingBannerId(
      b.id || b._id
    );

    setEditingBannerData({
      title: b.title,
      description:
        b.description,
      file: null,
      preview: b.image,
    });
  };

  const handleStudentEdit = (s) => {
    setEditingStudentId(
      s.id || s._id
    );

    setEditingStudentData({
      name: s.name,
      stream: s.stream,
      rank: s.rank,
      file: null,
      preview: s.image,
    });
  };

  // ===================== SAVE =====================
  const handleBannerSave =
    async (id) => {
      const fd = new FormData();

      fd.append(
        "title",
        editingBannerData.title
      );

      fd.append(
        "description",
        editingBannerData.description
      );

      if (
        editingBannerData.file
      ) {
        fd.append(
          "image",
          editingBannerData.file
        );
      }

      await axios.put(
        `${API}/banner/${id}`,
        fd
      );

      setEditingBannerId(
        null
      );

      fetchBanners();
    };

  const handleStudentSave =
    async (id) => {
      const fd = new FormData();

      fd.append(
        "name",
        editingStudentData.name
      );

      fd.append(
        "stream",
        editingStudentData.stream
      );

      fd.append(
        "rank",
        editingStudentData.rank
      );

      if (
        editingStudentData.file
      ) {
        fd.append(
          "image",
          editingStudentData.file
        );
      }

      await axios.put(
        `${API}/student/${id}`,
        fd
      );

      setEditingStudentId(
        null
      );

      fetchStudents();
    };

  // ===================== DELETE =====================
  const handleBannerDelete =
    async (id) => {
      if (
        !window.confirm(
          "Delete banner?"
        )
      )
        return;

      await axios.delete(
        `${API}/banner/${id}`
      );

      fetchBanners();
    };

  const handleStudentDelete =
    async (id) => {
      if (
        !window.confirm(
          "Delete student?"
        )
      )
        return;

      await axios.delete(
        `${API}/student/${id}`
      );

      fetchStudents();
    };

  // ===================== RESET =====================
  const resetBanner = () => {
    setBannerForm({
      title: "",
      description: "",
      file: null,
    });

    setBannerPreview(
      null
    );
  };

  const resetStudent = () => {
    setStudentForm({
      name: "",
      stream: "",
      rank: "",
      file: null,
    });

    setStudentPreview(
      null
    );
  };

  return (
    <div className="container mt-3">

      <h4>Banner Admin</h4>

      <input
        className="form-control my-2"
        placeholder="Title"
        value={bannerForm.title}
        onChange={(e) =>
          setBannerForm({
            ...bannerForm,
            title:
              e.target.value,
          })
        }
      />

      <textarea
        className="form-control mb-2"
        placeholder="Description"
        value={
          bannerForm.description
        }
        onChange={(e) =>
          setBannerForm({
            ...bannerForm,
            description:
              e.target.value,
          })
        }
      />

      <input
        type="file"
        className="form-control mb-3"
        onChange={
          handleBannerFile
        }
      />

      {bannerPreview && (
        <img
          src={bannerPreview}
          width="100"
          className="my-2"
          alt=""
        />
      )}

      <button
        className="btn btn-primary mb-3"
        onClick={
          handleBannerSubmit
        }
      >
        Upload
      </button>

      <table className="table table-bordered mt-4 mb-5">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Preview</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
  {banners.map((b) => (
    <tr key={b.id || b._id}>
      <td>
        {editingBannerId === (b.id || b._id) ? (
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
        {editingBannerId === (b.id || b._id) ? (
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
        {editingBannerId === (b.id || b._id) ? (
          <>
            <input
              type="file"
              className="form-control"
              onChange={(e) =>
                setEditingBannerData({
                  ...editingBannerData,
                  file: e.target.files[0],
                  preview: URL.createObjectURL(
                    e.target.files[0]
                  ),
                })
              }
            />

            {editingBannerData.preview && (
              <img
                src={editingBannerData.preview}
                width="100"
                className="mt-2"
                alt=""
              />
            )}
          </>
        ) : (
          <img
            src={getImageUrl(b.image)}
            width="100"
            alt=""
          />
        )}
      </td>

      <td>
        {editingBannerId === (b.id || b._id) ? (
          <>
            <button
              className="btn btn-success btn-sm me-2"
              onClick={() =>
                handleBannerSave(
                  b.id || b._id
                )
              }
            >
              Save
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() =>
                setEditingBannerId(null)
              }
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-warning btn-sm me-2"
              onClick={() =>
                handleBannerEdit(b)
              }
            >
              Edit
            </button>

            <button
              className="btn btn-danger btn-sm"
              onClick={() =>
                handleBannerDelete(
                  b.id || b._id
                )
              }
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

      <h4>Student Admin</h4>

      <input
        className="form-control my-2"
        placeholder="Name"
        value={studentForm.name}
        onChange={(e) =>
          setStudentForm({
            ...studentForm,
            name:
              e.target.value,
          })
        }
      />

      <input
        className="form-control my-2"
        placeholder="Stream"
        value={
          studentForm.stream
        }
        onChange={(e) =>
          setStudentForm({
            ...studentForm,
            stream:
              e.target.value,
          })
        }
      />

      <input
        className="form-control my-2"
        placeholder="Rank"
        value={studentForm.rank}
        onChange={(e) =>
          setStudentForm({
            ...studentForm,
            rank:
              e.target.value,
          })
        }
      />

      <input
        type="file"
        className="form-control"
        onChange={
          handleStudentFile
        }
      />

      {studentPreview && (
        <img
          src={studentPreview}
          width="80"
          className="my-2"
          alt=""
        />
      )}

      <button
        className="btn btn-primary mb-3 mt-3"
        onClick={
          handleStudentSubmit
        }
      >
        Upload
      </button>

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Stream</th>
            <th>Rank</th>
            <th>Preview</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
  {students.map((s) => (
    <tr key={s.id || s._id}>
      <td>
        {editingStudentId === (s.id || s._id) ? (
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
        {editingStudentId === (s.id || s._id) ? (
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
        {editingStudentId === (s.id || s._id) ? (
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
        {editingStudentId === (s.id || s._id) ? (
          <>
            <input
              type="file"
              className="form-control"
              onChange={(e) =>
                setEditingStudentData({
                  ...editingStudentData,
                  file: e.target.files[0],
                  preview: URL.createObjectURL(
                    e.target.files[0]
                  ),
                })
              }
            />

            {editingStudentData.preview && (
              <img
                src={editingStudentData.preview}
                width="70"
                className="mt-2"
                alt=""
              />
            )}
          </>
        ) : (
          <img
            src={getImageUrl(s.image)}
            width="70"
            alt=""
          />
        )}
      </td>

      <td>
        {editingStudentId === (s.id || s._id) ? (
          <>
            <button
              className="btn btn-success btn-sm me-2"
              onClick={() =>
                handleStudentSave(
                  s.id || s._id
                )
              }
            >
              Save
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() =>
                setEditingStudentId(null)
              }
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-warning btn-sm me-2"
              onClick={() =>
                handleStudentEdit(s)
              }
            >
              Edit
            </button>

            <button
              className="btn btn-danger btn-sm"
              onClick={() =>
                handleStudentDelete(
                  s.id || s._id
                )
              }
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