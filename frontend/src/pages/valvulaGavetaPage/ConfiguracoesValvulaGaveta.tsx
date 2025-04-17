import { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import WebSocketManager from "../../service/webSocketManager";

interface GavetaData {
  HoraLigada: string;
  HoraDesligada: string;
  TempoCiclo: number;
  TempoAberto: number;
  SetPoint: number;
}

export default function ConfiguracoesValvulaGaveta() {
  const [gavetaData, setGavetaData] = useState<GavetaData | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento

  useEffect(() => {
    const ws = WebSocketManager.getInstance();

    const handleData = (data: { gaveta?: GavetaData }) => {
      if (data.gaveta) {
        console.log("Dados recebidos da gaveta:", data.gaveta);
        setGavetaData(data.gaveta);
        setIsLoading(false); // Dados carregados
      } else {
        console.warn("Dados inválidos recebidos:", data);
      }
    };

    ws.subscribe("gaveta", handleData);

    return () => {
      ws.unsubscribe("gaveta", handleData);
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-4 mt-15">
      <Card>
        <CardContent className="p-3">
          <h2 className="font-bold text-center text-lg mb-7">
            CONFIGURAÇÃO ATUAL
          </h2>

          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="grid grid-cols-2 gap-4 text-lg space-y-3">
              <InfoItem
                label="HORA LIGA CONFIGURADA"
                value={gavetaData?.HoraLigada}
              />
              <InfoItem
                label="HORA DESLIGA CONFIGURADA"
                value={gavetaData?.HoraDesligada}
              />
              <InfoItem label="TEMPO CICLO" value={gavetaData?.TempoCiclo} />
              <InfoItem label="SETPOINT" value={gavetaData?.SetPoint} />
              <InfoItem
                label="TEMPO ABERTO CONFIGURADO"
                value={gavetaData?.TempoAberto}
                fullWidth
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

interface InfoItemProps {
  label: string;
  value: string | number | undefined;
  fullWidth?: boolean;
}

function InfoItem({ label, value, fullWidth }: InfoItemProps) {
  return (
    <div className={`space-y-1 text-center ${fullWidth ? "col-span-2" : ""}`}>
      <label className="block font-medium">{label}</label>
      <div className="inline-block border-b border-gray-200 px-15 pb-0.5 text-center">
        {value ?? "Carregando..."}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 text-lg space-y-3 animate-pulse">
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem fullWidth />
    </div>
  );
}

function SkeletonItem({ fullWidth }: { fullWidth?: boolean }) {
  return (
    <div className={`space-y-1 text-center ${fullWidth ? "col-span-2" : ""}`}>
      <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
      <div className="h-6 bg-gray-200 rounded w-full"></div>
    </div>
  );
}
