import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Router, { BrowserRouter } from 'react-router-dom';
import ProductDetail from '../ProductDetail/ProductDetail';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useMatches: jest.fn(),
}));

describe('Product Detail', () => {
  beforeEach(() => {
    jest.spyOn(Router, 'useMatches').mockReturnValue([{ params: { id: 1 } }]);
  });
  test('Product detail screen should not render anything if no product info is fetched', () => {
    // Arrange

    // Act
    const { container } = render(
      <BrowserRouter>
        <ProductDetail setShoppingCart={() => { }} shoppingCart={0} />
      </BrowserRouter>,
    );

    // Assertions
    expect(container.querySelector('.product-detail')).toBeFalsy();
  });
  test('Product detail screen should render the product details description when a product is fetched', async () => {
    // Arrange
    const productTest = {
      brand: 'Test',
      model: 'model Test',
      options: {
        colors: [{ code: 1, name: 'Black' }],
        storages: [{ code: 2, name: '12GB' }],
      },
    };

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(productTest),
    }));

    // Act
    const { container } = render(
      <BrowserRouter>
        <ProductDetail setShoppingCart={() => { }} shoppingCart={0} />
      </BrowserRouter>,
    );

    // Assertions
    await waitFor(() => {
      expect(container.querySelector('.product-detail')).toBeTruthy();
    });
  });
});
