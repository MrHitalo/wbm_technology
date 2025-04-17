import { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import WebSocketManager from "../../service/webSocketManager";

export default function ConfiguracoesValvulaEsfera() {
  const [esferaData, setEsferaData] = useState<{
    HoraLigada: string;
    HoraDesligada: string;
    TempoCiclo: number;
    TempoAberto: number;
    SetPoint: number;
  } | null>(null);

  const [posicao, setPosicao] = useState<{
    labels: string[];
    datasets: { data: number[]; backgroundColor: string[] }[];
  } | null>(null);

  useEffect(() => {
    const ws = WebSocketManager.getInstance();
    ws.connect("ws://localhost:3000/ws/esfera");

    const handleData = (data: { esfera?: { Posicao?: number } }) => {
      console.log("Dados recebidos:", data); // Log para depuração

      if (data.esfera && typeof data.esfera.Posicao !== "undefined") {
        console.log("Posição da esfera recebida:", data.esfera.Posicao); // Log para depuração

        const posicao = {
          labels: ["Posição Atual"],
          datasets: [
            {
              data: [data.esfera.Posicao, 100 - data.esfera.Posicao],
              backgroundColor: ["#00C49F", "#EAEAEA"],
            },
          ],
        };
        setPosicao(posicao);
      } else {
        console.warn("Dados inválidos ou incompletos recebidos:", data);
      }
    };

    ws.subscribe("config",handleData);

    return () => {
      ws.unsubscribe("config",handleData);
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-4 mt-15">
      <Card>
        <CardContent className="p-3">
          <h2 className="font-bold text-center text-lg mb-7">
            CONFIGURAÇÃO ATUAL DA VÁLVULA ESFERA
          </h2>

          <div className="grid grid-cols-2 gap-4 text-lg space-y-3">
            <div className="space-y-1 text-center">
              <label className="block font-medium">HORA LIGA CONFIGURADA</label>
              <div className="inline-block border-b border-gray-200 px-15 pb-0.5 space-y-1 text-center">
                {esferaData?.HoraLigada ?? "Carregando..."}
              </div>
            </div>
            <div className="space-y-1 text-center">
              <label className="block font-medium">
                HORA DESLIGA CONFIGURADA
              </label>
              <div className="inline-block border-b border-gray-200 px-15 pb-0.5 space-y-1 text-center">
                {esferaData?.HoraDesligada ?? "Carregando..."}
              </div>
            </div>
            <div className="space-y-1 text-center">
              <label className="block font-medium">TEMPO CICLO</label>
              <div className="inline-block border-b border-gray-200 px-15 pb-0.5 space-y-1 text-center">
                {esferaData?.TempoCiclo ?? "Carregando..."}
              </div>
            </div>
            <div className="space-y-1 text-center">
              <label className="block font-medium">SETPOINT</label>
              <div className="inline-block border-b border-gray-200 px-15 pb-0.5 space-y-1 text-center">
                {esferaData?.SetPoint ?? "Carregando..."}
              </div>
            </div>
            <div className="space-y-1 text-center col-span-2">
              <label className="block font-medium">
                TEMPO ABERTO CONFIGURADO
              </label>
              <div className="inline-block border-b border-gray-200 px-15 pb-0.5 text-center">
                {esferaData?.TempoAberto ?? "Carregando..."}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
