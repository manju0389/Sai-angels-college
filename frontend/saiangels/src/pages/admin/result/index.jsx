import React, { useEffect, useState } from "react";
import "../../../assets/css/results.css";

const API = "https://sai-angels-college.onrender.com/api";

const AdminResults = () => {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  const [sectionForm, setSectionForm] = useState({
    title: "",
    description: "",
  });

  const [studentForm, setStudentForm] = useState({
    name: "",
    className: "",
    result: "",
    rank: "",
    image: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("schoolResults");

    if (savedData) {
      setSections(JSON.parse(savedData));
    } else {
      setSections(defaultData);
      localStorage.setItem("schoolResults", JSON.stringify(defaultData));
    }
  }, []);

  const saveData = (data) => {
    setSections(data);
    localStorage.setItem("schoolResults", JSON.stringify(data));
  };

  const openAddSection = () => {
    setEditingSection(null);
    setSectionForm({
      title: "",
      description: "",
    });
    setShowSectionModal(true);
  };

  const openEditSection = (section) => {
    setEditingSection(section);
    setSectionForm({
      title: section.title,
      description: section.description,
    });
    setShowSectionModal(true);
  };

  const handleSectionSubmit = (e) => {
    e.preventDefault();

    if (!sectionForm.title.trim()) {
      alert("Please enter section title");
      return;
    }

    if (editingSection) {
      const updated = sections.map((section) =>
        section.id === editingSection.id
          ? {
              ...section,
              title: sectionForm.title,
              description: sectionForm.description,
            }
          : section
      );

      saveData(updated);
    } else {
      const newSection = {
        id: Date.now(),
        title: sectionForm.title,
        description: sectionForm.description,
        students: [],
      };

      saveData([...sections, newSection]);
    }

    setShowSectionModal(false);
  };

  const deleteSection = (sectionId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this section?"
    );

    if (!confirmDelete) return;

    const updated = sections.filter((section) => section.id !== sectionId);
    saveData(updated);

    if (selectedSection?.id === sectionId) {
      setSelectedSection(null);
    }
  };

  const openAddStudent = () => {
    if (!selectedSection) {
      alert("Please select a section first");
      return;
    }

    setEditingStudent(null);
    setStudentForm({
      name: "",
      className: "",
      result: "",
      rank: "",
      image: "",
    });
    setShowStudentModal(true);
  };

  const openEditStudent = (student) => {
    setEditingStudent(student);
    setStudentForm({
      name: student.name,
      className: student.className,
      result: student.result,
      rank: student.rank,
      image: student.image,
    });
    setShowStudentModal(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setStudentForm((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleStudentSubmit = (e) => {
    e.preventDefault();

    if (!studentForm.name.trim()) {
      alert("Please enter student name");
      return;
    }

    if (!selectedSection) return;

    let updatedSections;

    if (editingStudent) {
      updatedSections = sections.map((section) => {
        if (section.id !== selectedSection.id) {
          return section;
        }

        return {
          ...section,
          students: section.students.map((student) =>
            student.id === editingStudent.id
              ? {
                  ...student,
                  ...studentForm,
                }
              : student
          ),
        };
      });
    } else {
      const newStudent = {
        id: Date.now(),
        ...studentForm,
      };

      updatedSections = sections.map((section) => {
        if (section.id !== selectedSection.id) {
          return section;
        }

        return {
          ...section,
          students: [...section.students, newStudent],
        };
      });
    }

    saveData(updatedSections);

    const updatedSection = updatedSections.find(
      (section) => section.id === selectedSection.id
    );

    setSelectedSection(updatedSection);
    setShowStudentModal(false);
  };

  const deleteStudent = (studentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    const updatedSections = sections.map((section) => {
      if (section.id !== selectedSection.id) {
        return section;
      }

      return {
        ...section,
        students: section.students.filter(
          (student) => student.id !== studentId
        ),
      };
    });

    saveData(updatedSections);

    const updatedSection = updatedSections.find(
      (section) => section.id === selectedSection.id
    );

    setSelectedSection(updatedSection);
  };

  const totalStudents = sections.reduce(
    (total, section) => total + section.students.length,
    0
  );

  return (
    <div className="admin-results">
      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Results Management</h1>
            <p>Manage your school results and achievements.</p>
          </div>

          <button className="add-section-btn" onClick={openAddSection}>
            <i className="fa-solid fa-plus"></i>
            Add Section
          </button>
        </header>

        <section className="admin-content">
          <div className="content-title">
            <div>
              <h2>Result Sections</h2>
            </div>
          </div>

          <div className="section-grid">
            {sections.map((section) => (
              <div
                className={`section-admin-card form-control ${
                  selectedSection?.id === section.id ? "selected" : ""
                }`}
                key={section.id}
              >
                <div className="section-card-top">
                  <div className="section-actions">
                    <button
                      onClick={() => openEditSection(section)}
                      title="Edit section"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>

                    <button
                      onClick={() => deleteSection(section.id)}
                      title="Delete section"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>

                <h3>{section.title}</h3>
                <p>{section.description}</p>

                <div className="section-footer">
                  <span>
                    <i className="fa-solid fa-users"></i>
                    {section.students.length} Students
                  </span>

                  <button onClick={() => setSelectedSection(section)}>
                    Manage
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {selectedSection && (
          <section className="students-management">
            <div className="student-header">
              <div>
                <h2>{selectedSection.title}</h2>
              </div>

              <button className="add-student-btn" onClick={openAddStudent}>
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
                  {selectedSection.students.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="empty-state">
                        <i className="fa-solid fa-users"></i>
                        <p>No students added yet.</p>

                        <button onClick={openAddStudent}>
                          Add First Student
                        </button>
                      </td>
                    </tr>
                  ) : (
                    selectedSection.students.map((student) => (
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

                            <strong>{student.name}</strong>
                          </div>
                        </td>

                        <td>{student.className}</td>

                        <td>
                          <span className="result-value">
                            {student.result}
                          </span>
                        </td>

                        <td>
                          <span className="rank-value">{student.rank}</span>
                        </td>

                        <td>
                          <div className="table-actions">
                            <button
                              className="edit-btn"
                              onClick={() => openEditStudent(student)}
                            >
                              <i className="fa-solid fa-pen"></i>
                            </button>

                            <button
                              className="deletes-btn"
                              onClick={() => deleteStudent(student.id)}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>

      {showSectionModal && (
        <div className="modal-overlay">
          <div className="admin-modal">
            <div className="modal-header">
              <div>
                <h2>
                  {editingSection ? "Edit Section" : "Add Result Section"}
                </h2>
                <p>Enter section information.</p>
              </div>

              <button onClick={() => setShowSectionModal(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSectionSubmit}>
              <div className="form-group">
                <label>Section Title</label>

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
                <label>Description</label>

                <textarea
                  placeholder="Enter section description..."
                  rows="4"
                  value={sectionForm.description}
                  onChange={(e) =>
                    setSectionForm({
                      ...sectionForm,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="modal-buttons">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowSectionModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="save-btn">
                  <i className="fa-solid fa-check"></i>
                  {editingSection ? "Update Section" : "Save Section"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showStudentModal && (
        <div className="modal-overlay">
          <div className="admin-modal student-modal">
            <div className="modal-header">
              <div>
                <h2>{editingStudent ? "Edit Student" : "Add Student"}</h2>
                <p>{selectedSection?.title}</p>
              </div>

              <button onClick={() => setShowStudentModal(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleStudentSubmit}>
              <div className="image-upload">
                <div className="image-preview">
                  {studentForm.image ? (
                    <img src={studentForm.image} alt="Preview" />
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
                      onChange={handleImageUpload}
                    />
                  </label>

                  <small>JPG, PNG or WEBP</small>
                </div>
              </div>

              <div className="form-group">
                <label>Student Name</label>

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
                  <label>Class / Course</label>

                  <input
                    type="text"
                    placeholder="Class 10"
                    value={studentForm.className}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        className: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Result</label>

                  <input
                    type="text"
                    placeholder="95%"
                    value={studentForm.result}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        result: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Rank / Achievement</label>

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
                  onClick={() => setShowStudentModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="save-btn">
                  <i className="fa-solid fa-check"></i>
                  {editingStudent ? "Update Student" : "Save Student"}
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
