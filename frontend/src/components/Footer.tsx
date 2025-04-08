import React from 'react';

const Footer = () => {
    return (
        <div className="container mx-auto mt-auto">
          <footer className="text-center text-black py-3">
            <nav>
              <a href="#" className="text-black no-underline hover:underline">
                Home
              </a>
            </nav>
            <hr className="border-gray-400 mx-auto w-1/2 my-2" />
            <p className="mb-0 text-sm text-black flex items-center justify-center gap-1">
              <span>&copy;</span>
              <span>2024</span>
              <strong>WBM Technology</strong>
            </p>
          </footer>
        </div>
      );
    };
    
    export default Footer;