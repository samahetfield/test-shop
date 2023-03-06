import React, { useState, useEffect } from 'react'
import './product-list.css'

const renderProductList = ({ id, brand, model, price, imgUrl }) => {
    return <div id={id} key={id} className="product-list-item"><img src={imgUrl} /> <div>{brand}</div> <div>{model}</div> <div>{price}</div></div>
}

export const ProductList = ({ products }) => {
    const [searchValue, setSearchValue] = useState('');
    const [productsFiltered, setProductsFiltered] = useState([]);


    useEffect(() => { setProductsFiltered(products) }, [products])

    useEffect(() => {
        const productsFiltered = products.filter((product) => product.brand.toLocaleLowerCase().includes(searchValue) || product.model.toLocaleLowerCase().includes(searchValue))
        setProductsFiltered(productsFiltered)
    }, [searchValue])

    return productsFiltered.length > 0 ? (<div className="product-list-view">
        <div className='search-field'><input className="search-input" value={searchValue} onChange={(event) =>
            setSearchValue(event.target.value)
        }></input></div>
        <div className="product-list">{productsFiltered.map((product) => renderProductList(product))}</div>
    </div >) : null
}
