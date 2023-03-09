import React from 'react';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header({ shoppingCart }) {
  return (
    <div className="header">
      <Link to="/">
        <h1>Test-shop</h1>
      </Link>
      <Badge badgeContent={shoppingCart} color="primary">
        <ShoppingCartIcon color="action" />
      </Badge>
    </div>
    // https://www.youtube.com/watch?v=zy8rqihtvA8
  );
}
