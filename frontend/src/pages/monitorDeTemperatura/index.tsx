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

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels
);

const dataTemperatura1 = {
  labels: ["Temperatura"],
  datasets: [
    {
      data: [30, 10],
      backgroundColor: ["#00C49F", "#FF4444"],
      borderWidth: 1,
    },
  ],
};

const dataTemperatura2 = {
  labels: ["Temperatura"],
  datasets: [
    {
      data: [2040, 960],
      backgroundColor: ["#00C49F", "#FF8042"],
      borderWidth: 1,
    },
  ],
};

const dataTemperatura3 = {
  labels: ["Temperatura"],
  datasets: [
    {
      data: [30, 10],
      backgroundColor: ["#00C49F", "#FF4444"],
      borderWidth: 1,
    },
  ],
};

const dataTemperatura4 = {
  labels: ["Temperatura"],
  datasets: [
    {
      data: [30, 10],
      backgroundColor: ["#00C49F", "#FF4444"],
      borderWidth: 1,
    },
  ],
};

const erros = [
  { titulo: "Sensor 1 desconectado", detalhe: "4 Monitores" },
  { titulo: "Sensor 2 desconectado", detalhe: "4 Monitores" },
  { titulo: "Sensor 3 desconectado", detalhe: "4 Monitores" },
  { titulo: "Sensor 4 desconectado", detalhe: "4 Monitores" },
  { titulo: "Alimentador sem comunicação", detalhe: "4 Monitores" },
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
            <Button className="w-full">Configurar</Button>
          </CardContent>
        </Card>
      </div>

      <div className="min-h-screen bg-primary text-white p-4">
        <div className="max-w-5xl mx-auto space-y-4">
          {/* Grafico de temperatura */}
          <div className="flex justify-center mt-10">
            <Card>
              <CardContent className="pb-4 pt-2 pl-25 pr-25 flex flex-col items-center">
                <h2 className="font-bold text-lg mb-2 text-center">
                  Temperatura 1
                </h2>
                <div className="flex items-center justify-center w-full">
                  <div className="w-64 h-64">
                    <Doughnut data={dataTemperatura1} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Graficos de Quantidade */}
          <Card className="mt-10">
            <CardContent className="p-4 flex flex-col items-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-50 ">
                <div className="w-80 h-80">
                  <h2 className="font-bold text-lg mb-2 text-center">
                    Temperatura 2
                  </h2>
                  <Doughnut data={dataTemperatura2} />
                </div>
                <div className="w-80 h-80">
                  <h2 className="font-bold text-lg mb-2 text-center">
                    Temperatura 3
                  </h2>
                  <Doughnut data={dataTemperatura3} />
                </div>
              </div>
              <div className="w-80 h-80 mb-10">
                <h2 className="font-bold text-lg pb-2 text-center">
                  Temperatura 4
                </h2>
                <Doughnut data={dataTemperatura3} />
              </div>
            </CardContent>
          </Card>

          <div className="mb-20">
            <TabelaDeErros tituloTabela="Erros da Válvula" erros={erros} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
