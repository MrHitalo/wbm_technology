import { useEffect, useState } from "react";
import { connectWebSocketAr } from "../../service/deviceService";
import { Doughnut } from "react-chartjs-2";

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

export default function PosicaoAr() {
  const [dataDoughnut, setDataDoughnut] = useState({
    labels: ["Posição Atual", "Restante"],
    datasets: [
      {
        data: [0, 100],
        backgroundColor: ["#00C49F", "#EAEAEA"],
        hoverBackgroundColor: ["#00C49F", "#EAEAEA"],
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    const ws = connectWebSocketAr((data) => {
      try {
        console.log("Dados recebidos do WebSocket:", data);

        // Atualiza o gráfico de posição
        const posicao = data.ar?.Posicao || 0; // Certifique-se de que `Posicao` existe nos dados
        const doughnutData = {
          labels: ["Posição Atual", "Restante"],
          datasets: [
            {
              data: [posicao, 100 - posicao],
              backgroundColor: ["#00C49F", "#EAEAEA"],
              hoverBackgroundColor: ["#00C49F", "#EAEAEA"],
            },
          ],
        };

        setDataDoughnut(doughnutData);
        setError(null);
      } catch (err) {
        console.error("Erro ao processar dados do WebSocket:", err);
        setError("Erro ao processar dados do WebSocket.");
      } finally {
        setLoading(false);
      }
    });

    return () => {
      ws.close();
      console.log("Conexão WebSocket encerrada.");
    };
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="GraficoPosicao">
      <h2 className="font-bold text-lg mb-2 text-center">Posição Da Válvula</h2>
      <div className="w-80 h-52 flex flex-col items-center justify-center">
        <Doughnut className="mt-1" data={dataDoughnut} options={optionsGauge} />
        <span className="font-bold text-4xl -mt-10">
          {dataDoughnut.datasets[0].data[0]}%
        </span>
      </div>
    </div>
  );
}
