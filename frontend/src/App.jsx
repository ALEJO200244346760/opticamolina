// Archivo: src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx'; 
import AdminPanel from './pages/AdminPanel.jsx';
import Success from './pages/Success';
import Failure from './pages/Failure';
import Register from './pages/Register.jsx';
import ProductDetail from './components/ProductDetail.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminPanel />} /> 
            
            {/* 2. AGREGÁ ESTA RUTA PARA EL DETALLE */}
            <Route path="/product/:id" element={<ProductDetail />} />
            
            <Route path="/success" element={<Success />} />
            <Route path="/failure" element={<Failure />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;