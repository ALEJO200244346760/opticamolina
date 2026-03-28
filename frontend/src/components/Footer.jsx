// Archivo: src/components/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-[#050505] text-gray-500 py-16 border-t border-[#1a1a1a] relative overflow-hidden">
      {/* Resplandor decorativo sutil en el footer */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#4a0e2e] opacity-[0.03] blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="flex flex-col items-center">
          <img 
            src="/IMG_3486.jpg" 
            alt="Logo Óptica Molina" 
            className="h-12 w-auto mb-6 opacity-80 hover:opacity-100 transition-opacity rounded-lg"
          />
          <div className="text-white font-black tracking-[0.4em] uppercase italic mb-2">
            ÓPTICA MOLINA
          </div>
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#801a4d] mb-8">
            Salud visual con distinción
          </p>
          
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#4a0e2e] to-transparent mb-8"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-2xl text-[11px] font-medium tracking-widest uppercase mb-12">
            <span className="hover:text-white transition-colors cursor-pointer">Colecciones</span>
            <span className="hover:text-white transition-colors cursor-pointer">Ubicación Córdoba</span>
            <span className="hover:text-white transition-colors cursor-pointer">Contacto Directo</span>
          </div>
          
          <p className="text-[9px] text-gray-600 tracking-[0.3em] uppercase">
            &copy; 2026 Óptica Molina. Vanguardia Visual. Argentina.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;