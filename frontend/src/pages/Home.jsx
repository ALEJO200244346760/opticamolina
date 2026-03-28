import { useState, useEffect } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/public/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD]"> {/* Fondo ligeramente grisáceo para que el blanco resalte */}
      
      {/* HERO SECTION - Inspirado en el degradado del logo */}
      <div className="relative bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#3b0921] text-white py-20 px-4 mb-12 shadow-2xl">
        <div className="container mx-auto text-center">
          <div className="inline-block mb-4 p-2 border-b-2 border-[#801a4d]">
            <span className="tracking-[0.3em] uppercase text-sm font-light">Estilo & Visión</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 italic">
            ÓPTICA <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">MOLINA</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Elegancia para tus ojos. Descubrí nuestra colección exclusiva diseñada para quienes ven más allá.
          </p>
        </div>
        
        {/* Decoración sutil que imita el ojo del logo */}
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <svg width="400" height="400" viewBox="0 0 100 100" fill="white">
            <path d="M50 30c-20 0-35 15-35 15s15 15 35 15 35-15 35-15-15-15-35-15zM50 52c-4 0-7-3-7-7s3-7 7-7 7 3 7 7-3 7-7 7z" />
          </svg>
        </div>
      </div>

      <main className="container mx-auto px-4 md:px-8 pb-20">
        
        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-2xl font-bold text-slate-800">Catálogo de Armazones</h2>
          <span className="text-sm text-gray-500">{products.length} modelos disponibles</span>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4a0e2e]"></div>
            <span className="mt-4 text-gray-400 font-medium tracking-widest uppercase text-xs">Cargando colección...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-light text-gray-400">No hay productos en exhibición.</h3>
            <p className="text-gray-400 mt-2">Próximamente nuevos ingresos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {products.map((product) => (
              <div key={product.id} className="transition-transform duration-300 hover:-translate-y-2">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FOOTER - Elegante y oscuro */}
      <footer className="bg-[#0a0a0a] text-gray-400 py-12 border-t border-[#222]">
        <div className="container mx-auto px-4 text-center">
          <div className="text-white font-bold tracking-widest mb-4">OPTICA MOLINA</div>
          <p className="text-sm mb-2">Salud visual con distinción.</p>
          <div className="w-12 h-1 bg-[#4a0e2e] mx-auto mb-6"></div>
          <p className="text-xs">&copy; 2026 Óptica Molina. Córdoba, Argentina.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;