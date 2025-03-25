const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();

// Configurações do cliente Modbus
const config = {
    ip: "192.168.0.210",
    port: 502,
    id: 99,
    tempo: 3000,    // Intervalo de polling em ms
    inicio: 0,      // Parâmetro opcional para filtro
    fim: 39         // Parâmetro opcional para filtro
};

// Mapeamento dos dispositivos e registradores
const mapa_registrador = {
    esfera: {
        end_register: 8,
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
        end_register: 17,
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
        end_register: 21,
        fields: [
            "Posicao: ",
            "Erro: ",
            "Temperatura: ",
            "Quantidade de Ciclos"
        ]
    },
    temperatura: {
        end_register: 24,
        fields: [
            "Temperatura 1 : ",
            "Temperatura 2 : ",
            "Temperatura 3 : ",
            "Temperatura 4 : ",
            "Erro: "
        ]
    },
    umidade: {
        end_register: 29,
        fields: [
            "Umidade: ",
            "Temperatura: ",
            "Erro: "
        ]
    },
    motor: {
        end_register: 38,
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

// Função de conexão com o dispositivo Modbus
async function conectarModbus() {
    try {
        await client.connectTCP(config.ip, { port: config.port });
        client.setID(config.id);
        console.log("Conectado ao Modulo Mestre");
    } catch (err) {
        console.error("Erro na conexão:", err.message);
    }
}

// Função para ler dados de um dispositivo específico
async function lerDispositivo(dispositivo) {
    try {
        const startAddress = dispositivo.end_register;
        const quantity = dispositivo.fields.length;
        
        // Fazer a leitura dos registradores
        const resposta = await client.readHoldingRegisters(startAddress, quantity);
        
        // Mapear os valores para os campos
        const dados = {};
        resposta.data.forEach((valor, index) => {
            dados[dispositivo.fields[index]] = valor;
        });
        
        return dados;
    } catch (err) {
        console.error(`Erro na leitura:`, err.message);
        return null;
    }
}

// Função principal para ler todos os dispositivos
async function lerTodosDispositivos() {
    try {
        // Verificar e reconectar se necessário
        if (!client.isOpen) {
            await conectarModbus();
        }

        // Iterar por todos os dispositivos do mapa
        for (const [nomeDispositivo, dispositivo] of Object.entries(mapa_registrador)) {
            const dados = await lerDispositivo(dispositivo);
            
            if (dados) {
                console.log(`\n=== ${nomeDispositivo.toUpperCase()} ===`);
                Object.entries(dados).forEach(([campo, valor]) => {
                    console.log(`${campo} ${valor}`);
                });
            }
        }
    } catch (err) {
        console.error("Erro geral:", err.message);
    }
}

// Iniciar o ciclo de leitura
console.log("Iniciando cliente Modbus...");
setInterval(lerTodosDispositivos, config.tempo);

// Lidar com encerramento
process.on('SIGINT', () => {
    console.log("\nDesconectando...");
    client.close();
    process.exit();
});