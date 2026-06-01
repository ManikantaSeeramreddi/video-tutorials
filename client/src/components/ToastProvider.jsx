import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      style={{
        '--toastify-color-light': 'rgba(30, 41, 59, 0.9)',
        '--toastify-color-dark': 'rgba(15, 23, 42, 0.95)',
        '--toastify-color-info': '#0ea5e9',
        '--toastify-color-success': '#10b981',
        '--toastify-color-warning': '#f59e0b',
        '--toastify-color-error': '#ef4444',
        '--toastify-color-transparent': 'rgba(0,0,0,0.8)',
      }}
    />
  );
}
