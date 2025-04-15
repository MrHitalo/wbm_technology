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

// Configuração de múltiplos WebSockets
const wssAr = new WebSocketServer({ noServer: true });
const wssEsfera = new WebSocketServer({ noServer: true });
const wssGaveta = new WebSocketServer({ noServer: true });

// WebSocket para "ar"
wssAr.on("connection", (ws) => {
  console.log("Cliente conectado ao WebSocket de 'ar'");

  const interval = setInterval(async () => {
    try {
      const dadosAr = await registradorIO.lerAr();
      ws.send(
        JSON.stringify({ time: new Date().toLocaleTimeString(), ar: dadosAr })
      );
    } catch (err) {
      console.error("Erro ao ler dados de 'ar':", err.message);
      ws.send(JSON.stringify({ error: "Erro ao obter dados de 'ar'" }));
    }
  }, 1000);

  ws.on("close", () => {
    console.log("Cliente desconectado do WebSocket de 'ar'");
    clearInterval(interval);
  });
});

// WebSocket para "esfera"
wssEsfera.on("connection", (ws) => {
  console.log("Cliente conectado ao WebSocket de 'esfera'");

  const interval = setInterval(async () => {
    try {
      const dadosEsfera = await registradorIO.lerEsfera();
      ws.send(
        JSON.stringify({
          time: new Date().toLocaleTimeString(),
          esfera: dadosEsfera,
        })
      );
    } catch (err) {
      console.error("Erro ao ler dados de 'esfera':", err.message);
      ws.send(JSON.stringify({ error: "Erro ao obter dados de 'esfera'" }));
    }
  }, 1000);

  ws.on("close", () => {
    console.log("Cliente desconectado do WebSocket de 'esfera'");
    clearInterval(interval);
  });
});

// WebSocket para "gaveta"
wssGaveta.on("connection", (ws) => {
  console.log("Cliente conectado ao WebSocket de 'gaveta'");

  const interval = setInterval(async () => {
    try {
      const dadosGaveta = await registradorIO.lerGaveta();
      ws.send(
        JSON.stringify({
          time: new Date().toLocaleTimeString(),
          gaveta: dadosGaveta,
        })
      );
    } catch (err) {
      console.error("Erro ao ler dados de 'gaveta':", err.message);
      ws.send(JSON.stringify({ error: "Erro ao obter dados de 'gaveta'" }));
    }
  }, 1000);

  ws.on("close", () => {
    console.log("Cliente desconectado do WebSocket de 'gaveta'");
    clearInterval(interval);
  });
});

// Gerencia conexões para múltiplos WebSockets
server.on("upgrade", (request, socket, head) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`)
    .pathname;

  if (pathname === "/ws/ar") {
    wssAr.handleUpgrade(request, socket, head, (ws) => {
      wssAr.emit("connection", ws, request);
    });
  } else if (pathname === "/ws/esfera") {
    wssEsfera.handleUpgrade(request, socket, head, (ws) => {
      wssEsfera.emit("connection", ws, request);
    });
  } else if (pathname === "/ws/gaveta") {
    wssGaveta.handleUpgrade(request, socket, head, (ws) => {
      wssGaveta.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});
