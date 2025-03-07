import express from "express";
import { createInvoice, getInvoices, updateInvoice, deleteInvoice } from "../controllers/invoiceController.js";
const router = express.Router();

router.post("/", createInvoice);
router.get("/", getInvoices);
router.put("/:id", updateInvoice);
router.delete("/:id", deleteInvoice);

export default router;