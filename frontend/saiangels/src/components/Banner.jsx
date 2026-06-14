import { useEffect, useState } from "react";
import axios from "axios";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = "http://localhost:3000/api/banner";

  // ================= IMAGE HELPER =================
  const getImageUrl = (img) => {
    if (!img || img === "undefined" || img === "null") {
      return "https://via.placeholder.com/1200x450?text=No+Image";
    }

    return img; // Cloudinary URL
  };

  // ================= FETCH =================
  const fetchBanners = async () => {
    try {
      const res = await axios.get(API);
      setBanners(res.data || []);
    } catch (err) {
      console.error("Banner fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // ================= LOADING =================
  if (loading) {
    return (
      <p className="text-center">
        Loading banners...
      </p>
    );
  }

  if (!banners.length) {
    return (
      <p className="text-center">
        No banners found
      </p>
    );
  }

  // ================= UI =================
  return (
    <div
      id="bannerCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="3000"
    >
      {/* Indicators */}
      <div className="carousel-indicators">
        {banners.map((_, i) => (
          <button
            key={i}
            type="button"
            data-bs-target="#bannerCarousel"
            data-bs-slide-to={i}
            className={
              i === 0 ? "active" : ""
            }
          />
        ))}
      </div>

      {/* Banner Slides */}
      <div className="carousel-inner">
        {banners.map((banner, i) => (
          <div
            key={
              banner.id ||
              banner._id ||
              i
            }
            className={`carousel-item ${
              i === 0 ? "active" : ""
            }`}
          >
            <img
              src={getImageUrl(
                banner.image
              )}
              alt={
                banner.title ||
                "banner"
              }
              className="d-block w-100"
              style={{
                height: "450px",
                objectFit: "cover",
              }}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/1200x450?text=No+Image";
              }}
            />

            <div className="carousel-caption bg-dark bg-opacity-50 rounded p-2">
              <h3>
                {banner.title || ""}
              </h3>
              <p>
                {banner.description ||
                  ""}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Show controls only if multiple banners */}
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