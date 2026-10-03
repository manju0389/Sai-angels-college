import {
  FaFlask,
  FaLaptopCode,
  FaChartLine,
  FaCalculator,
  FaBookOpen,
} from "react-icons/fa";

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

export default function WhySection() {
  return (
    <section className="courses-section">
      <div className="container">
        <div className="courses-header">
          <div className="courses-title">
            <span>ACADEMIC PATHWAYS</span>

            <h2>
              Explore Our <strong>Courses</strong>
            </h2>
          </div>
        </div>

        <div className="courses-list">
          {courses.map((course, index) => (
            <div
              className="course-item"
              key={course.code}
              style={{
                "--course-color": course.color,
              }}
            >
              <div className="course-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="course-icon">
                {course.icon}
              </div>

              <div className="course-info">
                <span className="course-code">
                  {course.code}
                </span>

                <h3>{course.title}</h3>

                <p>{course.subjects}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}