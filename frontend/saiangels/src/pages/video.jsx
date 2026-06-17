import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/video.css";

const API = "https://sai-angels-college.onrender.com/api";

export default function Video() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${API}/videos`);
      setVideos(res.data || []);
    } catch (err) {
      console.error("Error fetching videos:", err);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  // LOADING STATE
  if (loading) {
    return (
      <p className="text-center">
        Loading videos...
      </p>
    );
  }

  return (
    <div className="video-page container">

      {/* HEADER */}
      <div className="video-header">
        <h1>Video Gallery</h1>
        <div className="underline"></div>
      </div>

      {/* GRID */}
      <div className="video-grid">

        {videos.length === 0 ? (
          <p className="text-center">
            No videos available
          </p>
        ) : (
          videos.map((video) => (
            <div key={video._id} className="video-card">

              {/* YOUTUBE EMBED */}
              <div className="video-frame">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* CONTENT */}
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
