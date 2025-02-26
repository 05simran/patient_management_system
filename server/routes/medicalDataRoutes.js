import express from "express";
import { createMedicalData, getMedicalData, updateMedicalData, deleteMedicalData } from "../controllers/medicalDataController.js";
const router = express.Router();

router.post("/", createMedicalData);
router.get("/", getMedicalData);
router.put("/:id", updateMedicalData);
router.delete("/:id", deleteMedicalData);

export default router;
