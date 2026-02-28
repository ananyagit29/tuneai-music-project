import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [user, setUser] = useState(null);
    // Initialize theme from localStorage or system preference
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || 
               (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (!token) {
            navigate('/login');
        } else if (userData) {
            setUser(JSON.parse(userData));
        }
    }, [navigate]);

    // Apply theme to document element and save to localStorage
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate('/login');
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <div className="container mt-5">
            <button 
                onClick={toggleTheme} 
                className="btn theme-btn"
                title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
                {theme === "light" ? "🌙" : "☀️"}
            </button>
            <div className="bg-white p-3 rounded">
                <h1>Welcome to TuneAI Music</h1>
                {user && <h3>Hello, {user.name}!</h3>}
                <button onClick={handleLogout} className="btn btn-danger mt-3">
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Home;
