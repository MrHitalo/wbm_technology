import { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Doughnut, Bar } from "react-chartjs-2";
import ClipLoader from "react-spinners/ClipLoader";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TabelaDeErros from "../alimentadorPage/TabelaDeErrosAlimentador";
import { fetchAr } from "../../service/deviceService";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Ar() {
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
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<unknown>(null);

  const [dataDoughnut, setDataDoughnut] = useState<{
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      hoverBackgroundColor: string[];
    }[];
  } | null>(null);

  const erros = [
    { titulo: "Erro de conexão", detalhe: "Falha ao conectar ao servidor." },
    {
      titulo: "Sensor inativo",
      detalhe: "O sensor de temperatura não está respondendo.",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchAr();
        const barData = {
          labels: ["Temperatura"],
          datasets: [
            {
              label: "Temperatura (°C)",
              data: [
                response.find((item) => item.name === "Temperatura:")?.value ||
                  0,
              ],
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };

        const dataDoughnut = {
          labels: ["Ciclo"],
          datasets: [
            {
              data: [
                Number(
                  response.find((item) => item.name === "Quantidade de Ciclos")
                    ?.value || 0
                ),
              ],
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
          ],
        };

        setDataBar({
          ...barData,
          datasets: barData.datasets.map((dataset) => ({
            ...dataset,
            data: dataset.data.map((value) => Number(value)),
          })),
        });
        setDataDoughnut(dataDoughnut);
      } catch (error) {
        console.error(error);
        setError(error);
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

  if (error) {
    return (
      <div
        className="error-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
          color: "red",
          fontSize: "1.5rem",
        }}
      >
        <div>
          <p>Erro de Carregamento de Dados</p>
          <p>{error.toString()}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#36a2eb",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Recarrgar a Pagina
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {/* Card equipamento */}
      <div className="absolute right-0 ">
        <Card className="w-64 shadow-lg rounded-none border-b-emerald-400 border-l-emerald-400 border-3">
          <CardContent className="p-3 pt-1 flex flex-col items-center space-y-3">
            {/* <img
              src={valvulaAr}
              alt="Válvula de Ar"
              className="w-full h-36 object-contain"
            /> */}
            <h3 className="font-semibold text-lg text-center leading-snug">
              Válvula de Ar
            </h3>
            <Button className="w-full">Configurar</Button>
          </CardContent>
        </Card>
      </div>

      <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="max-w-5xl mx-auto space-y-4">
          {/* Gráfico de Temperatura */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            <Card>
              <CardContent className="p-4 flex flex-col items-center">
                <h2 className="font-bold text-lg mb-2 text-center">
                  Temperatura
                </h2>
                <div className="flex items-center justify-center w-full">
                  <div className="w-full h-64">
                    {dataBar ? (
                      <Bar data={dataBar} />
                    ) : (
                      <p>Carregando gráfico...</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráficos de Quantidade */}
          <Card className="mt-10">
            <CardContent className="p-4 flex flex-col items-center">
              <h2 className="font-bold text-lg mb-6 text-center">
                Quantidade De Ciclos
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-50">
                <div className="w-80 h-80">
                  {dataDoughnut ? (
                    <Doughnut data={dataDoughnut} />
                  ) : (
                    <p>Carregando gráfico...</p>
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
        </div>
      </div>
      <Footer />
    </>
  );
}
