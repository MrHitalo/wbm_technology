const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();

const config = {
    ip: "192.168.0.210",
    port: 502,
    id: 99,
    tempo: 3000,
    inicio: 0,
    fim: 39,
}

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
        fields:[
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

client.connectTCP(config.ip, { port: config.port })
    .then(() => {
        client.setID(config.id);
        console.log("Conectado. Iniciando leitura...\n");

        setInterval(() => {
            client.readHoldingRegisters(mapa_registrador.inicio,
                                        mapa_registrador.fim
            ).then(data => {
                for(let i = mapa_registrador.inicio; i < mapa_registrador.fim; i++ ){
                    for(let i = 0; i < mapa_registrador[i]; i++){
                        console.log(mapa_registrador);
                    }
                }

            })
            .catch(err => {
                console.error("Erro na leitura!", err.message);
            });
    }, config.tempo); 
    })
    .catch(err => {
        console.error("Falha na conexão:", err.message);
    });