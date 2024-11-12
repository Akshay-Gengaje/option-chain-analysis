export const getCallOptionsData = (ATM, optionData = [], selectedIndex) => {
  const diff = selectedIndex.instrument_key === "Nifty 50" ? 300 : 600;

  // Return the filtered and sorted data
  const filteredData = optionData?.filter((data) => {
    return data.strike_price > ATM - diff && data.strike_price < ATM + diff;
  });

  const callOptionsData = filteredData.map((option) => ({
    ...option.call_options,
    strike_price: option.strike_price, // Add strike price to the call options data
  }));

  const putOptionsData = filteredData.map((option) => ({
    ...option.put_options,
    strike_price: option.strike_price, // Add strike price to the put options data
  }));

  return { callOptionsData, putOptionsData };
  // .sort((a, b) => a.strike_price - b.strike_price); // Sort by strike_price in ascending order
};
