import {
    LayoutDashboard,
    Users,
    PillIcon as Pills,
    Menu,
    Database,
    FileText,
} from "lucide-react";

const Sidebar = ({ className, onNavigate }) => {
    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", view: "dashboard" },
        { icon: Users, label: "Patients", view: "patients" },
        { icon: Database, label: "Medical Data", view: "medicalData" },
        { icon: FileText, label: "Invoices", view: "invoices" },
        { icon: Pills, label: "Medicine", view: "medicine" },
    ];

    return (
        <div
            className={`flex h-screen w-64 flex-col bg-slate-900 ${className}`}
        >
            {/* Logo */}
            <div className="flex h-16 items-center gap-2 px-6 border-b border-slate-800">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-blue-500"></div>
                    <span className="text-lg font-semibold text-white">
                        MediCare
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-4">
                {menuItems.map((item) => (
                    <button
                        key={item.label}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-md transition-colors"
                        onClick={() => onNavigate(item.view)}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                    </button>
                ))}
            </nav>

            {/* Mobile menu button */}
            <button className="lg:hidden absolute top-3 right-4 text-slate-300">
                <Menu className="h-6 w-6" />
            </button>
        </div>
    );
};

export default Sidebar;
