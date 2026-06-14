import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/gallery.css";

const API = "http://localhost:3000/api/gallery";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    fetchImages();

    // Optional: poll every 5 seconds to auto-refresh
    const interval = setInterval(fetchImages, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get(API);
      setImages(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const currentImage = images[selectedIndex];

  return (
    <div className="container py-4">
      <div className="video-header">
        <h1>Our Gallery</h1>
        <div className="underline"></div>
      </div>

      {/* Grid */}
      <div className="row">
        {images.map((img, index) => (
          <div key={img.id} className="col-md-3 mb-4">
            <div className="gallery-item">
              {img.type === "video" ? (
                <video
                  src={img.url}
                  className="img-fluid"
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

      {/* Modal */}
      {selectedIndex !== null && currentImage && (
        <div
          className="custom-modal"
          onClick={() => setSelectedIndex(null)}
        >
          <span className="close-btn">&times;</span>

          <button className="nav-btn prev-btn" onClick={handlePrev}>
            ❮
          </button>

          <div
            className="modal-content-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            {currentImage.type === "video" ? (
              <video src={currentImage.url} controls className="modal-img" />
            ) : (
              <img src={currentImage.url} alt="popup" className="modal-img" />
            )}

            <p className="caption">{currentImage.caption}</p>
          </div>

          <button className="nav-btn next-btn" onClick={handleNext}>
            ❯
          </button>
        </div>
      )}
    </div>
  );
}