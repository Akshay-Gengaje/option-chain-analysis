import React, { useEffect, useState } from "react";
import CEOptionAnalysisTable from "./CEOptionAnalysisTable";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useOptionChain } from "../../context/OptionChainProvider";
import PEOptionAnalysisTable from "./PEOptionAnalysisTable";

const OptionAnalysis = () => {
  const { underlying, optionChain, fetchOptionChain } = useOptionChain();
  const [symbol, setSymbol] = useState(() => {
    // Check if there's a value in localStorage for 'index'
    const index = localStorage.getItem("index");
    // If there's no saved value, use NIFTY as the default
    return index ? JSON.parse(index) : "NIFTY";
  });

  // Fetch option chain whenever the symbol changes
  useEffect(() => {
    fetchOptionChain(symbol);
    localStorage.setItem("index", JSON.stringify(symbol));
  }, [symbol]); // Dependency array includes `symbol`

  return (
    <div>
      <div className="p-4 w-52">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Index</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={symbol}
            label="Index"
            onChange={(e) => setSymbol(e.target.value)} // Only set symbol here
          >
            <MenuItem value={"NIFTY"}>NIFTY</MenuItem>
            {/* Uncomment other MenuItems if needed */}
            {/* <MenuItem value={"NIFTYNXT50"}>NIFTYNXT50</MenuItem>
            <MenuItem value={"FINNIFTY"}>FINNIFTY</MenuItem> */}
            <MenuItem value={"BANKNIFTY"}>BANKNIFTY</MenuItem>
            {/* <MenuItem value={"MIDCPNIFTY"}>MIDCPNIFTY</MenuItem> */}
          </Select>
        </FormControl>
      </div>
      <div className="px-5 my-2 flex gap-5">
        <p>
          <span className="font-bold">Underlying Value:</span> {underlying}
        </p>
        <p>
          <span className="font-bold">Updated At: &nbsp;</span>
          {optionChain?.records?.timestamp}
        </p>
      </div>
      <div className="flex justify-evenly">
        <CEOptionAnalysisTable symbol={symbol} />
        <PEOptionAnalysisTable symbol={symbol} />
      </div>
    </div>
  );
};

export default OptionAnalysis;
