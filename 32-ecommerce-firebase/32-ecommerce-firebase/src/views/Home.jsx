import React, { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import getActiveProducts from "../functions/getActiveProducts";
import ItemSection from "../components/ItemSection";
import { Layout } from "../components/";

function Home() {
  const [productos, setProductos] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const searchProducts = (term) => {
    return productos.filter(producto =>
      producto.name.toLowerCase().includes(term.toLowerCase())
    );
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await getActiveProducts();
        setProductos(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm) return; 
    setLoading(true); 
    try {
      const searchedProducts = searchProducts(searchTerm);
      setProductos(searchedProducts);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4">
        {}
        <input
          type="text"
          placeholder="Buscar producto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #FF7F00',
            outline: 'none',
          }}
        />
        <button 
          onClick={handleSearch}
          style={{
            padding: '8px 16px',
            borderRadius: '4px',
            backgroundColor: '#FF7F00',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            marginLeft: '8px',
          }}
        >
          Buscar
        </button>
        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          <ItemSection title="Productos" productos={productos} />
        )}
      </div>
    </Layout>
  );
}

export default Home;
