import React from "react";
import logoOfc from "../assets/LOGO-OFC-WBM.png"; // Caminho relativo correto

export default function Navbar() {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center w-full">
      {/* Logo + título */}
      <div className="flex items-center gap-3">
        <img src={logoOfc} alt="Logo WBM" className="h-20 w-auto" />
        <span className="text-gray-700 font-medium text-lg">Tela inicial WBM</span>
      </div>

      {/* Botão de ação */}
      <button className="bg-gray-800 hover:bg-gray-900 text-white font-medium px-4 py-2 rounded-md transition duration-200">
        Sair
      </button>
    </header>
  );
}
