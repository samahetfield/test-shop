import React, { useState, useEffect } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Header from './Header/Header';
import ProductList from './ProductList/ProductList';
import ProductDetail from './ProductDetail/ProductDetail';
import Layout from './Layout';

function App() {
  const [products, setProducts] = useState([]);
  const [shoppingCart, setShoppingCart] = useState(0);

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

  const router = createBrowserRouter([{
    element: <Layout shoppingCart={shoppingCart} />,
    children: [{
      path: '/',
      element: <ProductList products={products} />,
    },
    {
      path: '/product/:id',
      element: <ProductDetail setShoppingCart={setShoppingCart} shoppingCart={shoppingCart} />,
    }],
  }]);

  return (
    <div className="App">
      {/* <Header shoppingCart={shoppingCart} /> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
