import axios from "axios";

// Retrieve the access token from localStorage (or sessionStorage, depending on where it's stored)
const accessToken = localStorage.getItem("upstox_access_token");

// Create an Axios instance with default headers
const apiClient = axios.create({
  baseURL: "https://api.upstox.com/v2", // Base URL for Upstox API
  headers: {
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
    Accept: "application/json",
  },
});

// Optional: You can also add interceptors to handle errors globally, such as for expired tokens.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle token expiration or other 401 errors here
      console.error(
        "Unauthorized request. Please check the token or re-login."
      );
      // For example, you could redirect the user to login page or refresh the token
    }
    return Promise.reject(error);
  }
);

export default apiClient;
