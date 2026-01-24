import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            
            const data = await response.json();
            if (response.ok) {
                alert('Registration Successful! Please Login.');
                navigate('/login');
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
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn-primary">Register</button>
                </form>
                <p className="toggle-text">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
