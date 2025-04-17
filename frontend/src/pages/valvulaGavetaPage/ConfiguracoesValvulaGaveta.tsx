import { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import WebSocketManager from "../../service/webSocketManager";

export default function ConfiguracoesValvulaGaveta() {
  const [gavetaData, setGavetaData] = useState<{
    HoraLigada: string;
    HoraDesligada: string;
    TempoCiclo: number;
    TempoAberto: number;
    SetPoint: number;
  } | null>(null);

  useEffect(() => {
    const ws = WebSocketManager.getInstance();
    ws.connect("ws://localhost:3000/ws/gaveta");

    const handleData = (data: { gaveta: typeof gavetaData }) => {
      if (data.gaveta) {
        console.log("Dados recebidos da gaveta:", data.gaveta);
        setGavetaData(data.gaveta);
      } else {
        console.warn("Dados inválidos recebidos:", data);
      }
    };

    ws.subscribe(handleData);

    return () => {
      ws.unsubscribe(handleData);
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-4 mt-15">
      <Card>
        <CardContent className="p-3">
          <h2 className="font-bold text-center text-lg mb-7">
            CONFIGURAÇÃO ATUAL
          </h2>

          <div className="grid grid-cols-2 gap-4 text-lg space-y-3">
            <div className="space-y-1 text-center">
              <label className="block font-medium">HORA LIGA CONFIGURADA</label>
              <div className="inline-block border-b border-gray-200 px-15 pb-0.5 space-y-1 text-center">
                {gavetaData?.HoraLigada ?? "Carregando..."}
              </div>
            </div>
            <div className="space-y-1 text-center">
              <label className="block font-medium">
                HORA DESLIGA CONFIGURADA
              </label>
              <div className="inline-block border-b border-gray-200 px-15 pb-0.5 space-y-1 text-center">
                {gavetaData?.HoraDesligada ?? "Carregando..."}
              </div>
            </div>
            <div className="space-y-1 text-center">
              <label className="block font-medium">TEMPO CICLO</label>
              <div className="inline-block border-b border-gray-200 px-15 pb-0.5 space-y-1 text-center">
                {gavetaData?.TempoCiclo ?? "Carregando..."}
              </div>
            </div>
            <div className="space-y-1 text-center">
              <label className="block font-medium">SETPOINT</label>
              <div className="inline-block border-b border-gray-200 px-15 pb-0.5 space-y-1 text-center">
                {gavetaData?.SetPoint ?? "Carregando..."}
              </div>
            </div>
            <div className="space-y-1 text-center col-span-2">
              <label className="block font-medium">
                TEMPO ABERTO CONFIGURADO
              </label>
              <div className="inline-block border-b border-gray-200 px-15 pb-0.5 text-center">
                {gavetaData?.TempoAberto ?? "Carregando..."}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
