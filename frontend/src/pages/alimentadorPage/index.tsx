import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChevronDown } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const COLORS = ["#00C49F", "#FF8042"];

const data1 = [
  { name: "Temperatura", value: 2040 },
  { name: "Restante", value: 960 },
];

const data2 = [
  { name: "Quantidade", value: 640 },
  { name: "Restante", value: 360 },
];

export default function Alimentador() {
  return (
    <>
          <Navbar />

    <div className="min-h-screen bg-gray-900 text-white p-4 space-y-4">

      <div className="grid grid-cols-1 gap-4">
        {/* Gráfico Temperatura */}
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <h2 className="font-bold text-lg mb-4">Temperatura</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={data1} dataKey="value" outerRadius={60}>
                  {data1.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico Quantidade */}
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <h2 className="font-bold text-lg mb-4">Quantidade</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={data2} dataKey="value" outerRadius={60}>
                  {data2.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Configurações do Alimentador */}
        <Card>
          <CardContent className="space-y-4">
            <h2 className="font-bold text-center text-lg">CONFIGURAÇÕES DO ALIMENTADOR</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <label>HORA LIGA CONFIGURADA</label>
                <div className="p-2 bg-gray-800 rounded">--:--</div>
              </div>
              <div className="space-y-1">
                <label>HORA DESLIGA CONFIGURADA</label>
                <div className="p-2 bg-gray-800 rounded">--:--</div>
              </div>
              <div className="space-y-1">
                <label>TEMPO CICLO</label>
                <div className="p-2 bg-gray-800 rounded">0</div>
              </div>
              <div className="space-y-1">
                <label>QUANTIDADE POR CICLO(KG)</label>
                <div className="p-2 bg-gray-800 rounded">0</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Erros */}
        <Card>
          <CardContent className="space-y-2 text-sm">
            <h2 className="font-bold text-center text-lg">Tabela de Erros</h2>
            <div className="grid grid-cols-2 gap-2">
              <div>Sem Conexão</div>
              <div className="text-right">✖</div>
              <div>Motor Não Funcionando</div>
              <div className="text-right">✖</div>
              <div>Sensor de Temperatura com Defeito</div>
              <div className="text-right">✖</div>
              <div>Motor Travou</div>
              <div className="text-right">✖</div>
              <div>Alimentador Trava</div>
              <div className="text-right">✖</div>
              <div>Alimentador Vazio</div>
              <div className="text-right">✖</div>
              <div>Alimentador Quantidade Baixa</div>
              <div className="text-right">✖</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    <Footer />
    </>
  );
}
