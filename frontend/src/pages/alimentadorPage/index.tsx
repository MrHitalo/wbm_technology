import React from "react";
import { useState } from "react";

// componentes
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
// Removed unused import
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import alimentador from "../../assets/alimentador.png";
import ConfiguracoesAlimentador from "./ConfiguracoesAlimentador";


import ChartDataLabels from "chartjs-plugin-datalabels";
import { Context as ChartDataLabelsContext } from 'chartjs-plugin-datalabels';
import TabelaDeErros from "../../components/TabelaDeErros";
import ModalConfiguracao from "../../components/ModalConfigurar";
import { CampoConfiguracao } from "../../components/ModalConfigurar";



ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels);

const dataTemperatura = {
  labels: ["Temperatura"],
  datasets: [
    {
      data: [30, 10],
      backgroundColor: ["#00C49F", "#FF4444"],
      borderWidth: 1,
    },
  ],
};

const dataQuantidadeporc = {
    labels: ["Quantidade", "Restante"],
    datasets: [
      {
        data: [2040, 960],
        backgroundColor: ["#00C49F", "#FF8042"],
        borderWidth: 1,
      },
    ],
  };
  
  const optionsQuantidade = {
    plugins: {
      datalabels: {
        color: '#fff',
        formatter: (value: number, context: any) => {
          const data: number[] = context.chart.data.datasets[0].data;
          const total = data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
      } as any,
      legend: {
        position: 'bottom' as const,
        labels: {
          color: "#fff",
        },
      },
    },
  };
  

const dataQuantidade = {
  labels: ["Quantidade"],
  datasets: [
    {
      data: [2040, 960],
      backgroundColor: ["#00C49F", "#FF8042"],
      borderWidth: 1,
    },
  ],
};

/// Campos de erro do equipamento
const erros = [
  { titulo: "Sem Conexão", detalhe: "11 alimentadores" },
  { titulo: "Motor Não Funcionando", detalhe: "9 alimentadores" },
  { titulo: "Sensor de Temperatura com Defeito", detalhe: "8 alimentadores"},
  { titulo: "Motor Travou", detalhe: "7 alimentadores" },
  { titulo: "Alimentador Trava", detalhe: "6 alimentadores" },
  { titulo: "Alimentador Vazio", detalhe: "5 alimentadores" },
  { titulo: "Alimentador Quantidade Baixa", detalhe: "4 alimentadores" },
];

/// Campos de configuração do equipamento
const campos: CampoConfiguracao[] = [
  { id: "alimentador-id", label: "ID DO ALIMENTADOR", placeholder: "Ex:001", tipo: "text" },
  { id: "hora-liga", label: "DEFINIR HORA A LIGAR", placeholder: "08:00",tipo: "time" },
  { id: "hora-desliga", label: "DEFINIR HORA A DESLIGAR",placeholder: "18:00", tipo: "time" },
  { id: "quantidade-ciclo", label: "DOSE POR CICLO (g)", placeholder: "500", tipo: "number" },
  { id: "tempo-ciclo", label: "DURAÇÃO DO CICLO (min)", placeholder: "15", tipo: "number" },
];




export default function Alimentador() {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <>
      <Navbar />
      {/* Card equipamento */}
      <div className="absolute right-0 ">
        <Card className="w-64 shadow-lg rounded-none border-3 border-emerald-400 border-t-0 border-r-0">
          <CardContent className="p-3 pt-1 flex flex-col items-center space-y-3">
            <img
              src={alimentador}
              alt="Alerta"
              className="w-full h-36 object-contain"
            />
            <h3 className="font-semibold text-lg text-center leading-snug">
              Alimentador Control Feed
            </h3>
            <Button className="w-full" type="submit" onClick={() => setModalAberto(true)}>
              Configurar
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="min-h-screen bg-primary text-white p-4">
        <div className="max-w-5xl mx-auto space-y-4">
          {/* Grafico de temperatura */}
          <div className="flex justify-center mt-10">
            <Card>
              <CardContent className="pb-4 pt-2 pl-25 pr-25 flex flex-col items-center">
                <h2 className="font-bold text-lg mb-2 text-center">Temperatura</h2>
                <div className="flex items-center justify-center w-full">
                  <div className="w-64 h-64">
                    <Doughnut data={dataTemperatura} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>



          {/* Graficos de Quantidade */}
                  <Card className="mt-10">
                      <CardContent className="p-4 flex flex-col items-center">
                          <h2 className="font-bold text-lg mb-6 text-center">Quantidade</h2>
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-50">
                              <div className="w-80 h-80">
                                    <Doughnut data={dataQuantidadeporc} options={optionsQuantidade} />
                              </div>
                              <div className="w-80 h-80">
                                  <Doughnut data={dataQuantidade} />
                              </div>
                          </div>
                      </CardContent>
                  </Card>



            {/* Configurações Do Alimentador*/}
            <ConfiguracoesAlimentador />

            {/* Nova Tabela de Erros*/}
            <div className="mb-20">
            <TabelaDeErros tituloTabela="Erros do Alimentador" erros={erros} />
            </div>
           
            {modalAberto && <ModalConfiguracao closeModal={() => setModalAberto(false)} campos={campos} />}

        </div>
      </div>             
      <Footer />
    </>
  );
}
