import moment from "moment";

function OptionSelector({
  expiryData,
  selectedIndex,
  setSelectedIndex,
  selectedExpiryDate,
  setSelectedExpiryDate,
  fetchOptionsContracts,
}) {
  // Get today's date using Moment.js, in "YYYY-MM-DD" format
  const today = moment().startOf("day"); // Start of the day to avoid time comparison issues

  // Function to filter expiry dates that are greater than or equal to today's date
  function getFilteredExpiryDates(index) {
    const expiryDates = expiryData[index].expiryDates;
    return expiryDates.filter((expiryDate) => {
      const [day, month, year] = expiryDate.split("-");

      // Convert expiryDate to a Moment object
      const expiry = moment(`${year}-${month}-${day}`, "YYYY-MMM-DD");

      // Compare expiry date with today's date
      return expiry.isSameOrAfter(today, "day"); // Compare only by day, ignoring time
    });
  }

  // Handle index change
  const handleIndexChange = (event) => {
    const selectedIndexValue = event.target.value;
    const instrument_key = expiryData[selectedIndexValue].instrument_key;

    // Update the selected index and instrument_key
    setSelectedIndex({
      name: selectedIndexValue,
      instrument_key: instrument_key,
    });

    // Get filtered expiry dates for the new index
    const filteredExpiryDates = getFilteredExpiryDates(selectedIndexValue);
    const newSelectedExpiryDate = filteredExpiryDates[0];

    // Update the expiry date and fetch options contracts
    setSelectedExpiryDate(newSelectedExpiryDate);
    fetchOptionsContracts({ name: selectedIndexValue, instrument_key }, newSelectedExpiryDate);
  };

  // Handle expiry date change
  const handleExpiryChange = (event) => {
    const newExpiryDate = event.target.value;
    setSelectedExpiryDate(newExpiryDate);
    fetchOptionsContracts(selectedIndex, newExpiryDate); // Fetch options contracts when expiry date changes
  };

  // Handle refresh button click
  const handleRefreshClick = () => {
    fetchOptionsContracts(selectedIndex, selectedExpiryDate);
  };

  return (
    <div className="p-6 max-w-md mx-auto flex gap-10 items-center">
      <div className="mb-4">
        <label
          htmlFor="index"
          className="block text-sm font-medium text-gray-700"
        >
          Select Index
        </label>
        <select
          id="index"
          value={selectedIndex.name} // Use selectedIndex.name for value
          onChange={handleIndexChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {Object.keys(expiryData).map((index) => (
            <option key={index} value={index}>
              {index} {/* Display the index name */}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="expiryDate"
          className="block text-sm font-medium text-gray-700"
        >
          Select Expiry Date
        </label>
        <select
          id="expiryDate"
          value={selectedExpiryDate}
          onChange={handleExpiryChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {getFilteredExpiryDates(selectedIndex.name).map(
            (expiryDate, index) => (
              <option key={index} value={expiryDate}>
                {expiryDate}
              </option>
            )
          )}
        </select>
      </div>

      {/* Refresh Button */}
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border
       border-blue-500 hover:border-transparent rounded"
        onClick={handleRefreshClick}
      >
        Refresh
      </button>
    </div>
  );
}

export default OptionSelector;
