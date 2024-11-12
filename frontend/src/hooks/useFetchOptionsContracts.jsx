import { useState } from "react";
import moment from "moment";
import apiClient from "../api/apiClient";

export const useFetchOptionsContracts = () => {
  const [optionsData, setOptionsData] = useState([]);
  const [error, setError] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [updatedAt, setUpdatedAt] = useState("");
  const fetchOptionsContracts = async (selectedIndex, selectedExpiryDate) => {
    setError("");

    if (!selectedIndex || !selectedIndex.instrument_key) {
      setError("Instrument key is required");
      return;
    }

    const params = {
      instrument_key: `NSE_INDEX|${selectedIndex.instrument_key}`,
      expiry_date: moment(selectedExpiryDate, "DD-MMM-YYYY").format(
        "YYYY-MM-DD"
      ),
    };

    try {
      const response = await apiClient.get("/option/chain", { params });
      // const currentPrice = await apiClient.get("/market-quote/quotes", {
      //   params: { instrument_key: params.instrument_key },
      // });

      setCurrentPrice(response.data.data[0].underlying_spot_price);
      setUpdatedAt(
        moment(new Date()).format("DD MMM YYYY HH:mm:ss").toString()
      );
      setOptionsData(response.data.data || []);
    } catch (err) {
      setError(
        "Failed to fetch option contracts. Please check your parameters and try again."
      );
    }
  };

  return { optionsData, error, fetchOptionsContracts, currentPrice, updatedAt };
};
