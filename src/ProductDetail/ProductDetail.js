import React, { useState, useEffect } from 'react';
import { useMatches } from 'react-router-dom';
import Button from '@mui/material/Button';
import Selector from '../Components/Selector';

import './product-detail.css';

const messages = {
  select_color: 'Select device color',
  select_storages: 'Select device storage',
  no_image_available: 'No image available',
};

// eslint-disable-next-line max-len
const addToCart = (productId, colorSelected, storageSelected, isAdding, setIsAdding) => async () => {
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
  setIsAdding(false);
};

export default function ProductDetail() {
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
            <div>{brand}</div>
            <div>{model}</div>
            <div>{price}</div>
            <div>{cpu}</div>
            <div>{ram}</div>
            <div>{os}</div>
            <div>{displaySize}</div>
            <div>{battery}</div>
            <div>{primaryCamera}</div>
            <div>{secondaryCamera}</div>
            <div>{dimentions}</div>
            <div>{weight}</div>
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
          <div>
            <Button
              variant="contained"
              onClick={addToCart(
                matches.params.id,
                storageSelected,
                colorSelected,
                isAdding,
                setIsAdding,
              )}
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
