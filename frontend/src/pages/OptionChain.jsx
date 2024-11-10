import React, { useState, useEffect } from "react";
import { useOptionChain } from "../context/OptionChainProvider";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import OptionChainTable from "../components/option-chain/OptionChainTable";
import CookieModel from "../components/cookie-model/CookieModel";

const OptionChain = () => {
  const { underlying, optionChain, loading, error, fetchOptionChain } =
    useOptionChain();
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
    <div className="mt-5 mx-10">
      <div className="flex justify-center gap-5">
        <h1 className="text-center text-xl font-bold my-3">
          Option Chain Data
        </h1>
      </div>

      {/* Select options: This part is always visible */}
      <div className="w-40">
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

      {/* Conditional rendering for loading, error, or the actual data */}
      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <div>
          <div className="flex gap-5">
            <p>
              <span className="font-bold">Underlying Value:</span> {underlying}
            </p>
            <p>
              <span className="font-bold">Updated At: &nbsp;</span>
              {optionChain?.records?.timestamp}
            </p>
          </div>
          <OptionChainTable
            data={optionChain.filtered.data}
            underlying={underlying}
          />
        </div>
      )}
    </div>
  );
};

export default OptionChain;
