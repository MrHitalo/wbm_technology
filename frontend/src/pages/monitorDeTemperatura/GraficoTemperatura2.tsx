import React, { useEffect } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Doughnut } from "react-chartjs-2";
import { ScriptableContext } from "chart.js";
import WebSocketManager from "../../service/webSocketManager";
import { useState } from "react";

interface TemperaturaData {
  temperatura?: {
    Temperatura_2?: number;
  };
}

const COLORS: string[] = [
  "rgb(140, 214, 16)",
  "rgb(239, 198, 0)",
  "rgb(231, 24, 49)",
];

function index(perc: number): number {
  return perc < 24 ? 0 : perc < 30 ? 1 : 2;
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

export default function GraficoTemperatura2() {
  const [temperatura, setTemperatura] = useState<{
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: ((ctx: ScriptableContext<"doughnut">) => string) | string[];
    }[];
  } | null>(null);

  useEffect(() => {
    const wsManager = WebSocketManager.getInstance();

    const handleData = (data: { temperatura?: { Temperatura_2?: number } }) => {
      if (data.temperatura && typeof data.temperatura.Temperatura_2 !== "undefined") {
        const temperatura = {
          labels: ["Temperatura Atual"],
          datasets: [
            {
              data: [data.temperatura.Temperatura_2, 35 - data.temperatura.Temperatura_2],
              backgroundColor: (ctx: ScriptableContext<"doughnut">) => {
                if (ctx.dataIndex === 1) return "#EAEAEA";
                return COLORS[index(temperatura.datasets[0].data[0])];
              },
            },
          ],
        };
        setTemperatura(temperatura);
      }
    };

    wsManager.subscribe("temperatura", handleData);

    return () => {
      wsManager.unsubscribe("temperatura", handleData);
    };
  }, []);

  return (
    <div className="GraficoTemperatura2">
      <h1 className="font-bold text-lg text-center">Temperatura 2</h1>
      {temperatura ? (
        <div className="w-80 h-52 flex flex-col items-center justify-center">
          <Doughnut className="mt-1" data={temperatura} options={optionsDoughnut} />
          <span className="font-bold text-4xl -mt-10">{temperatura.datasets[0].data[0]}°C</span>
        </div>
      ) : (
        <p className="text-gray-500 text-center">Carregando...</p>
      )}
    </div>
  );
}
