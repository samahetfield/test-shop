import React from 'react';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../Components/BreadCrums';
import './Header.css';
import imageLogo from '../images/logo.png';

export default function Header({ shoppingCart, routes }) {
  return (
    <div className="header">
      <div className="header-navigations">
        <Link to="/">
          <img src={imageLogo} alt="Test shop" />
        </Link>
        <Breadcrumbs routes={routes} />
      </div>
      <Badge badgeContent={shoppingCart} color="primary">
        <ShoppingCartIcon color="action" />
      </Badge>
    </div>
  );
}
