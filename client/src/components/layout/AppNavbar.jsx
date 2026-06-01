import React, { useContext, useMemo, useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiMenu,
  HiX,
  HiMoon,
  HiSun,
  HiUser,
  HiLogout,
  HiCog,
} from "react-icons/hi";
import { AuthContext } from "../../context/AuthContext";

export function AppNavbar() {
  const { isAuthenticated, isAdminAuthenticated, loading, logoutUser, logoutAdmin } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAuthPage = useMemo(() => {
    const p = location.pathname;
    return p === "/login" || p === "/register" || p === "/admin-login";
  }, [location.pathname]);

  const handleLogout = () => {
    if (isAdminAuthenticated) {
      logoutAdmin();
      navigate("/admin-login", { replace: true });
      return;
    }
    logoutUser();
    navigate("/login", { replace: true });
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "Home", href: "/", show: true },
    { label: "Videos", href: "/videos", show: isAuthenticated },
    { label: "Admin Dashboard", href: "/admin-home", show: isAdminAuthenticated },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-md bg-slate-950/80 border-b border-slate-800/50 shadow-lg shadow-slate-950/50"
          : "backdrop-blur-sm bg-slate-950/40 border-b border-slate-800/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-300 hover:to-purple-400 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
              ▶
            </div>
            <span className="hidden sm:inline">Tech Video</span>
          </Link>

          {/* Desktop Navigation */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center gap-1"
          >
            {navLinks.map((link) =>
              link.show ? (
                <motion.div key={link.href} variants={itemVariants}>
                  <NavLink
                    to={link.href}
                    end={link.href === "/"}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ) : null
            )}
          </motion.div>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg hover:bg-slate-800/50 text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <HiSun className="w-5 h-5" />
              ) : (
                <HiMoon className="w-5 h-5" />
              )}
            </motion.button>

            {/* Auth Buttons / Profile */}
            {!loading && !isAuthenticated && !isAdminAuthenticated && !isAuthPage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hidden md:flex items-center gap-2"
              >
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 border border-slate-700 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/admin-login"
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                >
                  Admin
                </Link>
              </motion.div>
            )}

            {!loading && (isAuthenticated || isAdminAuthenticated) && (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="p-2 rounded-lg hover:bg-slate-800/50 text-slate-300 hover:text-white transition-colors"
                >
                  <HiUser className="w-6 h-6" />
                </motion.button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 backdrop-blur-md bg-slate-900/80 border border-slate-800/50 rounded-lg shadow-xl py-2"
                  >
                    <div className="px-4 py-2 text-sm text-slate-400 border-b border-slate-800/50">
                      {isAdminAuthenticated ? "Admin Account" : "User Account"}
                    </div>
                    <button
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="w-full text-left px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors flex items-center gap-2 text-sm"
                    >
                      <HiCog className="w-4 h-4" />
                      Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors flex items-center gap-2 text-sm border-t border-slate-800/50"
                    >
                      <HiLogout className="w-4 h-4" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-800/50 text-slate-300 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-800/50 backdrop-blur-sm bg-slate-900/40"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) =>
                link.show ? (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    end={link.href === "/"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-lg font-medium transition-all ${
                        isActive
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ) : null
              )}

              {!loading && !isAuthenticated && !isAdminAuthenticated && !isAuthPage && (
                <div className="flex gap-2 pt-2 border-t border-slate-800/50">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 border border-slate-700 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all text-center"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/admin-login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transition-all text-center"
                  >
                    Admin
                  </Link>
                </div>
              )}

              {!loading && (isAuthenticated || isAdminAuthenticated) && (
                <div className="pt-2 border-t border-slate-800/50">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 rounded-lg text-sm font-medium text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-all flex items-center justify-center gap-2"
                  >
                    <HiLogout className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

