import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

function ProductsNewArrivalsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/books_newarrivals.json');
        // const response = await axios.get('/products.json');
        // const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        // const response = await axios.get(`http://localhost:3000/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">New Arrivals</h1>
      <div className="row">
          {products.map(product => (
            <div key={product.id} className="col-md-4 mb-4">
              <ProductCard
                id={product.id}
                imageUrl={product.image}
                productName={product.bookTitle}
                price={product.priceTag.toFixed(2)}
                description={product.isbn_13}
                category={product.format}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProductsNewArrivalsPage;
