import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';

function Layout({ shoppingCart, routes }) {
  return (
    <>
      <Header shoppingCart={shoppingCart} routes={routes} />
      <Outlet />
    </>
  );
}

export default Layout;
