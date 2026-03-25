// Archivo: src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Navbar from './components/Navbar';
import Login from './pages/Login.jsx';      // <--- Agregá .jsx
import Home from './pages/Home.jsx';        // <--- Agregá .jsx
import AdminPanel from './pages/AdminPanel.jsx';
import Success from './pages/Success.jsx';
import Failure from './pages/Failure.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminPanel />} /> 
            <Route path="/success" element={<Success />} />
            <Route path="/failure" element={<Failure />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;