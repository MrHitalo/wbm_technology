import React, { useEffect, useState } from "react";
import logoOfc from "../../assets/LOGO-OFC-WBM.png";
import Navbar from "../../components/Navbar";
import { fetchTodos } from "../../service/deviceService";


export default function Painel() {
  const [devices, setDevices] = useState<{name: string ; value: any; }[]>([]);  // Estado para armazenar os dispositivos    
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento
  const [error, setError] = useState(""); // Estado para erros

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const data = await fetchTodos();   
        console.log("Dispositivos:", data);
        setDevices(data.map((device: { name: string; value: unknown }) => ({
          value: device.value,
          name: device.name || "Dispositivo sem nome", 
        })));
        setLoading(false); 
      } catch (err) {
        setError("Erro ao carregar os dispositivos."); 
        setLoading(false); 
      }
    };

    fetchDevices();
  }, []);

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
