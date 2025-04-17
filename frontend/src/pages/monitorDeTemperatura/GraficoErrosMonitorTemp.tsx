import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Switch } from "../../components/ui/switch";
import WebSocketManager from "../../service/webSocketManager";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ScriptableContext,
} from "chart.js";

ChartJS.register(ArcElement, Legend);

interface TemperaturaData {
  temperatura?: {
    Erro?: number;
  };
}

const dataGauge = (erro: number) => ({
  labels: [],
  datasets: [
    {
      data: [erro],
      backgroundColor: (ctx: ScriptableContext<"doughnut">) => {
        return ctx.dataIndex === 0 
          ? erro > 0 ? "rgb(231, 24, 49)" : "rgb(234, 234, 234)"
          : "#EAEAEA";
      },
      borderWidth: 0,
      cutout: "60%",
    },
  ],
});

const optionsGauge = {
  aspectRatio: 2,
  circumference: 360,
  rotation: -90,
  animation: false,
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
  const [erro, setErro] = useState<number>(0);

  useEffect(() => {
    const wsManager = WebSocketManager.getInstance();

    const handleData = (data: TemperaturaData) => {
      if (data.temperatura?.Erro !== undefined) {
        setErro(data.temperatura.Erro);
      }
    };

    wsManager.subscribe("temperatura", handleData);

    return () => {
      wsManager.unsubscribe("temperatura", handleData);
    };
  }, []);

  return (
    <div className="GraficoErroEsfera w-full">
      <h2 className="font-bold text-lg mb-2 text-center">Identificador de Erros</h2>

      <div className="relative w-96 h-60 flex items-center justify-center">
        <Doughnut className="mt-1" data={dataGauge(erro)} options={optionsGauge} />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-5xl text-center">
          {erro}
        </span>
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