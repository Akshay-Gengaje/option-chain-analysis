import React, { useState } from "react";
import { useFetchOptionsContracts } from "../../hooks/useFetchOptionsContracts";
import OptionSelector from "./OptionSelector";
import { expiryData } from "../../data/expiryData";
import { getATMStrikePrice } from "../../utils/getATMStrikePrice";
import { getCallOptionsData } from "../../utils/getCallOptionsData";
import OptionTable from "./OptionChainTable";
const OptionChain = () => {
  const [selectedIndex, setSelectedIndex] = useState({
    name: "NIFTY",
    instrument_key: "Nifty 50",
  });
  const [selectedExpiryDate, setSelectedExpiryDate] = useState(
    expiryData["NIFTY"].expiryDates[0]
  );
  const { optionsData, error, fetchOptionsContracts, currentPrice, updatedAt } =
    useFetchOptionsContracts();

  const ATM = getATMStrikePrice(currentPrice, selectedIndex);
  const { callOptionsData, putOptionsData } = getCallOptionsData(
    ATM,
    optionsData,
    selectedIndex
  );

  const callChangeInOIValues = callOptionsData.map(
    (option) =>
      (option?.market_data?.oi || 0) - (option?.market_data?.prev_oi || 0)
  );

  const putChangeInOIValues = putOptionsData.map(
    (option) =>
      (option?.market_data?.oi || 0) - (option?.market_data?.prev_oi || 0)
  );

  const callTotalChangeInOI = callChangeInOIValues.reduce((a, b) => a + b, 0);
  const putTotalChangeInOI = putChangeInOIValues.reduce((a, b) => a + b, 0);

  const callChangeInOIPercent =
    (callTotalChangeInOI / (callTotalChangeInOI + putTotalChangeInOI)) * 100 ||
    0;
  console.log(callChangeInOIValues);
  const putChangeInOIPercent =
    (putTotalChangeInOI / (callTotalChangeInOI + putTotalChangeInOI)) * 100 ||
    0;
  return (
    <div className=" px-4 py-2 w-full">
      <div className="flex items-center">
        <OptionSelector
          expiryData={expiryData}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          selectedExpiryDate={selectedExpiryDate}
          setSelectedExpiryDate={setSelectedExpiryDate}
          fetchOptionsContracts={fetchOptionsContracts}
        />
        <div className="flex gap-5 w-full">
          <p className="w-full">
            <span className="font-bold">Last Traded Price : </span>
            {currentPrice}
          </p>
          <p className="w-full">
            <span className="font-bold">Updated At :</span> {updatedAt}
          </p>
        </div>
      </div>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      <div className="lg:flex w-full lg:justify-evenly">
        <OptionTable
          optionsData={callOptionsData}
          ATM={ATM}
          type="Call"
          callTotalChangeInOI={callTotalChangeInOI}
          callChangeInOIPercent={callChangeInOIPercent}
        />
        <OptionTable
          optionsData={putOptionsData}
          ATM={ATM}
          type="Put"
          putTotalChangeInOI={putTotalChangeInOI}
          putChangeInOIPercent={putChangeInOIPercent}
        />
      </div>
      {optionsData.length === 0 && !error && (
        <p className="text-center text-gray-500 mt-4">
          No data available. Try fetching contracts.
        </p>
      )}
    </div>
  );
};

export default OptionChain;
