import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/video.css";

export default function Video() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/videos");
      setVideos(res.data);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  return (
    <div className="video-page container">
      {/* Header */}
      <div className="video-header">
        <h1>Video Gallery</h1>
        <div className="underline"></div>
      </div>

      {/* Grid */}
      <div className="video-grid">
        {videos.length === 0 ? (
          <p className="text-center">No videos available</p>
        ) : (
          videos.map((video) => (
            <div key={video._id} className="video-card">
              
              {/* Thumbnail */}
              <div className="video-frame">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Content */}
              <div className="video-content">
                <p className="meta">📅 {video.date}</p>
                <h3>{video.title}</h3>

                <a
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="watch-btn">
                    Watch Video ▶
                  </button>
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}