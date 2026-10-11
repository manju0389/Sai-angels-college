import React, { useEffect, useState } from "react";
import "../assets/css/results.css";

const API = "https://sai-angels-college.onrender.com/api";

const BResults = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBResults = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API}/bresults`);
        const data = await response.json();

        console.log("Results API response:", data);

        if (!response.ok) {
          throw new Error(
            data.message || `Request failed: ${response.status}`
          );
        }

        // Support common API response formats
        const bresultSections = Array.isArray(data)
  ? data
  : Array.isArray(data.sections)
  ? data.sections
  : Array.isArray(data.results)
  ? data.results
  : Array.isArray(data.bresults)
  ? data.bresults
  : [];

setSections(bresultSections);

      } catch (err) {
        console.error("Results loading error:", err);
        setError(err.message || "Unable to load results.");
      } finally {
        setLoading(false);
      }
    };

    loadBResults();
  }, []);

  return (
    <div className="results-page">

      {loading ? (
        <div className="results-loading">
          <i className="fa-solid fa-spinner fa-spin" />
          <p>Loading results...</p>
        </div>
      ) : error ? (
        <div className="results-empty">
          <h2>Unable to Load Results</h2>
          <p>{error}</p>
          <p>Please check your connection and try again.</p>
        </div>
      ) : sections.length > 0 ? (
        sections.map((section, index) => (
          <section
            className="result-section"
            key={section._id || index}
          >
            <div className="section-heading-result">
              <h2>{section.title}</h2>
              {section.description && (
                <p>{section.description}</p>
              )}
            </div>

            <div className="results-grid container">
              {(Array.isArray(section.students)
                ? section.students
                : []
              ).map((student, studentIndex) => (
                <div
                  className="result-card"
                  key={student._id || studentIndex}
                >
                  <div className="result-image">
                    {student.image ? (
                      <img
                        src={student.image}
                        alt={student.studentName || "Student"}
                      />
                    ) : (
                      <div className="result-image-placeholder">
                        <i className="fa-solid fa-user" />
                      </div>
                    )}

                    {student.rank && (
                      <span className="rank-badge">
                        {student.rank}
                      </span>
                    )}
                  </div>

                  <div className="result-info">
                    <h3>{student.studentName || "Student"}</h3>

                    {student.className && (
                      <p>{student.className}</p>
                    )}

                    {student.score != null &&
                      student.score !== "" && (
                        <strong>{student.score}</strong>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className="results-empty">
          <i className="fa-solid fa-award" />
          <h2>No Results Available</h2>
          <p>
            Results and achievements will appear here once
            they are added from the admin panel.
          </p>
        </div>
      )}
    </div>
  );
};

export default BResults;