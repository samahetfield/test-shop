import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductList from '../ProductList/ProductList';

describe('Product List', () => {
  test('Product list screen should render only the search input when no products are available', () => {
    // Arrange
    const productList = [];
    // Act
    const { container } = render(
      <BrowserRouter>
        <ProductList products={productList} />
      </BrowserRouter>,
    );

    // Assertions
    expect(container.querySelector('.search-field')).toBeTruthy();
    expect(container.querySelector('.product-list-item')).toBeFalsy();
  });

  test('Product list screen should render the product list showing the brand, model and price', () => {
    // Arrange
    const productList = [{ id: '1', brand: 'Acer', model: 'Test model', price: 0, imgUrl: 'urlTest' }, { id: '2', brand: 'Acer', model: 'Test model 2', price: 10, imgUrl: 'urlTest2' }];
    // Act
    const { container } = render(
      <BrowserRouter>
        <ProductList products={productList} />
      </BrowserRouter>,
    );

    // Assertions
    expect(container.querySelector('.search-field')).toBeTruthy();
    expect(container.querySelector('.product-list-item')).toBeTruthy();
    expect(screen.getAllByText('Acer')).toBeTruthy();
    expect(screen.getByText('Test model')).toBeTruthy();
    expect(screen.getByText('Test model 2')).toBeTruthy();
    expect(screen.getByText('0')).toBeTruthy();
    expect(screen.getByText('10')).toBeTruthy();
  });
});
