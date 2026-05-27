import API from "../../api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"


export function ViewVideo(){
    const { id } = useParams();
    const [video, setVideo] = useState(null);
    useEffect(()=>{
        API.get(`/videos/${id}`)
        .then(response=>{
            setVideo(response.data)
        })
    },[id])
    return(
        <div className="container-fluid py-3 py-md-4">
            {!video ? (
              <div className="d-flex justify-content-center py-5">
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status" />
                  <div className="mt-3 text-muted">Loading video…</div>
                </div>
              </div>
            ) : (
              <>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-3">
                  <div>
                    <h2 className="mb-1">{video.Title}</h2>
                    <div className="text-muted">Video ID: {video.VideoId}</div>
                  </div>
                  <Link to="/admin-home" className="btn btn-outline-light">
                    ← Back to Dashboard
                  </Link>
                </div>

                <div className="ratio ratio-16x9 rounded-4 overflow-hidden shadow-sm bg-dark">
                  <iframe
                    title={`Preview of ${video.Title}`}
                    src={video.Url}
                    style={{ border: "none" }}
                    allowFullScreen
                  ></iframe>
                </div>
              </>
            )}
        </div>
    )
}