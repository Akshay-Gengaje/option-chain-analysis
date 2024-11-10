import axios from "axios";

// Setup Axios instance
const apiClient = axios.create({
  baseURL: "/api", // Use relative "/api" base for Vite proxy
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.5",
  },
  withCredentials: true, // Ensures cookies are sent with each request
});

// Function to get the authCookie from localStorage and set it in the Axios header
export const setAuthCookie = () => {
  const authCookie = localStorage.getItem("authCookie");
  if (authCookie) {
    apiClient.defaults.headers.Cookie = authCookie; // Attach cookie to every request
  }
};

// Function to initialize cookies (fetch and store the cookie from the server)
export async function initializeCookies() {
  try {
    const response = await apiClient.get("/"); // Proxy forwards this to NSE base URL
    const authCookie = response.headers["set-cookie"]?.join("; ");
    
    if (authCookie) {
      // Store the cookie in localStorage for subsequent requests
      localStorage.setItem("authCookie", authCookie);
      // Set the cookie in the Axios instance for future requests
      setAuthCookie();
      console.log("Cookie initialized:", authCookie);
    } else {
      console.error("No auth cookie returned from server.");
    }
  } catch (error) {
    console.error("Error initializing cookies:", error);
  }
}

// Function to refresh cookies (optional, depending on your needs)
export async function refreshCookies() {
  await initializeCookies();
}

// Set the cookie initially when the page loads or the app starts
setAuthCookie();

export default apiClient;
