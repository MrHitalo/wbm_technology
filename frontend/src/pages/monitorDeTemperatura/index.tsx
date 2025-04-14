import React from "react";

// pequenos componentes
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import monitorTemperatura from "../../assets/monitorTemperatura.png";

// grandes componentes
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// imports de biblioteca
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Context as ChartDataLabelsContext } from "chartjs-plugin-datalabels";
import TabelaDeErros from "../../components/TabelaDeErros";
import GraficoTemperatura1 from "./GraficoTemperatura1";
import GraficoTemperatura2 from "./GraficoTemperatura2";
import GraficoTemperatura3 from "./GraficoTemperatura3";
import GraficoTemperatura4 from "./GraficoTemperatura4";

const erros = [
  { titulo: "Sensor 1 desconectado", detalhe: "Sem erro aparente" },
  { titulo: "Sensor 2 desconectado", detalhe: "Erro detectado" },
  { titulo: "Sensor 3 desconectado", detalhe: "Erro detectado" },
  { titulo: "Sensor 4 desconectado", detalhe: "Sem erro aparente" },
  { titulo: "Alimentador sem comunicação", detalhe: "Sem erro aparente" },
];

export default function MonitorDeTemperatura() {
  return (
    <>
      <Navbar />
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
        <div className="max-w-5xl mx-auto space-y-4">
          {/* Grafico de temperatura 1 */}
          <div className="flex justify-center mt-10">
            <Card>
              <CardContent className="pb-4 pt-2 pl-25 pr-25 flex flex-col items-center">
                <GraficoTemperatura1 />
              </CardContent>
            </Card>
          </div>

          {/* Graficos de Temperatura */}
          <Card className="mt-10">
            <CardContent className="p-4 flex flex-col items-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-50 ">
                <GraficoTemperatura2 />
                <GraficoTemperatura3 />
              </div>
              <GraficoTemperatura4 />
            </CardContent>
          </Card>

          <div className="mb-20">
            <TabelaDeErros tituloTabela="Erros da Válvula" erros={erros} />
          </div>

          <div className="mb-20">
            <TabelaDeErros tituloTabela="Erros da Válvula" erros={erros} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
