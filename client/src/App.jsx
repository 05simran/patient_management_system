import { useState, useEffect } from "react";
import AuthPage from "./components/auth/AuthPage";
import Dashboard from "./Dashboard";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleAuth = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    return isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
    ) : (
        <AuthPage onAuth={handleAuth} />
    );
};

export default App;
