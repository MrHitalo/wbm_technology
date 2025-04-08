import React from "react";
import logoOfc from "../../assets/LOGO-OFC-WBM.png";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import logo from "../../assets/logo.png";

const devices = [
  { name: "Control Flow Esfera" },
  { name: "Control Flow Gaveta" },
  { name: "Control Ar" },
  { name: "Monitor Umidade" },
  { name: "Alimentador Control-Feed" },
  { name: "Monitor Temperatura" },
];

export default function Painel() {
  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold mb-6">Painel de Dispositivos</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map((device, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-4 text-center text-black flex flex-col justify-between h-80"
            >
              <button className="bg-gray-800 text-white py-2 px-4 rounded-lg mb-4">
                Abrir Configurações
              </button>

              <div className="flex-1 flex items-center justify-center mb-4">
                <img
                  src={logoOfc}
                  alt={device.name}
                  className="max-h-32 object-contain"
                />
              </div>

              <p className="font-medium">{device.name}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
