const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();

// Configurações do dispositivo
const DEVICE_IP = "192.168.0.253";
const PORT = 502;
const SLAVE_ID = 1;
const START_REGISTER = 7;  // Endereço 40008
const NUM_REGISTERS = 12;  // Lê 12 registradores

console.log("teste");

client.connectTCP(DEVICE_IP, { port: PORT })
    // conexão
    .then(() => {
        client.setID(SLAVE_ID);
        console.log("Conectado. Iniciando leitura...\n");
        
        setInterval(() => {
            client.readHoldingRegisters(START_REGISTER, NUM_REGISTERS)
                .then(data => {
                    // Valores dos registradores 40008-40019
                    console.log("selecionado: ", data.data[0]);
                    console.log("Hora que liga:", data.data[1]);
                    console.log("Hora que desliga:", data.data[2]);
                    console.log("Quantidade",data.data[3]);
                    console.log("tempo de ciclo", data.data[4]);
                    console.log("tempo", data.data[5]);
                    console.log("erro",data.data[6]);
                    console.log("posição",data.data[7]);
                    console.log("horaA",data.data[8]);
                    console.log("minutoA",data.data[9]);
                    console.log("Quantidades",data.data[10]);
                    console.log("Quantidade Reservatório",data.data[11]);
                    console.log("\n");
                })
                .catch(err => {
                    console.error("Erro na leitura:", err.message);
                });
        }, 3000); // tempo em segundos
    })
    .catch(err => {
        console.error("Falha na conexão:", err.message);
    });