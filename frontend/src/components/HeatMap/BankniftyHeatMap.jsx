import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import moment from "moment/moment";

const BankniftyHeatMap = () => {
  // State to track whether the heatmap is expanded
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle expand state on click
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed top-16 -left-10 ">
      {/* Clickable Header */}
      <div
        className={`relative transition-all duration-300 shadow-2xl pl-10 rounded-br-3xl  ${
          isExpanded ? "w-[70vw] " : "w-10"
        }`}
      >
        {/* Clickable Header */}
        <div
          className="absolute -right-32 top-0 bg-slate-500 text-white px-2 py-1 rounded-t-md shadow-xl w-24 cursor-pointer text-center"
          style={{ transform: "rotate(90deg)", transformOrigin: "left top" }}
          onClick={toggleExpand}
        >
          <p>Banknifty</p>
        </div>
        {/* Expandable Content */}
        {isExpanded && (
          <div className="bg-white h-[80vh] overflow-y-scroll text-black p-4  rounded-br-3xl">
            <h2 className="text-lg font-bold">Banknifty Heatmap Details</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankniftyHeatMap;
