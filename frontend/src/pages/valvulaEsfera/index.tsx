import React from "react";

// pequenos componentes
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ScriptableContext, } from "chart.js";
import valvulaEsfera from "../../assets/valvulaEsfera.png";

// grandes componentes
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TabelaDeErros from "../../components/TabelaDeErros";
import ConfiguracoesValvulaEsfera from "./ConfiguracoesValvulaEsfera";
import ModalConfiguracao from "../../components/ModalConfigurar";
import { CampoConfiguracao } from "../../components/ModalConfigurar";

// imports de biblioteca
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Context as ChartDataLabelsContext } from 'chartjs-plugin-datalabels';
import { useState } from "react";
import GraficoPosicao from "./GraficoPosicaoEsfera";
import GraficoPosicaoEsfera from "./GraficoPosicaoEsfera";

ChartJS.register(ArcElement,Tooltip,Legend,BarElement,CategoryScale,LinearScale,ChartDataLabels);

const COLORS: string[] = [
  "rgb(140, 214, 16)",
  "rgb(239, 198, 0)",
  "rgb(231, 24, 49)",
];

function index(perc: number): number {
  return perc < 70 ? 0 : perc < 90 ? 1 : 2;
}

const value = 90; // Temperatura atual

const dataGauge = {
  labels: ["Usado"],
  datasets: [
    {
      data: [value, 100 - value],
      backgroundColor: (ctx: ScriptableContext<"doughnut">) => {
        if (ctx.dataIndex === 1) return "rgb(234, 234, 234)";
        return COLORS[index(ctx.raw as number)];
      },
      borderWidth: 0,
      cutout: "70%",
    },
  ],
};


const optionsGauge = {
  aspectRatio: 2,
  circumference: 180,
  rotation: -90,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
    datalabels: {
      display: false,
    },
  },
};


const erros = [
    { titulo: "Tempo excedido", detalhe: "11 válvulas" },
    { titulo: "Motor Não Funcionando", detalhe: "9 válvulas" },
    { titulo: "Sensor de Temperatura com Defeito", detalhe: "8 válvulas"},
    { titulo: "Motor Travou", detalhe: "7 válvulas" },
    { titulo: "Válvula sem Comunicação", detalhe: "7 válvulas" },
  ];

  const campos: CampoConfiguracao[] = [
    { id: "valvula-id", label: "ID DA VÁLVULA", placeholder: "Ex: 001", tipo: "text" },
    { id: "hora-liga", label: "DEFINIR HORA A LIGAR", placeholder: "08:00",tipo: "time" },
    { id: "hora-desliga", label: "DEFINIR HORA A DESLIGAR", placeholder: "18:00",tipo: "time" },
    { id: "setpoint", label: "CONFIGURAR SETPOINT",placeholder: "8", tipo: "number" },
    { id: "tempo-aberto", label: "TEMPO ABERTO(min)", placeholder: "500", tipo: "number" },
    { id: "tempo-ciclo", label: "DURAÇÃO DO CICLO (min)", placeholder: "15", tipo: "number" },
    { id: "quantidade-ciclos", label: "QUANTIDADE DE CICLOS", placeholder: "15", tipo: "number" },
    { id: "setpoint-manual", label: "SETPOINT MANUAL", placeholder: "15", tipo: "number" },
    ];




export default function ValvulaEsfera() {
  const [modalAberto, setModalAberto] = useState(false);
    
  return (
    <>
      <Navbar />
      {/* Card equipamento */}
      <div className="absolute right-0 ">
        <Card className="w-64 shadow-lg rounded-none border-3 border-emerald-400 border-t-0 border-r-0">
          <CardContent className="p-3 pt-1 flex flex-col items-center space-y-3">
            <img
              src={valvulaEsfera}
              alt="Alerta"
              className="w-full h-36 object-contain"
            />
            <h3 className="font-semibold text-lg text-center leading-snug">
              Control Flow Ball Valve
            </h3>
            <Button className="w-full" type="submit" onClick={() => setModalAberto(true)}>
                          Configurar
                        </Button>
          </CardContent>
        </Card>
      </div>

      <div className="min-h-screen bg-primary text-white p-4">
        <div className="max-w-5xl mx-auto space-y-4">
          {/* Gauge Chart de temperatura */}
                    <div className="flex justify-center mt-10">
                      <Card>
                        <CardContent className="pb-4 pt-2 px-10 flex flex-col items-center">
                            <GraficoPosicaoEsfera />     
                        </CardContent>
                      </Card>
                    </div>

                  {/* Configurações Da Valvula*/}
                  <ConfiguracoesValvulaEsfera />

                  {/* Nova Tabela de Erros*/}
                  <div className="mb-20">
                  <TabelaDeErros tituloTabela="Erros da Válvula" erros={erros} />
                  </div>

                  {modalAberto && <ModalConfiguracao closeModal={() => setModalAberto(false)} campos={campos} />}

        </div>
      </div>             
      <Footer />
    </>
  );
}
