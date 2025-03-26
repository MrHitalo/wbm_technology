const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();

// Configurações do cliente Modbus
const config = {
    ip: "192.168.0.210",
    port: 502,
    id: 99,
    tempo: 3000,    
    inicio: 0,      
    fim: 39         
};

const mapa_leitura = {
    esfera: {
        adress: 0,
        fields: [
            "Hora Ligada: ",
            "Hora Desligada: ",
            "Tempo Ciclo: ",
            "Tempo Aberto: ",
            "SetPoint: ",
            "Modo: ",
            "Quantidade de Ciclos: ",
            "Erro: ",
            "Posicao: "
        ]
    },
    gaveta: {
        adress: 9,
        fields: [
            "Hora Ligada: ",
            "Hora Desligada: ",
            "Tempo Ciclo: ",
            "Tempo Aberto: ",
            "SetPoint: ",
            "Modo: ",
            "Quantidade de Ciclos: ",
            "Erro: ",
            "Posicao: "
        ]
    },
    ar: {
        adress: 18,
        fields: [
            "Posicao: ",
            "Erro: ",
            "Temperatura: ",
            "Quantidade de Ciclos"
        ]
    },
    temperatura: {
        adress: 22,
        fields: [
            "Temperatura 1 : ",
            "Temperatura 2 : ",
            "Temperatura 3 : ",
            "Temperatura 4 : ",
            "Erro: "
        ]
    },
    umidade: {
        adress: 27,
        fields: [
            "Umidade: ",
            "Temperatura: ",
            "Erro: "
        ]
    },
    motor: {
        adress: 30,
        fields: [
            "Erro 1 : ",
            "Erro 2 : ",
            "Status: ",
            "Corrente: ",
            "Quantidade de Ciclos 1 : ",
            "Quantidade de Cilcos 2 : ",
            "Tempo Ciclo: ",
            "Tempo Ligado",
            "Modo: "
        ]
    }
};

const mapa_escrita = {
    esfera: {
        adress: 50,
        fields: [
            "Hora Liga",
            "Hora Desliga",
            "Tempo Ciclo",
            "Tempo aperto",
            "Setpoint",
            "Modo",
            "SetpointManual",
            "Hora",
            "Minuto"
        ]
    },
    gaveta: {
        adress: 59,
        fields: [
            "Hora Liga",
            "Hora Desliga",
            "Tempo Ciclo",
            "Tempo aperto",
            "Setpoint",
            "Modo",
            "SetpointManual",
            "Hora",
            "Minuto"
        ]
    },
    ar: {
        adress: 68,
        fields: [
            "SetPoint"
        ]
    },
    motor: {
        adress: 69,
        fields:[
            "Comando 1 : ",
            "Comando 2 : ",
            "Tempo Ciclo: ",
            "Tempo Ligado: ",
            "Modo: "
        ]
    }
}

async function conectarModbus() {
    try {
        await client.connectTCP(config.ip, { port: config.port });
        client.setID(config.id);
        console.log("Conectado ao Modulo Mestre");
    } catch (err) {
        console.error("Erro na conexão:", err.message);
    }
}


async function lerTodosDispositivos() {
    try {
        if (!client.isOpen) await conectarModbus();

        const respostaGeral = await client.readHoldingRegisters(0, 39);
        
        Object.entries(mapa_leitura).forEach(([nome, dispositivo]) => {
            const dados = {};
            dispositivo.fields.forEach((campo, index) => {
                dados[campo] = respostaGeral.data[dispositivo.adress + index];
            });
            
            console.log(`\n=== ${nome.toUpperCase()} ===`);
            Object.entries(dados).forEach(([campo, valor]) => {
                console.log(`${campo} ${valor}`);
            });
        });
    } catch (err) {
        console.error("Erro geral:", err.message);
    }
}

async function escreverDispositivo(dispositivo, field, valor){
    
    if (!client.isOpen) await conectarModbus();

    if(!mapa_escrita[dispositivo]) throw new Error("Dispositvo não encontrado!");


}

console.log("Iniciando cliente Modbus...");

setInterval(lerTodosDispositivos, config.tempo);
//escreverDispositivo("esfera", 0, 10);

process.on('SIGINT', () => {
    console.log("\nDesconectando...");
    client.close();
    process.exit();
});
