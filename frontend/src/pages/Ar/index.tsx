import { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Bar, Line } from "react-chartjs-2";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TabelaDeErros from "../../components/TabelaDeErros";
import valvulaAr from "../../assets/valvulaAr.png";
import ModalConfiguracao from "../../components/ModalConfigurar";
import { CampoConfiguracao } from "../../components/ModalConfigurar";
import GraficoPosicaoAr from "./GraficoPosicaoAr";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

const campos: CampoConfiguracao[] = [
  {
    id: "valvula-id",
    label: "ID DO SENSOR",
    placeholder: "Ex: S001",
    tipo: "text",
  },
  {
    id: "hora-liga",
    label: "INÍCIO DO CICLO",
    placeholder: "twatw",
    tipo: "time",
  },
  {
    id: "hora-desliga",
    label: "FIM DO CICLO",
    placeholder: "twatw",
    tipo: "time",
  },
  {
    id: "quantidade-ciclo",
    label: "DOSE POR CICLO (ml)",
    placeholder: "Ex: 301",
    tipo: "number",
  },
  {
    id: "tempo-ciclo",
    label: "DURAÇÃO DO CICLO (s)",
    placeholder: "Ex: 5",
    tipo: "number",
  },
];

export default function Ar() {
  const [modalAberto, setModalAberto] = useState(false);

  const [dataBar, setDataBar] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  } | null>(null);

  const [dataLine, setDataLine] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      tension: number;
      fill: boolean;
    }[];
  } | null>(null);

  const [dataDoughnut, setDataDoughnut] = useState<{
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      hoverBackgroundColor: string[];
    }[];
  } | null>(null);

  const [loading, setLoading] = useState(true);

  const lineOptions = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          stepSize: 1, // Define o intervalo entre os valores no eixo Y
          callback: function (value: number) {
            return Number.isInteger(value) ? value : null; // Exibe apenas valores inteiros
          },
        },
      },
    },
  };

  const [erros, setErros] = useState([
    {
      titulo: "Status de conexão",
      detalhe: "Falha ao conectar ao servidor.",
    },
    {
      titulo: "Status do Sensor",
      detalhe: "O sensor de temperatura não está respondendo.",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Simulação de dados para o gráfico de temperatura por tempo
        const simulatedResponse = Array.from({ length: 24 }, (_, i) => {
          // Temperatura base para o tanque de peixes
          const baseTemperature = 25; // Temperatura média em °C

          // Oscilação de temperatura em torno da base (±1.5°C)
          const variation = Math.random() * 3 - 1.5; // Gera valores entre -1.5 e +1.5

          return {
            name: `Temperatura ${i}:00`,
            value: parseInt((baseTemperature + variation).toFixed(1)), // Temperatura com 1 casa decimal
          };
        });

        const barData = {
          labels: ["Temperatura"],
          datasets: [
            {
              label: "Temperatura (°C)",
              data: [
                simulatedResponse.find(
                  (item) => item.name === "Temperatura 0:00"
                )?.value || 0,
              ],
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };

        const lineData = {
          labels: Array.from({ length: 24 }, (_, i) => `${i}:00`), // Horas de 0h a 23h
          datasets: [
            {
              label: "Temperatura por Tempo (°C)",
              data: simulatedResponse.map((item) => item.value), // Usa os valores simulados
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              tension: 0.4,
              fill: true,
            },
          ],
        };

        const lineOptions = {
          responsive: true,
          scales: {
            y: {
              ticks: {
                stepSize: 1, // Define o intervalo entre os valores no eixo Y
                callback: function (value: number) {
                  return Number.isInteger(value) ? value : null; // Exibe apenas valores inteiros
                },
              },
            },
          },
        };

        setDataBar({
          ...barData,
          datasets: barData.datasets.map((dataset) => ({
            ...dataset,
            data: dataset.data.map((value) => Number(value)),
          })),
        });
        setDataLine(lineData);

        setErros([
          {
            titulo: "Conexão",
            detalhe: "A conexão com o servidor está funcionando corretamente.",
          },
          {
            titulo: "Sensor",
            detalhe: "Os dados do sensor foram carregados com sucesso.",
          },
        ]);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);

        setErros([
          {
            titulo: "Conexão",
            detalhe:
              "Erro de conexão: Não foi possível estabelecer conexão com o servidor.",
          },
          {
            titulo: "Sensor",
            detalhe:
              "Erro no sensor: Não foi possível carregar os dados do sensor.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div
        className="loading-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ClipLoader color="#36a2eb" size={100} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {/* Card equipamento */}
      <div className="absolute right-0 ">
        <Card className="w-64 shadow-lg rounded-none border-3 border-emerald-400 border-t-0 border-r-0">
          <CardContent className="p-3 pt-1 flex flex-col items-center space-y-3">
            <img
              src={valvulaAr}
              alt="Válvula de Ar"
              className="w-full h-36 object-contain"
            />
            <h3 className="font-semibold text-lg text-center leading-snug">
              Válvula de Ar
            </h3>
            <Button
              className="w-full"
              type="submit"
              onClick={() => setModalAberto(true)}
            >
              Configurar
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="min-h-screen bg-primary text-white p-4">
        <div className="max-w-5xl mx-auto space-y-4">
          {/* Gráfico de Temperatura */}
          <div className="flex justify-center mt-10">
            <Card>
              <CardContent className="pb-1 pt-2 pl-25 pr-25 flex flex-col items-center">
                <h2 className="font-bold text-lg mb-2 text-center">
                  Temperatura
                </h2>
                <div className="flex items-center justify-center w-full">
                  <div className="w-70 h-70">
                    {dataBar ? (
                      <Bar data={dataBar} />
                    ) : (
                      <p>Erro ao trazer Dados...</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráficos de Posição */}
          <div className="flex justify-center mt-10">
            <Card>
              <CardContent className="pb-4 pt-2 pl-25 pr-25 flex flex-col items-center">
                <GraficoPosicaoAr />
              </CardContent>
            </Card>
          </div>

          {/* Gráfico de Temperatura por Tempo */}
          <Card>
            <CardContent className="p-1 flex flex-col items-center">
              <h2 className="font-bold text-lg mb-1 text-center">
                Temperatura por Tempo (24h)
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-0">
                <div
                  className="w-full h-64" // Ajusta a largura e altura do gráfico
                  style={{ maxWidth: "800px", margin: "0 auto" }} // Centraliza e estica o gráfico
                >
                  {dataLine ? (
                    <Line data={dataLine} options={lineOptions} />
                  ) : (
                    <p>Erro ao trazer dados...</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabela de Erros */}
          <div className="mb-20">
            <TabelaDeErros
              tituloTabela="Erros da Válvula de Ar"
              erros={erros}
            />
          </div>

          {modalAberto && (
            <ModalConfiguracao
              closeModal={() => setModalAberto(false)}
              campos={campos}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
