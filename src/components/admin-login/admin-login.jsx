import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AdminLogin() {
  const [user, setUser] = useState({ UserId: "", Password: "" });
  const [Error, setError] = useState("");
  const navigate = useNavigate();

  // Handlers
  function handleIdChange(e) {
    setUser({ ...user, UserId: e.target.value });
  }

  function handlePasswordChange(e) {
    setUser({ ...user, Password: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios({
      method: "get",
      url: "http://127.0.0.1:5000/admin",
    }).then((response) => {
      const found = response.data.some(
        (vuser) =>
          vuser.UserId === user.UserId && vuser.Password === user.Password
      );
      if (found) {
        navigate("/admin-home");
      } else {
        setError("Invalid Credentials..!");
      }
    });
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url('https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
        }}
      ></div>

      {/* Admin Login Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          width: "500px",
          padding: "40px",
          gap: "20px",
          color: "white",
          background: "rgba(0,0,0,0.5)",
          borderRadius: "25px",
          animation: "fadeSlide 1s ease",
        }}
      >
        <h2 className="text-center mb-3 fw-bold">Admin Login</h2>

        {/* AdminId */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="adminid">AdminId</label>
          <input
            id="adminid"
            type="text"
            className="form-control"
            onChange={handleIdChange}
            placeholder="Enter your Admin Id"
            style={{ borderRadius: "12px", padding: "14px" }}
          />
        </div>

        {/* Password */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="form-control"
            onChange={handlePasswordChange}
            placeholder="Enter your Password"
            style={{ borderRadius: "12px", padding: "14px" }}
          />
        </div>

        {/* Submit Button */}
        <button
          className="btn btn-primary w-100"
          style={{
            borderRadius: "12px",
            padding: "14px",
            background:
              "linear-gradient(135deg, #ff4e50, #f9d423)",
            border: "none",
          }}
        >
          Login
        </button>

        {/* Error Message */}
        {Error && (
          <h5 className="text-warning text-center" style={{ marginTop: "10px" }}>
            {Error}
          </h5>
        )}
      </form>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes fadeSlide {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
