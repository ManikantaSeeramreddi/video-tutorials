import API from "../../api";
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
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  // Handlers
  function handleIdChange(e) {
    const value = e.target.value;
    setUser({ ...user, UserId: value });

    API.get("/users")
      .then((response) => {
        const exists = response.data.some((u) => String(u.UserId) === value);
        setUserError(exists ? "UserId already taken. Try another." : "UserId available.");
      })
      .catch((err) => {
        console.error("User check failed", err);
        setUserError("Unable to verify UserId at this time.");
      });
  }

  function handleChange(e, field) {
    setUser({ ...user, [field]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    if (!user.UserId || !user.UserName || !user.Password) {
      setFormError("UserId, UserName, and Password are required.");
      return;
    }

    try {
      await API.post("/registeruser", user, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Registered Successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Registration failed", err);
      const message = err.response?.data?.error || err.response?.data?.message || "Registration failed.";
      setFormError(message);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
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
          width: "100%",
          maxWidth: "680px",
          padding: "24px",
          gap: "14px",
          color: "white",
          background: "rgba(0,0,0,0.5)",
          borderRadius: "20px", // Slightly larger radius
          animation: "fadeSlide 1s ease",
          margin: "16px",
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
            value={user.UserId}
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
            value={user.UserName}
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
            value={user.Password}
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
            value={user.Email}
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
            value={user.Mobile}
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
            padding: "12px 14px",
            background:
              "linear-gradient(135deg, #4e8cff, #7a5cff, #b84fff)",
            border: "none",
          }}
        >
          Register
        </button>
        {formError && (
          <div className="alert alert-danger mt-3" role="alert">
            {formError}
          </div>
        )}

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
