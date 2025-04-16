import React from "react";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <div className="w-full mt-auto bg-primary ">
      <footer className="text-center text-white py-3 ">
          <Link to="/" className="text-white no-underline hover:underline">
            Home
          </Link>
        <hr className="border-gray-400 mx-auto w-3/5 my-2" />
        <p className="mb-0 text-sm text-white flex items-center justify-center gap-1">
          <span>&copy;</span>
          <span>2025</span>
          <strong>WBM Technology</strong>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
