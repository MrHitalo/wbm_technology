import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Switch } from "../../components/ui/switch";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ScriptableContext,
} from "chart.js";

ChartJS.register(ArcElement, Legend);

const value = 2; // Temperatura atual

const dataGauge = {
  labels: [],
  datasets: [
    {
      data: [1], 
      backgroundColor: (ctx: ScriptableContext<"doughnut">) => {
        return value < 1 ? "rgb(234, 234, 234)" : "rgb(231, 24, 49)";
      },
      borderWidth: 0,
      cutout: "70%",
    },
  ],
};

const optionsGauge = {
  aspectRatio: 2,
  circumference: 360,
  rotation: -90,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
    datalabels: {
      display: false,
    },
  },
};

export default function GraficoErrosTemp({
  mostrarTabelaErros,
  setMostrarTabelaErros,
}: {
  mostrarTabelaErros: boolean;
  setMostrarTabelaErros: (value: boolean) => void;
}) {
  return (
    <div className="GraficoErroEsfera">
      <h2 className="font-bold text-lg mb-2 text-center">Identificador de Erros</h2>
      <div className="w-96 h-60 flex flex-col items-center justify-center">
        <Doughnut className="mt-1" data={dataGauge} options={optionsGauge} />
        <span className="absolute top-[123.5%] font-bold text-5xl">{value}</span>
      </div>
      <div className="flex items-center justify-center mt-4 space-x-2">
      <Switch
        checked={mostrarTabelaErros}
        onCheckedChange={setMostrarTabelaErros}
        className="scale-125"
      />
      <span className="text-md text-black font-medium pl-2">
        Tabela de Erros
      </span>
    </div>
  </div>
  );
}