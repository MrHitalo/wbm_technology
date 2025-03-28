const express = require('express');
const cors = require('cors');
const app = express();
const { lerTodosDispositivos } = require('./modbus/ConexaoMestre'); // Importe sua lógica Modbus

app.use(cors());
app.get('/api/dados', async (req, res) => {
  const dados = await lerTodosDispositivos();
  res.json(dados);
});

app.listen(3000, () => {
  console.log("Backend rodando em http://localhost:3000");
});