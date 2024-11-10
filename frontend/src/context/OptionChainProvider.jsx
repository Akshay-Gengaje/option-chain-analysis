import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient, {
  setAuthCookie,
  initializeCookies,
} from "../api/axiosClient"; // Import both functions
import axios from "axios";

// Create Context
const OptionChainContext = createContext();

// Provider Component
export const OptionChainProvider = ({ children }) => {
  const [underlying, setUnderlying] = useState(0);
  const [optionChain, setOptionChain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch option chain data
  const fetchOptionChain = async (
    symbol = JSON.parse(localStorage.getItem("index")) || "NIFTY"
  ) => {
    // Ensure the cookie is attached before making the API call
    setAuthCookie(); // Attach the latest cookie

    setLoading(true);
    try {
      const response = await axios.get("/api/option-chain-indices", {
        params: { symbol },
      });
      setUnderlying(response.data.records?.underlyingValue || 0);
      setOptionChain(response.data || {});
      setError(null); // Clear any previous error
    } catch (err) {
      setError("Error fetching option chain");
      console.error("Error fetching option chain:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial data on mount with default symbol
  useEffect(() => {
    // Initialize the cookies when the component mounts if not already initialized
    if (!localStorage.getItem("authCookie")) {
      initializeCookies(); // Initialize cookie on first load
    } else {
      fetchOptionChain(); // Fetch data if cookie is already available
    }
  }, []);

  // Provide context values, including the fetch function
  return (
    <OptionChainContext.Provider
      value={{ underlying, optionChain, loading, error, fetchOptionChain }}
    >
      {children}
    </OptionChainContext.Provider>
  );
};

// Custom Hook
export const useOptionChain = () => {
  const context = useContext(OptionChainContext);
  if (!context) {
    throw new Error(
      "useOptionChain must be used within an OptionChainProvider"
    );
  }
  return context;
};
