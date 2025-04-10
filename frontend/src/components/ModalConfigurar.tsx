import React from "react";
import { useState } from "react";
import BotaoFechar from "./BotaoFechar";
import { Button } from "./Button";




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


  return (
<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div className="bg-white rounded-lg p-6 w-96 shadow-2xl relative">

        {/* Botão de Fechar */}
        <BotaoFechar onClick={handleCloseModal} />


        {/* Inputs */}
              <form className="flex flex-col gap-4 mt-6 text-black">
              {campos.map((campo) => (
              <div className="flex flex-col" key={campo.id}>

                  <label htmlFor={campo.id} className="scroll-mb-0.5 font-medium">{campo.label}</label>
                  <input
                      id= {campo.id}
                      type= {campo.tipo}
                      placeholder= {campo.placeholder}
                      className="border text-black border-gray-300 rounded px-3 py-2"
                  />
                  </div>
              ))}

                  <Button className="w-full" type="submit">
                      Configurar
                  </Button>
              </form>
      </div>
    </div>
  );
}
  export default ModalConfiguracao;