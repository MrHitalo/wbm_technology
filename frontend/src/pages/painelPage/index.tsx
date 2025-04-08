import { Link } from "react-router-dom";
import logoOfc from "../../assets/LOGO-OFC-WBM.png";
import Navbar from "../../components/Navbar";

export default function Painel() {
  const devices = [
    { name: "Esfera", description: "Configuração da esfera" },
    { name: "Gaveta", description: "Configuração da gaveta" },
    { name: "Ar", description: "Configuração do ar" },
    { name: "Temperatura", description: "Configuração da temperatura" },
    { name: "Umidade", description: "Configuração da umidade" },
    { name: "Motor", description: "Configuração do motor" },
  ];

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
              <Link
                to={`/${device.name.toLowerCase()}`} 
                className="bg-gray-800 text-white py-2 px-4 rounded-lg mb-4 block text-center"
                >
                  Abrir Configuração
              </Link>

              <div className="flex-1 flex items-center justify-center mb-4">
                <img
                  src={logoOfc}
                  alt={device.name || "Dispositivo sem nome"}
                  className="max-h-32 object-contain"
                />
              </div>
              <p className="font-medium">{device.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
