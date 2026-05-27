import React, { useEffect, useState } from "react";
import API from "../../api";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export function VideoHome() {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const [videosRes, categoriesRes] = await Promise.all([
          API.get("/videos"),
          API.get("/categories"),
        ]);

        const videoData = Array.isArray(videosRes.data) ? videosRes.data : [];
        const categoryData = Array.isArray(categoriesRes.data)
          ? categoriesRes.data
          : [];

        setVideos(videoData);
        setFilteredVideos(videoData);

        const categoryList = [
          { CategoryId: 0, CategoryName: "All" },
          ...categoryData.map((cat) => ({
            CategoryId: Number(cat.CategoryId),
            CategoryName: cat.CategoryName || "Unknown",
          })),
        ];

        const videoCategoryIds = Array.from(
          new Set(videoData.map((video) => Number(video.CategoryId)))
        )
          .filter((id) => id > 0)
          .map((id) => ({ CategoryId: id, CategoryName: `Category ${id}` }));

        const mergedCategories = [
          categoryList[0],
          ...categoryList.slice(1),
          ...videoCategoryIds.filter(
            (videoCat) => !categoryList.some((cat) => cat.CategoryId === videoCat.CategoryId)
          ),
        ];

        setCategories(mergedCategories);
      } catch (err) {
        console.error("Failed to load videos or categories:", err);
      }
    }

    loadData();
  }, []);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    if (categoryId === 0) {
      setFilteredVideos(videos);
    } else {
      setFilteredVideos(
        videos.filter((video) => Number(video.CategoryId) === categoryId)
      );
    }
  };

  const activeCategoryName =
    categories.find((cat) => cat.CategoryId === activeCategory)?.CategoryName ||
    "All";

  return (
    <div className="container-fluid py-3 py-md-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-3">
        <h2 className="mb-0">Videos</h2>
        <div className="text-muted">Browse by category</div>
      </div>

      <div className="grid-container">
        {/* Sidebar - Desktop */}
        <div className="sidebar d-none d-md-block">
          <h5 className="mb-3">Categories</h5>
          <div className="d-flex flex-column">
            {categories.map((cat) => (
              <button
                key={cat.CategoryId}
                className={`btn text-start mb-2 ${
                  activeCategory === cat.CategoryId
                    ? "active-category"
                    : "btn-outline-secondary"
                }`}
                onClick={() => handleCategoryClick(cat.CategoryId)}
              >
                {cat.CategoryName}
              </button>
            ))}
          </div>
        </div>

        {/* Dropdown - Mobile */}
        <div className="d-block d-md-none mb-3">
          <DropdownButton
            title={activeCategoryName}
            variant="outline-primary"
            className="w-100"
          >
            {categories.map((cat) => (
              <Dropdown.Item
                key={cat.CategoryId}
                active={activeCategory === cat.CategoryId}
                onClick={() => handleCategoryClick(cat.CategoryId)}
              >
                {cat.CategoryName}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>

        {/* Videos */}
        <div className="videos">
          <div className="row g-3">
            {filteredVideos.map((video) => (
              <div
                key={video.VideoId}
                className="col-lg-3 col-md-4 col-sm-6"
              >
                <div className="card video-card h-100 shadow-sm">
                  <div className="ratio ratio-16x9">
                    <iframe
                      src={video.Url}
                      title={video.Title}
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="card-body">
                    <h6
                      className="card-title text-truncate"
                      title={video.Title}
                    >
                      {video.Title}
                    </h6>
                    <p className="text-muted mb-0">
                      Category:{" "}
                      {categories.find((cat) =>
                        cat.CategoryId === Number(video.CategoryId)
                      )?.CategoryName || "Unknown"}
                    </p>
                    <p className="text-muted mb-0">
                      Views: {video.Views || 0}
                    </p>
                    <p className="text-muted mb-0">
                      Likes: {video.Likes || 0}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .grid-container {
          display: grid;
          grid-template-columns: minmax(220px, 260px) 1fr;
          gap: 20px;
        }

        @media (max-width: 768px) {
          .grid-container {
            grid-template-columns: 1fr;
          }
        }

        .sidebar {
          padding: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          background: rgba(255,255,255,0.04);
        }

        .video-card {
          border: none;
          border-radius: 12px;
          overflow: hidden;
          background: linear-gradient(
            270deg,
            #ff7e5f,
            #feb47b,
            #86a8e7,
            #91eae4
          );
          background-size: 800% 800%;
          animation: gradientAnimation 10s ease infinite;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .video-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.3);
        }

        .card-title {
          font-size: 0.95rem;
          font-weight: 600;
        }

        .active-category {
          background: linear-gradient(
            90deg,
            #ff7e5f,
            #feb47b,
            #86a8e7,
            #91eae4
          );
          color: white;
          border: none;
        }

        .videos .card-body {
          background: rgba(255,255,255,0.92);
        }

        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
