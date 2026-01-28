import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function AdminHome() {
  const [videos, setVideos] = useState([]);

  function LoadVideos() {
    axios.get("http://127.0.0.1:5000/videos").then((response) => {
      setVideos(response.data);
    });
  }

  useEffect(() => {
    LoadVideos();
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#f1f1f1",
        overflowY: "auto",
      }}
    >
      {/* TOP BAR */}
      <div
        style={{
          width: "100%",
          height: "70px",
          background: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 30px",
          boxShadow: "0 3px 15px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <h2 className="fw-bold m-0">📊 Admin Dashboard</h2>

        <Link
          to="/add-video"
          className="btn btn-success"
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          + Add New Video
        </Link>
      </div>

      {/* MAIN CONTENT */}
      <div
        style={{
          padding: "30px",
          maxWidth: "100%",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            animation: "fadeIn 0.6s ease",
            width: "100%",
          }}
        >
          <table
            className="table table-hover"
            style={{ verticalAlign: "middle", width: "100%" }}
          >
            <thead className="table-dark">
              <tr>
                <th style={{ width: "30%" }}>Title</th>
                <th style={{ width: "50%" }}>Preview</th>
                <th style={{ width: "20%" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {videos.map((video) => (
                <tr key={video.VideoId} style={{ transition: "0.3s" }}>
                  <td className="fw-bold">{video.Title}</td>

                  <td>
                    <div
                      style={{
                        position: "relative",
                        width: "500px",
                        height: "250px",
                        overflow: "hidden",
                        borderRadius: "12px",
                        boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
                      }}
                    >
                      <iframe
                        src={video.Url}
                        style={{
                          width: "100%",
                          height: "100%",
                          border: "none",
                        }}
                        allowFullScreen
                      ></iframe>
                    </div>
                  </td>

                  <td>
                    <Link
                      to={`/view-video/${video.VideoId}`}
                      className="btn btn-primary btn-sm me-2"
                      style={{ borderRadius: "8px" }}
                    >
                      <i className="bi bi-eye"></i>
                    </Link>

                    <Link
                      to={`/edit-video/${video.VideoId}`}
                      className="btn btn-warning btn-sm me-2"
                      style={{ borderRadius: "8px" }}
                    >
                      <i className="bi bi-pen-fill"></i>
                    </Link>

                    <Link
                      to={`/delete-video/${video.VideoId}`}
                      className="btn btn-danger btn-sm"
                      style={{ borderRadius: "8px" }}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {videos.length === 0 && (
            <p className="text-center text-muted mt-3">No videos found...</p>
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
