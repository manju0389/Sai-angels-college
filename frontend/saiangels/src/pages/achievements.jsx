import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/achievements.css";

const API = "https://sai-angels-college.onrender.com/api";

export default function Achievements() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await axios.get(`${API}/achievements`);
        setGroupedData(res.data || {});
      } catch (err) {
        console.error("Achievements fetch error:", err);
      }
    };

    fetchAchievements();
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Sort years descending
  const years = Object.keys(groupedData).sort((a, b) => {
    const aYear = parseInt(a.split("-")[0], 10);
    const bYear = parseInt(b.split("-")[0], 10);
    return bYear - aYear;
  });

  return (
    <div className="accordion">
      <div className="video-header">
        <h1>Achievements</h1>
        <div className="underline"></div>
      </div>

      {years.map((year, index) => (
        <div key={year} className="accordion-item">
          <button
            className="accordion-header"
            onClick={() => toggleAccordion(index)}
          >
            Results {year}
          </button>

          <div
            className={`accordion-content ${
              activeIndex === index ? "active" : ""
            }`}
          >
            {groupedData[year]?.map((item) => (
              <img
                key={item.id}
                src={item.url}
                alt=""
                style={{ width: "100%", marginBottom: "10px" }}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/600x400?text=No+Image";
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
