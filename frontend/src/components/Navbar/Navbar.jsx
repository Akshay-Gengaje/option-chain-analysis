import React, { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";
import { useMarketDataFeed } from "../MarketData/MarketData";

const Navbar = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [fundsData, setFundsData] = useState(null);
  const [error, setError] = useState("");
  const { isConnected, price: nifty } = useMarketDataFeed("NSE_INDEX|Nifty 50");
  const { price: bank } = useMarketDataFeed("NSE_INDEX|Nifty Bank");
  // Fetch User Profile and Funds Data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch User Profile
        const profileResponse = await apiClient.get("/user/profile");
        setUserProfile(profileResponse.data.data);

        // Fetch Funds and Margin Data
        const fundsResponse = await apiClient.get("/user/get-funds-and-margin");
        setFundsData(fundsResponse.data.data);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // Display loading or error message
  if (!userProfile || !fundsData) {
    return (
      <div className="flex justify-center items-center p-2 bg-gray-800 text-white">
        <p>{error ? error : "Loading..."}</p>
      </div>
    );
  }

  return (
    <nav className="bg-gray-800 text-white p-2  w-full ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <h3>Upstox</h3>
        </div>

        <div className="flex ">
          <div className="flex w-96 gap-10">
            <p>Nifty - {nifty || 0}</p>
            <p>Bank Nifty - {bank || 0}</p>
          </div>
          <div className="flex items-center gap-1">
            <div
              className={`${
                isConnected ? "bg-green-500" : "bg-red-500"
              } w-2 h-2 rounded-full mb-2 animate-pulse`}
            ></div>
            Market is&nbsp;
            {isConnected ? <span>Connected</span> : <span>Disconnected</span>}
          </div>
        </div>

        {/* <div className="flex items-center space-x-6">
          <div className="flex flex-col items-end space-y-2">
            <div className="text-sm">
              <strong>Available Margin : </strong>
              <span>{fundsData.equity.available_margin}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium">{userProfile.user_name}</span>
            <span className="text-sm">{userProfile.email}</span>
          </div>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
