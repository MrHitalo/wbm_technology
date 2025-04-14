import React, { useState } from "react";

// pequenos componentes
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Switch } from "../../components/ui/switch";
import valvulaGaveta from "../../assets/valvulaGaveta.png";

// grandes componentes
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TabelaDeErros from "../../components/TabelaDeErros";
import ConfiguracoesValvulaGaveta from "./ConfiguracoesValvulaGaveta";
import ModalConfiguracao from "../../components/ModalConfigurar";
import { CampoConfiguracao } from "../../components/ModalConfigurar";
import GraficoPosicao from "./GraficoPosicao";
import ConfiguracoesValvulaGavetaManual from "./ConfiguracoesValvulaGavetaManual";
import ModalSetpointManual from "../../components/ModalSetpointManual";


const erros = [
  { titulo: "Tempo excedido", detalhe: "Sem erro aparente" },
  { titulo: "Motor Não Funcionando", detalhe: "Erro detectado" },
  { titulo: "Sensor de Temperatura com Defeito", detalhe: "Erro detectado" },
  { titulo: "Motor Travou", detalhe: "Sem erro aparente" },
  { titulo: "Válvula sem Comunicação", detalhe: "Sem erro aparente" },
];

const campos: CampoConfiguracao[] = [
  { id: "valvula-id", label: "ID DA VÁLVULA", placeholder: "Ex: 001", tipo: "text" },
  { id: "hora-liga", label: "DEFINIR HORA A LIGAR", placeholder: "08:00", tipo: "time" },
  { id: "hora-desliga", label: "DEFINIR HORA A DESLIGAR", placeholder: "18:00", tipo: "time" },
  { id: "setpoint", label: "CONFIGURAR SETPOINT", placeholder: "8", tipo: "number" },
  { id: "tempo-aberto", label: "TEMPO ABERTO(s)", placeholder: "500", tipo: "number" },
  { id: "tempo-ciclo", label: "DURAÇÃO DO CICLO (min)", placeholder: "15", tipo: "number" },
];

export default function ValvulaGaveta() {
  const [modalAberto, setModalAberto] = useState(false);
  const [modalSetpointManualAberto, setModalSetpointManualAberto] = useState(false);
  const [setpointManualAtivo, setSetpointManualAtivo] = useState(false);

  return (
    <>
      <Navbar />
      {/* Card equipamento */}
      <div className="absolute right-0 ">
        <Card className="w-64 shadow-lg rounded-none border-3 border-emerald-400 border-t-0 border-r-0">
          <CardContent className="p-3 pt-1 flex flex-col items-center space-y-3">
            <img src={valvulaGaveta} alt="Alerta" className="w-full h-36 object-contain" />
            <h3 className="font-semibold text-lg text-center leading-snug">
              Control Flow Gate Valve
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
              <h1>{setpointManualAtivo ? "Setpoint Manual" : "Setpoint Automático"}</h1>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="min-h-screen bg-primary text-white p-4">
        <div className="max-w-5xl mx-auto space-y-4">
          {/* grafico de posição */}
          <div className="flex justify-center mt-10">
            <Card>
              <CardContent className="pb-4 pt-2 pl-25 pr-25 flex flex-col items-center">
                <GraficoPosicao />
              </CardContent>
            </Card>
          </div>

          {/* Configurações da Válvula */}
                    {setpointManualAtivo ? (
                      <ConfiguracoesValvulaGavetaManual />
                    ) : (
                      <ConfiguracoesValvulaGaveta />
                    )}

          {/* Nova Tabela de Erros */}
          <div className="mb-20">
            <TabelaDeErros tituloTabela="Erros da Válvula" erros={erros} />
          </div>

          {modalAberto && (<ModalConfiguracao closeModal={() => setModalAberto(false)} campos={campos}/>)}

          {modalSetpointManualAberto && (<ModalSetpointManual closeModal={() => setModalSetpointManualAberto(false)}/>)}

        </div>
      </div>
      <Footer />
    </>
  );
}
