import { useEffect, useState } from "react";
import { Eye, Target } from "lucide-react";
import banner from "/images/about-banner.jpg";
import "../assets/css/about.css";


export default function About() {

  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/about")
      .then((res) => res.json())
      .then((data) => setFaculty(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {/* Full Width Banner */}
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
            <p>Sai Angels is committed to serving society in an environment dedicated to provide for its 
              students the opportunity to excel in academic performance while also developing their 
              individual talent in the fields of sports and creativity. The institution strives to 
              promote in young minds a sense of responsibility for their own development and an 
              understanding of their duties as members of a society. The institution encourages students 
              to learn and develop the ability to think clearly and express themselves effectively. Along 
              with the habit of analytical and reflective thought, and an awareness about themselves 
              their heritage, their culture, their environment and their country.</p>
          </div>
        </div>
      </section>

      {/* Vision Mission Section */}
      <section className="vm-section">
        <div className="vm-container container">

          <div className="vm-item">
            <div className="vm-icon">
              <Eye size={40} />
            </div>
            <div className="vm-content">
              <h2>Our Vision</h2>
              <p> At Sai Angels, we nurture young minds through quality education and practical 
                entrepreneurship. We empower students to think critically, innovate, and excel in every endeavor. 
                Our goal is to create leaders who make a positive impact on society.</p>
            </div>
          </div>

          <hr />

          <div className="vm-item">
            <div className="vm-icon">
              <Target size={40} />
            </div>
            <div className="vm-content">
              <h2>Our Mission</h2>
              <p>Sai Angels is dedicated to delivering quality education and fostering professional growth.
                  We aim to shape students into skilled, confident individuals ready to excel in their 
                  careers.</p>
            </div>
          </div>

        </div>
      </section>

      {/* FACULTY SECTION (DYNAMIC) */}
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
                    <img src={item.image ? `${item.image}?t=${Date.now()}` : "/images/about-img.webp"} alt={item.name} className="img-left"/>
                  </div>
                </div>

                <div className={`col-lg-8 ${index % 2 ? "order-lg-1" : ""}`}>
                  <div className="about-content">
                    <h4><b>{item.name}</b></h4>
                    <h5><i>{item.designation}</i></h5>

                    {(Array.isArray(item.message) ? item.message : []).map((para, i) => (
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