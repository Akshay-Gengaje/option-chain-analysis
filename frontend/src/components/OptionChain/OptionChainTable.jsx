import React from "react";
import { formatNumber } from "../../utils/formatNumbers";

// Utility function to calculate intensity-based color for Open Interest
const calculateIntensity = (value, min, max, color) => {
  if (value === null || value === undefined) return "";
  const ratio = (value - min) / (max - min);
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${0.3 + 0.7 * ratio})`;
};

// Utility function for Change in OI (handles positive and negative values)
const calculateChangeColor = (value, max, colorPositive, colorNegative) => {
  if (value > 0) {
    const ratio = value / max;
    return `rgba(${colorPositive[0]}, ${colorPositive[1]}, ${
      colorPositive[2]
    }, ${0.3 + 0.7 * ratio})`;
  } else if (value < 0) {
    const ratio = Math.abs(value) / max;
    return `rgba(${colorNegative[0]}, ${colorNegative[1]}, ${
      colorNegative[2]
    }, ${0.3 + 0.7 * ratio})`;
  }
  return ""; // No color for zero change
};

const OptionTable = ({
  optionsData,
  type,
  ATM,
  callTotalChangeInOI,
  putTotalChangeInOI,
  callChangeInOIPercent,
  putChangeInOIPercent,
}) => {
  // Calculate min/max for Open Interest and Change in OI
  const oiValues = optionsData.map((option) => option?.market_data?.oi || 0);
  const changeInOIValues = optionsData.map(
    (option) =>
      (option?.market_data?.oi || 0) - (option?.market_data?.prev_oi || 0)
  );

  const minOI = Math.min(...oiValues);
  const maxOI = Math.max(...oiValues);
  const maxChangeInOI = Math.max(...changeInOIValues.map(Math.abs));

  // Define colors for OI and Change in OI
  const colorOI = [34, 197, 94]; // Green RGB for Open Interest
  const colorPositive = [34, 197, 94]; // Green RGB for positive Change in OI
  const colorNegative = [248, 113, 113]; // Red RGB for negative Change in OI

  // Calculate totals for Open Interest and Change in OI
  const totalOpenInterest = oiValues.reduce((a, b) => a + b, 0);
  const totalChangeInOI = changeInOIValues.reduce((a, b) => a + b, 0);

  return (
    <div className="overflow-x-auto mt-6 shadow-xl text-center">
      <table className="min-w-full table-auto bg-white rounded-lg shadow-lg">
        <thead className="bg-gray-100">
          <tr className="text-center bg-green-300 font-bold ">
            <td colSpan={6}>{`${type} Options`}</td>
          </tr>
          <tr className="bg-green-200">
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600">
              Strike
            </th>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600">
              Last
            </th>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600">
              Open Interest
            </th>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600">
              Change In OI
            </th>
            <th
              colSpan={2}
              className="px-4 py-2 text-center text-sm font-semibold text-gray-600"
            >
              Option Greeks
            </th>
          </tr>
          <tr className="bg-green-100">
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600">
              Delta
            </th>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600">
              Theta
            </th>
            {/* <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600">
              Gamma
            </th> */}
          </tr>
        </thead>
        <tbody className="text-center">
          {optionsData.map((option, index) => {
            const openInterest = option?.market_data?.oi || 0;
            const changeInOI =
              openInterest - (option?.market_data?.prev_oi || 0);

            return (
              <tr
                key={index}
                className={`hover:bg-slate-50 ${
                  ATM === option?.strike_price
                    ? "bg-slate-200 hover:bg-slate-300"
                    : ""
                }`}
              >
                <td className="px-4 py-2 text-sm text-gray-700">
                  {option?.strike_price}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {option?.market_data?.ltp}
                </td>
                <td
                  className="px-4 py-2 text-sm text-gray-700"
                  style={{
                    backgroundColor: calculateIntensity(
                      openInterest,
                      minOI,
                      maxOI,
                      colorOI
                    ),
                  }}
                >
                  {formatNumber(openInterest)}
                </td>
                <td
                  className="px-4 py-2 text-sm text-gray-700"
                  style={{
                    backgroundColor: calculateChangeColor(
                      changeInOI,
                      maxChangeInOI,
                      colorPositive,
                      colorNegative
                    ),
                  }}
                >
                  {formatNumber(changeInOI)}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {option?.option_greeks?.delta}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {option?.option_greeks?.theta}
                </td>
                {/* <td className="px-4 py-2 text-sm text-gray-700">
                  {option?.option_greeks?.gamma}
                </td> */}
              </tr>
            );
          })}

          {/* Total row */}
          <tr className="font-bold bg-gray-100">
            <td className="px-4 py-2 text-sm text-gray-700">Total</td>
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2 text-sm text-gray-700">
              {formatNumber(totalOpenInterest)}
            </td>
            <td className="px-4 py-2 text-sm text-gray-700">
              {type == "Call"
                ? formatNumber(callTotalChangeInOI)
                : formatNumber(putTotalChangeInOI)}
            </td>
            <td className="px-4 py-2">Percentage : </td>
            <td className="px-4 py-2">
              {type == "Call" ? callChangeInOIPercent : putChangeInOIPercent}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OptionTable;
