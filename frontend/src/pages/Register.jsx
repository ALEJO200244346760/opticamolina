// Archivo: src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validación básica de contraseñas
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      // Enviamos email y password al endpoint de tu AuthController en Railway
      await api.post('/auth/register', {
        email,
        password
      });

      alert("¡Cuenta de Óptica Molina creada con éxito!");
      navigate('/login'); // Una vez registrado, lo mandamos a loguearse
      
    } catch (err) {
      setError(err.response?.data || 'Error al intentar registrarse.');
      console.error('Error en registro:', err);
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">Crear Cuenta</h2>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input 
              type="email" 
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary border-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Contraseña</label>
            <input 
              type="password" 
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary border-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Confirmar Contraseña</label>
            <input 
              type="password" 
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary border-gray-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repetí tu contraseña"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-secondary hover:bg-teal-700 text-white font-bold py-2 px-4 rounded transition-colors mt-2"
          >
            Registrarse
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => navigate('/login')}
            className="text-primary hover:underline text-sm font-medium"
          >
            ¿Ya tenés cuenta? Inicia sesión acá
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;