// RedirectHandler.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RedirectHandler = () => {
  const navigate = useNavigate();
  const clientId = import.meta.env.VITE_API_KEY; // Replace with your actual client ID
  const clientSecret = import.meta.env.VITE_API_SECRETE; // Replace with your actual client secret
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");
    if (authCode) {
      // Exchange authorization code for access token
      axios
        .post("https://api.upstox.com/v2/login/authorization/token", null, {
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          params: {
            code: authCode,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            grant_type: "authorization_code",
          },
        })
        .then((response) => {
          const { access_token } = response.data;
          if (access_token) {
            localStorage.setItem("upstox_access_token", access_token);
            navigate("/dashboard"); // Redirect to a secure route in your app
          }
        })
        .catch((error) => {
          console.error("Error exchanging code for token:", error);
        });
    }
  }, [navigate]);

  return <div>Redirecting...</div>;
};

export default RedirectHandler;
