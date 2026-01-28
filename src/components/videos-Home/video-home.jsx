import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export function VideoHome() {
    const [videos, setVideo] = useState([]);
    const [filteredVideos, setFilteredVideos] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/videos')
            .then(res => {
                setVideo(res.data);
                setFilteredVideos(res.data);

                // Extract unique categories dynamically
                const uniqueCategories = Array.from(new Set(res.data.map(v => v.Category))).sort();
                setCategories(["All", ...uniqueCategories]);
            })
            .catch(err => console.error(err));
    }, []);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        if (category === "All") {
            setFilteredVideos(videos);
        } else {
            setFilteredVideos(videos.filter(v => v.Category === category));
        }
    };

    return (
        <div className="container-fluid my-4">
            <h2 className="text-center mb-4">Videos Home</h2>

            <div className="grid-container">
                {/* Sidebar for Desktop */}
                <div className="sidebar d-none d-md-block">
                    <h5 className="mb-3">Categories</h5>
                    <div className="d-flex flex-column">
                       {categories.map((res,idx) => (
                        <h1>{res.Title}</h1>   
                            
                        ))}
                    </div>
                </div>

                {/* Top Dropdown for Mobile */}
                <div className="d-block d-md-none mb-3">
                    <DropdownButton
                        id="dropdown-basic-button"
                        title={activeCategory}
                        variant="outline-primary"
                        className="w-100"
                    >
                        {categories.map((cat, idx) => (
                            <Dropdown.Item
                                key={idx}
                                active={activeCategory === cat}
                                onClick={() => handleCategoryClick(cat)}
                            >
                                {cat}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </div>

                {/* Video Grid */}
                <div className="videos">
                    <div className="row g-3">
                        {filteredVideos.map(video => (
                            <div key={video.VideoId} className="col-lg-3 col-md-4 col-sm-6">
                                <div className="card video-card h-100 shadow-sm">
                                    <div className="ratio ratio-16x9">
                                        <iframe
                                            src={video.Url}
                                            title={video.Title}
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                    <div className="card-body">
                                        <h6 className="card-title text-truncate" title={video.Title}>
                                            {video.Title}
                                        </h6>
                                        <p className="text-muted mb-0">Views: {video.Views || 0}</p>
                                        <p className="text-muted mb-0">Likes: {video.Likes || 0}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CSS */}
            <style>{`
                .grid-container {
                    display: grid;
                    grid-template-columns: 2fr 10fr;
                    gap: 20px;
                }

                @media (max-width: 768px) {
                    .grid-container {
                        grid-template-columns: 1fr;
                    }
                }

                .video-card {
                    border: none;
                    border-radius: 12px;
                    overflow: hidden;
                    background: linear-gradient(270deg, #ff7e5f, #feb47b, #86a8e7, #91eae4);
                    background-size: 800% 800%;
                    animation: gradientAnimation 10s ease infinite;
                    transition: transform 0.3s, box-shadow 0.3s;
                }

                .video-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 12px 20px rgba(0,0,0,0.3);
                }

                .card-title {
                    font-size: 0.95rem;
                    font-weight: 500;
                }

                .active-category {
                    background: linear-gradient(90deg, #ff7e5f, #feb47b, #86a8e7, #91eae4);
                    color: white;
                }

                @keyframes gradientAnimation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </div>
    );
}
