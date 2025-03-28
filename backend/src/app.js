import express from 'express';
import cors from 'cors';
import modbusRoutes from './routes/modbusRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/modbus', modbusRoutes);

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});