import axios from "axios";

const BASE_URL = "http://localhost:3000";
const WEBSOCKET_URL = "ws://localhost:3000";

const ENDPOINTS = {
  TODOS: "/moduloMestre/todos",
  ESFERA: "/moduloMestre/esfera",
  GAVETA: "/moduloMestre/gaveta",
  AR: "/moduloMestre/ar",
};

// Função genérica para buscar dados de qualquer endpoint
const fetchData = async (endpoint: string) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    const devicesArray = Object.entries(response.data.data).map(
      ([name, value]) => ({
        name,
        value,
      })
    );
    return devicesArray;
  } catch (error) {
    console.error(`Erro ao buscar dados do endpoint ${endpoint}:`, error);
    throw error;
  }
};

// Funções específicas para cada endpoint
export const fetchTodos = async () => fetchData(ENDPOINTS.TODOS);
export const fetchEsfera = async () => fetchData(ENDPOINTS.ESFERA);
export const fetchGaveta = async () => fetchData(ENDPOINTS.GAVETA);
export const fetchAr = async () => fetchData(ENDPOINTS.AR);

// Função para verificar a conexão com o servidor
export const serverConnection = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao conectar ao servidor:", error);
    throw error;
  }
};

// Função genérica para conectar ao WebSocket
export const connectWebSocket = (onMessage: (data: any) => void) => {
  try {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => {
      console.log("Conexão WebSocket estabelecida.");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    ws.onerror = (error) => {
      console.error("Erro no WebSocket:", error);
    };

    ws.onclose = () => {
      console.log("Conexão WebSocket encerrada.");
    };

    return ws;
  } catch (error) {
    console.error("Erro ao conectar ao WebSocket:", error);
    throw error;
  }
};

export const connectWebSocketAr = (onMessage: (data: any) => void) => {
  try {
    const ws = new WebSocket("ws://localhost:3000/ws/ar"); // Substitua pela URL correta do WebSocket

    ws.onopen = () => {
      console.log("Conexão WebSocket de 'ar' estabelecida.");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    ws.onerror = (error) => {
      console.error("Erro no WebSocket de 'ar':", error);
    };

    ws.onclose = () => {
      console.log("Conexão WebSocket de 'ar' encerrada.");
    };

    return ws;
  } catch (error) {
    console.error("Erro ao conectar ao WebSocket de 'ar':", error);
    throw error;
  }
};
