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
  return (
    <div className="container px-4 py-8">
      <OptionSelector
        expiryData={expiryData}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        selectedExpiryDate={selectedExpiryDate}
        setSelectedExpiryDate={setSelectedExpiryDate}
        fetchOptionsContracts={fetchOptionsContracts}
      />
      <div className="flex gap-5">
        <p>
          <span className="font-bold">Last Traded Price : </span>
          {currentPrice}
        </p>
        <p>
          <span className="font-bold">Updated At :</span> {updatedAt}
        </p>
      </div>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      <div className="lg:flex w-full justify-around">
        <OptionTable optionsData={callOptionsData} ATM={ATM} type="Call" />
        <OptionTable optionsData={putOptionsData} ATM={ATM} type="Put" />
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
