import ModbusRTU from "modbus-serial";
const client = new ModbusRTU();

export default {
    conectarModbus,
    lerTodosDispositivos,
    escreverDispositivo,
    lerEsfera,
    lerGaveta,
    lerAr
};

const config = {
    ip: "192.168.0.240",
    port: 502,
    id: 99,
    tempo: 2000,
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
        fields: [
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

        const dadosFormatados = {};

        Object.entries(mapa_leitura).forEach(([nomeDispositivo, dispositivo]) => {
            dadosFormatados[nomeDispositivo] = {};

            dispositivo.fields.forEach((campo, index) => {
                const endereco = dispositivo.adress + index;
                dadosFormatados[nomeDispositivo][campo.trim()] = respostaGeral.data[endereco];
            });
        });

        const esfera = await lerEsfera();
        const gaveta = await lerGaveta();
        const ar = await lerAr();

        return { ...dadosFormatados, esfera, gaveta, ar };

    } catch (err) {
        console.error("Erro geral:", err.message);
    }
}

async function lerEsfera() {
    try {
      
      const response = await client.readHoldingRegisters(0, 8);
  
      const dadosEsfera = {};
    
      mapa_leitura.esfera.fields.forEach((campo, index) => {;
        dadosEsfera[campo.trim()] = response.data[index];
      });
  
      return dadosEsfera;
      
    } catch (err) {
      console.error("Erro ao ler esfera:", err.message);
      throw err;
    }
  }

async function lerGaveta() {
    try {


        const response = await client.readHoldingRegisters(9, 17);

        const dadosGaveta = {};

        mapa_leitura.gaveta.fields.forEach((campo, index) => {
            dadosGaveta[campo.trim()] = response.data[index];
        });

        return dadosGaveta;

    } catch (err) {
        console.error("Erro ao ler gaveta:", err.message);
        throw err;
    }
}

async function lerAr() {
    try {

        const response = await client.readHoldingRegisters(18,21);
        const dadosAr = {};

        mapa_leitura.ar.fields.forEach((campo, index) => {
            dadosAr[campo.trim()] = response.data[index];
        });

        return dadosAr;

    } catch (err) {
        console.error("Erro ao ler ar:", err.message);
        throw err;
    }
}

async function escreverDispositivo(dispositivo, config, valor) {
    try {
        if (!mapa_escrita[dispositivo]) {
            console.error(`Dispositivo "${dispositivo}" não encontrado!`);
            return;
        }

        if (!client.isOpen) await conectarModbus();

        const campos = mapa_escrita[dispositivo].fields;
        const index = campos.indexOf(config);

        if (index === -1) {
            console.error(`Configuração "${config}" não existe no dispositivo ${dispositivo}!`);
            return;
        }

        const registrador = mapa_escrita[dispositivo].adress + index;

        await client.writeRegister(registrador, valor);
        console.log(`Valor ${valor} escrito com sucesso no registrador ${registrador} (${dispositivo} - ${config})`);

    } catch (err) {
        console.error("Erro ao tentar escrever:", err.message);
    }
}

console.log("Iniciando cliente Modbus...");
setInterval(lerTodosDispositivos, config.tempo);


process.on('SIGINT', () => {
    console.log("\nDesconectando...");
    client.close();
    process.exit();
});
