import React, { useEffect, useState, useMemo } from "react";
import API from "../../api";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiSearch,
  HiHeart,
  HiEye,
  HiPlay,
  HiChevronDown,
  HiX,
  HiStar,
  HiClock,
  HiUser,
} from "react-icons/hi";

export function VideoHome() {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
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

        setCategories(categoryList);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load videos or categories:", err);
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  // Filter and Search Logic
  useEffect(() => {
    let filtered = videos;

    // Category filter
    if (activeCategory !== 0) {
      filtered = filtered.filter(
        (video) => Number(video.CategoryId) === activeCategory
      );
    }

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((video) =>
        video.Title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortBy === "popular") {
      filtered = [...filtered].sort(
        (a, b) => Number(b.Views || 0) - Number(a.Views || 0)
      );
    } else if (sortBy === "trending") {
      filtered = [...filtered].sort(
        (a, b) => Number(b.Likes || 0) - Number(a.Likes || 0)
      );
    }

    setFilteredVideos(filtered);
  }, [videos, activeCategory, searchQuery, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Skeleton Loading Component
  const SkeletonCard = () => (
    <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
      <div className="skeleton h-40 mb-4 rounded-lg" />
      <div className="skeleton h-4 mb-3 w-3/4" />
      <div className="skeleton h-3 mb-3 w-full" />
      <div className="skeleton h-3 w-1/2" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Explore Tutorials
        </h1>
        <p className="text-slate-400">
          {filteredVideos.length} tutorial{filteredVideos.length !== 1 ? 's' : ''} available
        </p>
      </motion.div>

      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 space-y-4"
      >
        {/* Search Input */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          <div className="relative flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-800/50 backdrop-blur-sm hover:bg-slate-900/60 transition-all">
            <HiSearch className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchQuery("")}
                className="p-2 rounded-lg hover:bg-slate-800/50 text-slate-400 hover:text-white transition-colors"
              >
                <HiX className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* Category Filter (Mobile) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-white hover:border-blue-500/50 transition-all flex items-center gap-2"
          >
            <HiChevronDown className="w-4 h-4" />
            Categories
          </motion.button>

          {/* Sort Dropdown */}
          <div className="relative group">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-white hover:border-slate-600/50 transition-all flex items-center gap-2"
            >
              Sort: {sortBy}
              <HiChevronDown className="w-4 h-4" />
            </motion.button>

            {/* Sort Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 mt-2 w-40 backdrop-blur-md bg-slate-900/80 border border-slate-800/50 rounded-lg shadow-xl py-2 hidden group-hover:block z-10"
            >
              {["latest", "popular", "trending"].map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    sortBy === option
                      ? "bg-blue-500/20 text-blue-400 border-l-2 border-blue-500"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Categories - Desktop */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden md:flex gap-2 mb-8 flex-wrap"
      >
        {categories.map((cat) => (
          <motion.button
            key={cat.CategoryId}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(cat.CategoryId)}
            className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${
              activeCategory === cat.CategoryId
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50"
                : "bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-white hover:border-slate-600/50"
            }`}
          >
            {cat.CategoryName}
          </motion.button>
        ))}
      </motion.div>

      {/* Categories - Mobile (Dropdown) */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mb-4 p-4 rounded-lg bg-slate-900/50 border border-slate-800/50"
          >
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.CategoryId}
                  onClick={() => {
                    setActiveCategory(cat.CategoryId);
                    setIsFilterOpen(false);
                  }}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.CategoryId
                      ? "bg-blue-500 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {cat.CategoryName}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Videos Grid */}
      {isLoading ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {Array(8).fill(0).map((_, i) => (
            <motion.div key={i} variants={itemVariants}>
              <SkeletonCard />
            </motion.div>
          ))}
        </motion.div>
      ) : filteredVideos.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredVideos.map((video) => (
            <motion.div
              key={video.VideoId}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="relative rounded-lg overflow-hidden bg-slate-900 border border-slate-800/50 hover:border-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/20">
                {/* Video Thumbnail / Iframe Container */}
                <div className="relative w-full h-40 bg-slate-800 overflow-hidden">
                  <iframe
                    src={video.Url}
                    title={video.Title}
                    allowFullScreen
                    className="w-full h-full"
                  />
                  {/* Play Button Overlay */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                  >
                    <HiPlay className="w-12 h-12 text-blue-400" />
                  </motion.div>
                </div>

                {/* Card Content */}
                <div className="p-4 space-y-3">
                  {/* Title */}
                  <h3 className="font-semibold text-white line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {video.Title}
                  </h3>

                  {/* Category Badge */}
                  <div className="inline-flex">
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      {categories.find((cat) =>
                        cat.CategoryId === Number(video.CategoryId)
                      )?.CategoryName || "Unknown"}
                    </span>
                  </div>

                  {/* Instructor (dummy) */}
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <HiUser className="w-3 h-3" />
                    <span>Expert Instructor</span>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-400">
                      <HiEye className="w-4 h-4" />
                      <span>{(video.Views || 0).toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <HiHeart className="w-4 h-4" />
                      <span>{(video.Likes || 0).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-3 border-t border-slate-800/50">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium hover:shadow-lg transition-all"
                    >
                      Watch Now
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-red-400 hover:border-red-500/30 transition-all"
                    >
                      <HiHeart className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No tutorials found
          </h3>
          <p className="text-slate-400 mb-6">
            Try adjusting your search or category filters
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSearchQuery("");
              setActiveCategory(0);
            }}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:shadow-lg transition-all"
          >
            Clear Filters
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
