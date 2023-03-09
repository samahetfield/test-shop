import React from 'react';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import './Header.css';
import imageLogo from '../images/logo.png';

export default function Header({ shoppingCart }) {
  return (
    <div className="header">
      <Link to="/">
        <img src={imageLogo} alt="Test shop" />
      </Link>
      <Badge badgeContent={shoppingCart} color="primary">
        <ShoppingCartIcon color="action" />
      </Badge>
    </div>
  );
}
