export default function CTASection() {
  return (
    <div className="contact-top container">

          <div className="contact-info">
            <div className="admission-banner p-0">
              <h2>Admissions Open 2025–26</h2>
              <button className="apply-btn" onClick={() => window.location.href = "/admission"}>
                Apply Now
              </button>
            </div>
          </div>

          <div className="contact-info">
            <div className="admission-banner p-0">
              <h2>Testimonials</h2>
              <button className="apply-btn" onClick={() => window.open("https://maps.app.goo.gl/QA8jkm2tronijcQYA", "_blank", "noopener,noreferrer")}>
                  Click to read our Testimonials
              </button>
            </div>
          </div>

        </div>
  );
}