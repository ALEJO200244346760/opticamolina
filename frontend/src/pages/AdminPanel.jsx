// Archivo: src/pages/AdminPanel.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Verificamos si es admin antes de renderizar
  useEffect(() => {
    const roles = JSON.parse(localStorage.getItem('roles')) || [];
    if (!roles.includes('ROLE_ADMIN')) {
      navigate('/'); // Lo pateamos al home si no es admin
    } else {
      fetchData();
    }
  }, [navigate]);

  const fetchData = async () => {
    try {
      // Usamos el endpoint público o creamos uno en admin para listar
      const resProducts = await api.get('/public/products'); 
      setProducts(resProducts.data);

      // Asumiendo que agregamos un endpoint para ver categorías
      // const resCategories = await api.get('/public/categories');
      // setCategories(resCategories.data);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  // Función para el endpoint rápido de stock (PatchMapping)
  const handleUpdateStock = async (id, quantity) => {
    try {
      await api.patch(`/admin/products/${id}/stock`, { quantity });
      fetchData(); // Recargamos la tabla para ver el nuevo stock
    } catch (error) {
      alert("Error al actualizar stock: " + (error.response?.data || error.message));
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("¿Seguro que querés eliminar este producto?")) {
      try {
        await api.delete(`/admin/products/${id}`);
        fetchData();
      } catch (error) {
        console.error("Error eliminando:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Panel de Administración</h1>
        <button className="bg-secondary hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors">
          + Nuevo Producto
        </button>
      </div>

      <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Categoría</th>
              <th className="py-3 px-6 text-right">Precio</th>
              <th className="py-3 px-6 text-center">Stock</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-6 text-center text-gray-500">
                  No hay productos cargados.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap font-bold">{p.id}</td>
                  <td className="py-3 px-6 text-left">{p.name}</td>
                  <td className="py-3 px-6 text-left">{p.category?.name || 'Sin categoría'}</td>
                  <td className="py-3 px-6 text-right font-bold text-green-600">${p.price}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        onClick={() => handleUpdateStock(p.id, -1)}
                        className="bg-red-200 text-red-700 px-2 py-1 rounded hover:bg-red-300"
                      >-</button>
                      <span className="font-bold w-6 text-center">{p.stock}</span>
                      <button 
                        onClick={() => handleUpdateStock(p.id, 1)}
                        className="bg-green-200 text-green-700 px-2 py-1 rounded hover:bg-green-300"
                      >+</button>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center space-x-3">
                      <button className="text-blue-500 hover:text-blue-700">Editar</button>
                      <button 
                        onClick={() => handleDelete(p.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;