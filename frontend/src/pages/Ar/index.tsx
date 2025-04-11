import { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Doughnut, Bar } from "react-chartjs-2";
import ClipLoader from "react-spinners/ClipLoader";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TabelaDeErros from "../../components/TabelaDeErros";
<<<<<<< HEAD
=======
import ConfiguracoesAlimentador from "../alimentadorPage/ConfiguracoesAlimentador";
>>>>>>> 2f56472c49a68ca540d7460934969eb064428a14
import { fetchAr } from "../../service/deviceService";
import valvulaAr from "../../assets/valvulaAr.png";
import ModalConfiguracao from "../../components/ModalConfigurar";
import { CampoConfiguracao } from "../../components/ModalConfigurar";

ChartJS.register(ArcElement, Tooltip, Legend);

<<<<<<< HEAD
const campos: CampoConfiguracao[] = [
=======
const erros = [
  { titulo: "Erro de conexão", detalhe: "Falha ao conectar ao servidor." },
>>>>>>> 2f56472c49a68ca540d7460934969eb064428a14
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

<<<<<<< HEAD
=======
/// Campos de configuração do equipamento
const campos: CampoConfiguracao[] = [
  { id: "valvula-id", label: "ID DO SENSOR", placeholder: "Ex: S001", tipo: "text" },
  { id: "hora-liga", label: "INÍCIO DO CICLO", placeholder: "twatw",tipo: "time" },
  { id: "hora-desliga", label: "FIM DO CICLO",placeholder: "twatw", tipo: "time" },
  { id: "quantidade-ciclo", label: "DOSE POR CICLO (ml)", placeholder: "Ex: 301", tipo: "number" },
  { id: "tempo-ciclo", label: "DURAÇÃO DO CICLO (s)", placeholder: "Ex: 5", tipo: "number" },
];

>>>>>>> 2f56472c49a68ca540d7460934969eb064428a14
export default function Ar() {
  const [modalAberto, setModalAberto] = useState(false);

<<<<<<< HEAD
=======
  const [modalAberto, setModalAberto] = useState(false);
    
>>>>>>> 2f56472c49a68ca540d7460934969eb064428a14
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
        <Card className="w-64 shadow-lg rounded-none border-3 border-emerald-400 border-t-0 border-r-0">
          <CardContent className="p-3 pt-1 flex flex-col items-center space-y-3">
            {
              <img
                src={valvulaAr}
                alt="Válvula de Ar"
                className="w-full h-36 object-contain"
              />
            }
            <h3 className="font-semibold text-lg text-center leading-snug">
              Válvula de Ar
            </h3>
            <Button className="w-full" type="submit" onClick={() => setModalAberto(true)}>
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
                        <CardContent className="pb-4 pt-2 pl-25 pr-25 flex flex-col items-center">
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
