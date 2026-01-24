import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/home');
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn-primary">Login</button>
                </form>
                <p className="toggle-text">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
