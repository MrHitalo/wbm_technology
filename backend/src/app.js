import express from "express";
import cors from "cors";
import modbusRoutes from "./routes/modbusRoutes.js";
import { WebSocketServer } from "ws"; // Importa o WebSocketServer
import registradorIO from "./models/registradorIO.js"; // Importa o modelo para leitura do Modbus

const app = express();

app.use(cors());
app.use(express.json());
app.use("/moduloMestre", modbusRoutes);

const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

// Configuração do WebSocket
const wss = new WebSocketServer({ server }); // Usa o mesmo servidor HTTP do Express

wss.on("connection", (ws) => {
  console.log("Cliente conectado via WebSocket");

  // Envia dados reais do Modbus periodicamente
  const interval = setInterval(async () => {
    try {
      // Lê os dados de todas as funções do ModbusController
      const dadosAr = await registradorIO.lerAr();
      const dadosEsfera = await registradorIO.lerEsfera();
      const dadosGaveta = await registradorIO.lerGaveta();
      const dadosTemperatura = await registradorIO.lerTemperatura();
      const dadosUmidade = await registradorIO.lerUmidade();

      // Monta o objeto com todos os dados
      const data = {
        time: new Date().toLocaleTimeString(),
        ar: dadosAr,
        esfera: dadosEsfera,
        gaveta: dadosGaveta,
        temperatura: dadosTemperatura,
        umidade: dadosUmidade,
      };

      // Envia os dados para o cliente conectado
      ws.send(JSON.stringify(data));
    } catch (err) {
      console.error("Erro ao ler dados do Modbus:", err.message);
      ws.send(
        JSON.stringify({
          error: "Erro ao obter dados do Modbus",
        })
      );
    }
  }, 1000); // Atualiza a cada 1 segundo

  // Limpa o intervalo quando o cliente desconecta
  ws.on("close", () => {
    console.log("Cliente desconectado");
    clearInterval(interval);
  });
});
