import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Register() {
  const [user, setUser] = useState({
    UserId: "",
    UserName: "",
    Password: "",
    Email: "",
    Mobile: "",
  });
  const [userError, setUserError] = useState("");
  const navigate = useNavigate("");

  // Handlers
  function handleIdChange(e) {
    setUser({ ...user, UserId: e.target.value });

    axios({
      method: "get",
      url: "http://127.0.0.1:5000/users",
    }).then((response) => {
      const exists = response.data.some((u) => u.UserId === e.target.value);
      setUserError(exists ? "UserId already taken. Try another." : "UserId available.");
    });
  }

  function handleChange(e, field) {
    setUser({ ...user, [field]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://127.0.0.1:5000/registeruser",
      data: user,
    }).then(() => {
      alert("Registered Successfully!");
      navigate("/login");
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
          "url('https://images.unsplash.com/photo-1503264116251-35a269479413')",
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

      {/* Register Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          width: "600px",      // Increased width
          padding: "35px",     // Increased padding
          gap: "19px",         // Increased gap
          color: "white",
          background: "rgba(0,0,0,0.5)",
          borderRadius: "20px", // Slightly larger radius
          animation: "fadeSlide 1s ease",
        }}
      >
        <h2 className="text-center mb-3 fw-bold">Register User</h2>

        {/* UserId */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="userid">UserId</label>
          <input
            id="userid"
            type="text"
            className="form-control"
            onChange={handleIdChange}
            placeholder="Enter your UserId"
            style={{ borderRadius: "12px", padding: "14px" }}
          />
          <small style={{ color: "yellow", marginTop: "5px" }}>{userError}</small>
        </div>

        {/* UserName */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="username">UserName</label>
          <input
            id="username"
            type="text"
            className="form-control"
            onChange={(e) => handleChange(e, "UserName")}
            placeholder="Enter your UserName"
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
            onChange={(e) => handleChange(e, "Password")}
            placeholder="Enter your Password"
            style={{ borderRadius: "12px", padding: "14px" }}
          />
        </div>

        {/* Email */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="form-control"
            onChange={(e) => handleChange(e, "Email")}
            placeholder="Enter your Email"
            style={{ borderRadius: "12px", padding: "14px" }}
          />
        </div>

        {/* Mobile */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="mobile">Mobile</label>
          <input
            id="mobile"
            type="text"
            className="form-control"
            onChange={(e) => handleChange(e, "Mobile")}
            placeholder="Enter your Mobile Number"
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
              "linear-gradient(135deg, #4e8cff, #7a5cff, #b84fff)",
            border: "none",
          }}
        >
          Register
        </button>

        {/* Login Link */}
        <div className="text-center">
          <p>
            Already have an account?         <Link className="text-blue text-decoration-none" to="/login">Login</Link>
          </p>
        </div>
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
