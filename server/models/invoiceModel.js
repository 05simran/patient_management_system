import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: String,
    patientName: String,
    date: String,
    amount: Number,
    medicine: String,
    daysToTake: Number,
    nextFollowUp: String,
    status: {
        type: String,
        enum: ["pending", "paid", "cancelled"],
        default: "pending",
    },
});

export default mongoose.model("Invoice", invoiceSchema);