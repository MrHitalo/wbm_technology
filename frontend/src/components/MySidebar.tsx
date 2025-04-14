import React, { useState } from "react";
import { Home, Inbox, Calendar, Search, Settings, ChevronLeft, Wrench } from "lucide-react";
import logo from "../assets/logo.png"; // Caminho relativo correto
import { Link } from "react-router-dom";


export default function AppSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Sidebar fixa no lado esquerdo */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-white border-r border-gray-200
          transition-transform duration-300 z-10 w-64 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Cabeçalho com logo */}
        <div className="p-4 border-b border-gray-200 flex items-center gap-3">
          {isOpen && (
            <>
              <img src={logo} alt="Logo WBM" className="h-12 w-auto" />
            </>
          )}
        </div>

        {/* Menu de navegação */}
        <nav className="px-2 py-4">
          <ul className="space-y-1">
            <li>
              <Link
                to="/"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
              >
                <Home className="w-5 h-5" />
                {isOpen && <span>Home</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/Gaveta"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
              >
                <Wrench className="w-5 h-5" />
                {isOpen && <span>Control Flow Gate</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/Esfera"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
              >
                <Wrench className="w-5 h-5" />
                {isOpen && <span>Control Flow Ball</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/Ar"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
              >
                <Wrench className="w-5 h-5" />
                {isOpen && <span>Control Ar</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/alimentador"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
              >
                <Wrench className="w-5 h-5" />
                {isOpen && <span>Control Feed</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/monitorTemperatura"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
              >
                <Wrench className="w-5 h-5" />
                {isOpen && <span>TempMonitor</span>}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Botão de toggle, agora com seta para a esquerda */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            absolute top-4 right-[-20px] p-2 bg-white border border-gray-300
            hover:shadow-md rounded-full
          "
          aria-label="Toggle Sidebar"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
      </aside>
    </>
  );
}
