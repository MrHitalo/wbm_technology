import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Doughnut, Bar } from "react-chartjs-2"; // Importa o gráfico de barras
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TabelaDeErros from "../../components/TabelaDeErros";
import ConfiguracoesAlimentador from "../alimentadorPage/ConfiguracoesAlimentador";
import { fetchAr } from "../../service/deviceService";
import valvulaAr from "../../assets/valvulaAr.png";
import ModalConfiguracao from "../../components/ModalConfigurar";
import { CampoConfiguracao } from "../../components/ModalConfigurar";

ChartJS.register(ArcElement, Tooltip, Legend);

const erros = [
  { titulo: "Erro de conexão", detalhe: "Falha ao conectar ao servidor." },
  {
    titulo: "Sensor inativo",
    detalhe: "O sensor de temperatura não está respondendo.",
  },
];

/// Campos de configuração do equipamento
const campos: CampoConfiguracao[] = [
  { id: "valvula-id", label: "ID DO SENSOR", placeholder: "Ex: S001", tipo: "text" },
  { id: "hora-liga", label: "INÍCIO DO CICLO", placeholder: "twatw",tipo: "time" },
  { id: "hora-desliga", label: "FIM DO CICLO",placeholder: "twatw", tipo: "time" },
  { id: "quantidade-ciclo", label: "DOSE POR CICLO (ml)", placeholder: "Ex: 301", tipo: "number" },
  { id: "tempo-ciclo", label: "DURAÇÃO DO CICLO (s)", placeholder: "Ex: 5", tipo: "number" },
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchAr();
        console.log(response);
        if (!response) {
          throw new Error("Erro ao buscar os dados");
        }

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
              data: response.map((item) => item.value as number),
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
          ],
        };
        setDataBar(barData);
        setDataDoughnut(dataDoughnut);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error.toString()}</div>;
  }

  return (
    <>
      <Navbar />
      {/* Card equipamento */}
      <div className="absolute right-0 ">
        <Card className="w-64 shadow-lg rounded-none border-b-emerald-400 border-l-emerald-400 border-3">
          <CardContent className="p-3 pt-1 flex flex-col items-center space-y-3">
            { <img
              src={valvulaAr}
              alt="Válvula de Ar"
              className="w-full h-36 object-contain"
            /> }
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
                  <Doughnut data={dataDoughnut} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configurações da Válvula */}
          <ConfiguracoesAlimentador />

          {/* Tabela de Erros */}
          <div className="mb-20">
            <TabelaDeErros
              tituloTabela="Erros da Válvula de Ar"
              erros={erros}
            />
          </div>

          
          {modalAberto && <ModalConfiguracao closeModal={() => setModalAberto(false)} campos={campos} />}

        </div>
      </div>
      <Footer />
    </>
  );
}
