import React from "react";
import logoOfc from "../assets/LOGO-OFC-WBM.png"; // Caminho relativo correto
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center w-full ">
      {/* Logo + título */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo WBM" className="h-15 w-auto" />
      </div>

    </header>
  );
}
