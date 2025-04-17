import React from "react";

// pequenos componentes
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import monitorTemperatura from "../../assets/monitorTemperatura.png";

// grandes componentes
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TabelaDeErros from "../../components/TabelaDeErros";
import GraficoTemperatura1 from "./GraficoTemperatura1";
import GraficoTemperatura2 from "./GraficoTemperatura2";
import GraficoTemperatura3 from "./GraficoTemperatura3";
import GraficoTemperatura4 from "./GraficoTemperatura4";
import MySidebar from "../../components/MySidebar";
import GraficoErrosTemp from "./GraficoErrosMonitorTemp";
import { useState } from "react";
import IotControl from "../../assets/IOT_CONTROL_BRANCA.png"
import TempMonitor from "../../assets/IoT_TEMP_MONITOR_BRANCO.png"

const erros = [
  { titulo: "ERRO 1: SENSOR 1 DESCONECTADO", detalhe: "Sem erro aparente" },
  { titulo: "ERRO 2: SENSOR 2 DESCONECTADO", detalhe: "Erro detectado" },
  { titulo: "ERRO 3: SENSOR 3 DESCONECTADO", detalhe: "Erro detectado" },
  { titulo: "ERRO 4: SENSOR 4 DESCONECTADO", detalhe: "Sem erro aparente" },
  { titulo: "ERRO 5: ALIMENTADOR SEM COMUNICAÇÃO", detalhe: "Sem erro aparente" },
];

export default function MonitorDeTemperatura() {
  const [mostrarTabelaErros, setMostrarTabelaErros] = useState(false);

  return (
    <>
      <MySidebar />
      {/* Card equipamento */}
      <div className="absolute right-0 ">
        <Card className="w-64 shadow-lg rounded-none border-3 border-emerald-400 border-t-0 border-r-0">
          <CardContent className="p-3 pt-1 flex flex-col items-center space-y-3">
            <img
              src={monitorTemperatura}
              alt="Alerta"
              className="w-full h-36 object-contain"
            />
            <h3 className="font-semibold text-lg text-center leading-snug">
              Monitor de temperatura
            </h3>
          </CardContent>
        </Card>
      </div>

      <div className="min-h-screen bg-primary text-white p-4">
        <div className="flex justify-center items-center mt-13 gap-10 w-full">
          <div className="h-24 flex items-center">
            <img
              src={TempMonitor}
              alt="TempMonitor"
              className="max-h-full w-auto object-contain"
            />
          </div>
          <div className="h-24 flex items-center">
            <img
              src={IotControl}
              alt="Iot Control"
              className="max-h-full w-auto object-contain mb-9"
            />
          </div>
        </div>
        <div className="max-w-5xl mx-auto space-y-4 mt-11">
          {/* Graficos de Temperatura */}
          <Card className="mt-10">
            <CardContent className="p-4 flex flex-col items-center">
              <h2 className="font-bold text-xl mb-8 text-center">
                GRÁFICOS DA TEMPERATURA ATUAL
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-50 ">
                <GraficoTemperatura1 />
                <GraficoTemperatura2 />
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-50 mt-10">

                <GraficoTemperatura3 />
                <GraficoTemperatura4 />
              </div>

            </CardContent>
          </Card>

          {/* Grafico de erro */}
          <div className="flex justify-center mt-10 space-x-4">
            <Card>
              <CardContent className="pb-4 pt-2 px-10 flex flex-col items-center">
                <GraficoErrosTemp
                  mostrarTabelaErros={mostrarTabelaErros}
                  setMostrarTabelaErros={setMostrarTabelaErros}
                />
              </CardContent>
            </Card>
          </div>


          {/* Nova Tabela de Erros*/}
          {mostrarTabelaErros && (
            <div className="mb-20">
              <TabelaDeErros tituloTabela="Erros da Válvula" erros={erros} />
            </div>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
}
