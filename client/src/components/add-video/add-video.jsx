import API from "../../api";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export function AddVideo() {
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
  }, []);

  const formik = useFormik({
    initialValues: {
      VideoId: 0,
      Title: "",
      Url: "",
      Likes: 0,
      Dislikes: 0,
      Views: 0,
      CategoryId: 0,
    },
    onSubmit: (values) => {
      API.post("/addvideo", values)
        .then(() => alert("Video Added Successfully!"))
        .catch((err) => console.error(err));
    },
  });

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
      }}
    >
      {/* CLEAN GLASS CARD */}
      <form
        onSubmit={formik.handleSubmit}
        style={{
          width: "100%",
          maxWidth: "680px",
          padding: "22px",
          borderRadius: "20px",
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.25)",
          animation: "fadeSlideUp 1s ease forwards",
          color: "white",
          fontWeight: "bold",
        }}
      >
        <h2
          className="text-center"
          style={{
            marginBottom: "25px",
            letterSpacing: "1px",
            fontWeight: "bold",
          }}
        >
          Add New Video
        </h2>

        {/* INPUT FIELDS */}
        {[
          ["Video ID", "VideoId", "number"],
          ["Title", "Title", "text"],
          ["Video URL", "Url", "text"],
          ["Likes", "Likes", "number"],
          ["Dislikes", "Dislikes", "number"],
          ["Views", "Views", "number"],
          ["Category ID", "CategoryId", "number"],
        ].map(([label, name, type]) => (
          <div className="mb-3" key={name}>
            <label className="form-label" style={{ fontWeight: "bold" }}>
              {label}
            </label>
            <input
              type={type}
              name={name}
              className="form-control"
              onChange={formik.handleChange}
              style={{
                background: "rgba(255,255,255,0.25)",
                border: "1px solid rgba(255,255,255,0.4)",
                color: "white",
                fontWeight: "bold",
                height: "35px",
                backdropFilter: "blur(4px)",
              }}
            />
          </div>
        ))}

        {/* CLEAN BUTTON (NO NEON) */}
        <button
          className="btn w-100"
          type="submit"
          style={{
            background: "white",
            color: "black",
            fontWeight: "bold",
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#e0e0e0")}
          onMouseOut={(e) => (e.target.style.background = "white")}
        >
          Add Video
        </button>

        <div className="text-center mt-3">
          <Link to="/admin-home" style={{ color: "white", fontWeight: "bold" }}>
            ← Back to Home
          </Link>
        </div>
      </form>

      {/* ANIMATION */}
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
