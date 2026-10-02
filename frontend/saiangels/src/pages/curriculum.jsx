import banner from "/images/cirriculum-banner.jpg";
import "../assets/css/cirriculum.css";

// ✅ Declare data OUTSIDE return
const programs = [
  {
    title: "Science",
    image: "/images/science-img.jpg",
    desc: "Build a strong foundation in Science with experienced faculty, practical learning, and a supportive classroom environment.",
  },
  {
    title: "Laboratories",
    image: "/images/commerce-img.jpg",
    desc: "Discover the world of practical science with our well-equipped labs, experienced guidance, and hands-on learning opportunities.",
  },
  {
    title: "Class Room",
    image: "/images/competitive-img.jpg",
    desc: "A Premier institute for NEET/JEE/K-CET/NATA. We have expert faculties in our institute for those who want to opt for different competitive exams.",
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