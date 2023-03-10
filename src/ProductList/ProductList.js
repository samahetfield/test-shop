import React, { useState, useEffect } from 'react';
import './product-list.css';
import { useNavigate } from 'react-router-dom';

const messages = { no_image_available: 'No image available' };

const handleOnClick = (id, navigate) => () => navigate(`/product/${id}`);

const renderProductList = ({ id, brand, model, price, imgUrl }, navigate) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  <div
    id={id}
    key={id}
    className="product-list-item"
    onClick={handleOnClick(id, navigate)}
  >
    <img src={imgUrl} alt={messages.no_image_available} />
    {' '}
    <div>{brand}</div>
    {' '}
    <div>{model}</div>
    {' '}
    <div>{price}</div>
  </div>
);

export default function ProductList({ products }) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [productsFiltered, setProductsFiltered] = useState([]);

  useEffect(() => {
    setProductsFiltered(products);
  }, [products]);

  useEffect(() => {
    const productsSearch = products.filter(
      (product) => product.brand.toLocaleLowerCase().includes(searchValue)
        || product.model.toLocaleLowerCase().includes(searchValue),
    );
    setProductsFiltered(productsSearch);
  }, [searchValue]);

  return (
    <div className="product-list-view">
      <div className="search-field">
        <input
          className="search-input"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </div>
      <div className="product-list">
        {productsFiltered.map((product) => renderProductList(product, navigate))}
      </div>
    </div>
  );
}
