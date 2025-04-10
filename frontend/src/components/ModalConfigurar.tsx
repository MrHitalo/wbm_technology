import React from "react";
import { useState } from "react";
import BotaoFechar from "./BotaoFechar";
import { Button } from "./ui/button";




export type CampoConfiguracao = {
    label: string;
    placeholder: string;
    id: string;
    tipo: "text" | "time" | "number";
  };
  
  type ModalConfiguracaoProps = {
    closeModal: (open: boolean) => void;
    campos: CampoConfiguracao[];
  };
  
  const ModalConfiguracao = ({ closeModal, campos }: ModalConfiguracaoProps) => {
    const handleCloseModal = () => {
      closeModal(false);
    };
  
    // Decide layout: duas colunas se tiver mais de 5 campos
    const usarGridDuasColunas = campos.length > 5;
  
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-[32rem] shadow-2xl relative">
          {/* Botão de Fechar */}
          <BotaoFechar onClick={handleCloseModal} />
  
          {/* Inputs */}
          <form className={`mt-6 text-black ${usarGridDuasColunas ? 'grid grid-cols-2 gap-4' : 'flex flex-col gap-4'}`}>
            {campos.map((campo) => (
              <div className="flex flex-col" key={campo.id}>
                <label htmlFor={campo.id} className="scroll-mb-0.5 font-medium">{campo.label}</label>
                <input
                  id={campo.id}
                  type={campo.tipo}
                  placeholder={campo.placeholder}
                  className="border text-black border-gray-300 rounded px-3 py-2"
                />
              </div>
            ))}
  
            {/* Botão de enviar ocupa as 2 colunas se for grid */}
            <div className={usarGridDuasColunas ? "col-span-2" : ""}>
              <Button className="w-full mt-2" type="submit">
                Configurar
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default ModalConfiguracao;