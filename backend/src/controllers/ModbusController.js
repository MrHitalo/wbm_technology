import registradorIO from '../models/registradorIO.js';

class ModbusController {
  static async getData(req, res) {
    try {
      await registradorIO.lerTodosDispositivos();
      res.json({ message: "Dados lidos com sucesso" });
    } catch (err) {
      res.status(500).json({ error: err.message });
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