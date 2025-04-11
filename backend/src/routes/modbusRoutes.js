import { Router } from "express";
import ModbusController from "../controllers/ModbusController.js";

const router = Router();

router.get("/todos", ModbusController.getData);
router.get("/esfera", ModbusController.getEsfera);
router.get("/gaveta", ModbusController.getGaveta);
router.get("/ar", ModbusController.getAr);
router.get("/temperatura", ModbusController.getTemperatura);
router.get("/umidade", ModbusController.getUmidade);

export default router;
