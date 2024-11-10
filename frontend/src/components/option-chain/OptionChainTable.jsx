import React from "react";

const OptionChainTable = ({ data, underlying }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="text-sm bg-gray-100">
            <th colSpan="6" className="text-center py-2">
              CALLS
            </th>
            <th className="w-1/12"></th>
            <th colSpan="6" className="text-center py-2">
              PUTS
            </th>
          </tr>
          <tr>
            <th
              className="px-4 py-2 bg-gray-200"
              title="Open Interest in contracts"
            >
              OI
            </th>
            <th
              className="px-4 py-2 bg-gray-200"
              title="Change in Open Interest (Contracts)"
            >
              Chng in OI
            </th>
            <th className="px-4 py-2 bg-gray-200" title="Volume in Contracts">
              Volume
            </th>
            <th className="px-4 py-2 bg-gray-200" title="Implied Volatility">
              IV
            </th>
            <th className="px-4 py-2 bg-gray-200" title="Last Traded">
              LTP
            </th>
            <th
              className="px-4 py-2 bg-gray-200"
              title="Change w.r.t to Previous Close"
            >
              Chng
            </th>
            {/* <th className="px-4 py-2 bg-gray-200" title="Best Bid/Buy Qty">
              Bid Qty
            </th>
            <th className="px-4 py-2 bg-gray-200" title="Best Bid/Buy">
              Bid
            </th>
            <th className="px-4 py-2 bg-gray-200" title="Best Ask/Sell">
              Ask
            </th>
            <th className="px-4 py-2 bg-gray-200" title="Best Ask/Sell Qty">
              Ask Qty
            </th> */}

            <th className="px-4 py-2 bg-gray-200">Strike</th>
            {/* <th className="px-4 py-2 bg-gray-200" title="Best Bid/Buy">
              Bid
            </th>
            <th className="px-4 py-2 bg-gray-200" title="Best Bid/Buy Qty">
              Bid Qty
            </th>
            <th className="px-4 py-2 bg-gray-200" title="Best Ask/Sell">
              Ask
            </th>
            <th className="px-4 py-2 bg-gray-200" title="Best Ask/Sell Qty">
              Ask Qty
            </th> */}
            <th
              className="px-4 py-2 bg-gray-200"
              title="Change w.r.t to Previous Close"
            >
              Chng
            </th>
            <th className="px-4 py-2 bg-gray-200" title="Last Traded">
              LTP
            </th>
            <th className="px-4 py-2 bg-gray-200" title="Implied Volatility">
              IV
            </th>
            <th className="px-4 py-2 bg-gray-200" title="Volume in Contracts">
              Volume
            </th>
            <th
              className="px-4 py-2 bg-gray-200"
              title="Change in Open Interest (Contracts)"
            >
              Chng in OI
            </th>

            <th
              className="px-4 py-2 bg-gray-200"
              title="Open Interest in contracts"
            >
              OI
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((data) => (
            <tr
              key={data.strikePrice}
              className={`text-sm text-center `}
            >
              <td
                className={`px-4 py-1 border ${
                  data.strikePrice < underlying ? "bg-yellow-200" : ""
                }`}
              >
                {data.CE.openInterest}
              </td>
              <td
                className={`px-4 py-1 border ${
                  data.strikePrice < underlying ? "bg-yellow-200" : ""
                }`}
              >
                {data.CE.changeinOpenInterest}
              </td>
              <td
                className={`px-4 py-1 border ${
                  data.strikePrice < underlying ? "bg-yellow-200" : ""
                }`}
              >
                {data.CE.totalTradedVolume}
              </td>
              <td
                className={`px-4 py-1 border ${
                  data.strikePrice < underlying ? "bg-yellow-200" : ""
                }`}
              >
                {data.CE.impliedVolatility}
              </td>
              <td
                className={`px-4 py-1 border ${
                  data.strikePrice < underlying ? "bg-yellow-200" : ""
                }`}
              >
                {data.CE.lastPrice}
              </td>
              <td
                className={`px-4 py-1 border ${
                  data.strikePrice < underlying ? "bg-yellow-200" : ""
                }`}
              >
                {data.CE.change.toFixed(2)}
              </td>
              <td
                className={`px-4 py-1 border font-semibold ${
                  data.strikePrice < underlying ? "bg-yellow-200" : ""
                }`}
              >
                {data.strikePrice}
              </td>
              <td
                className={`px-4 py-1 border ${
                  data.strikePrice > underlying ? "bg-yellow-200" : ""
                }`}
              >
                {data.PE.change.toFixed(2)}
              </td>
              <td
                className={`px-4 py-1 border ${
                  data.strikePrice > underlying ? "bg-yellow-200" : ""
                }`}
              >
                {data.PE.lastPrice}
              </td>
              <td
                className={`px-4 py-1 border ${
                  data.strikePrice > underlying ? "bg-yellow-200" : ""
                }`}
              >
                {data.PE.impliedVolatility}
              </td>
              <td
                className={`px-4 py-1 border ${
                  data.strikePrice > underlying ? "bg-yellow-200" : ""
                }`}
              >
                {data.PE.totalTradedVolume}
              </td>
              <td
                className={`px-4 py-1 border ${
                  data.strikePrice > underlying ? "bg-yellow-200" : ""
                }`}
              >
                {data.PE.changeinOpenInterest}
              </td>
              <td
                className={`px-4 py-1 border ${
                  data.strikePrice > underlying ? "bg-yellow-200" : ""
                }`}
              >
                {data.PE.openInterest}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OptionChainTable;
