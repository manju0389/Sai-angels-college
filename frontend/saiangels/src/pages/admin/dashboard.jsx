import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Admin Dashboard</h1>

      <div className="row g-4">
        <div className="col-md-6">
          <Link to="/admin/home" className="text-decoration-none">
            <div className="card text-white bg-primary text-center p-4 shadow">
              <h5>Manage Home</h5>
            </div>
          </Link>
        </div>

        <div className="col-md-6">
          <Link to="/admin/achievements" className="text-decoration-none">
            <div className="card text-white bg-success text-center p-4 shadow">
              <h5>Manage Achievements</h5>
            </div>
          </Link>
        </div>

        <div className="col-md-6">
          <Link to="/admin/gallery" className="text-decoration-none">
            <div className="card text-white bg-warning text-center p-4 shadow">
              <h5>Manage Gallery</h5>
            </div>
          </Link>
        </div>

        <div className="col-md-6">
          <Link to="/admin/videos" className="text-decoration-none">
            <div className="card text-white bg-danger text-center p-4 shadow">
              <h5>Manage Videos</h5>
            </div>
          </Link>
        </div>

        <div className="col-md-6">
          <Link to="/admin/about" className="text-decoration-none">
            <div className="card text-white bg-dark text-center p-4 shadow">
              <h5>Manage Faculty</h5>
            </div>
          </Link>
        </div>


      </div>
    </div>
  );
}