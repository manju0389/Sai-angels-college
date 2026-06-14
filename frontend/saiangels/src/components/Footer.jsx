import { useEffect } from "react";

export default function Footer() {

  useEffect(() => {
    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = "https://embed.tawk.to/6a2c2537e6bf971c2d2d048d/1jqu72ol1";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");

    document.body.appendChild(s1);

    return () => {
      document.body.removeChild(s1);
    };
  }, []);

  return (
    <footer className="footer ">
      <div className="container">
        <div className="row">
        <div className="col-lg-4">
        {/* Logo Section */}
        <div className="footer-col logo-col">
          <h2 className="logo">Sri Sai Angels </h2>
          <p> PU College </p>
            <a href="/">
              <img src="/images/saiangels.webp" alt="My Image" />
            </a>
        </div>
        </div>

        <div className="col-lg-4">
        {/* Quick Links */}
        <div className="footer-col">
          <div className="row">
          <h3>QUICK LINKS</h3>
          <div className="col-lg-6">
          <div className="footer-content">
          <ul>
            <li> <i className="fas fa-angle-double-right"></i> <a href="/"> Home </a> </li>
            <li> <i className="fas fa-angle-double-right"></i> <a href="/about"> About Us </a></li>
            <li> <i className="fas fa-angle-double-right"></i> <a href="/achievements"> Achievements </a></li>
            <li> <i className="fas fa-angle-double-right"></i> <a href="/curriculum"> Curriculum </a></li>
          </ul>
          </div>
          </div>

          <div className="col-lg-6">
          <div className="footer-content">
          <ul>
            <li> <i className="fas fa-angle-double-right"></i> <a href="/admission"> Admission </a></li>
            <li> <i className="fas fa-angle-double-right"></i> <a href="/gallery"> Gallery </a></li>
            <li> <i className="fas fa-angle-double-right"></i> <a href="/video"> Video </a></li>
            <li> <i className="fas fa-angle-double-right"></i> <a href="/contactus"> Contactus </a></li>
          </ul>
          </div>
          </div>

        </div>
        </div>
        </div>

        <div className="col-lg-4">
        {/* Address */}
        <div className="footer-col">
          <div className="address">
          <h3>PU COLLEGE CAMPUS</h3>
            <p><i className="fa-solid fa-location"></i> {" "} Sirgaapura, Malalur post, Chikmagalur - 577133</p>
            <p><i className="fa-solid fa-envelope"></i>  {" "} <a href="mailto:principal.saiangelspucollege@gmail.com"> principal.saiangelspucollege@gmail.com </a></p>
            <p><i className="fa-solid fa-phone"></i> {" "} <a href="tel:+919535429881"> +91 95354 29881 </a>  / < a href="tel:+919686929970"> +91 96869 29970 </a></p>
        </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom container" >
        <p>Copyright © {new Date().getFullYear()} All rights reserved</p>

        <div className="social-icons">
          <span> <a href="https://www.facebook.com/Saiangelspuc/" target="_blank" rel="noopener noreferrer"> <i className="fa-brands fa-facebook"></i> </a></span>
          <span> <a href="https://www.youtube.com/@saiangelschikmagalur5459" target="_blank" rel="noopener noreferrer"> <i className="fa-brands fa-youtube"></i> </a></span>
          <span> <a href="https://www.instagram.com/saiangelspucollege/?hl=en" target="_blank" rel="noopener noreferrer"> <i className="fa-brands fa-instagram"></i> </a></span>
        </div>
      </div>
      </div>
      </div>

      	<div className="whatsapp-icon-bar">
          <a href="https://api.whatsapp.com/send?phone=919535429881" target="_blank" rel="noopener noreferrer">
            <span className="fa-brands fa-whatsapp"></span>
          </a>
        </div>

    </footer>
  );
}