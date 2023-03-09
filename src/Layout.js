import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';

function Layout({ shoppingCart }) {
  return (
    <>
      <Header shoppingCart={shoppingCart} />
      <Outlet />
    </>
  );
}

export default Layout;
