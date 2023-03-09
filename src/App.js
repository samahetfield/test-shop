import React, { useState, useEffect } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, Routes } from 'react-router-dom';
import Header from './Header/Header';
import ProductList from './ProductList/ProductList';
import ProductDetail from './ProductDetail/ProductDetail';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const dataExpirationTime = localStorage.getItem('expirationTime');

    const fetchData = async () => {
      const responseApi = await fetch(
        'https://itx-frontend-test.onrender.com/api/product',
      );
      const jsonData = await responseApi.json();
      setProducts(jsonData);
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + 1);
      localStorage.setItem('expirationTime', currentDate);
      localStorage.setItem('products', JSON.stringify(jsonData));
      return jsonData;
    };
    if (
      dataExpirationTime == null
      || new Date(dataExpirationTime) < new Date()
    ) {
      fetchData();
    } else {
      const cacheProducts = JSON.parse(localStorage.getItem('products'));
      setProducts(cacheProducts);
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <ProductList products={products} />,
    },
    {
      path: '/product/:id',
      element: <ProductDetail />,
    },
  ]);

  return (
    <div className="App">
      <Routes>
        <Header />
        <RouterProvider router={router} />
      </Routes>
    </div>
  );
}

export default App;
