import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../assets/css/gallery.css";

const API = "https://sai-angels-college.onrender.com/api";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // ---------------- FETCH IMAGES ----------------
  const fetchImages = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/gallery`);
      setImages(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Images fetch error:", err);
      setImages([]);
    }
  }, []);

  // ---------------- EFFECT ----------------
  useEffect(() => {
    fetchImages();

    const interval = setInterval(fetchImages, 5000);
    return () => clearInterval(interval);
  }, [fetchImages]);

  // ---------------- NAVIGATION ----------------
  const handleNext = (e) => {
    e.stopPropagation();
    if (!images.length) return;

    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (!images.length) return;

    setSelectedIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // ---------------- CURRENT IMAGE ----------------
  const currentImage =
    selectedIndex !== null && images[selectedIndex]
      ? images[selectedIndex]
      : null;

  return (
    <div className="container py-4">
      <div className="video-header">
        <h1>Our Gallery</h1>
        <div className="underline"></div>
      </div>

      {/* GRID */}
      <div className="row">
        {images.map((img, index) => (
          <div key={img.id || index} className="col-md-3 mb-4">
            <div className="gallery-item">

              {img.type === "video" ? (
                <video
                  src={img.url}
                  className="img-fluid"
                  muted
                  onClick={() => setSelectedIndex(index)}
                />
              ) : (
                <img
                  src={img.url}
                  alt="gallery"
                  className="img-fluid"
                  onClick={() => setSelectedIndex(index)}
                />
              )}

              <p
                className="thumb-caption"
                onClick={() => setSelectedIndex(index)}
              >
                {img.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedIndex !== null && currentImage && (
        <div
          className="custom-modal"
          onClick={() => setSelectedIndex(null)}
        >
          {/* CLOSE BUTTON */}
          <span
            className="close-btn"
            onClick={() => setSelectedIndex(null)}
          >
            &times;
          </span>

          {/* PREV BUTTON */}
          <button className="nav-btn prev-btn" onClick={handlePrev}>
            ❮
          </button>

          {/* CONTENT */}
          <div
            className="modal-content-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            {currentImage.type === "video" ? (
              <video
                src={currentImage.url}
                controls
                autoPlay
                className="modal-img"
              />
            ) : (
              <img
                src={currentImage.url}
                alt="popup"
                className="modal-img"
              />
            )}

            <p className="caption">{currentImage.caption}</p>
          </div>

          {/* NEXT BUTTON */}
          <button className="nav-btn next-btn" onClick={handleNext}>
            ❯
          </button>
        </div>
      )}
    </div>
  );
}
