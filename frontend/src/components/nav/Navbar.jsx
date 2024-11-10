import React, { useState } from "react";
import { Link } from "react-router-dom";
import CookieModel from "../cookie-model/CookieModel";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black p-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Option Analysis
        </Link>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`md:flex md:items-center space-x-2 ${
            isOpen ? "" : "hidden"
          }`}
        >
          <Link
            to="/"
            className="text-white md:ml-4 block mt-2 md:mt-0 hover:text-gray-300"
          >
            Option Analysis
          </Link>
          <Link
            to="/optionChain"
            className="text-white md:ml-4 block mt-2 md:mt-0 hover:text-gray-300"
          >
            Option Chain
          </Link>
          <Link
            to="/contact"
            className="text-white md:ml-4 block mt-2 md:mt-0 hover:text-gray-300"
          >
            Contact
          </Link>

          <CookieModel />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
