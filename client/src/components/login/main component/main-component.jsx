import API from "../../../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowRight, HiSparkles } from "react-icons/hi";

export function Maincomponent() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function Emailchange(e) {
        setEmail(e.target.value);
    }

    function Getstarted() {
        if (!email.trim()) {
            alert('Please enter an email');
            return;
        }

        setIsLoading(true);
        API.get("/users")
            .then((response) => {
                const users = response.data;
                const userFound = users.some(user => user.Email === email);
                setIsLoading(false);

                if (userFound) {
                    navigate('/login');
                } else {
                    navigate('/unregister');
                }
            })
            .catch(err => {
                setIsLoading(false);
                console.error("Error fetching users:", err);
                alert('Error checking email. Please try again.');
            });
    }

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

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 px-4">
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
                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto text-center"
            >
                {/* Badge */}
                <motion.div
                    variants={itemVariants}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6"
                >
                    <HiSparkles className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-300">
                        Start Your Learning Journey Today
                    </span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    variants={itemVariants}
                    className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white leading-tight"
                >
                    Learn and Master
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mt-2">
                        Programming Technologies
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto"
                >
                    Watch high-quality video tutorials from expert instructors. Learn at your own pace,
                    build real projects, and advance your programming career.
                </motion.p>

                {/* Email Input Section */}
                <motion.div
                    variants={itemVariants}
                    className="max-w-2xl mx-auto mb-8"
                >
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative flex flex-col sm:flex-row gap-3 p-2 rounded-lg bg-slate-950/50 border border-slate-800/50 backdrop-blur-sm hover:bg-slate-950/60 transition-all">
                            <input
                                type="email"
                                placeholder="Enter your email to get started"
                                value={email}
                                onChange={Emailchange}
                                disabled={isLoading}
                                className="flex-1 bg-transparent text-white placeholder-slate-400 focus:outline-none text-base px-4 py-3 sm:py-0 disabled:opacity-50"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={Getstarted}
                                disabled={isLoading}
                                className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                                {isLoading ? (
                                    <>
                                        <span className="inline-block animate-spin">⏳</span>
                                        Loading...
                                    </>
                                ) : (
                                    <>
                                        Get Started
                                        <HiArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12"
                >
                    {[
                        { emoji: "🎥", label: "500+ Tutorials", desc: "Comprehensive video lessons" },
                        { emoji: "👨‍💻", label: "Expert Instructors", desc: "Learn from professionals" },
                        { emoji: "🚀", label: "Career Ready", desc: "Industry-standard content" },
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -5 }}
                            className="p-6 rounded-lg bg-gradient-to-br from-slate-900/60 to-slate-800/40 border border-slate-800/50 backdrop-blur-sm hover:border-blue-500/30 transition-all group"
                        >
                            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{feature.emoji}</div>
                            <p className="text-white font-semibold mb-1">{feature.label}</p>
                            <p className="text-sm text-slate-400">{feature.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Testimonial Stats */}
                <motion.div
                    variants={itemVariants}
                    className="mt-16 pt-8 border-t border-slate-800/50"
                >
                    <p className="text-sm text-slate-400 mb-6">Trusted by thousands of learners</p>
                    <div className="flex flex-wrap justify-center gap-8 text-center">
                        {[
                            { num: "10K+", label: "Active Students" },
                            { num: "500+", label: "Video Tutorials" },
                            { num: "1000+", label: "Hours of Content" },
                        ].map((stat, idx) => (
                            <div key={idx}>
                                <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                    {stat.num}
                                </p>
                                <p className="text-xs md:text-sm text-slate-400">{stat.label}</p>
                            </div>
                        ))}
                    </div>
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

            <div className="absolute bottom-4 right-4 z-10">
                <a
                    href="/admin-login"
                    className="inline-flex items-center rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300 transition hover:bg-blue-500/20 hover:text-white"
                >
                    Admin Login
                </a>
            </div>
        </section>
    );
}
