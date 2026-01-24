import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (!token) {
            navigate('/login');
        } else if (userData) {
            setUser(JSON.parse(userData));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome Home!</h1>
            {user && <h2>Hello, {user.name}</h2>}
            <p>You have successfully logged in.</p>
            <button 
                onClick={handleLogout} 
                style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                Logout
            </button>
        </div>
    );
}

export default Home;
