import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import "../assets/css/results.css";

// ==========================================
// RESULT CAROUSEL
// ==========================================

const ResultCarousel = ({ title, description, students }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  // ==========================================
  // RESPONSIVE CARD COUNT
  // ==========================================

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

    window.addEventListener("resize", updateVisibleCards);

    return () => {
      window.removeEventListener("resize", updateVisibleCards);
    };
  }, []);

  // ==========================================
  // MAX SLIDE INDEX
  // ==========================================

  const maxIndex = Math.max(
    students.length - visibleCards,
    0
  );

  // ==========================================
  // KEEP INDEX VALID WHEN SCREEN SIZE CHANGES
  // ==========================================

  useEffect(() => {
    setCurrentIndex((prev) =>
      Math.min(prev, maxIndex)
    );
  }, [maxIndex]);

  // ==========================================
  // NEXT
  // ==========================================

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) {
        return 0;
      }

      return prev + 1;
    });
  };

  // ==========================================
  // PREVIOUS
  // ==========================================

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return maxIndex;
      }

      return prev - 1;
    });
  };

  // ==========================================
  // AUTO SLIDE
  // ==========================================

  useEffect(() => {
    if (students.length <= visibleCards) {
      return;
    }

    const autoSlide = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) {
          return 0;
        }

        return prev + 1;
      });
    }, 3000);

    return () => {
      clearInterval(autoSlide);
    };
  }, [maxIndex, visibleCards, students.length]);

  // ==========================================
  // GO TO SLIDE
  // ==========================================

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // ==========================================
  // EMPTY STATE
  // ==========================================

  if (!students || students.length === 0) {
    return null;
  }

  return (
    <section className="result-section">

      {/* HEADING */}

      <div className="section-heading-result">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      {/* CAROUSEL */}

      <div className="carousel-container">

        {/* LEFT ARROW */}

        {students.length > visibleCards && (
          <button
            type="button"
            className="carousel-arrow"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
        )}

        {/* WINDOW */}

        <div className="carousel-window">

          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / visibleCards)
              }%)`,
            }}
          >

            {students.map((student) => (
              <div
                className="carousel-slide"
                key={student.id}
              >

                <div className="result-card">

                  {/* IMAGE */}

                  <div className="result-image">

                    {student.image ? (
                      <img
                        src={student.image}
                        alt={student.name}
                      />
                    ) : (
                      <div className="result-image-placeholder">
                        <i className="fa-solid fa-user"></i>
                      </div>
                    )}

                    {student.rank && (
                      <span className="rank-badge">
                        {student.rank}
                      </span>
                    )}

                  </div>

                  {/* INFO */}

                  <div className="result-info">

                    <h3>
                      {student.name}
                    </h3>

                    {student.className && (
                      <p>
                        {student.className}
                      </p>
                    )}

                    {student.result && (
                      <strong>
                        {student.result}
                      </strong>
                    )}

                  </div>

                </div>

              </div>
            ))}

          </div>
        </div>

        {/* RIGHT ARROW */}

        {students.length > visibleCards && (
          <button
            type="button"
            className="carousel-arrow"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        )}

      </div>

      {/* DOTS */}

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
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
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
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {
    const loadResults = () => {
      try {
        const savedData =
          localStorage.getItem("schoolResults");

        if (savedData) {
          const parsedData = JSON.parse(savedData);

          if (Array.isArray(parsedData)) {
            setSections(parsedData);
          }
        }
      } catch (error) {
        console.error(
          "Failed to load results:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, []);

  // ==========================================
  // LISTEN FOR CHANGES
  // ==========================================

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key !== "schoolResults") {
        return;
      }

      try {
        const updatedData = event.newValue
          ? JSON.parse(event.newValue)
          : [];

        setSections(
          Array.isArray(updatedData)
            ? updatedData
            : []
        );
      } catch (error) {
        console.error(
          "Failed to update results:",
          error
        );
      }
    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  // ==========================================
  // SAME TAB UPDATE
  // ==========================================

  useEffect(() => {
    const interval = setInterval(() => {
      const savedData =
        localStorage.getItem("schoolResults");

      if (!savedData) {
        return;
      }

      try {
        const parsedData = JSON.parse(savedData);

        setSections((previous) => {
          if (
            JSON.stringify(previous) !==
            JSON.stringify(parsedData)
          ) {
            return parsedData;
          }

          return previous;
        });
      } catch (error) {
        console.error(
          "Failed to refresh results:",
          error
        );
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="results-page">

        <Banner />

        <div className="results-loading">
          <i className="fa-solid fa-spinner fa-spin"></i>
          <p>Loading results...</p>
        </div>

      </div>
    );
  }

  return (
    <div className="results-page">

      {/* BANNER */}

      <Banner />

      {/* DYNAMIC SECTIONS */}

      {sections.length > 0 ? (
        sections.map((section) => (
          <ResultCarousel
            key={section.id}
            title={section.title}
            description={section.description}
            students={section.students || []}
          />
        ))
      ) : (
        <div className="results-empty">
          <i className="fa-solid fa-award"></i>

          <h2>No Results Available</h2>

          <p>
            Results and achievements will appear here
            once they are added from the admin panel.
          </p>
        </div>
      )}

    </div>
  );
};

export default Results;
