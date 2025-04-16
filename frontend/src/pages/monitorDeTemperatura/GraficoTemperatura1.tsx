import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ScriptableContext, } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const COLORS: string[] = [
  "rgb(140, 214, 16)",
  "rgb(239, 198, 0)",
  "rgb(231, 24, 49)",
];

function index(perc: number): number {
  return perc < 24 ? 0 : perc < 30 ? 1 : 2;
}

const value = 22; // Temperatura atual

const dataGauge = {
  labels: ["Temperatura atual"],
  datasets: [
    {
      data: [value, 35 - value],
      backgroundColor: (ctx: ScriptableContext<"doughnut">) => {
        if (ctx.dataIndex === 1) return "rgb(234, 234, 234)";
        return COLORS[index(ctx.raw as number)];
      },

    },
  ],
};


const optionsGauge = {
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

export default function GraficoTemperatura1() {
    return(
                              <div className="GraficoTemperatura1">
                                <h1 className=" font-bold text-lg text-center">Temperatura 1</h1>
                                  <div className="w-80 h-52 flex flex-col items-center justify-center">
                                    <Doughnut className="mt-1" data={dataGauge} options={optionsGauge} />
                                      <span className="font-bold text-4xl -mt-10">{value + "°"}</span>
                                    </div>
                                  </div>       
                               
    )
}