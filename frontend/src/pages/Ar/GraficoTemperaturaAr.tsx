// src/pages/Ar/GraficoTemperaturaAr.tsx

import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import WebSocketManager from "../../service/webSocketManager";
import { ScriptableContext } from "chart.js";

interface ArData {
  ar: {
    Temperatura: number;
  };
}

const COLORS: string[] = [
    "rgb(140, 214, 16)",
    "rgb(239, 198, 0)",
    "rgb(231, 24, 49)",
  ];
  
  function index(perc: number): number {
    return perc < 59 ? 0 : perc < 70 ? 1 : 2;
  }
  
const optionsDoughnut = {
    aspectRatio: 2,
  circumference: 180,
  rotation: -90,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
    datalabels: {
      display: false,
    },
  },
};

export default function GraficoTemperaturaAr() {
    const [dataDoughnut, setDataDoughnut] = useState<{
        labels: string[];
        datasets: {
          data: number[];
          backgroundColor: ((ctx: ScriptableContext<"doughnut">) => string) | string[];
          borderWidth: number;
        }[];
      } | null>(null);

  useEffect(() => {
    const webSocketManager = WebSocketManager.getInstance();
    webSocketManager.connect("ws://localhost:3000/ws/ar");

    const handleData = (data: ArData) => {
      const temperatura = data.ar.Temperatura;
      const maxTemp = 80; // valor máximo para a escala, pode ajustar conforme seu caso

      const chartData = {
        labels: ["Temperatura Atual", "Restante"],
        datasets: [
          {
            data: [temperatura, maxTemp - temperatura],
            backgroundColor: (ctx: ScriptableContext<"doughnut">) => {
                if (ctx.dataIndex === 1) return "#EAEAEA";
                return COLORS[index(temperatura)];
              },
            borderWidth: 1,
          },
        ],
      };

      setDataDoughnut(chartData);
    };

    webSocketManager.subscribe(handleData);

    return () => {
      webSocketManager.unsubscribe(handleData);
    };
  }, []);

  return (
    <>
      <div className="GraficoPosicao">
      <h2 className="font-bold text-lg mb-2 text-center">TEMPERATURA ATUAL</h2>
      <div className="w-80 h-52 flex flex-col items-center justify-center">
          {dataDoughnut ? (
            <>
            <Doughnut data={dataDoughnut} options={optionsDoughnut} />
            <span className="font-bold text-4xl -mt-10">
                {dataDoughnut.datasets?.[0]?.data?.[0]}°C
            </span>
            </>
          ) : (
            <p>Carregando dados de temperatura...</p>
          )}
        </div>
      </div>
    </>
  );
}
