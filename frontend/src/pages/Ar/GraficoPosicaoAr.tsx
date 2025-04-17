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

export default function PosicaoAr({
  setQuantidadeCiclos,
}: {
  setQuantidadeCiclos: (value: number) => void;
}) {
  const [data, setData] = useState<{
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  } | null>(null);

  useEffect(() => {
    const webSocketManager = WebSocketManager.getInstance();
    webSocketManager.connect("ws://localhost:3000/ws/ar");

    interface ArData {
      ar: {
        Temperatura: number;
        Posicao: number;
      };
      ciclos: number;
    }

    const handleData = (data: ArData) => {
      const doughnutData = {
        labels: ["Posição Atual"],
        datasets: [
          {
            data: [data.ar.Posicao, 100 - data.ar.Posicao],
            backgroundColor: ["#00C49F", "#EAEAEA"],
          },
        ],
      };
      setData(doughnutData);
      if (data.ciclos !== undefined) {
        setQuantidadeCiclos(data.ciclos);
      }
    };

    webSocketManager.subscribe("posicao",handleData);

    return () => {
      webSocketManager.unsubscribe("posicao",handleData);
    };
  }, [setQuantidadeCiclos]);

  return (
    <div className="GraficoPosicao">
      <h2 className="font-bold text-lg mb-2 text-center">POSIÇÃO DA VÁLVULA</h2>
      <div className="w-80 h-52 flex flex-col items-center justify-center">
        {data ? (
          <>
            <Doughnut className="mt-1" data={data} options={optionsGauge} />
            <span className="font-bold text-4xl -mt-10">
              {data.datasets[0].data[0]}%
            </span>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
}
