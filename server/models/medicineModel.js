import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    unit: { type: String, required: true }
});

export default mongoose.model("Medicine", medicineSchema);