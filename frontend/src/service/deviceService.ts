import axios from "axios";

const BASE_URL = "http://localhost:3000";

const ENDPOINTS = {
  TODOS: "/moduloMestre/todos",
  ESFERA: "/moduloMestre/esfera",
  GAVETA: "/moduloMestre/gaveta",
  AR: "/moduloMestre/ar",
};

export const serverConnection = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao conectar ao servidor:", error);
    throw error;
  }
};

export const fetchTodos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}${ENDPOINTS.TODOS}`);
    const devicesArray = Object.entries(response.data.data).map(([name, value]) => ({
      name, 
      value, 
    }));
    return devicesArray; 
  } catch (error) {
    console.error("Erro ao buscar todos os dispositivos:", error);
    throw error;
  }
};

export const fetchEsfera = async () => {
  try {
    const response = await axios.get(`${BASE_URL}${ENDPOINTS.ESFERA}`);
    const devicesArray = Object.entries(response.data.data).map(([name, value]) => ({
      name, 
      value, 
    }));
    return devicesArray;
  } catch (error) {
    console.error("Erro ao buscar dados da esfera:", error);
    throw error;
  }
};

export const fetchGaveta = async () => {
  try {
    const response = await axios.get(`${BASE_URL}${ENDPOINTS.GAVETA}`);
    const devicesArray = Object.entries(response.data.data).map(([name, value]) => ({
      name, 
      value, 
    }));
    return devicesArray;
  } catch (error) {
    console.error("Erro ao buscar dados da gaveta:", error);
    throw error;
  }
};

export const fetchAr = async () => {
  try {
    const response = await axios.get(`${BASE_URL}${ENDPOINTS.AR}`);
    const devicesArray = Object.entries(response.data.data).map(([name, value]) => ({
        name, 
        value, 
      }));
    return devicesArray; 
  } catch (error) {
    console.error("Erro ao buscar dados do ar:", error);
    throw error;
  }
};