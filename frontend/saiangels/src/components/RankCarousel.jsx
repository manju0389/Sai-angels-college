import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "https://sai-angels-college.onrender.com/api";

export default function RankCarousel() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;

  // FETCH
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${API}/student`);
        setStudents(res.data || []);
      } catch (err) {
        console.error("Error loading students:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // GROUP INTO SLIDES (3 per slide)
  const chunkSize = 3;
  const slides = [];

  for (let i = 0; i < students.length; i += chunkSize) {
    slides.push(students.slice(i, i + chunkSize));
  }

  // LOADING
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  // EMPTY STATE
  if (!students.length) {
    return <p className="text-center">No students found</p>;
  }

  return (
    <section className="rank-section container-fluid">
      <div className="container text-center">

        <h2 className="title" style={{ paddingBottom: "2%" }}>
          Our College Rank Holders ({previousYear} - {currentYear})
        </h2>

        <p className="subtitle"> Discover the achievements of our students across PU Board, CET, NEET, 
          and JEE. With dedicated academic support and focused entrance-exam preparation, 
          Sri Sai Angels PU College helps students build a strong foundation for higher education. </p>

        <div
          id="rankCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="1500"
        >
          <div className="carousel-inner">

            {slides.map((group, slideIndex) => (
              <div
                key={slideIndex}
                className={`carousel-item ${slideIndex === 0 ? "active" : ""}`}
              >
                <div className="row justify-content-center">

                  {group.map((student) => (
                    <div
                      key={student.id || student._id}
                      className="col-md-4 col-12 mb-4"
                    >
                      <div className="student-card">

                        <img
                          src={student.image}
                          alt={student.name}
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/200x200?text=No+Image";
                          }}
                        />

                        <h5>{student.name}</h5>
                        <p>({student.stream})</p>

                        <span className="rank">
                          {student.rank}
                        </span>

                      </div>
                    </div>
                  ))}

                </div>
              </div>
            ))}

          </div>

          <hr />

          {/* CONTROLS */}
          {slides.length > 1 && (
            <>

              <Link to="/achievements">
                <button className="apply-btn float-start"> Click for all Achievements </button>
              </Link>            
            
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
