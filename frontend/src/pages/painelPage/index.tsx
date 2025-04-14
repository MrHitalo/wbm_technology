import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import logoWBM from "../../assets/LOGO-OFC-WBM.png";
import arImg from "../../assets/valvulaAr.png";
import gavetaImg from "../../assets/valvulaGaveta.png";
import esferaImg from "../../assets/valvulaEsfera.png";

export default function Painel() {
  const devices = [
    { name: "Esfera", description: "Configuração da esfera", img: esferaImg },
    { name: "Gaveta", description: "Configuração da gaveta", img: gavetaImg },
    { name: "Ar", description: "Configuração do ar", img: arImg },
    {
      name: "Temperatura",
      description: "Configuração da temperatura",
      img: logoWBM,
    },
    {
      name: "Umidade",
      description: "Configuração da umidade",
      img: logoWBM,
    },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-primary text-white p-6 ">
      <div className="max-w-6xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Painel de Dispositivos</h1>

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
                  src={device.img || logoWBM}
                  alt={device.name || "Dispositivo sem nome"}
                  className="max-h-32 object-contain"
                />
              </div>
              <p className="font-medium">{device.name}</p>
            </div>
          ))}
        </div>
        </div>
      </div>
    </>
  );
}
