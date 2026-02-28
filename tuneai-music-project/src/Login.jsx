import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    // Initialize theme from localStorage or system preference
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || 
               (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                console.log(result);
                if (result.data.status === "success") {
                    // Store token and user data in localStorage
                    localStorage.setItem("token", result.data.token);
                    localStorage.setItem("user", JSON.stringify(result.data.user));
                    
                    // Redirect to Home page
                    navigate('/home');
                } else {
                    alert(result.data.error || "Login failed");
                    setLoading(false);
                }
            })
            .catch(err => {
                console.log(err);

                // Handle specific error responses from backend
                if (err.response && err.response.data && err.response.data.error) {
                    alert(err.response.data.error);
                } else {
                    alert("An error occurred. Please try again.");
                }
                setLoading(false);
            });
    }

    return (
        <div className = "d-flex justify-content-center align-items-center bg-secondary vh-100" >
            <button onClick={toggleTheme} className="btn theme-btn" title="Toggle Theme">
                {theme === "light" ? "🌙" : "☀️"}
            </button>
            <div className="bg-white p-3 rounded w-25">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            value={email}
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                            />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            value={password}
                            autoComplete="off"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0" disabled={loading}>
                        {loading ? <><span className="spinner"></span> Logging in...</> : "Login"}
                    </button>
                </form>
                <p>Don't have an account?</p>
                <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

export default Login;
