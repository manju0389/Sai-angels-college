import {
  FaTrophy, FaBook, FaHandsHelping, FaLightbulb,
  FaStar, FaGraduationCap, FaBrain, FaAtom
} from "react-icons/fa";

export default function WhySection() {

  const features = [
    { icon: <FaTrophy />, text: "Excellent Sports Infrastructure" },
    { icon: <FaStar />, text: "Ideal Student-Teacher Ratio" },
    { icon: <FaBook />, text: "Engaging Curriculum" },
    { icon: <FaGraduationCap />, text: "Value-Based Education" },
    { icon: <FaHandsHelping />, text: "Exceptional Care" },
    { icon: <FaBrain />, text: "Life Skills Sessions" },
    { icon: <FaLightbulb />, text: "Student Exchange Program" },
    { icon: <FaAtom />, text: "Experiential Learning" },
  ];

  return (
    <div className="container why-section">
          <div className="row">

            <div className="col-lg-4 left-panel">
              <h2>Why Sai Angels PU College</h2>
              <p>
                Sai Angels PU College was founded with a vision to be one of the leading 
                independent college in Chikkamagaluru to provide a stimulating all-round education.
              </p>
            </div>

            <div className="col-lg-8 right-panel">
              <div className="row">
                {features.map((item, index) => (
                  <div key={index} className="col-md-6 col-12 feature-box">
                    <div className="icon">{item.icon}</div>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
  );
}