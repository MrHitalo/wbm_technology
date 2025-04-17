import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import WebSocketManager from "../../service/webSocketManager";

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

export default function GraficoPosicaoEsfera() {
  const [posicao, setPosicao] = useState<{
    labels: string[];
    datasets: { data: number[]; backgroundColor: string[] }[];
  } | null>(null);

  useEffect(() => {
    const wsManager = WebSocketManager.getInstance();

    const handleData = (data: { esfera?: { Posicao?: number } }) => {
      if (data.esfera && typeof data.esfera.Posicao !== "undefined") {
        const posicao = {
          labels: ["Posição Atual"],
          datasets: [
            {
              data: [data.esfera.Posicao, 100 - data.esfera.Posicao],
              backgroundColor: ["#00C49F", "#EAEAEA"],
            },
          ],
        };
        setPosicao(posicao);
      }
    };

    wsManager.subscribe("esfera", handleData);

    return () => {
      wsManager.unsubscribe("esfera", handleData);
    };
  }, []);

  return (
    <div className="GraficoPosicao">
      <h2 className="font-bold text-lg mb-2 text-center">POSIÇÃO DA ESFERA</h2>
      <div className="w-80 h-52 flex flex-col items-center justify-center">
        {posicao ? (
          <>
            <Doughnut className="mt-18" data={posicao} options={optionsGauge} />
            <span className="font-bold text-4xl -mt-10">
              {posicao.datasets[0].data[0]}%
            </span>
          </>
        ) : (
          <span className="text-gray-500">Carregando dados...</span>
        )}
      </div>
    </div>
  );
}
