import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import ClipLoader from "react-spinners/ClipLoader";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

export default function GraficoLinhaTemperatura() {
  const [dataLine, setDataLine] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      const simulatedResponse = Array.from({ length: 24 }, (_, i) => {
        const baseTemperature = 25;
        const variation = Math.random() * 3 - 1.5;
        return {
          name: `Temperatura ${i}:00`,
          value: parseFloat((baseTemperature + variation).toFixed(1)),
        };
      });

      const lineData = {
        labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
        datasets: [
          {
            label: "Temperatura por Tempo (°C)",
            data: simulatedResponse.map((item) => item.value),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            tension: 0.4,
            fill: true,
          },
        ],
      };

      setDataLine(lineData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 10,
        max: 40,
        ticks: {
          stepSize: 0.5,
          callback: function (value: number) {
            return value.toFixed(1);
          },
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ClipLoader color="#36a2eb" size={60} />
      </div>
    );
  }

  return (
    <div className="w-full" style={{ height: "500px" }}>
      <div
        className="w-full"
        style={{
          height: "500px",
          width: "90vw",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {dataLine ? (
          <Line data={dataLine} options={options} />
        ) : (
          <p>Erro ao carregar gráfico.</p>
        )}
      </div>
    </div>
  );
}
