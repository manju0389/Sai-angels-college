import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/gallery.css";

const API = "https://sai-angels-college.onrender.com/api/gallery";

export default function HomeGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(API);

        // Take last 4 items safely
        const firstFour = (res.data || []).slice(-4).reverse();

        setImages(firstFour);
      } catch (err) {
        console.error("Gallery fetch error:", err);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="bg-dark text-white">
      <div className="container py-4">
        {/* Title */}
        <div className="video-header">
          <h1>Our Gallery</h1>
          <div className="underline"></div>
        </div>

        {/* Gallery Grid */}
        <div className="row">
          {images.map((img, index) => (
            <div key={img.id || index} className="col-md-3 mb-4">
              <div className="gallery-item">

                {/* IMAGE / VIDEO CHECK */}
                {img.type === "video" ? (
                  <video
                    src={img.url}
                    className="img-fluid"
                    controls
                  />
                ) : (
                  <img
                    src={img.url}
                    alt={img.caption || "gallery"}
                    className="img-fluid"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x200?text=No+Image";
                    }}
                  />
                )}

                <p className="thumb-caption">
                  {img.caption || ""}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <button
          className="apply-btn"
          onClick={() => (window.location.href = "/gallery")}
        >
          Click for more images
        </button>
      </div>
    </div>
  );
}
