import registradorIO from '../models/registradorIO.js';

class ModbusController {
  static async getData(req, res) {
    try {
      const dados = await registradorIO.lerTodosDispositivos();
      res.json({
        success: "Sucesso!",
        data: dados
      });
  
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err.message,
        detalhes: "Falha na comunicação com o hardware"
      });
    }
  }

  static async writeData(req, res) {
    const { device, config, value } = req.body;
    try {
      await registradorIO.escreverDispositivo(device, config, value);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default ModbusController;