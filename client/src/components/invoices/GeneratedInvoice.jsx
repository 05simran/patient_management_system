"use client";

import { useState } from "react";
import { Printer, X } from "lucide-react";

const GeneratedInvoice = ({ invoice, onClose, isEditing }) => {
    const [editedInvoice, setEditedInvoice] = useState(invoice);

    const handlePrint = () => {
        const printContent =
            document.getElementById("invoice-content").innerHTML;
        const originalContent = document.body.innerHTML;
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedInvoice((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // Here you would typically update the invoice in your database
        console.log("Saving edited invoice:", editedInvoice);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                        {isEditing ? "Edit Invoice" : "Generated Invoice"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div
                    id="invoice-content"
                    className="print:w-full print:mx-auto"
                >
                    <table className="min-w-full divide-y divide-gray-200">
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Invoice Number
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="invoiceNumber"
                                            value={editedInvoice.invoiceNumber}
                                            onChange={handleInputChange}
                                            className="border rounded px-2 py-1 w-full"
                                        />
                                    ) : (
                                        invoice.invoiceNumber
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Date
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {isEditing ? (
                                        <input
                                            type="date"
                                            name="date"
                                            value={editedInvoice.date}
                                            onChange={handleInputChange}
                                            className="border rounded px-2 py-1 w-full"
                                        />
                                    ) : (
                                        invoice.date
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Patient Name
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="patientName"
                                            value={editedInvoice.patientName}
                                            onChange={handleInputChange}
                                            className="border rounded px-2 py-1 w-full"
                                        />
                                    ) : (
                                        invoice.patientName
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Patient Age
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            name="patientAge"
                                            value={editedInvoice.patientAge}
                                            onChange={handleInputChange}
                                            className="border rounded px-2 py-1 w-full"
                                        />
                                    ) : (
                                        invoice.patientAge
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Medicines
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="medicines"
                                            value={editedInvoice.medicines.join(
                                                ", "
                                            )}
                                            onChange={(e) =>
                                                setEditedInvoice((prev) => ({
                                                    ...prev,
                                                    medicines:
                                                        e.target.value.split(
                                                            ", "
                                                        ),
                                                }))
                                            }
                                            className="border rounded px-2 py-1 w-full"
                                        />
                                    ) : (
                                        invoice.medicines.join(", ")
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Dosage
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="dosage"
                                            value={editedInvoice.dosage}
                                            onChange={handleInputChange}
                                            className="border rounded px-2 py-1 w-full"
                                        />
                                    ) : (
                                        invoice.dosage
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Frequency
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="frequency"
                                            value={editedInvoice.frequency}
                                            onChange={handleInputChange}
                                            className="border rounded px-2 py-1 w-full"
                                        />
                                    ) : (
                                        invoice.frequency
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Amount
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            name="amount"
                                            value={editedInvoice.amount}
                                            onChange={handleInputChange}
                                            className="border rounded px-2 py-1 w-full"
                                        />
                                    ) : (
                                        `$${invoice.amount.toFixed(2)}`
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Follow-up Date
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {isEditing ? (
                                        <input
                                            type="date"
                                            name="followUpDate"
                                            value={editedInvoice.followUpDate}
                                            onChange={handleInputChange}
                                            className="border rounded px-2 py-1 w-full"
                                        />
                                    ) : (
                                        invoice.followUpDate
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Status
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {isEditing ? (
                                        <select
                                            name="status"
                                            value={editedInvoice.status}
                                            onChange={handleInputChange}
                                            className="border rounded px-2 py-1 w-full"
                                        >
                                            <option value="Paid">Paid</option>
                                            <option value="Pending">
                                                Pending
                                            </option>
                                            <option value="Overdue">
                                                Overdue
                                            </option>
                                        </select>
                                    ) : (
                                        invoice.status
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-6 flex justify-end space-x-4 print:hidden">
                    {isEditing ? (
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                            Save Changes
                        </button>
                    ) : (
                        <button
                            onClick={handlePrint}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
                        >
                            <Printer className="w-5 h-5 mr-2" />
                            Print Invoice
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GeneratedInvoice;
