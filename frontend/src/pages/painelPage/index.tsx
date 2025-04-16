import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import logoWBM from "../../assets/LOGO-OFC-WBM.png";
import arImg from "../../assets/valvulaAr.png";
import gavetaImg from "../../assets/valvulaGaveta.png";
import esferaImg from "../../assets/valvulaEsfera.png";
import Footer from "../../components/Footer";
import MonitorTempImg from "../../assets/monitorTemperatura.png";
import IotControl from "../../assets/IOT_CONTROL_BRANCA.png";

export default function Painel() {
  const devices = [
    { name: "Esfera", description: "Control FLow Ball Valve", img: esferaImg },
    { name: "Gaveta", description: "Control Flow Gate Valve", img: gavetaImg },
    { name: "Ar", description: "Control Ar", img: arImg },
    {
      name: "MonitorTemperatura",
      description: "Iot TempMonitor",
      img: MonitorTempImg,
    },
    // {
    //   name: "Umidade",
    //   description: "Configuração da umidade",
    //   img: logoWBM,
    // },
  ];

  return (
    <>
      {/* <Navbar /> */}

      <div className="min-h-screen bg-primary text-white p-6 ">
      <div className="max-w-7xl mx-auto space-y-4">

       <div className="flex justify-center -mt-10 -mb-5 ">
          <img src={logoWBM} alt="Logo WBM" className="h-60 w-auto mr-15" />
          <img src={IotControl} alt="Iot Control" className="h-32 w-auto ml-15 mt-11" />
        </div> 

        <h1 className="text-3xl font-bold mb-9 text-center">Painel de Dispositivos</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {devices.map((device, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-8 text-center text-black flex flex-col justify-between h-108 w-auto"
            >
              <div className="mt-auto">
          <Link
            to={`/${device.name.toLowerCase()}`}
            className="bg-gradient-to-r from-primary to-gray-700 text-white font-semibold py-2 px-5 rounded-full shadow-md hover:brightness-110 transition duration-300 ease-in-out inline-block text-center"
          >
            Abrir Configuração
          </Link>
        </div>

              <div className="flex-1 flex items-center justify-center mb-4 font-medium text-2xl">
                <img
                  src={device.img || logoWBM}
                  alt={device.description || "Dispositivo sem nome"}
                  className="max-h-60 w-auto object-contain mt-8"
                />
              </div>
              <p className="font-medium text-xl">{device.description}</p>
            </div>
          ))}
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
