import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/gallery.css";

const API = "http://localhost:3000/api/gallery";

export default function HomeGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get(API);

      // Take only last 4 uploads
      const firstFour = res.data.slice(-4).reverse();

      setImages(firstFour);
    } catch (err) {
      console.error(err);
    }
  };

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
            <div key={index} className="col-md-3 mb-4">
              <div className="gallery-item">
                {img.type === "video" ? (
                  <video src={img.url} className="img-fluid" controls />
                ) : (
                  <img src={img.url} alt={img.caption} className="img-fluid" />
                )}
                <p className="thumb-caption">{img.caption}</p>
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