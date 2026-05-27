import { Link } from "react-router-dom";

export function Unregister() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        backgroundImage:
          "url('https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg')",
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
          background: "linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3))",
        }}
      ></div>

      {/* Center Card */}
      <div
        style={{
          zIndex: 2,
          background: "rgba(0,0,0,0.5)",
          padding: "24px",
          borderRadius: "20px",
          textAlign: "center",
          color: "white",
          width: "100%",
          maxWidth: "520px",
          animation: "fadeSlide 1s ease",
          margin: "16px",
        }}
      >
        <h2 className="mb-3 fw-bold">Account Not Found</h2>
        <p>We couldn't find your account. Please register to continue.</p>
        <Link
          to="/register"
          style={{
            display: "inline-block",
            marginTop: "20px",
            padding: "12px 25px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #4e8cff, #b84fff)",
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Register
        </Link>
      </div>

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
