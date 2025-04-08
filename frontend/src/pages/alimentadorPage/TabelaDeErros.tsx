import React from "react";
import { Eye } from "lucide-react";

type Erro = {
  titulo: string;
  detalhe: string;
  full?: boolean;
};

type Props = {
  tituloTabela?: string;
  erros: Erro[];
};

export default function TabelaDeErros({ tituloTabela = "Tabela de Erros", erros }: Props) {
  return (
    <div className="flex justify-center mt-20">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-5xl">
        <h4 className="text-lg font-bold text-gray-800">{tituloTabela}</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-4">
          {erros.map((erro, index) => (
            <div
              key={index}
              className={`flex justify-between items-center ${
                erro.full ? "md:col-span-2" : ""
              }`}
            >
              <div>
                <h6 className="text-sm font-semibold text-gray-900 mb-1">{erro.titulo}:</h6>
                <p className="text-sm text-gray-500">{erro.detalhe}</p>
              </div>
              <Eye className="text-gray-600 w-5 h-5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
