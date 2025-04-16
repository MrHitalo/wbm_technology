import React from "react";
import { useState } from "react";
import BotaoFechar from "./BotaoFechar";
import { Button } from "./ui/button";

interface ModalSetpointManualProps {
    closeModal: (value: boolean) => void;
}

const ModalSetpointManual: React.FC<ModalSetpointManualProps> = ({ closeModal }) => {
    const handleCloseModal = () => {
        closeModal(false);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[32rem] shadow-2xl relative">
                {/* Botão de Fechar */}
                <BotaoFechar onClick={handleCloseModal} />

                {/* Inputs */}
                <form className={`mt-6 text-black`}>
                    <div className="flex flex-col">
                        <label htmlFor="setpoint-manual" className="scroll-mb-0.5 font-medium">SETPOINT MANUAL</label>
                        <input
                            id="setpoint-manual"
                            type="number"
                            placeholder="8"
                            className="border text-black border-gray-300 rounded px-3 py-2"
                        />
                    </div>

                    <Button className="w-full mt-2" type="submit">
                        Configurar
                    </Button>

                </form>
            </div>
        </div>
    );
};

export default ModalSetpointManual;