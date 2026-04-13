// Archivo: src/pages/ResetPassword.jsx
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return setError('Las contraseñas no coinciden.');
    
    try {
      await api.post('/auth/reset-password', { token, newPassword: password });
      alert('Contraseña actualizada con éxito.');
      navigate('/login');
    } catch (err) {
      setError('El link expiró o es inválido.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh] bg-[#FDFDFD] px-4">
      <div className="bg-white p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] w-full max-w-md border border-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-[#4a0e2e]"></div>
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Nueva Contraseña</h2>
          <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase mt-2">Reajustando tu Visión</p>
        </div>

        {error && <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 text-xs font-bold uppercase tracking-tight italic border-l-4 border-red-500">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            type="password" 
            className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#4a0e2e] outline-none"
            placeholder="NUEVA CONTRASEÑA"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input 
            type="password" 
            className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#4a0e2e] outline-none"
            placeholder="CONFIRMAR CONTRASEÑA"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-[#1a1a1a] hover:bg-[#4a0e2e] text-white font-black py-4 rounded-2xl transition-all shadow-lg uppercase tracking-[0.2em] text-xs">
            Actualizar Contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;