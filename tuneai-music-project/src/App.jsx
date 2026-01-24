import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
