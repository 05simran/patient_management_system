import { useState, useEffect } from "react";
import { Plus,Edit, Trash2 } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MedicineInventory = () => {
    const [medicines, setMedicines] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentMedicine, setCurrentMedicine] = useState({ id: null, name: "", category: "", stock: "", unit: "" });
    const [showDialog, setShowDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {
        const response = await fetch("http://localhost:5000/api/medicines");
        const data = await response.json();
        setMedicines(data);
    };

    const handleSaveMedicine = async () => {
        try {
            const method = isEditing ? "PUT" : "POST";
            const url = isEditing ? `http://localhost:5000/api/medicines/{currentMedicine.id}` : "http://localhost:5000/api/medicines";
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(currentMedicine),
            });
            if (!response.ok) throw new Error("Failed to save medicine");
            setCurrentMedicine({ id: null, name: "", category: "", stock: "", unit: "" });
            setShowDialog(false);
            setIsEditing(false);
            fetchMedicines();
        } catch (error) {
            console.error("Error saving medicine:", error);
        }
    };

    const handleEditMedicine = (medicine) => {
        setCurrentMedicine(medicine);
        setIsEditing(true);
        setShowDialog(true);
    };

    const handleDeleteMedicine = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/medicines/${id}`, { method: "DELETE" });
            fetchMedicines();
        } catch (error) {
            console.error("Error deleting medicine:", error);
        }
    };

    const filteredMedicines = medicines.filter((medicine) =>
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Medicine Inventory</h2>
                <Dialog open={showDialog} onOpenChange={setShowDialog}>
                    <DialogTrigger asChild>
                        <Button onClick={() => { setIsEditing(false); setCurrentMedicine({ id: null, name: "", category: "", stock: "", unit: "" }); }} className="bg-blue-500 hover:bg-blue-600">
                            <Plus className="w-5 h-5 mr-2" /> {isEditing ? "Edit Medicine" : "Add Medicine"}
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{isEditing ? "Edit Medicine" : "Add New Medicine"}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <Input placeholder="Name" value={currentMedicine.name} onChange={(e) => setCurrentMedicine({ ...currentMedicine, name: e.target.value })} />
                            <Input placeholder="Category" value={currentMedicine.category} onChange={(e) => setCurrentMedicine({ ...currentMedicine, category: e.target.value })} />
                            <Input type="number" placeholder="Stock" value={currentMedicine.stock} onChange={(e) => setCurrentMedicine({ ...currentMedicine, stock: e.target.value })} />
                            <Input placeholder="Unit" value={currentMedicine.unit} onChange={(e) => setCurrentMedicine({ ...currentMedicine, unit: e.target.value })} />
                        </div>
                        <Button onClick={handleSaveMedicine} className="bg-blue-500 hover:bg-blue-600 w-full">{isEditing ? "Update Medicine" : "Save Medicine"}</Button>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="mb-4 relative">
                <Input type="text" placeholder="Search medicines..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-2 px-4 text-left">Name</th>
                            <th className="py-2 px-4 text-left">Category</th>
                            <th className="py-2 px-4 text-left">Stock</th>
                            <th className="py-2 px-4 text-left">Unit</th>
                            <th className="py-2 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMedicines.map((medicine) => (
                            <tr key={medicine._id} className="border-b">
                                <td className="py-2 px-4">{medicine.name}</td>
                                <td className="py-2 px-4">{medicine.category}</td>
                                <td className="py-2 px-4">{medicine.stock}</td>
                                <td className="py-2 px-4">{medicine.unit}</td>
                                <td className="py-2 px-4">
                                    <button onClick={() => handleEditMedicine(medicine)} className="text-blue-500 hover:text-blue-700 mr-2">
                                        <Edit className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => handleDeleteMedicine(medicine._id)} className="text-red-500 hover:text-red-700">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MedicineInventory;
