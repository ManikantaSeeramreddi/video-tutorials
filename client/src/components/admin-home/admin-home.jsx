import API from "../../api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function AdminHome() {
  const [videos, setVideos] = useState([]);

  function LoadVideos() {
    API.get("/videos").then((response) => {
      setVideos(response.data);
    });
  }

  useEffect(() => {
    LoadVideos();
  }, []);

  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      {/* TOP BAR */}
      <div
        style={{
          width: "100%",
          minHeight: "70px",
          background: "rgba(255,255,255,0.96)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 16px",
          boxShadow: "0 3px 15px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 10,
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <h2 className="fw-bold m-0" style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)" }}>
          📊 Admin Dashboard
        </h2>

        <Link
          to="/add-video"
          className="btn btn-success"
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            fontWeight: "bold",
            whiteSpace: "nowrap",
          }}
        >
          + Add New Video
        </Link>
      </div>

      {/* MAIN CONTENT */}
      <div
        style={{
          padding: "16px",
          maxWidth: "100%",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.96)",
            padding: "14px",
            borderRadius: "15px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            animation: "fadeIn 0.6s ease",
            width: "100%",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th style={{ minWidth: 200 }}>Title</th>
                  <th style={{ minWidth: 320 }}>Preview</th>
                  <th style={{ width: 140 }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {videos.map((video) => (
                  <tr key={video.VideoId} style={{ transition: "0.3s" }}>
                    <td className="fw-bold">{video.Title}</td>

                    <td>
                      <div
                        className="ratio ratio-16x9"
                        style={{
                          maxWidth: 520,
                          borderRadius: 12,
                          overflow: "hidden",
                          boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
                          background: "#000",
                        }}
                      >
                        <iframe
                          title={`Preview of ${video.Title}`}
                          src={video.Url}
                          style={{ border: "none" }}
                          allowFullScreen
                        ></iframe>
                      </div>
                    </td>

                    <td>
                      <div className="d-flex gap-2">
                        <Link
                          to={`/view-video/${video.VideoId}`}
                          className="btn btn-primary btn-sm"
                          style={{ borderRadius: "8px" }}
                          aria-label="View video"
                        >
                          <i className="bi bi-eye"></i>
                        </Link>

                        <Link
                          to={`/edit-video/${video.VideoId}`}
                          className="btn btn-warning btn-sm"
                          style={{ borderRadius: "8px" }}
                          aria-label="Edit video"
                        >
                          <i className="bi bi-pen-fill"></i>
                        </Link>

                        <Link
                          to={`/delete-video/${video.VideoId}`}
                          className="btn btn-danger btn-sm"
                          style={{ borderRadius: "8px" }}
                          aria-label="Delete video"
                        >
                          <i className="bi bi-trash-fill"></i>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
