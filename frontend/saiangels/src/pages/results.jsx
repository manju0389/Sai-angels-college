import React, {
  useEffect,
  useState,
} from "react";

import Banner from "../components/Banner";
import "../assets/css/results.css";

const API =
  "https://sai-angels-college.onrender.com/api";

// ==========================================
// RESULT CAROUSEL
// ==========================================

const ResultCarousel = ({
  title,
  description,
  students,
}) => {
  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [visibleCards, setVisibleCards] =
    useState(3);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth <= 600) {
        setVisibleCards(1);
      } else if (window.innerWidth <= 900) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisibleCards();

    window.addEventListener(
      "resize",
      updateVisibleCards
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateVisibleCards
      );
    };
  }, []);

  const maxIndex = Math.max(
    students.length - visibleCards,
    0
  );

  useEffect(() => {
    setCurrentIndex((prev) =>
      Math.min(prev, maxIndex)
    );
  }, [maxIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= maxIndex ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev <= 0 ? maxIndex : prev - 1
    );
  };

  useEffect(() => {
    if (students.length <= visibleCards) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev >= maxIndex ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [
    maxIndex,
    visibleCards,
    students.length,
  ]);

  if (!students?.length) {
    return null;
  }

  return (
    <section className="result-section">

      <div className="section-heading-result">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className="carousel-container">

        {students.length > visibleCards && (
          <button
            type="button"
            className="carousel-arrow"
            onClick={prevSlide}
          >
            <i className="fa-solid fa-chevron-left" />
          </button>
        )}

        <div className="carousel-window">

          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${
                currentIndex *
                (100 / visibleCards)
              }%)`,
            }}
          >

            {students.map((student) => (
              <div
                className="carousel-slide"
                key={student._id}
              >

                <div className="result-card">

                  <div className="result-image">

                    {student.image ? (
                      <img
                        src={student.image}
                        alt={
                          student.studentName
                        }
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

                    <h3>
                      {student.studentName}
                    </h3>

                    {student.className && (
                      <p>
                        {student.className}
                      </p>
                    )}

                    {student.score && (
                      <strong>
                        {student.score}
                      </strong>
                    )}

                  </div>

                </div>

              </div>
            ))}

          </div>
        </div>

        {students.length > visibleCards && (
          <button
            type="button"
            className="carousel-arrow"
            onClick={nextSlide}
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
        )}

      </div>

      {students.length > visibleCards && (
        <div className="carousel-dots">

          {Array.from({
            length: maxIndex + 1,
          }).map((_, index) => (
            <button
              type="button"
              key={index}
              className={
                currentIndex === index
                  ? "active"
                  : ""
              }
              onClick={() =>
                setCurrentIndex(index)
              }
              aria-label={`Go to slide ${
                index + 1
              }`}
            />
          ))}

        </div>
      )}

    </section>
  );
};

// ==========================================
// RESULTS PAGE
// ==========================================

const Results = () => {
  const [sections, setSections] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadResults = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API}/results`
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to fetch results"
          );
        }

        setSections(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (error) {
        console.error(
          "Failed to load results:",
          error
        );

        setSections([]);
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, []);

  if (loading) {
    return (
      <div className="results-page">

        <Banner />

        <div className="results-loading">
          <i className="fa-solid fa-spinner fa-spin" />
          <p>Loading results...</p>
        </div>

      </div>
    );
  }

  return (
    <div className="results-page">

      <Banner />

      {sections.length > 0 ? (
        sections.map((section) => (
          <ResultCarousel
            key={section._id}
            title={section.title}
            description={
              section.description
            }
            students={
              section.students || []
            }
          />
        ))
      ) : (
        <div className="results-empty">

          <i className="fa-solid fa-award" />

          <h2>No Results Available</h2>

          <p>
            Results and achievements will
            appear here once they are added
            from the admin panel.
          </p>

        </div>
      )}

    </div>
  );
};

export default Results;
