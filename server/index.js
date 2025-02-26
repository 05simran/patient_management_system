import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import medicalDataRoutes from "./routes/medicalDataRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "./.env") });

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/medical-data", medicalDataRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/dashboard", dashboardRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));