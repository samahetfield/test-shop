import React, { useState, useEffect } from 'react'
import { useMatches } from "react-router-dom";
import Selector from '../Components/Selector';

import './product-detail.css'

const messages = {
  select_color: "Select device color",
  select_storages: "Select device storage"
}

export const ProductDetail = (props) => {
  const [productDetail, setProductDetail] = useState(null);
  const [matches] = useMatches();

  useEffect(() => {
    const fetchData = async () => {
      const productId = matches.params.id;
      const responseApi = await fetch(`https://itx-frontend-test.onrender.com/api/product/${productId}`);
      const jsonData = await responseApi.json();
      setProductDetail(jsonData);
      return jsonData;
    }
    fetchData();
  }, [])

  if (productDetail != null) {
    const { brand, model, price, cpu, ram, os, displaySize, battery, primaryCamera, secondaryCamera, dimentions, weight, options: { colors, storages } } = productDetail


    return (
      <div className="product-detail">
        <div className="product-image"> <img src={productDetail.imgUrl} /></div>
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
            <Selector options={colors} placeholder={messages.select_color} />
            <Selector options={storages} placeholder={messages.select_storages} />

          </div>
        </div>
      </div>
    )
  }

}
