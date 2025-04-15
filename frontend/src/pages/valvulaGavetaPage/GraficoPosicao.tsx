import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ScriptableContext, } from "chart.js";
import { Doughnut } from "react-chartjs-2";



function index(perc: number): number {
  return perc < 24 ? 0 : perc < 30 ? 1 : 2;
}

const value = 33; // Temperatura atual

const dataGauge = {
  labels: ["Posição atual"],
  datasets: [
    {
      data: [value, 100-value],
      backgroundColor: ["#00C49F", "#EAEAEA"],
      borderWidth: 1,
      cutout: "70%",
    },
  ],
};


const optionsGauge = {
  aspectRatio: 2,
  circumference: 180,
  rotation: -90,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true  },
    datalabels: {
      display: false,
    },
  },
};

export default function GraficoPosicao() {
    return(
                              <div className="GraficoPosicao">
                                <h2 className="font-bold text-lg mb-2 text-center">Posição Da Válvula</h2>
                                {/* <h1 className="font-normal text-lg  text-center text-black ">Temperatura 4</h1> */}
                                  <div className="w-80 h-52 flex flex-col items-center justify-center">
                                    <Doughnut className="mt-18" data={dataGauge} options={optionsGauge} />
                                      <span className="font-bold text-4xl -mt-10">{value + "%"}</span>
                                    </div>
                                  </div>       
                               
    )
}