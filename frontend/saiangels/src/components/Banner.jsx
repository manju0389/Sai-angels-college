import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://sai-angels-college.onrender.com/api";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(`${API}/banner`);
        setBanners(res.data || []);
      } catch (err) {
        console.error("Banner fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  /* ==========================================
     AUTO SLIDER
  ========================================== */

  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === banners.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [banners.length]);


  if (loading) {
    return (
      <div className="banner-loading">
        Loading banners...
      </div>
    );
  }

  if (!banners.length) {
    return (
      <div className="banner-loading">
        No banners found
      </div>
    );
  }


  return (
    <div className="banner-carousel">

      {/* ======================================
          BANNERS
      ====================================== */}

      <div className="banner-wrapper">

        {banners.map((banner, index) => (

          <div
            key={banner.id || index}
            className={`banner-slide ${
              index === current ? "active" : ""
            }`}
          >

            <img
              src={banner.image}
              alt={banner.title || "Banner"}
              className="banner-image"
            />

            {/* Caption */}
            {banner.title && (
              <div className="banner-caption">
                <h3>{banner.title}</h3>

                {banner.description && (
                  <p>{banner.description}</p>
                )}
              </div>
            )}

          </div>

        ))}

      </div>


      {/* ======================================
          DOTS
      ====================================== */}

      {banners.length > 1 && (
        <div className="banner-indicators">

          {banners.map((_, index) => (

            <button
              key={index}
              type="button"
              className={
                index === current ? "active" : ""
              }
              onClick={() => setCurrent(index)}
              aria-label={`Go to banner ${index + 1}`}
            />

          ))}

        </div>
      )}

    </div>
  );
};

export default Banner;
