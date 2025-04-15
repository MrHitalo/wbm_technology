import { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Bar } from "react-chartjs-2";
import ClipLoader from "react-spinners/ClipLoader";

import Footer from "../../components/Footer";
import TabelaDeErros from "../../components/TabelaDeErros";
import valvulaAr from "../../assets/valvulaAr.png";
import ModalConfiguracao from "../../components/ModalConfigurar";
import { CampoConfiguracao } from "../../components/ModalConfigurar";
import MySidebar from "../../components/MySidebar";
import GraficoLinhaTemperatura from "./GraficoTempEstatico";
import { connectWebSocketAr } from "../../service/deviceService";

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

  const [dataDoughnut, setDataDoughnut] = useState<{
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      hoverBackgroundColor: string[];
    }[];
  } | null>(null);

  const [loading, setLoading] = useState(true);

  const [erros, setErros] = useState([
    {
      titulo: "Status de conexão",
      detalhe: "Erro detectado",
    },
    {
      titulo: "Status do Sensor",
      detalhe: "Nenhum erro aparente",
    },
  ]);

  useEffect(() => {
    setLoading(true);

    const ws = connectWebSocketAr((data) => {
      const barData = {
        labels: ["Temperatura"],
        datasets: [
          {
            label: "Temperatura (°C)",
            data: [data.ar.Temperatura],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };

      setDataBar(barData);
      const posicao = data.ar.Posicao || 0;
      const doughnutData = {
        labels: ["Posição"],
        datasets: [
          {
            data: [posicao, 100 - posicao],
            backgroundColor: ["#FF6384", "#36A2EB"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB"],
          },
        ],
      };

      setDataDoughnut(doughnutData);
      setLoading(false);
    });

    return () => {
      ws.close();
      console.log("Conexão WebSocket encerrada.");
    };
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
      <MySidebar />
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

      <div className="min-h-screen bg-primary text-white p-1">
        <h1 className="text-3xl font-bold mb-6 text-center mt-5">Control Ar</h1>
        <div className="max-w-5xl mx-auto space-y-4">
          {/* Gráficos de Temperatura e Posição */}
          <div className="flex justify-center mt-10 space-x-4">
            {/* Gráfico de Temperatura */}
            <Card className="flex-1">
              <CardContent className="pb-0 pt-2 pl-20 pr-15 flex flex-col items-center">
                <h2 className="font-bold text-lg mb-2 text-center">
                  Temperatura
                </h2>
                <div className="flex items-center justify-center w-full mb-15 mr-1.5">
                  <div className="w-full h-60">
                    {dataBar ? (
                      <Bar data={dataBar} />
                    ) : (
                      <p>Erro ao trazer Dados...</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gráfico de Posição */}
            <Card className="flex-1">
              <CardContent className="pb-4 pt-2 pl-25 pr-25 flex flex-col items-center">
                <h2 className="font-bold text-lg mb-2 text-center">Posição</h2>
                {dataDoughnut ? <PosicaoAr /> : <p>Erro ao trazer Dados...</p>}
              </CardContent>
            </Card>
          </div>

          {/* Gráfico de Temperatura por Tempo */}
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <h2 className="font-bold text-xl mb-4 text-center">
                Temperatura por Tempo (24h)
              </h2>
              <GraficoLinhaTemperatura />
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

import React from "react";
import { Doughnut } from "react-chartjs-2";
import PosicaoAr from "./GraficoPosicaoAr";

interface GraficoPosicaoArProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      hoverBackgroundColor: string[];
    }[];
  };
}

const GraficoPosicaoArComponent: React.FC<GraficoPosicaoArProps> = ({
  data,
}) => {
  return <Doughnut data={data} />;
};

export { GraficoPosicaoArComponent };
