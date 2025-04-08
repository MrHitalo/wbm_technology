import express from 'express';
import cors from 'cors';
import modbusRoutes from './routes/modbusRoutes.js'; 

const app = express();

app.use(cors()); 

app.use(express.json());
app.use('/moduloMestre', modbusRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});