import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../assets/css/results.css";

const API = "https://sai-angels-college.onrender.com/api";

const emptyStudent = {
  studentName: "",
  className: "",
  score: "",
  rank: "",
  image: "",
  imageFile: null,
};


const AdminBResults = () => {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);

  const [showSectionModal, setShowSectionModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);

  const [editingSection, setEditingSection] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [sectionForm, setSectionForm] = useState({
    title: "",
    description: "",
  });

  const [studentForm, setStudentForm] = useState(emptyStudent);

  // ==========================================
  // LOAD RESULTS FROM DATABASE
  // ==========================================

  useEffect(() => {
    fetchBResults();
  }, []);

  const fetchBResults = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API}/bresults`);

      console.log("BRESULTS API RESPONSE:", response.data);

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.bresults || response.data.data || [];

      setSections(data);
    } catch (error) {
      console.error(
        "Failed to load results:",
        error.response?.data || error.message
      );

      setSections([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD SINGLE SECTION
  // ==========================================

  const fetchSingleSection = async (sectionId) => {
  try {
    const response = await axios.get(
      `${API}/bresults/${sectionId}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Failed to load section:",
      error.response?.data ||
        error.message
    );

    return null;
  }
};


  // ==========================================
  // SELECT SECTION
  // ==========================================

const handleSelectSection = async (section) => {
  const freshSection =
    await fetchSingleSection(section._id);

  if (freshSection) {
    setSelectedSection(freshSection);
  } else {
    setSelectedSection(section);
  }
};


  // ==========================================
  // ADD SECTION
  // ==========================================

  const openAddSection = () => {
    setEditingSection(null);

    setSectionForm({
      title: "",
      description: "",
    });

    setShowSectionModal(true);
  };

  // ==========================================
  // EDIT SECTION
  // ==========================================

  const openEditSection = (section) => {
    setEditingSection(section);

    setSectionForm({
      title: section.title || "",
      description: section.description || "",
    });

    setShowSectionModal(true);
  };

  // ==========================================
  // SAVE SECTION
  // ==========================================

  const handleSectionSubmit = async (e) => {
  e.preventDefault();

  const title = sectionForm.title.trim();
  const description =
    sectionForm.description.trim();

  if (!title) {
    alert("Please enter section title");
    return;
  }

  try {
    setSaving(true);

    let response;

    if (editingSection) {
      response = await axios.put(
        `${API}/bresults/${editingSection._id}`,
        {
          title,
          description,
        }
      );

      alert(
        response.data?.message ||
          "Section updated successfully"
      );
    } else {
      response = await axios.post(
        `${API}/bresults`,
        {
          title,
          description,
        }
      );

      alert(
        response.data?.message ||
          "Section added successfully"
      );
    }

    await fetchBResults();

    setShowSectionModal(false);
    setEditingSection(null);

    setSectionForm({
      title: "",
      description: "",
    });
  } catch (error) {
    console.error(
      "SECTION SAVE ERROR:",
      error
    );

    console.error(
      "SERVER RESPONSE:",
      error.response?.data
    );

    alert(
      error.response?.data?.message ||
        error.message ||
        "Failed to save section"
    );
  } finally {
    setSaving(false);
  }
};


  // ==========================================
  // DELETE SECTION
  // ==========================================

  const deleteSection = async (sectionId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this section?"
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(
      `${API}/bresults/${sectionId}`
    );

    if (
      selectedSection?._id === sectionId
    ) {
      setSelectedSection(null);
    }

    await fetchBResults();

    alert("Section deleted successfully");
  } catch (error) {
    console.error(
      "Delete section error:",
      error.response?.data ||
        error.message
    );

    alert(
      error.response?.data?.message ||
        "Failed to delete section"
    );
  }
};


  // ==========================================
  // ADD STUDENT
  // ==========================================

  const openAddStudent = () => {
    if (!selectedSection) {
      alert("Please select a section first");
      return;
    }

    setEditingStudent(null);

    setStudentForm({
      ...emptyStudent,
    });

    setShowStudentModal(true);
  };

  // ==========================================
  // EDIT STUDENT
  // ==========================================

  const openEditStudent = (student) => {
  setEditingStudent(student);

  setStudentForm({
    studentName:
      student.studentName || "",

    className:
      student.className || "",

    score:
      student.score || "",

    rank:
      student.rank || "",

    image:
      student.image || "",

    imageFile: null,
  });

  setShowStudentModal(true);
};


  // ==========================================
  // IMAGE UPLOAD
  // ==========================================

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setStudentForm((prev) => ({
      ...prev,
      image: previewUrl,
      imageFile: file,
    }));
  };

  // ==========================================
  // SAVE STUDENT
  // ==========================================

  const handleStudentSubmit = async (e) => { e.preventDefault();

const studentName = String(studentForm.studentName || "").trim(); const className = String(studentForm.className || "").trim(); const score = String(studentForm.score || "").trim(); const rank = String(studentForm.rank || "").trim();

console.log("Student form values:", { studentName, className, score, rank, selectedSection: selectedSection?._id, });

if (!studentName) { alert("Please enter student name"); return; }

if (!className) { alert("Please enter class / course"); return; }

if (!score) { alert("Please enter result"); return; }

if (!rank) { alert("Please enter rank / achievement"); return; }

if (!selectedSection?._id) { alert("Please select a section"); return; }

  try {
    setSaving(true);

    const formData = new FormData();

    formData.append(
      "studentName",
      studentForm.studentName.trim()
    );

    formData.append(
      "className",
      studentForm.className.trim()
    );

    formData.append(
      "score",
      studentForm.score.trim()
    );

    formData.append(
      "rank",
      studentForm.rank.trim()
    );

    if (studentForm.imageFile) {
      formData.append(
        "image",
        studentForm.imageFile
      );
    }

    if (editingStudent) {
      await axios.put(
        `${API}/bresults/${selectedSection._id}/students/${editingStudent._id}`,
        formData
      );

      alert("Student updated successfully");
    } else {
      await axios.post(
        `${API}/bresults/${selectedSection._id}/students`,
        formData
      );

      alert("Student added successfully");
    }

    await fetchBResults();

    const freshSection =
      await fetchSingleSection(
        selectedSection._id
      );

    if (freshSection) {
      setSelectedSection(freshSection);
    }

    setShowStudentModal(false);
    setEditingStudent(null);

    setStudentForm({
      ...emptyStudent,
    });
  } catch (error) {
    console.error(
      "STUDENT SAVE ERROR:",
      error
    );

    console.error(
      "SERVER RESPONSE:",
      error.response?.data
    );

    alert(
      error.response?.data?.message ||
        error.message ||
        "Failed to save student"
    );
  } finally {
    setSaving(false);
  }
};


  // ==========================================
  // DELETE STUDENT
  // ==========================================

  const deleteStudent = async (studentId) => {
  if (!selectedSection) return;

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this student?"
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(
      `${API}/bresults/${selectedSection._id}/students/${studentId}`
    );

    await fetchBResults();

    const freshSection =
      await fetchSingleSection(
        selectedSection._id
      );

    if (freshSection) {
      setSelectedSection(freshSection);
    }

    alert("Student deleted successfully");
  } catch (error) {
    console.error(
      "Delete student error:",
      error.response?.data ||
        error.message
    );

    alert(
      error.response?.data?.message ||
        "Failed to delete student"
    );
  }
};


  // ==========================================
  // TOTAL STUDENTS
  // ==========================================

  const totalStudents = sections.reduce(
    (total, section) =>
      total +
      (Array.isArray(section.students)
        ? section.students.length
        : 0),
    0
  );

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="admin-results">
        <main className="admin-main">
          <div className="admin-header">
            <div>
              <h1>Board Results Management</h1>
              <p>Loading results...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="admin-results">
      <main className="admin-main">

        {/* ======================================
            HEADER
        ====================================== */}

        <header className="admin-header">
          <div>
            <h1>Board Results Management</h1>

            <p>
              Manage your school results and
              achievements.
            </p>
          </div>

          <button
            className="add-section-btn"
            onClick={openAddSection}
          >
            <i className="fa-solid fa-plus"></i>
            Add Section
          </button>
        </header>

        {/* ======================================
            RESULT SECTIONS
        ====================================== */}

        <section className="admin-content">

          <div className="content-title">
            <div>
              <h2>Board Result Sections</h2>

              <p>
                {sections.length} Sections ·{" "}
                {totalStudents} Students
              </p>
            </div>
          </div>

          {sections.length === 0 ? (
            <div className="empty-state">
              <i className="fa-solid fa-folder-open"></i>

              <p>
                No result sections found.
              </p>

              <button onClick={openAddSection}>
                Add First Section
              </button>
            </div>
          ) : (
            <div className="section-grid">

              {sections.map((section) => {

                const students = Array.isArray(
                  section.students
                )
                  ? section.students
                  : [];

                return (
                  <div
                    className={`section-admin-card form-control ${
                      selectedSection?.id === section._id
                        ? "selected"
                        : ""
                    }`}
                    key={section._id}
                  >

                    <div className="section-card-top">

                      <div className="section-actions">

                        <button
                          onClick={() =>
                            openEditSection(section)
                          }
                          title="Edit section"
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>

                        <button
                          onClick={() =>
                            deleteSection(section._id)
                          }
                          title="Delete section"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>

                      </div>

                    </div>

                    <h3>{section.title}</h3>

                    <p>
                      {section.description}
                    </p>

                    <div className="section-footer">

                      <span>
                        <i className="fa-solid fa-users"></i>

                        {students.length} Students
                      </span>

                      <button
                        onClick={() =>
                          handleSelectSection(section)
                        }
                      >
                        Manage

                        <i className="fa-solid fa-arrow-right"></i>
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </section>

        {/* ======================================
            STUDENT MANAGEMENT
        ====================================== */}

        {selectedSection && (
          <section className="students-management">

            <div className="student-header">

              <div>
                <h2>
                  {selectedSection.title}
                </h2>
              </div>

              <button
                className="add-student-btn"
                onClick={openAddStudent}
              >
                <i className="fa-solid fa-plus"></i>
                Add Student
              </button>

            </div>

            <div className="students-table-wrapper">

              <table className="students-table">

                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Class</th>
                    <th>Board Result</th>
                    <th>Rank / Achievement</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {!selectedSection.students ||
                  selectedSection.students.length === 0 ? (
                    <tr>

                      <td
                        colSpan="5"
                        className="empty-state"
                      >
                        <i className="fa-solid fa-users"></i>

                        <p>
                          No students added yet.
                        </p>

                        <button
                          onClick={openAddStudent}
                        >
                          Add First Student
                        </button>

                      </td>

                    </tr>
                  ) : (
                    selectedSection.students.map(
                      (student) => (
                        <tr key={student._id}>

                          <td>

                            <div className="student-profile">

                              {student.image ? (
                                <img
                                  src={student.image}
                                  alt={student.name}
                                />
                              ) : (
                                <div className="student-placeholder">
                                  <i className="fa-solid fa-user"></i>
                                </div>
                              )}

                              <strong>
                                {student.studentName}
                              </strong>

                            </div>

                          </td>

                          <td>
                            {student.className}
                          </td>

                          <td>
                            <span className="result-value">
                              {student.score}
                            </span>
                          </td>

                          <td>
                            <span className="rank-value">
                              {student.rank}
                            </span>
                          </td>

                          <td>

                            <div className="table-actions">

                              <button
                                className="edit-btn"
                                onClick={() =>
                                  openEditStudent(
                                    student
                                  )
                                }
                              >
                                <i className="fa-solid fa-pen"></i>
                              </button>

                              <button
                                className="deletes-btn"
                                onClick={() =>
                                  deleteStudent(
                                    student._id
                                  )
                                }
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>

                            </div>

                          </td>

                        </tr>
                      )
                    )
                  )}

                </tbody>

              </table>

            </div>

          </section>
        )}

      </main>

      {/* ======================================
          SECTION MODAL
      ====================================== */}

      {showSectionModal && (
        <div className="modal-overlay">

          <div className="admin-modal">

            <div className="modal-header">

              <div>

                <h2>
                  {editingSection
                    ? "Edit Section"
                    : "Add Result Section"}
                </h2>

                <p>
                  Enter section information.
                </p>

              </div>

              <button
                onClick={() =>
                  setShowSectionModal(false)
                }
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

            </div>

            <form
              onSubmit={handleSectionSubmit}
            >

              <div className="form-group">

                <label>
                  Section Title
                </label>

                <input
                  type="text"
                  placeholder="Academic Excellence"
                  value={sectionForm.title}
                  onChange={(e) =>
                    setSectionForm({
                      ...sectionForm,
                      title: e.target.value,
                    })
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  Description
                </label>

                <textarea
                  placeholder="Enter section description..."
                  rows="4"
                  value={
                    sectionForm.description
                  }
                  onChange={(e) =>
                    setSectionForm({
                      ...sectionForm,
                      description:
                        e.target.value,
                    })
                  }
                />

              </div>

              <div className="modal-buttons">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    setShowSectionModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                  disabled={saving}
                >
                  <i className="fa-solid fa-check"></i>

                  {saving
                    ? "Saving..."
                    : editingSection
                    ? "Update Section"
                    : "Save Section"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* ======================================
          STUDENT MODAL
      ====================================== */}

      {showStudentModal && (
        <div className="modal-overlay">

          <div className="admin-modal student-modal">

            <div className="modal-header">

              <div>

                <h2>
                  {editingStudent
                    ? "Edit Student"
                    : "Add Student"}
                </h2>

                <p>
                  {selectedSection?.title}
                </p>

              </div>

              <button
                onClick={() =>
                  setShowStudentModal(false)
                }
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

            </div>

            <form
              onSubmit={handleStudentSubmit}
            >

              <div className="image-upload">

                <div className="image-preview">

                  {studentForm.image ? (
                    <img
                      src={studentForm.image}
                      alt="Preview"
                    />
                  ) : (
                    <i className="fa-solid fa-user"></i>
                  )}

                </div>

                <div>

                  <label className="upload-button">

                    <i className="fa-solid fa-camera"></i>

                    Choose Student Photo

                    <input
                      type="file"
                      accept="image/*"
                      onChange={
                        handleImageUpload
                      }
                    />

                  </label>

                  <small>
                    JPG, PNG or WEBP
                  </small>

                </div>

              </div>

              <div className="form-group">

                <label>
                  Student Name
                </label>

                <input
                  type="text"
                  placeholder="Enter student name"
                  value={studentForm.studentName}
                  onChange={(e) =>
                  setStudentForm({
                    ...studentForm,
                    studentName: e.target.value,
                  })
                }
                />

              </div>

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Class / Course
                  </label>

                  <input
                    type="text"
                    placeholder="Class 10"
                    value={
                      studentForm.className
                    }
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        className:
                          e.target.value,
                      })
                    }
                  />

                </div>

                <div className="form-group">

                  <label>
                    Board Result
                  </label>

                  <input
                    type="text"
                    placeholder="95%"
                    value={studentForm.score}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        score: e.target.value,
                      })
                    }
                  />

                </div>

              </div>

              <div className="form-group">

                <label>
                  Rank / Achievement
                </label>

                <input
                  type="text"
                  placeholder="Top Performer"
                  value={studentForm.rank}
                  onChange={(e) =>
                    setStudentForm({
                      ...studentForm,
                      rank: e.target.value,
                    })
                  }
                />

              </div>

              <div className="modal-buttons">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    setShowStudentModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                  disabled={saving}
                >
                  <i className="fa-solid fa-check"></i>

                  {saving
                    ? "Saving..."
                    : editingStudent
                    ? "Update Student"
                    : "Save Student"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default AdminBResults;
