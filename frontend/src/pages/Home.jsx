// Archivo: src/pages/Home.jsx
import { useState, useEffect } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import Footer from '../components/Footer';

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
    <div className="min-h-screen bg-[#050505] text-white">
      
      {/* HERO SECTION - Identidad Visual Molina */}
      <div className="relative py-24 px-6 overflow-hidden border-b border-[#1a1a1a]">
        {/* Degradado uva que imita el aura del logo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-[#4a0e2e]/20 via-transparent to-transparent opacity-60"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-5 py-1.5 border border-[#4a0e2e]/30 rounded-full bg-[#4a0e2e]/5">
            <span className="tracking-[0.5em] uppercase text-[10px] font-black text-[#801a4d]">
              Vanguardia Visual
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 italic uppercase leading-none">
            ÓPTICA <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">MOLINA</span>
          </h1>
          
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed tracking-wide italic">
            Colecciones de autor para quienes ven más allá. <br />
            Diseño, precisión y exclusividad en cada detalle.
          </p>
        </div>
        
        {/* SVG Decorativo del Ojo (Sutil) */}
        <div className="absolute -bottom-10 -right-10 opacity-[0.03] pointer-events-none rotate-12">
          <svg width="500" height="500" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 30c-20 0-35 15-35 15s15 15 35 15 35-15 35-15-15-15-35-15zM50 52c-4 0-7-3-7-7s3-7 7-7 7 3 7 7-3 7-7 7z" />
          </svg>
        </div>
      </div>

      <main className="container mx-auto px-6 md:px-12 py-20">
        
        {/* Encabezado del Catálogo */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-4 border-l-4 border-[#4a0e2e] pl-6">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">Catálogo de Armazones</h2>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mt-1">Disponibilidad inmediata en Córdoba</p>
          </div>
          {!loading && (
            <div className="bg-[#111] px-6 py-2 rounded-2xl border border-[#222]">
              <span className="text-[10px] font-black text-gray-300 tracking-widest uppercase italic">
                {products.length} Modelos Curados
              </span>
            </div>
          )}
        </div>

        {/* Lógica de Carga */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {[...Array(8)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32 bg-[#0a0a0a] rounded-[3rem] border border-[#1a1a1a] shadow-inner">
            <div className="w-16 h-16 bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest italic">Galería Vacía</h3>
            <p className="text-gray-600 mt-2 text-sm">Nuevos ingresos en proceso de curaduría.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-16">
            {products.map((product) => (
              <div key={product.id} className="group transition-all duration-500 hover:scale-[1.02]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;