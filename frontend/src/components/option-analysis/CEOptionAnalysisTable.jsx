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
const CEOptionAnalysisTable = ({ symbol }) => {
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

  useEffect(() => {}, [underlying, optionChain]);
  return (
    <div>
      <table className=" table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="text-sm bg-green-300">
            <th colSpan="6" className="text-center py-2">
              Nifty Call Option
            </th>
          </tr>
          <tr>
            <th
              className="px-4 py-2 bg-green-200"
              title="Open Interest in contracts"
            >
              Strike
            </th>
            <th
              className="px-4 py-2 bg-green-200"
              title="Open Interest in contracts"
            >
              Last
            </th>
            <th
              className="px-4 py-2 bg-green-200"
              title="Open Interest in contracts"
            >
              Open Interest
            </th>
            <th
              className="px-4 py-2 bg-green-200"
              title="Open Interest in contracts"
            >
              Change in OI
            </th>
            <th
              className="px-4 py-2 bg-green-200"
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
                className={` text-center text-md font-semibold`}
              >
                <td className="px-4 py-1 border-2"> {data.CE.strikePrice}</td>
                <td className="px-4 py-1 border-2"> {data.CE.lastPrice}</td>
                <td className="px-4 py-1 border-2"> {data.CE.openInterest}</td>
                <td className="px-4 py-1 border-2">
                  {data.CE.changeinOpenInterest}
                </td>
                <td className="px-4 py-1 border-2"> </td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr className="bg-yellow-200">
            <td className="px-4 py-1 border-2 font-bold">Total</td>
            <td className="px-4 py-1 border-2 font-bold"></td>
            <td className="px-4 py-1 border-2 font-bold text-center">
              {optionChain?.filtered.CE?.totOI}
            </td>
            <td className="px-4 py-1 border-2 font-bold text-center">
              {totalChangeInOI}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CEOptionAnalysisTable;
