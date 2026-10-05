import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import "../assets/css/results.css";

// ==========================================
// CAROUSEL DATA
// ==========================================

const carouselData = [
  {
    title: "Academic Excellence",
    description:
      "A focused learning environment designed to help students build strong concepts and achieve consistent academic progress.",

    students: [
      {
        image: "/images/aryan-konde.jpg",
        name: "Student Name 1",
        className: "Class 10",
        result: "95%",
        rank: "Top Performer",
      },
      {
        image: "/images/student2.jpg",
        name: "Student Name 2",
        className: "Class 10",
        result: "93%",
        rank: "Top Performer",
      },
      {
        image: "/images/student3.jpg",
        name: "Student Name 3",
        className: "Class 10",
        result: "92%",
        rank: "Top Performer",
      },
      {
        image: "/images/student4.jpg",
        name: "Student Name 4",
        className: "Class 10",
        result: "90%",
        rank: "Top Performer",
      },
      {
        image: "/images/student5.jpg",
        name: "Student Name 5",
        className: "Class 10",
        result: "89%",
        rank: "Top Performer",
      },
    ],
  },

  {
    title: "University Toppers",
    description:
      "Celebrating our students who have achieved outstanding results and secured top positions.",

    students: [
      {
        image: "/images/topper1.jpg",
        name: "Student Name 1",
        className: "Degree",
        result: "98%",
        rank: "University Rank 1",
      },
      {
        image: "/images/topper2.jpg",
        name: "Student Name 2",
        className: "Degree",
        result: "96%",
        rank: "University Rank 2",
      },
      {
        image: "/images/topper3.jpg",
        name: "Student Name 3",
        className: "Degree",
        result: "95%",
        rank: "University Rank 3",
      },
      {
        image: "/images/topper4.jpg",
        name: "Student Name 4",
        className: "Degree",
        result: "94%",
        rank: "University Rank 4",
      },
      {
        image: "/images/topper5.jpg",
        name: "Student Name 5",
        className: "Degree",
        result: "93%",
        rank: "University Rank 5",
      },
    ],
  },

  {
    title: "Sports Achievements",
    description:
      "Recognising our talented students who have excelled in sports and extracurricular activities.",

    students: [
      {
        image: "/images/sport1.jpg",
        name: "Student Name 1",
        className: "Athletics",
        result: "Gold Medal",
        rank: "State Level",
      },
      {
        image: "/images/sport2.jpg",
        name: "Student Name 2",
        className: "Cricket",
        result: "Winner",
        rank: "District Level",
      },
      {
        image: "/images/sport3.jpg",
        name: "Student Name 3",
        className: "Football",
        result: "Runner Up",
        rank: "State Level",
      },
      {
        image: "/images/sport4.jpg",
        name: "Student Name 4",
        className: "Kabaddi",
        result: "Winner",
        rank: "State Level",
      },
      {
        image: "/images/sport5.jpg",
        name: "Student Name 5",
        className: "Athletics",
        result: "Silver Medal",
        rank: "District Level",
      },
    ],
  },
];


// ==========================================
// REUSABLE CAROUSEL
// ==========================================

const ResultCarousel = ({
  title,
  description,
  students,
}) => {

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


  // ==========================================
  // MAXIMUM SLIDE
  // ==========================================

  const maxIndex = Math.max(
    students.length - visibleCards,
    0
  );


  // ==========================================
  // NEXT SLIDE
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
  // PREVIOUS SLIDE
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
  // DOT
  // ==========================================

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };


  return (

    <section className="result-section">


      {/* ======================================
          HEADING
      ====================================== */}

      <div className="section-heading-result">

        <h2>{title}</h2>

        <p>{description}</p>

      </div>


      {/* ======================================
          CAROUSEL
      ====================================== */}

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


        {/* CAROUSEL WINDOW */}

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

            {students.map((student, index) => (

              <div
                className="carousel-slide"
                key={index}
              >

                <div className="result-card">


                  {/* IMAGE */}

                  <div className="result-image">

                    <img
                      src={student.image}
                      alt={student.name}
                    />

                    <span className="rank-badge">
                      {student.rank}
                    </span>

                  </div>


                  {/* INFO */}

                  <div className="result-info">

                    <h3>
                      {student.name}
                    </h3>

                    <p>
                      {student.className}
                    </p>

                    <strong>
                      {student.result}
                    </strong>

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


      {/* ======================================
          DOTS
      ====================================== */}

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
                goToSlide(index)
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

  return (

    <div className="results-page">

      {/* ======================================
          BANNER
      ====================================== */}

      <Banner />


      {/* ======================================
          MULTIPLE CAROUSELS
      ====================================== */}

      {carouselData.map((section, index) => (

        <ResultCarousel
          key={index}
          title={section.title}
          description={section.description}
          students={section.students}
        />

      ))}

    </div>

  );
};


export default Results;