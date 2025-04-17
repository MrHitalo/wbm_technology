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

export default function GraficoPosicaoGaveta() {
  const [posicao, setPosicao] = useState<{
    labels: string[];
    datasets: { data: number[]; backgroundColor: string[] }[];
  } | null>(null);

  useEffect(() => {
    const wsManager = WebSocketManager.getInstance();

    const handleData = (data: { gaveta?: { Posicao?: number } }) => {
      if (data.gaveta && typeof data.gaveta.Posicao !== "undefined") {
        const posicao = {
          labels: ["Posição Atual"],
          datasets: [
            {
              data: [data.gaveta.Posicao, 100 - data.gaveta.Posicao],
              backgroundColor: ["#00C49F", "#EAEAEA"],
            },
          ],
        };
        setPosicao(posicao);
      }
    };

    wsManager.subscribe("gaveta", handleData);

    return () => {
      wsManager.unsubscribe("gaveta", handleData);
    };
  }, []);

  return (
    <div className="GraficoPosicao">
      <h2 className="font-bold text-lg mb-2 text-center">POSIÇÃO DA GAVETA</h2>
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
