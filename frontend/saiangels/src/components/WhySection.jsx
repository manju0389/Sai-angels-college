import {
  FaTrophy,
  FaBook,
  FaHandsHelping,
  FaLightbulb,
  FaStar,
  FaGraduationCap,
  FaBrain,
  FaAtom,
  FaFlask,
  FaLaptopCode,
  FaChartLine,
  FaCalculator,
  FaBookOpen,
  FaGlobeAsia,
  FaBalanceScale,
} from "react-icons/fa";


// ===============================
// COURSES
// ===============================

const courses = [
  {
    code: "PCMB",
    title: "Science",
    subjects: "Physics, Chemistry, Mathematics, Biology",
    icon: <FaFlask />,
    color: "#f4b400",
  },
  {
    code: "PCMC",
    title: "Computer Science",
    subjects: "Physics, Chemistry, Mathematics, Computer Science",
    icon: <FaLaptopCode />,
    color: "#00a884",
  },
  {
    code: "CEBA",
    title: "Commerce",
    subjects:
      "Computer Science, Economics, Business Studies, Accountancy",
    icon: <FaChartLine />,
    color: "#1769aa",
  },
  {
    code: "MEBA",
    title: "Commerce",
    subjects:
      "Mathematics, Economics, Business Studies, Accountancy",
    icon: <FaCalculator />,
    color: "#df3159",
  },
  {
    code: "SEBA",
    title: "Commerce",
    subjects:
      "Statistics, Economics, Business Studies, Accountancy",
    icon: <FaBookOpen />,
    color: "#f4b400",
  },
  {
    code: "MSBA",
    title: "Commerce",
    subjects:
      "Maths, Statistics, Business Studies and Accountancy",
    icon: <FaChartLine />,
    color: "#00a884",
  },
];


// ===============================
// MAIN COMPONENT
// ===============================

export default function WhySection() {

  const features = [
    {
      icon: <FaTrophy />,
      text: "Excellent Sports Infrastructure",
      color: "#f59e0b",
    },
    {
      icon: <FaStar />,
      text: "Ideal Student-Teacher Ratio",
      color: "#e63962",
    },
    {
      icon: <FaBook />,
      text: "Engaging Curriculum",
      color: "#2563eb",
    },
    {
      icon: <FaGraduationCap />,
      text: "Value-Based Education",
      color: "#10a981",
    },
    {
      icon: <FaHandsHelping />,
      text: "Exceptional Care",
      color: "#8b5cf6",
    },
    {
      icon: <FaBrain />,
      text: "Life Skills Sessions",
      color: "#ef4444",
    },
    {
      icon: <FaLightbulb />,
      text: "Student Exchange Program",
      color: "#06a77d",
    },
    {
      icon: <FaAtom />,
      text: "Experiential Learning",
      color: "#3155d9",
    },
  ];


  return (
    <>
      {/* =====================================================
          WHY SAI ANGELS SECTION
      ===================================================== */}

      <section className="why-section">

        <div className="container">

          <div className="row align-items-center">

            {/* LEFT SIDE */}
            <div className="col-lg-4 mb-4 mb-lg-0">

              <div className="why-intro">

                <span className="section-label">
                  WHY CHOOSE US
                </span>

                <h2>
                  Why Sai Angels
                  <span> PU College?</span>
                </h2>

                <p>
                  Sai Angels PU College was founded with a vision
                  to be one of the leading independent colleges in
                  Chikkamagaluru, providing students with a
                  stimulating and all-round education.
                </p>


                <div className="why-highlight">

                  <FaGraduationCap />

                  <div>
                    <strong>
                      Education Beyond Classrooms
                    </strong>

                    <small>
                      Building knowledge, confidence and character.
                    </small>
                  </div>

                </div>

              </div>

            </div>


            {/* RIGHT SIDE */}
            <div className="col-lg-8">

              <div className="facilities-header">

                <div>

                  <span>
                    OUR STRENGTHS
                  </span>

                  <h3>
                    All Facilities
                  </h3>

                </div>

                <p>
                  Everything students need to learn,
                  grow and succeed.
                </p>

              </div>


              {/* FEATURES */}

              <div className="features-grid">

                {features.map((item, index) => (

                  <div
                    className="feature-card"
                    key={index}
                    style={{
                      "--feature-color": item.color,
                    }}
                  >

                    <div className="feature-icon">
                      {item.icon}
                    </div>


                    <div className="feature-content">

                      <span>
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h4>
                        {item.text}
                      </h4>

                    </div>


                    <div className="feature-arrow">
                      →
                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          COURSES SECTION
      ===================================================== */}

      <section className="courses-section">

        <div className="container">

          {/* HEADER */}

          <div className="courses-header">

            <div className="courses-title">

              <span>
                ACADEMIC PATHWAYS
              </span>

              <h2>
                Explore Our <strong>Courses</strong>
              </h2>

            </div>

          </div>


          {/* COURSE LIST */}

          <div className="courses-list">

            {courses.map((course, index) => (

              <div
                className="course-item"
                key={course.code}
                style={{
                  "--course-color": course.color,
                }}
              >

                {/* NUMBER */}

                <div className="course-number">

                  {String(index + 1).padStart(2, "0")}

                </div>


                {/* ICON */}

                <div className="course-icon">

                  {course.icon}

                </div>


                {/* CONTENT */}

                <div className="course-info">

                  <span className="course-code">
                    {course.code}
                  </span>

                  <h3>
                    {course.title}
                  </h3>

                  <p>
                    {course.subjects}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>
    </>
  );
}
