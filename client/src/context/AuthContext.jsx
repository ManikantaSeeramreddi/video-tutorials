import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for user token in localStorage on mount
    const userToken = localStorage.getItem('userToken');
    const adminToken = localStorage.getItem('adminToken');
    
    if (userToken) {
      setIsAuthenticated(true);
    }
    
    if (adminToken) {
      setIsAdminAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  const loginUser = (userId) => {
    localStorage.setItem('userToken', userId);
    localStorage.setItem('currentUser', userId);
    setIsAuthenticated(true);
  };

  const loginAdmin = (adminId) => {
    localStorage.setItem('adminToken', adminId);
    localStorage.setItem('currentAdmin', adminId);
    setIsAdminAuthenticated(true);
  };

  const logoutUser = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
  };

  const logoutAdmin = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('currentAdmin');
    setIsAdminAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdminAuthenticated,
        loading,
        loginUser,
        loginAdmin,
        logoutUser,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
