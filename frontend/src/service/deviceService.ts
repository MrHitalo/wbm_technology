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

// Função para conectar ao WebSocket
export const connectWebSocket = (onMessage: (data: any) => void) => {
  try {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => {
      console.log("Conexão WebSocket estabelecida.");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Mensagem recebida do WebSocket:", data);
      onMessage(data); // Chama a função de callback com os dados recebidos
    };

    ws.onerror = (error) => {
      console.error("Erro no WebSocket:", error);
    };

    ws.onclose = () => {
      console.log("Conexão WebSocket encerrada.");
    };

    return ws; // Retorna a instância do WebSocket para controle externo
  } catch (error) {
    console.error("Erro ao conectar ao WebSocket:", error);
    throw error;
  }
};
