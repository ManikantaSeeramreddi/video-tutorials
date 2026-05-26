import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export function EditVideo() {
  const [videos, setVideos] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/videos/${id}`)
      .then((res) => {
        let v = res.data;
        if (Array.isArray(v)) v = v[0];

        setVideos({
          VideoId: v.VideoId || v.videoId || "",
          Title: v.Title || v.title || "",
          Url: v.Url || v.url || "",
          Likes: v.Likes || v.likes || "",
          Dislikes: v.Dislikes || v.dislikes || "",
          Views: v.Views || v.views || "",
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  const formik = useFormik({
    initialValues: videos || {
      VideoId: "",
      Title: "",
      Url: "",
      Likes: "",
      Dislikes: "",
      Views: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      axios
        .put(`http://127.0.0.1:5000/updatevideo/${id}`, values)
        .then(() => {
          alert("Video Updated Successfully!");
          navigate("/admin-home");
        })
        .catch((err) => console.error(err));
    },
  });

  if (!videos) {
    return (
      <h2
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "40px",
          fontSize: "18px",
        }}
      >
        Loading video details...
      </h2>
    );
  }

  return (
    <div style={styles.container}>
      <form onSubmit={formik.handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Edit Video</h2>

        {[
          ["Video ID", "VideoId", "number"],
          ["Title", "Title", "text"],
          ["Video URL", "Url", "text"],
          ["Likes", "Likes", "number"],
          ["Dislikes", "Dislikes", "number"],
          ["Views", "Views", "number"],
        ].map(([label, name, type]) => (
          <div style={styles.inputContainer} key={name}>
            <label style={styles.label}>{label}</label>
            <input
              type={type}
              name={name}
              value={formik.values[name] ?? ""}
              onChange={formik.handleChange}
              style={styles.input}
            />
          </div>
        ))}

        <button type="submit" style={styles.btn}>
          Update Video
        </button>

        <div style={{ textAlign: "center", marginTop: 15 }}>
          <Link to="/admin-home" style={styles.backLink}>
            ← Back to Home
          </Link>
        </div>
      </form>
    </div>
  );
}

/* ------------------------ STYLES ------------------------ */

const styles = {
  container: {
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundImage:
      "linear-gradient(to bottom right, rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  form: {
    width: "100%",
    maxWidth: "500px",
    padding: "25px",
    borderRadius: "15px",
    backdropFilter: "blur(12px)",
    background: "rgba(255,255,255,0.14)",
    border: "1px solid rgba(255,255,255,0.25)",
    color: "white",
  },

  heading: {
    textAlign: "center",
    fontSize: "26px",
    marginBottom: "20px",
    fontWeight: "bold",
  },

  inputContainer: {
    marginBottom: "14px",
  },

  label: {
    display: "block",
    marginBottom: "6px",
    fontSize: "15px",
    fontWeight: "bold",
  },

  input: {
    width: "100%",
    height: "48px",
    paddingLeft: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.35)",
    background: "rgba(255,255,255,0.25)",
    color: "white",
    backdropFilter: "blur(4px)",
  },

  btn: {
    width: "100%",
    background: "white",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    color: "black",
    fontWeight: "bold",
    fontSize: "18px",
    marginTop: "10px",
    cursor: "pointer",
  },

  backLink: {
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    textDecoration: "none",
  },
};
