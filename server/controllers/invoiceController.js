import Invoice from "../models/invoiceModel.js";

export const createInvoice = async (req, res) => {
    console.log("createInvoice called" , JSON.stringify(req.body));
    try {
        const invoice = await Invoice.create(req.body);
        console.log(invoice);
        res.status(201).json(invoice);
    } catch (error) {
        res.status(500).json({ message: "Error creating invoice" });
    }
};

export const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: "Error fetching invoices" });
    }
};

export const updateInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message: "Error updating invoice" });
    }
};

export const deleteInvoice = async (req, res) => {
    try {
        await Invoice.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Invoice deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting invoice" });
    }
};