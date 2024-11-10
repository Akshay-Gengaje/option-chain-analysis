import React, { useEffect } from "react";
import { useOptionChain } from "../../context/OptionChainProvider";

function roundToThousands(value) {
  return Math.floor(value / 100) * 100;
}

function filteredStrikePrices(options, atm, symbol) {
  const diff = symbol === "BANKNIFTY" ? 600 : 300;
  return options?.filter(
    (option) =>
      option?.CE?.strikePrice > atm - diff &&
      option?.CE?.strikePrice < atm + diff
  );
}
const PEOptionAnalysisTable = ({ symbol }) => {
  const { underlying, optionChain, loading, error, fetchOptionChain } =
    useOptionChain();
  const totalChangeInOI = optionChain?.filtered?.data?.reduce(
    (accumulator, data) => {
      return accumulator + (data?.PE?.changeinOpenInterest || 0);
    },
    0
  );
  const ATM = roundToThousands(optionChain?.records?.underlyingValue);
  const filteredStrikePrice = filteredStrikePrices(
    optionChain?.filtered?.data,
    ATM,
    symbol
  );
  console.log(optionChain);
  useEffect(() => {}, [underlying]);
  return (
    <div>
      <table className=" table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="text-sm bg-red-400 text-center">
            <th colSpan="6" className="text-center py-2">
              Nifty PUT Option
            </th>
          </tr>
          <tr className="bg-red-200">
            <th className="px-4 py-2 " title="Open Interest in contracts">
              Strike
            </th>
            <th
              className="px-4 py-2 bg-red-200"
              title="Open Interest in contracts"
            >
              Last
            </th>
            <th
              className="px-4 py-2 bg-red-200"
              title="Open Interest in contracts"
            >
              Open Interest
            </th>
            <th
              className="px-4 py-2 bg-red-200"
              title="Open Interest in contracts"
            >
              Change in OI
            </th>
            <th
              className="px-4 py-2 bg-red-200"
              title="Open Interest in contracts"
            >
              Odin Percentage
            </th>
          </tr>
        </thead>
        <tbody>
          {error ? (
            <tr>
              <td colSpan={5} className="text-center text-red-500 py-4">
                Error loading data
              </td>
            </tr>
          ) : loading ? (
            <tr>
              <td colSpan={5} className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : (
            filteredStrikePrice?.map((data) => (
              <tr
                key={data.strikePrice}
                className="text-md font-semibold text-center"
              >
                <td className="px-4 py-1 border-2">{data.PE.strikePrice}</td>
                <td className="px-4 py-1 border-2">{data.PE.lastPrice}</td>
                <td className="px-4 py-1 border-2">{data.PE.openInterest}</td>
                <td className="px-4 py-1 border-2">
                  {data.PE.changeinOpenInterest}
                </td>
                <td className="px-4 py-1 border-2"></td>
              </tr>
            ))
          )}
          <tr className="bg-yellow-200">
            <td className="px-4 py-1 border-2 font-bold">Total</td>
            <td className="px-4 py-1 border-2 font-bold"></td>
            <td className="px-4 py-1 border-2 font-bold text-center">
              {optionChain?.filtered.PE?.totOI}
            </td>
            <td className="px-4 py-1 border-2 font-bold text-center">
              {totalChangeInOI}
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PEOptionAnalysisTable;
