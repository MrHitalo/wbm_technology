const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();

const config = {
  ip: "192.168.0.253",
  port: 502,
  Id: 1,
  start: 7,
  numRegisters: 12,
  interval: 1000,
};

client
  .connectTCP(config.ip, { port: config.port })

  .then(() => {
    client.setID(config.Id);
    console.log("Conectado. Iniciando leitura...\n");

    setInterval(() => {
      client
        .readHoldingRegisters(config.start, config.numRegisters)
        .then((data) => {
          console.log("selecionado: ", data.data[0]);
          console.log("Hora que liga:", data.data[1]);
          console.log("Hora que desliga:", data.data[2]);
          console.log("Quantidade", data.data[3]);
          console.log("tempo de ciclo", data.data[4]);
          console.log("tempo", data.data[5]);
          console.log("erro", data.data[6]);
          console.log("posição", data.data[7]);
          console.log("horaA", data.data[8]);
          console.log("minutoA", data.data[9]);
          console.log("Quantidades", data.data[10]);
          console.log("Quantidade Reservatório", data.data[11]);
          console.log("\n");
        })
        .catch((err) => {
          console.error("Erro na leitura:", err.message);
        });
    }, 3000);
  })
  .catch((err) => {
    console.error("Falha na conexão:", err.message);
  });
