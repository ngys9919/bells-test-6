import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { useLoginUsername } from './UserStore';
import { Link } from 'wouter';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function HomePage() {

  const { getLoginUsername } = useLoginUsername();

  const loginUsername = getLoginUsername();

  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('/bestsellers.json');
        // const response = await axios.get('/featured.json');
        // const response = await axios.get('/products.json');
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const renderFeaturedProducts = () => {
    const productElements = [];
    for (const product of featuredProducts) {
      productElements.push(
        <div key={product.id} className="col-md-3 mb-4">
          <ProductCard
            id={product.id}
            imageUrl={product.image}
            productName={product.bookTitle}
            price={product.priceTag.toFixed(2)}
          />
        </div>
      );
    }
    return productElements;
  };

  return (
    <>

      <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4">Hello, {loginUsername}! <br></br> Welcome to e-BookStore</h1>
          <p className="lead">Find your favourite titles at wholesale prices!</p>
          {/* <a href="/products" className="btn btn-light btn-lg">Shop Now</a> */}
          <Link href="/products" className="btn btn-light btn-lg">
            Shop Now
          </Link>
        </div>
      </header>

      <main className="container my-5">
        <h2 className="text-center mb-4">Best-Seller Books</h2>
        {/* Product Cards Here */}
        <div className="row">
          {renderFeaturedProducts()}
        </div>
      </main>


    </>
  );
}

export default HomePage;
