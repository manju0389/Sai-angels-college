import "../assets/css/coaching.css";
import {
  FaGraduationCap,
  FaUsers,
  FaBullseye,
  FaUserCheck,
} from "react-icons/fa";

const achievements = [
  {
    number: "01",
    title: "Academic Excellence",
    text: "A focused and supportive learning environment designed to help students build strong subject knowledge, strengthen core concepts, and develop effective study habits. Through experienced faculty, structured teaching, regular assessments, personalised guidance, and continuous mentoring, students are encouraged to improve their academic performance and approach every challenge with confidence. Our learning approach goes beyond examinations by developing critical thinking, problem-solving skills, discipline, and a strong foundation for higher education and future career goals.",
    tag: "BOARD RESULTS",
  },
  {
    number: "02",
    title: "Competitive Edge",
    text: "Structured preparation for CET, NEET, JEE and other competitive examinations with regular practice and mentoring.",
    tag: "ENTRANCE EXAMS",
  },
  {
    number: "03",
    title: "Student Success",
    text: "Personal attention, performance tracking and academic guidance help every student move confidently toward their goals.",
    tag: "STUDENT GROWTH",
  },
];

const programmes = [
  "PU Programme",
  "Advanced Programme",
  "CET Coaching",
  "NEET Coaching",
  "JEE Coaching",
  "NATA Coaching",
];

export default function Coaching() {
  return (
    <main>

      {/* ACHIEVEMENTS */}
      <section className="achievement-section">
        <div className="section-heading">

          <h2>
            Results that reflect
            <br />
            <em>commitment.</em>
          </h2>

          <p>
            We combine academic discipline, personalised mentoring and
            continuous assessment to help students reach their potential.
          </p>
        </div>

        <div className="achievement-grid">
          {achievements.map((item, index) => (
            <article
              className={`achievement-card card-${index + 1}`}
              key={item.number}
            >
              <div className="card-top">
                <span>{item.number}</span>
                <small>{item.tag}</small>
              </div>

              <h3>{item.title}</h3>

              <p>{item.text}</p>

            </article>
          ))}
        </div>

        <div className="achievement-stats">

  <div className="stat-item">
    <div className="stat-icon">
      <FaGraduationCap />
    </div>
    <strong>100%</strong>
    <span>Academic Focus</span>
  </div>

  <div className="stat-item">
    <div className="stat-icon">
      <FaUsers />
    </div>
    <strong>360°</strong>
    <span>Student Mentoring</span>
  </div>

  <div className="stat-item">
    <div className="stat-icon">
      <FaBullseye />
    </div>
    <strong>10+</strong>
    <span>Career Pathways</span>
  </div>

  <div className="stat-item">
    <div className="stat-icon">
      <FaUserCheck />
    </div>
    <strong>1:1</strong>
    <span>Personal Guidance</span>
  </div>

</div>
      </section>


      {/* COACHING */}
      <section className="coaching-section">

        <div className="coaching-intro">

          <h2>
            One campus.
            <br />
            <strong>Many possibilities.</strong>
          </h2>

          <p>
            Choose the academic programme that matches your ambitions,
            interests and future career direction.
          </p>
        </div>

        <div className="programme-area">
          {programmes.map((programme, index) => (
            <div className="programme-item" key={programme}>
              <span>{String(index + 1).padStart(2, "0")}</span>

              <h3>{programme}</h3>

              <b>↗</b>
            </div>
          ))}
        </div>

      </section>


      {/* MANAGEMENT */}
      <section className="management-section">

        <div className="management-image">
          <div className="image-frame">
            <img
              src="/images/chairman.jpg"
              alt="Chairman"
            />
          </div>
        </div>

        <div className="management-content">

          <div className="quote">
            “
          </div>

          <h2>
            Education should
            <br />
            create <em>possibilities.</em>
          </h2>

          <p className="lead">
            Our institution believes that education is more than
            examination results. It is about developing confidence,
            character, curiosity and the ability to build a meaningful
            future.
          </p>

          <div className="leader-info">
            <div>
              <strong>Principal Message</strong>
              <span>Management & Administration</span>
            </div>

            <div className="leader-line"></div>

            <p>
              With a long-term vision for education, our leadership
              team continues to create an environment where students
              can learn, explore and grow.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}