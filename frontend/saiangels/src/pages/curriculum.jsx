import banner from "/images/cirriculum-banner.jpg";
import "../assets/css/cirriculum.css";

// ✅ Declare data OUTSIDE return
const programs = [
  {
    title: "Science",
    image: "/images/science-img.jpg",
    desc: "Now study in a leading science college with experienced staff & a positive learning environment. Contact now! ",
  },
  {
    title: "Commerce",
    image: "/images/commerce-img.jpg",
    desc: "Passionate about your higher studies and your subjects?We offer you the best of commerce courses to persue.",
  },
  {
    title: "Institutes for competitive exams",
    image: "/images/competitive-img.jpg",
    desc: "A Premier institute for NEET/JEE/K-CET/NATA in coffee land We have expert faculties in our institute for those who want to opt for different competitive exams.",
  },
];

export default function Curriculum() {
  return (
    <>
      {/* ✅ Banner */}
          <div className="contact-banner-wrapper">
            <img src={banner} alt="Contact Banner" className="contact-banner" />
            <div className="banner-overlay">
              <h1>Curriculum</h1>
            </div>
          </div>

      {/* ✅ Text Section */}
      <section className="curriculum">
        <div className="content">
          <p>
            We follow the curriculum prescribed by the Department of
            Pre-University Education, Karnataka for both I and II
            Pre-University courses.
          </p>

          <p>
            At Sai Angels PU College, we offer various combinations of core subjects
            in Science and Commerce to meet student aspirations.
          </p>

          <p>
            Our faculty is highly competent and caters to different learning
            levels of students.
          </p>

          <p>
            We follow a student-centred teaching methodology focusing on overall
            development.
          </p>
        </div>
      </section>

      {/* ✅ Cards Section */}
      <section className="programs">
        <div className="programs-container container">
          {programs.map((item, index) => (
            <div className="card" key={index}>
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}