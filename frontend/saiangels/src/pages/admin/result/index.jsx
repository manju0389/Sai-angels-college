import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../assets/css/results.css";

const API = "https://sai-angels-college.onrender.com/api";

const emptyStudent = {
  name: "",
  className: "",
  result: "",
  rank: "",
  image: "",
  imageFile: null,
};

const AdminResults = () => {
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
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API}/results`);

      console.log("RESULTS API RESPONSE:", response.data);

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.results || response.data.data || [];

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
        `${API}/results/${sectionId}`
      );

      return response.data;
    } catch (error) {
      console.error(
        "Failed to load section:",
        error.response?.data || error.message
      );

      return null;
    }
  };

  // ==========================================
  // SELECT SECTION
  // ==========================================

  const handleSelectSection = async (section) => {
    const freshSection = await fetchSingleSection(section.id);

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

    if (!sectionForm.title.trim()) {
      alert("Please enter section title");
      return;
    }

    try {
      setSaving(true);

      if (editingSection) {
        await axios.put(
          `${API}/results/${editingSection.id}`,
          {
            title: sectionForm.title.trim(),
            description: sectionForm.description.trim(),
          }
        );

        alert("Section updated successfully");
      } else {
        await axios.post(
          `${API}/results`,
          {
            title: sectionForm.title.trim(),
            description: sectionForm.description.trim(),
          }
        );

        alert("Section added successfully");
      }

      await fetchResults();

      setShowSectionModal(false);

      setEditingSection(null);

      setSectionForm({
        title: "",
        description: "",
      });
    } catch (error) {
      console.error(
        "Section save error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
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
        `${API}/results/${sectionId}`
      );

      if (selectedSection?.id === sectionId) {
        setSelectedSection(null);
      }

      await fetchResults();

      alert("Section deleted successfully");
    } catch (error) {
      console.error(
        "Delete section error:",
        error.response?.data || error.message
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
      name: student.name || "",
      className: student.className || "",
      result: student.result || "",
      rank: student.rank || "",
      image: student.image || "",
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

  const handleStudentSubmit = async (e) => {
    e.preventDefault();

    if (!studentForm.name.trim()) {
      alert("Please enter student name");
      return;
    }

    if (!selectedSection) {
      alert("Please select a section");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append(
        "name",
        studentForm.name.trim()
      );

      formData.append(
        "className",
        studentForm.className.trim()
      );

      formData.append(
        "result",
        studentForm.result.trim()
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
          `${API}/results/${selectedSection.id}/students/${editingStudent.id}`,
          formData
        );

        alert("Student updated successfully");
      } else {
        await axios.post(
          `${API}/results/${selectedSection.id}/students`,
          formData
        );

        alert("Student added successfully");
      }

      await fetchResults();

      const freshSection = await fetchSingleSection(
        selectedSection.id
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
        "Student save error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
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
        `${API}/results/${selectedSection.id}/students/${studentId}`
      );

      await fetchResults();

      const freshSection = await fetchSingleSection(
        selectedSection.id
      );

      if (freshSection) {
        setSelectedSection(freshSection);
      }

      alert("Student deleted successfully");
    } catch (error) {
      console.error(
        "Delete student error:",
        error.response?.data || error.message
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
              <h1>Results Management</h1>
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
            <h1>Results Management</h1>

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
              <h2>Result Sections</h2>

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
                      selectedSection?.id === section.id
                        ? "selected"
                        : ""
                    }`}
                    key={section.id}
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
                            deleteSection(section.id)
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
                    <th>Result</th>
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
                        <tr key={student.id}>

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
                                {student.name}
                              </strong>

                            </div>

                          </td>

                          <td>
                            {student.className}
                          </td>

                          <td>
                            <span className="result-value">
                              {student.result}
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
                                    student.id
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
                  value={studentForm.name}
                  onChange={(e) =>
                    setStudentForm({
                      ...studentForm,
                      name: e.target.value,
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
                    Result
                  </label>

                  <input
                    type="text"
                    placeholder="95%"
                    value={studentForm.result}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        result:
                          e.target.value,
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

export default AdminResults;
