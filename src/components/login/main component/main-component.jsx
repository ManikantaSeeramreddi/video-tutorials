import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Maincomponent() {

    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    function Emailchange(e) {
        setEmail(e.target.value);
    }

    function Getstarted() {
        axios.get("http://127.0.0.1:5000/users")
            .then((response) => {
                const users = response.data;
                const userFound = users.some(user => user.Email === email);

                if (userFound) {
                    navigate('/login');
                } else {
                    navigate('/unregister');
                }
            })
            .catch(err => {
                console.error("Error fetching users:", err);
            });
    }

    return (
        <>
            <style>
                {`
                .hero-container {
                    height: 100vh;
                    width: 100%;
                    background:
                        linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)),
                        url("https://images.unsplash.com/photo-1519389950473-47ba0277781c")
                        center/cover no-repeat;
                    color: white;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                }

                .hero-title {
                    font-size: 3.3rem;
                    font-weight: 700;
                }

                .hero-subtitle {
                    font-size: 1.4rem;
                    opacity: 0.9;
                    margin-top: 10px;
                }

                .hero-input {
                    max-width: 430px;
                }

                .animate-fade {
                    animation: fadeIn 1.4s ease-in-out;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @media (max-width: 576px) {
                    .hero-title {
                        font-size: 2.2rem;
                    }

                    .hero-input {
                        width: 90%;
                    }
                }
                `}
            </style>

            <main className="hero-container animate-fade">
                <h1 className="hero-title">Learn and Design</h1>
                <p className="hero-subtitle">Watch videos, Learn technologies</p>

                <div className="input-group mt-4 mx-auto hero-input">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        onChange={Emailchange}
                        value={email}
                    />
                    <button
                        className="btn btn-danger btn-lg"
                        onClick={Getstarted}
                    >
                        Get started <span className="bi bi-chevron-right"></span>
                    </button>
                </div>
            </main>
        </>
    );
}
