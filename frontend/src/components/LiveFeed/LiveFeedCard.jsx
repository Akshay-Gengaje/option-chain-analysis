import React from "react";

const LiveFeedCard = ({ name, price }) => {
  const diff = (price.ltp - price.cp).toFixed(2);
  return (
    <div className="min-w-26 bg-gray-200 min-h-full flex text-black gap-2 items-center px-2 p-1 rounded-md">
      <p className="text-black ">{name}</p>
      <div>
        <p
          className={`${diff > 0 ? "text-green-300" : "text-red-600"} text-lg`}
        >
          {diff}
        </p>
        <p className="text-xs text-right">{price.ltp.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default LiveFeedCard;
