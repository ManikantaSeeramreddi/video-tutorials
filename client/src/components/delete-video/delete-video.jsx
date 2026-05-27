
import API from "../../api";
import { useEffect, useState } from "react";
import { Link,  useNavigate, useParams } from "react-router-dom";


export function DeleteVideo(){
    const { id } = useParams();
    const navigate=useNavigate();
    const [video, setVideo] = useState(null);
    useEffect(()=>{
        API.get(`/videos/${id}`)
        .then((response)=>{
            setVideo(response.data)
        })
    },[id]);
    async function handleDeleteClick(){
        await API.delete(`/deletevideo/${id}`)
        alert('video deleted')
        navigate('/admin-home')
    }
    return(
        <div className="container-fluid py-3 py-md-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-2 mb-3">
              <div>
                <h2 className="mb-1">Delete Video</h2>
                <div className="text-muted">This action can’t be undone.</div>
              </div>
              <Link to="/admin-home" className="btn btn-outline-light">← Back</Link>
            </div>

            <div className="card border-0 shadow-sm" style={{ background: "rgba(255,255,255,0.96)", borderRadius: 16 }}>
              <div className="card-body p-3 p-md-4">
                {!video ? (
                  <div className="d-flex justify-content-center py-4">
                    <div className="text-center">
                      <div className="spinner-border text-primary" role="status" />
                      <div className="mt-3 text-muted">Loading video…</div>
                    </div>
                  </div>
                ) : (
                  <>
                    <h5 className="mb-3">Are you sure you want to delete “{video.Title}”?</h5>
                    <div className="ratio ratio-16x9 rounded-4 overflow-hidden bg-dark mb-3">
                      <iframe
                        title={`Preview of ${video.Title}`}
                        src={video.Url}
                        style={{ border: "none" }}
                        allowFullScreen
                      ></iframe>
                    </div>

                    <div className="d-flex flex-column flex-sm-row gap-2">
                      <button className="btn btn-danger" onClick={handleDeleteClick}>
                        Yes, delete
                      </button>
                      <Link to='/admin-home' className="btn btn-outline-secondary" >
                        Cancel
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
        </div>
    )
}