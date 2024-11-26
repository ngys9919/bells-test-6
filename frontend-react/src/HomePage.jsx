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
            promotionName={product.promotion}
            productName={product.bookTitle}
            productBadge={product.badge}
            price={product.priceTag.toFixed(2)}
            discount={(product.priceTag * (1 - product.discount)).toFixed(2)}
          />
        </div>
      );
    }
    return productElements;
  };

  return (
    <>

      {/* Header */}
<header className="bg-dark py-5">
    <div className="container px-4 px-lg-5 my-5">
        <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Hello, {loginUsername}! <br></br> Welcome to e-BookStore</h1>
            <p className="lead fw-normal text-white-50 mb-0">Find your favourite titles at wholesale prices!</p>
            <Link href="/products" className="btn btn-light btn-lg">
            Shop Now
          </Link>
        </div>
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
