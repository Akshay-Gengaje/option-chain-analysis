// LoginButton.js
import React from "react";

const LoginButton = () => {
  const clientId = import.meta.env.VITE_API_KEY;
  const redirectUri = "http://localhost:5173/auth/callback"; // Replace with your redirect URI
  const authUrl = `https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

  const handleLogin = () => {
    window.location.href = authUrl; // Redirects user to Upstox login page
  };

  return (
    <button
      className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      onClick={handleLogin}
    >
      Login with Upstox
    </button>
  );
};

export default LoginButton;
