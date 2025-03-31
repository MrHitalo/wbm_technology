import express from 'express';
import cors from 'cors';
import modbusRoutes from './routes/modbusRoutes.js'; 

const app = express();

app.use(cors());
app.use(cors({
  origin: 'http://localhost:4200' // URL do seu Angular
}));
app.use(express.json());

app.use('/api/modbus', modbusRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});