import React, { useState } from "react";

const CookieModel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookieText, setCookieText] = useState("");

  // Function to handle saving cookie to localStorage
  const handleSaveCookie = () => {
    if (cookieText) {
      localStorage.setItem("authCookie", cookieText);
      setIsModalOpen(false);
      setCookieText(""); // Clear the input field
      alert("Cookie saved successfully!");
    }
  };

  return (
    <div >
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Add Cookie
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Enter Cookie
            </h2>
            <textarea
              value={cookieText}
              onChange={(e) => setCookieText(e.target.value)}
              placeholder="Paste your cookie here..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              rows="4"
            ></textarea>
            <div className="flex justify-end mt-4 space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCookie}
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Save Cookie
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookieModel;
