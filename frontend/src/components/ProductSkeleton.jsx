// Archivo: src/components/ProductSkeleton.jsx
const ProductSkeleton = () => {
  return (
    <div className="bg-[#111] rounded-[2rem] border border-[#222] p-6 shadow-2xl animate-pulse overflow-hidden relative">
      {/* Brillo de carga sutil */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>

      {/* Espacio para la imagen del anteojo */}
      <div className="bg-[#1a1a1a] h-52 w-full rounded-[1.5rem] mb-6 flex items-center justify-center">
        <svg className="w-12 h-12 text-[#222]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      
      {/* Categoría */}
      <div className="bg-[#1a1a1a] h-2 w-16 rounded-full mb-4"></div>
      
      {/* Título */}
      <div className="bg-[#222] h-6 w-3/4 rounded-lg mb-4"></div>
      
      {/* Precio y Botón circular */}
      <div className="flex justify-between items-center mt-6">
        <div className="space-y-2">
          <div className="bg-[#1a1a1a] h-2 w-8 rounded-full"></div>
          <div className="bg-[#222] h-8 w-24 rounded-xl"></div>
        </div>
        <div className="bg-[#4a0e2e]/20 h-12 w-12 rounded-2xl"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;