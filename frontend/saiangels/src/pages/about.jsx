import { useEffect, useState } from "react";
import { Eye, Target } from "lucide-react";
import banner from "/images/about-banner.jpg";
import "../assets/css/about.css";

const API = "https://sai-angels-college.onrender.com/api";

export default function About() {
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await fetch(`${API}/about`);
        const data = await res.json();
        setFaculty(data || []);
      } catch (err) {
        console.error("Faculty fetch error:", err);
      }
    };

    fetchFaculty(); // ✅ IMPORTANT (you forgot this)
  }, []);

  return (
    <>
      {/* Banner */}
      <div className="contact-banner-wrapper">
        <img src={banner} alt="Contact Banner" className="contact-banner" />
        <div className="banner-overlay">
          <h1>About Us</h1>
        </div>
      </div>

      {/* About Section */}
      <section className="about container">
        <div className="about-container">
          <div className="about-images">
            <img src="/images/about-img.webp" alt="Students discussion" />
          </div>

          <div className="about-content">
            <h2>About Sai Angels</h2>
            <p>
              Sai Angels is committed to serving society in an environment
              dedicated to provide for its students the opportunity to excel in
              academic performance while also developing their individual talent
              in sports and creativity.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Mission */}
      <section className="vm-section">
        <div className="vm-container container">
          <div className="vm-item">
            <div className="vm-icon">
              <Eye size={40} />
            </div>
            <div className="vm-content">
              <h2>Our Vision</h2>
              <p>
                We nurture young minds through quality education and innovation.
              </p>
            </div>
          </div>

          <hr />

          <div className="vm-item">
            <div className="vm-icon">
              <Target size={40} />
            </div>
            <div className="vm-content">
              <h2>Our Mission</h2>
              <p>
                We shape students into skilled and confident professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="about container">
        <div className="about-content pb-5">
          <h3>SRI SAI ANGELS GROUP OF EDUCATIONAL INSTITUTIONS</h3>
          <div className="underline"></div>
        </div>

        {faculty.length === 0 ? (
          <p>No faculty data found</p>
        ) : (
          faculty.map((item, index) => (
            <div key={item.id}>
              <div className="row align-items-center">
                <div className={`col-lg-4 ${index % 2 ? "order-lg-2" : ""}`}>
                  <div className="about-images">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-left"
                    />
                  </div>
                </div>

                <div className={`col-lg-8 ${index % 2 ? "order-lg-1" : ""}`}>
                  <div className="about-content">
                    <h4><b>{item.name}</b></h4>
                    <h5><i>{item.designation}</i></h5>

                    {(Array.isArray(item.message)
                      ? item.message
                      : []
                    ).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
              </div>

              <hr />
            </div>
          ))
        )}
      </section>
    </>
  );
}
