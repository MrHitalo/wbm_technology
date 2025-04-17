import ModbusRTU from "modbus-serial";
const client = new ModbusRTU();

export default {
  conectarModbus,
  lerTodosDispositivos,
  escreverDispositivo,
  lerEsfera,
  lerGaveta,
  lerAr,
  lerTemperatura,
  lerUmidade,
};

const config = {
  ip: "192.168.0.240",
  port: 502,
  id: 99,
  tempo: 500,
  inicio: 0,
  fim: 39,
};

const mapa_leitura = {
  esfera: {
    adress: 0,
    fields: [
      "HoraLigada",
      "HoraDesligada",
      "TempoCiclo",
      "TempoAberto",
      "SetPoint",
      "Modo",
      "Ciclos",
      "Erro",
      "Posicao",
    ],
  },
  gaveta: {
    adress: 9,
    fields: [
      "HoraLigada",
      "HoraDesligada",
      "TempoCiclo",
      "TempoAberto",
      "SetPoint",
      "Modo",
      "Ciclos",
      "Erro",
      "Posicao",
    ],
  },
  ar: {
    adress: 18,
    fields: ["Posicao", "Erro", "Temperatura", "Ciclos"],
  },
  temperatura: {
    adress: 22,
    fields: [
      "Temperatura_1",
      "Temperatura_2",
      "Temperatura_3",
      "Temperatura_4",
      "Erro",
    ],
  },
  umidade: {
    adress: 27,
    fields: ["Umidade", "Temperatura", "Erro"],
  },
  motor: {
    adress: 30,
    fields: [
      "Erro_1",
      "Erro_2",
      "Status",
      "Corrente",
      "Ciclo_1",
      "Ciclo_2",
      "TempoCiclo",
      "TempoLigado",
      "Modo",
    ],
  },
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
      "Minuto",
    ],
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
      "Minuto",
    ],
  },
  ar: {
    adress: 68,
    fields: ["SetPoint"],
  },
  motor: {
    adress: 69,
    fields: ["Comando 1", "Comando 2", "Tempo Ciclo", "Tempo Ligado", "Modo"],
  },
};

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
        dadosFormatados[nomeDispositivo][campo.trim()] =
          respostaGeral.data[endereco];
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
    const response = await client.readHoldingRegisters(0, 9);

    const dadosEsfera = {};

    mapa_leitura.esfera.fields.forEach((campo, index) => {
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
    const response = await client.readHoldingRegisters(10, 18);

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
    const response = await client.readHoldingRegisters(19, 22);
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

async function lerTemperatura() {
  try {
    const response = await client.readHoldingRegisters(23, 27);
    const dadosTemperatura = {};

    mapa_leitura.temperatura.fields.forEach((campo, index) => {
      dadosTemperatura[campo.trim()] = response.data[index];
    });
    return dadosTemperatura;
  } catch (err) {
    console.error("Erro ao ler temperatura:", err.message);
    throw err;
  }
}

async function lerUmidade() {
  try {
    const response = await client.readHoldingRegisters(28, 30);
    const dadosUmidade = {};

    mapa_leitura.umidade.fields.forEach((campo, index) => {
      dadosUmidade[campo.trim()] = response.data[index];
    });

    return dadosUmidade;
  } catch (err) {
    console.error("Erro ao ler Umidade", err.message);
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
      console.error(
        `Configuração "${config}" não existe no dispositivo ${dispositivo}!`
      );
      return;
    }

    const registrador = mapa_escrita[dispositivo].adress + index;

    await client.writeRegister(registrador, valor);
    console.log(
      `Valor ${valor} escrito com sucesso no registrador ${registrador} (${dispositivo} - ${config})`
    );
  } catch (err) {
    console.error("Erro ao tentar escrever:", err.message);
  }
}

console.log("Iniciando cliente Modbus...");
setInterval(lerTodosDispositivos, config.tempo);

process.on("SIGINT", () => {
  console.log("\nDesconectando...");
  client.close();
  process.exit();
});
