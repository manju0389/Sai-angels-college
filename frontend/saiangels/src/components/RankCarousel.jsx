import { useEffect, useState } from "react";
import axios from "axios";

export default function RankCarousel() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;

  const API = "http://localhost:3000/api/student";

  // ================= IMAGE HELPER =================
  const getImageUrl = (img) => {
    if (!img || img === "undefined" || img === "null") {
      return "https://via.placeholder.com/200x200?text=No+Image";
    }

    return img; // Cloudinary URL
  };

  // ================= FETCH =================
  const fetchStudents = async () => {
    try {
      const res = await axios.get(API);
      setStudents(res.data || []);
    } catch (err) {
      console.error("Error loading students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ================= GROUP STUDENTS =================
  const chunkSize = 4;
  const slides = [];

  for (let i = 0; i < students.length; i += chunkSize) {
    slides.push(
      students.slice(i, i + chunkSize)
    );
  }

  // ================= LOADING =================
  if (loading) {
    return (
      <p className="text-center">
        Loading...
      </p>
    );
  }

  if (!students.length) {
    return (
      <p className="text-center">
        No students found
      </p>
    );
  }

  // ================= UI =================
  return (
    <section className="rank-section container-fluid mb-5">
      <div className="container text-center">

        <h2 className="title">
          Our College Rank Holders ({previousYear} - {currentYear})
        </h2>

        <p className="subtitle">
          Congratulations
        </p>

        <div
          id="rankCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="2500"
        >
          <div className="carousel-inner">

            {slides.map(
              (group, slideIndex) => (
                <div
                  key={slideIndex}
                  className={`carousel-item ${
                    slideIndex === 0
                      ? "active"
                      : ""
                  }`}
                >
                  <div className="row justify-content-center">

                    {group.map(
                      (student) => (
                        <div
                          key={
                            student.id ||
                            student._id
                          }
                          className="col-md-3 col-12 mb-4"
                        >
                          <div className="student-card">

                            <img
                              src={getImageUrl(
                                student.image
                              )}
                              alt={
                                student.name
                              }
                              onError={(e) => {
                                e.target.src =
                                  "https://via.placeholder.com/200x200?text=No+Image";
                              }}
                            />

                            <h5>
                              {
                                student.name
                              }
                            </h5>

                            <p>
                              (
                              {
                                student.stream
                              }
                              )
                            </p>

                            <span className="rank">
                              {
                                student.rank
                              }
                            </span>

                          </div>
                        </div>
                      )
                    )}

                  </div>
                </div>
              )
            )}

          </div>

          <hr />

          {/* Show controls only if multiple slides */}
          {slides.length > 1 && (
            <>
              <button
                className="carousel-control-prev-rank"
                type="button"
                data-bs-target="#rankCarousel"
                data-bs-slide="prev"
              >
                <span>
                  <i className="fa-solid fa-angle-left"></i>
                </span>
              </button>

              <button
                className="carousel-control-next-rank"
                type="button"
                data-bs-target="#rankCarousel"
                data-bs-slide="next"
              >
                <span>
                  <i className="fa-solid fa-angle-right"></i>
                </span>
              </button>
            </>
          )}

        </div>
      </div>
    </section>
  );
}