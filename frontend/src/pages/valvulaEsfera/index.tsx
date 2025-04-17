import React, { useState } from "react";

// pequenos componentes
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Switch } from "../../components/ui/switch";
import valvulaEsfera from "../../assets/valvulaEsfera.png";

// grandes componentes
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TabelaDeErros from "../../components/TabelaDeErros";
import ConfiguracoesValvulaEsfera from "./ConfiguracoesValvulaEsfera";
import ConfiguracoesValvulaEsferaManual from "./ConfiguracoesValvulaEsferaManual";
import ModalConfiguracao from "../../components/ModalConfigurar";
import ModalSetpointManual from "../../components/ModalSetpointManual";
import { CampoConfiguracao } from "../../components/ModalConfigurar";

// imports de biblioteca
import GraficoPosicaoEsfera from "./GraficoPosicaoEsfera";
import MySidebar from "../../components/MySidebar";
import GraficoErroEsfera from "./GraficoErroEsfera";
import BallValve from "../../assets/LOGO CONTROLFLOW_BALL_VALVEBRANCO.png"
import IotControl from "../../assets/IOT_CONTROL_BRANCA.png"


const erros = [
  { titulo: "ERRO 1: MOTOR NÃO FUNCIONOU", detalhe: "Sem erro aparente" },
  { titulo: "ERRO 2: TEMPO EXCEDIDO", detalhe: "Erro detectado" },
  { titulo: "ERRO 3: MOTOR TRAVADO", detalhe: "Erro detectado" },
  { titulo: "ERRO 4: SENSOR COM DEFEITO", detalhe: "Sem erro aparente" },
  { titulo: "ERRO 5: ALIMENTADOR SEM COMUNICAÇÃO", detalhe: "Sem erro aparente" },
];

const campos: CampoConfiguracao[] = [
  { id: "hora-liga", label: "DEFINIR HORA A LIGAR", placeholder: "08:00", tipo: "time" },
  { id: "hora-desliga", label: "DEFINIR HORA A DESLIGAR", placeholder: "18:00", tipo: "time" },
  { id: "setpoint", label: "CONFIGURAR SETPOINT", placeholder: "8", tipo: "number" },
  { id: "tempo-aberto", label: "TEMPO ABERTO(s)", placeholder: "500", tipo: "number" },
  { id: "tempo-ciclo", label: "DURAÇÃO DO CICLO (min)", placeholder: "15", tipo: "number" },
];

export default function ValvulaEsfera() {
  const [modalAberto, setModalAberto] = useState(false);
  const [modalSetpointManualAberto, setModalSetpointManualAberto] = useState(false);
  const [setpointManualAtivo, setSetpointManualAtivo] = useState(false);
  const [mostrarTabelaErros, setMostrarTabelaErros] = useState(false);


  return (
    <>
      <MySidebar />
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
            <Button
              className="w-full"
              type="submit"
              onClick={() =>
                setpointManualAtivo
                  ? setModalSetpointManualAberto(true)
                  : setModalAberto(true)
              }
            >
              Configurar
            </Button>
            <div className="flex justify-center mt-4">
              <Switch checked={setpointManualAtivo}
                onCheckedChange={setSetpointManualAtivo}
                className="mt-1 mr-4 scale-125">
              </Switch>
              <h1>{setpointManualAtivo ? "Modo Manual" : "Modo Automático"}</h1>
            </div>
            <div className="space-y-1 text-center col-span-2 mx-auto mt-5">
              <label className="block font-medium">Quantidade de ciclos</label>
              <div className="inline-block border-b border-gray-200 px-15 pb-0.5 space-y-1 text-center">2</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="min-h-screen bg-primary text-white p-4">
      <div className="flex justify-center items-center  mt-5 gap-10 w-full">
          <div className="h-33 flex items-center">
            <img
              src={BallValve}
              alt="Control Ar"
              className="max-h-full w-auto object-contain mt-11"
            />
          </div>
          <div className="h-24 flex items-center">
            <img
              src={IotControl}
              alt="Iot Control"
              className="max-h-full w-auto object-contain"
            />
          </div>
        </div>
        <div className="max-w-5xl mx-auto space-y-4">
          {/* Gauge Chart de temperatura */}
          <div className="flex justify-center mt-10 space-x-4">
            <Card className="flex-1">
              <CardContent className="pb-4 pt-2 px-10 flex flex-col items-center">
                <GraficoPosicaoEsfera />
              </CardContent>
            </Card>

            <Card className="flex-1">
              <CardContent className="pb-4 pt-2 px-10 flex flex-col items-center">
                <GraficoErroEsfera
                  mostrarTabelaErros={mostrarTabelaErros}
                  setMostrarTabelaErros={setMostrarTabelaErros}
                />
              </CardContent>
            </Card>

          </div>
    
          {/* Nova Tabela de Erros*/}
          {mostrarTabelaErros && (
            <div className="mb-20">
              <TabelaDeErros tituloTabela="Erros da Válvula" erros={erros} />
            </div>
          )}

          {/* Configurações da Válvula */}
          {setpointManualAtivo ? (
            <ConfiguracoesValvulaEsferaManual />
          ) : (
            <ConfiguracoesValvulaEsfera />
          )}

          {modalAberto && (<ModalConfiguracao closeModal={() => setModalAberto(false)} campos={campos} />)}

          {modalSetpointManualAberto && (<ModalSetpointManual closeModal={() => setModalSetpointManualAberto(false)} />)}
        </div>
      </div>
      <Footer />
    </>
  );
}
