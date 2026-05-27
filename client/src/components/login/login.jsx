import API from "../../api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const [user, setUser] = useState({ UserId: "", Password: "" });
  const [Error, setError] = useState("");
  const navigate = useNavigate("");

  function handleIdChange(e) {
    setUser({ UserId: e.target.value, Password: user.Password });
  }

  function handlePasswordChange(e) {
    setUser({ UserId: user.UserId, Password: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    API.get("/users").then((response) => {
      let found = false;
      for (var vuser of response.data) {
        if (vuser.UserId === user.UserId && vuser.Password === user.Password) {
          found = true;
          navigate("/videos");
          break;
        }
      }
      if (!found) setError("Invalid Credentials..!");
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
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
        }}
      ></div>

      {/* Login Form Box */}
      <form
        onSubmit={handleSubmit}
        style={{
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          width: "500px", // Bigger box
          padding: "40px",
          gap: "25px",
          color: "white",
          background: "rgba(0,0,0,0.5)", // semi-transparent background
          borderRadius: "20px",
          animation: "fadeSlide 1s ease",
        }}
      >
        <h2 className="text-center mb-3 fw-bold">User Login</h2>

        {/* UserId Field */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="userid" style={{ marginBottom: "5px" }}>
            UserId
          </label>
          <input
            id="userid"
            type="text"
            className="form-control"
            onChange={handleIdChange}
            placeholder="Enter your UserId"
            style={{ borderRadius: "10px", padding: "12px" }}
          />
        </div>

        {/* Password Field */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="password" style={{ marginBottom: "5px" }}>
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            onChange={handlePasswordChange}
            placeholder="Enter your Password"
            style={{ borderRadius: "10px", padding: "12px" }}
          />
        </div>

        {/* Login Button */}
        <button
          className="btn btn-primary w-100"
          style={{
            borderRadius: "10px",
            padding: "12px",
            background:
              "linear-gradient(135deg, #4e8cff, #7a5cff, #b84fff)",
            border: "none",
          }}
        >
          Login
        </button>

        {/* Register Link */}
        <div className="text-center ">
            <p>
                New user?
                     <Link className="text-blue text-decoration-none" to="/register">
                   Register
          </Link>
            </p>
          
        </div>

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
