import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { fetchAr } from "../../service/deviceService";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ScriptableContext,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

function index(perc: number): number {
  return perc < 24 ? 0 : perc < 30 ? 1 : 2;
}

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

export default function DadosAr() {
  const [dados, setDados] = useState<{ name: string; value: number }[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    interface ArItem {
      name: string;
      value: string | number;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = (await fetchAr()) as {
          name: string;
          value: string | number;
        }[]; // Chama a função fetchAr
        const validatedResponse = response.map((item: ArItem) => ({
          name: item.name,
          value: Number(item.value),
        })); // Valida e converte o valor para número
        setDados(validatedResponse); // Armazena os dados no estado
        setError(null); // Limpa qualquer erro anterior
      } catch (err) {
        console.error("Erro ao buscar dados do ar:", err);
        setError("Erro ao buscar dados do ar.");
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchData();
  }, []); // Executa apenas uma vez ao montar o componente

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const value = Number(
    dados?.find((item) => item.name === "Posicao:")?.value || 0
  );

  const dataGauge = {
    labels: ["Posição atual"],
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: ["#00C49F", "#EAEAEA"],
        borderWidth: 1,
        cutout: "70%",
      },
    ],
  };

  return (
    <div className="GraficoPosicao">
      <h2 className="font-bold text-lg mb-2 text-center">Posição Da Válvula</h2>
      <div className="w-80 h-52 flex flex-col items-center justify-center">
        <Doughnut className="mt-1" data={dataGauge} options={optionsGauge} />
        <span className="font-bold text-4xl -mt-10">{value + "%"}</span>
      </div>
    </div>
  );
}
