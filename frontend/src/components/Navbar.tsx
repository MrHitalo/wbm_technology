import React from "react";
import logoWBM from "../assets/LOGO-OFC-WBM.png"; // Caminho relativo correto
import logo from "../assets/logo.png";
import IotControl from "../assets/Iot_Control.png"; // Caminho relativo correto

export default function Navbar() {
  return (
    <header className="bg-white shadow-md flex items-center w-full justify-center">
      {/* Logo + título */}
      <div className="flex justify-center -mt-5 -mb-10 ">
          <img src={logoWBM} alt="Logo WBM" className="h-60 w-auto mr-15" />
          <img src={IotControl} alt="Iot Control" className="h-32 w-auto ml-15 mt-10" />
        </div>

    </header>
  );
}
