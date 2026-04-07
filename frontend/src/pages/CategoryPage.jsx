import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import Footer from '../components/Footer';

const CategoryPage = ({ allCategories }) => {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({ id, name: "Categoría" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Primero intentar obtener la categoría desde allCategories
    const catFromList = allCategories?.find((c) => c.id.toString() === id.toString());
    if (catFromList) {
      setCategory(catFromList);
    } else {
      // Si no está en allCategories, buscar desde backend
      fetchCategoryById();
    }

    fetchProducts();
  }, [id, allCategories]);

  // Traer productos de la categoría
  const fetchProducts = async () => {
    try {
      const res = await api.get(`/public/products/category/${id}`);
      setProducts(res.data);
    } catch (error) {
      console.error("Error cargando productos de la categoría:", error);
    } finally {
      setLoading(false);
    }
  };

  // Traer categoría desde backend si no está en allCategories
  const fetchCategoryById = async () => {
    try {
      const res = await api.get(`/public/categories/${id}`);
      setCategory(res.data);
    } catch (error) {
      console.error("Error cargando categoría:", error);
    }
  };

  return (
  <div className="min-h-screen bg-white text-[#6B21A8]">

    {/* HERO / HEADER */}
    <div className="py-20 px-6 border-b border-gray-300">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tight">
          {category?.name}
        </h1>
        <p className="text-gray-600 mt-2 text-sm uppercase tracking-widest">
          Explorá la colección completa
        </p>
      </div>
    </div>

    <main className="container mx-auto px-6 md:px-12 py-20">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {[...Array(8)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-32">
          <h3 className="text-xl text-gray-500 italic uppercase">
            Sin productos en esta categoría
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-16">
          {products.map((product) => (
            <div
              key={product.id}
              className="group transition-all duration-500 hover:scale-[1.02]"
            >
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

export default CategoryPage;