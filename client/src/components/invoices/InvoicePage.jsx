import { useState, useEffect } from "react";
import { Search, Plus, Eye, Edit } from "lucide-react";
import InvoiceGenerator from "./InvoiceGenerator";
import GeneratedInvoice from "./GeneratedInvoice";

const InvoicePage = () => {
    const [invoices, setInvoices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showInvoiceGenerator, setShowInvoiceGenerator] = useState(false);

    // Fetch invoices when component mounts
    useEffect(() => {
        fetchInvoices();
    }, []);

    // Fetch invoices from the backend
    const fetchInvoices = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/invoices");

            if (!response.ok) throw new Error("Failed to fetch invoices");

            const data = await response.json();

            // Ensure each invoice has a default status if missing
            const formattedInvoices = data.map((invoice) => ({
                ...invoice,
                status: invoice.status || "pending",
            }));

            setInvoices(formattedInvoices);
        } catch (error) {
            console.error("Error fetching invoices:", error);
        }
    };

    // Create a new invoice
    const handleNewInvoice = async (newInvoice) => {
        try {
            const response = await fetch("http://localhost:5000/api/invoices", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newInvoice),
            });

            if (!response.ok) throw new Error("Failed to create invoice");

            const savedInvoice = await response.json();
            setInvoices((prevInvoices) => [...prevInvoices, savedInvoice]);
        } catch (error) {
            console.error("Error creating invoice:", error);
        } finally {
            setShowInvoiceGenerator(false);
        }
    };

    // Filter invoices based on search term
    const filteredInvoices = invoices.filter(
        (invoice) =>
            invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Set invoice for viewing
    const handleView = (invoice) => {
        setSelectedInvoice(invoice);
        setIsEditing(false);
    };

    // Set invoice for editing
    const handleEdit = (invoice) => {
        setSelectedInvoice(invoice);
        setIsEditing(true);
    };

    // Close the invoice modal
    const handleCloseModal = () => {
        setSelectedInvoice(null);
        setIsEditing(false);
    };

    return (
        <div className="space-y-4 p-8">
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Invoices</h2>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600"
                        onClick={() => setShowInvoiceGenerator(true)}
                    >
                        <Plus className="h-4 w-4" />
                        New Invoice
                    </button>
                </div>
                
                {/* Search Bar */}
                <div className="flex items-center space-x-2 mb-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search invoices..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-md"
                        />
                    </div>
                </div>

                {/* Invoice Table */}
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left px-4 py-2 border">Invoice #</th>
                            <th className="text-left px-4 py-2 border">Patient Name</th>
                            <th className="text-left px-4 py-2 border">Date</th>
                            <th className="text-left px-4 py-2 border">Amount</th>
                            <th className="text-left px-4 py-2 border">Status</th>
                            <th className="text-right px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInvoices.length > 0 ? (
                            filteredInvoices.map((invoice) => (
                                <tr key={invoice._id} className="border">
                                    <td className="px-4 py-2">{invoice.invoiceNumber}</td>
                                    <td className="px-4 py-2">{invoice.patientName}</td>
                                    <td className="px-4 py-2">{invoice.date}</td>
                                    <td className="px-4 py-2">
                                        ${invoice.amount ? invoice.amount.toFixed(2) : "0.00"}
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className={`px-2 py-1 rounded text-sm ${invoice.status === "paid" ? "bg-green-100 text-green-800" : invoice.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                                            {invoice.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 flex justify-end gap-2">
                                        <button onClick={() => handleView(invoice)} className="text-blue-500 hover:text-blue-700">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleEdit(invoice)} className="text-gray-500 hover:text-gray-700">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    No invoices found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* View or Edit Invoice Modal */}
            {selectedInvoice && (
                <GeneratedInvoice
                    invoice={selectedInvoice}
                    onClose={handleCloseModal}
                    isEditing={isEditing}
                />
            )}

            {/* Invoice Generator Modal */}
            {showInvoiceGenerator && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Generate Invoice</h2>
                        <InvoiceGenerator
                            onSubmit={(newInvoice) => handleNewInvoice(newInvoice)}
                        />
                        <button
                            onClick={() => setShowInvoiceGenerator(false)}
                            className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvoicePage;
