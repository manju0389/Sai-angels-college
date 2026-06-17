import banner from "/images/contact-banner.jpg";
import "../assets/css/contact.css";

export default function Contact() {

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  try {
    const response = await fetch("https://sai-angels-college.onrender.com/sent1.php", {
      method: "POST",
      body: formData
    });

    const result = await response.text();

    if (result === "success") {
      alert("Message sent successfully ✅");
      e.target.reset(); // clear form
    } else {
      alert("Failed to send message ❌");
    }

  } catch (error) {
    console.error(error);
    alert("Server error ❌");
  }
};

  return (
    <>
      {/* Full Width Banner */}
      <div className="contact-banner-wrapper">
      <img src={banner} alt="Contact Banner" className="contact-banner" />
      <div className="banner-overlay">
        <h1>Contact Us</h1>
      </div>
    </div>

      <div className="contact-container container mt-4">

        {/* Top Section */}
        <div className="contact-top">

          {/* Left Column */}
          <div className="contact-info">
            <h2>Address</h2>

            <p><i className="fa-solid fa-location"></i> {" "} Sirgaapura, Malalur post, Chikmagalur - 577133</p>
            <p><i className="fa-solid fa-envelope"></i>  {" "} <a href="mailto:principal.saiangelspucollege@gmail.com"> principal.saiangelspucollege@gmail.com </a></p>
            <p><i className="fa-solid fa-phone"></i> {" "} < a href="tel:+919535429881"> +91 95354 29881 </a>  / < a href="tel:+919686929970"> +91 96869 29970 </a></p>
            <p><i className="fa-solid fa-clock"></i> {" "} Mon - Sat : 09:00 AM - 05:00 PM</p>
          
          <div className="admission-banner">
            <h3>Admissions Open 2025–26</h3>

            <div className="admission-buttons">
              <button className="apply-btn" onClick={() => window.location.href = "/admission"}>
                Apply Now
              </button>
              
            </div>
          </div>
          </div>

          {/* Right Column (Form) */}
          <div className="contact-form">
            <h2>Send Message</h2>

            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Your Name" required/>
              <input type="email" name="email" placeholder="Email Address" required/>
              <input type="tel" name="mobile" placeholder="Mobile Number" required/>
              <textarea name="message" placeholder="Your Message" required></textarea>

              <button type="submit">Submit</button>
            </form>
          </div>

        </div>

        {/* Bottom Map */}
        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3069.1821928233376!2d75.77944350000001!3d13.2723967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbad6e6c98b5d5b%3A0x8c6026a713b6bd02!2sSri%20Sai%20Angels%20Pre%20University%20College-%20Science%20and%20Commerce!5e1!3m2!1sen!2sin!4v1774682830030!5m2!1sen!2sin"
            title="map"
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </>
  );
}
