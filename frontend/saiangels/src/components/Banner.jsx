import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://sai-angels-college.onrender.com/api";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p className="text-center">Loading banners...</p>;
  }

  if (!banners.length) {
    return <p className="text-center">No banners found</p>;
  }

  return (
    <div
      id="bannerCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="3000"
    >
      <div className="carousel-indicators">
        {banners.map((_, i) => (
          <button
            key={i}
            type="button"
            data-bs-target="#bannerCarousel"
            data-bs-slide-to={i}
            className={i === 0 ? "active" : ""}
          />
        ))}
      </div>

      <div className="carousel-inner">
        {banners.map((banner, i) => (
          <div
            key={banner.id || i}
            className={`carousel-item ${i === 0 ? "active" : ""}`}
          >
            <img
              src={banner.image}
              alt={banner.title || "banner"}
              className="d-block w-100"
              style={{ height: "450px", objectFit: "cover" }}
            />

            <div className="carousel-caption bg-dark bg-opacity-50 rounded p-2">
              <h3>{banner.title}</h3>
              <p>{banner.description}</p>
            </div>
          </div>
        ))}
      </div>

      {banners.length > 1 && (
        <>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#bannerCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" />
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#bannerCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" />
          </button>
        </>
      )}
    </div>
  );
};

export default Banner;
