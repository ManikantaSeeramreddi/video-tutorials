import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight, HiPlay, HiSparkles } from "react-icons/hi";

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden pt-12 pb-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Blobs */}
        <motion.div
          className="absolute top-0 -left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            y: [0, 50, 0],
            x: [0, -50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 -right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            y: [0, -50, 0],
            x: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-4xl mx-auto px-4 text-center"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6"
        >
          <HiSparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-blue-300">
            Learn Programming with Premium Tutorials
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white leading-tight"
        >
          Master Programming
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mt-2">
            From Expert Tutorials
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto"
        >
          Watch high-quality video tutorials, build amazing projects, and level
          up your coding skills with our comprehensive learning platform.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          variants={itemVariants}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-3 px-6 py-4 rounded-lg bg-slate-950/50 border border-slate-800/50 backdrop-blur-sm hover:bg-slate-950/60 transition-all">
              <input
                type="text"
                placeholder="Search tutorials, languages, frameworks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-slate-400 focus:outline-none text-base"
              />
              <button className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all">
                <HiArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Link
            to="/videos"
            className="group relative px-8 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105 flex items-center gap-2"
          >
            <HiPlay className="w-5 h-5" />
            Start Learning
            <span className="absolute right-4 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
          <button className="px-8 py-4 rounded-lg font-semibold text-white border border-slate-700 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all hover:scale-105">
            Explore Courses
          </button>
        </motion.div>

        {/* Stats or Floating Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12"
        >
          {[
            { label: "Tutorials", value: "500+" },
            { label: "Students", value: "10K+" },
            { label: "Hours", value: "1000+" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              variants={floatingVariants}
              animate="animate"
              className="p-4 rounded-lg bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm hover:border-slate-700/50 transition-all"
            >
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {stat.value}
              </p>
              <p className="text-sm text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-blue-400 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
