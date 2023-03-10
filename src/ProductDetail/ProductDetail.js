import React, { useState, useEffect } from 'react';
import { useMatches } from 'react-router-dom';
import Button from '@mui/material/Button';
import Selector from '../Components/Selector';

import './product-detail.css';

const messages = {
  select_color: 'Select color',
  select_storages: 'Select storage',
  no_image_available: 'No image available',
  add_to_cart: 'Add to cart',
  price: 'Price: ',
  cpu: 'CPU: ',
  ram: 'RAM: ',
  os: 'OS: ',
  displaySize: 'Display Size: ',
  battery: 'Battery: ',
  primaryCamera: 'Primary camera: ',
  secondaryCamera: 'Secondary camera: ',
  dimentions: 'Dimentions: ',
  weight: 'Weight: ',
};

// eslint-disable-next-line max-len
const addToCart = (productId, colorSelected, storageSelected, isAdding, setIsAdding, shoppingCart, setShoppingCart) => async () => {
  if (isAdding) return;
  setIsAdding(true);
  const productToAdd = {
    id: productId,
    colorCode: colorSelected,
    storageCode: storageSelected,
  };
  const jsonData = await fetch(
    'https://itx-frontend-test.onrender.com/api/cart',
    {
      method: 'POST',
      body: JSON.stringify(productToAdd),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    },
  );
  await jsonData.json();
  setShoppingCart(shoppingCart + 1);
  setIsAdding(false);
};

export default function ProductDetail({ shoppingCart, setShoppingCart }) {
  const [productDetail, setProductDetail] = useState(null);
  const [storageSelected, setStorageSelected] = useState(null);
  const [colorSelected, setColorSelected] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [matches] = useMatches();

  useEffect(() => {
    const fetchData = async () => {
      const productId = matches.params.id;
      const responseApi = await fetch(
        `https://itx-frontend-test.onrender.com/api/product/${productId}`,
      );
      const productFound = await responseApi.json();
      setProductDetail(productFound);
      setColorSelected(productFound.options.colors[0].code);
      setStorageSelected(productFound.options.storages[0].code);

      return productFound;
    };
    fetchData();
  }, []);

  if (productDetail != null) {
    const {
      brand,
      model,
      price,
      cpu,
      ram,
      os,
      displaySize,
      battery,
      primaryCamera,
      secondaryCamera,
      dimentions,
      weight,
      options: { colors, storages },
    } = productDetail;

    return (
      <div className="product-detail">
        <div className="product-image">
          {' '}
          <img src={productDetail.imgUrl} alt={messages.no_image_available} />
        </div>
        <div className="product-specifications">
          <div className="product-description">
            <div className="product-brand">
              {brand}
            </div>
            <div className="product-model">
              {model}
            </div>
            <div className="product-property">
              <div>{messages.price}</div>
              <div>{price}</div>
            </div>
            <div className="product-property">
              <div>{messages.cpu}</div>
              <div>{cpu}</div>
            </div>
            <div className="product-property">
              <div>{messages.ram}</div>
              <div>{ram}</div>
            </div>
            <div className="product-property">
              <div>{messages.os}</div>
              <div>{os}</div>
            </div>
            <div className="product-property">
              <div>{messages.displaySize}</div>
              <div>{displaySize}</div>
            </div>
            <div className="product-property">
              <div>{messages.battery}</div>
              <div>{battery}</div>
            </div>
            <div className="product-property">
              <div>{messages.primaryCamera}</div>
              <div>{primaryCamera}</div>
            </div>
            <div className="product-property">
              <div>{messages.secondaryCamera}</div>
              <div>{secondaryCamera != null ? secondaryCamera : 'N/A'}</div>
            </div>
            <div className="product-property">
              <div>{messages.dimentions}</div>
              <div>{dimentions}</div>
            </div>
            <div className="product-property">
              <div>{messages.weight}</div>
              <div>{weight}</div>
            </div>
          </div>
          <div className="product-actions">
            <Selector
              options={colors}
              placeholder={messages.select_color}
              optionSelected={colorSelected}
              onChangeOption={setColorSelected}
            />
            <Selector
              options={storages}
              placeholder={messages.select_storages}
              optionSelected={storageSelected}
              onChangeOption={setStorageSelected}
            />
          </div>
          <div className="add-to-cart-button">
            <Button
              variant="contained"
              onClick={addToCart(
                matches.params.id,
                storageSelected,
                colorSelected,
                isAdding,
                setIsAdding,
                shoppingCart,
                setShoppingCart,
              )}
            >
              {messages.add_to_cart}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
