import React from 'react';
import { render, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header/Header';

describe('Header', () => {
  test('Header should render the logo, breadcrums and the shopping cart', () => {
    // Arrange
    // Act
    const { container } = render(
      <BrowserRouter>
        <Header shoppingCart={0} routes={[]} />
      </BrowserRouter>,
    );

    // Assertions
    expect(container.querySelector('.header')).toBeTruthy();
    expect(container.querySelector('.header-navigations')).toBeTruthy();
    expect(container.querySelector('.breadcrumb')).toBeTruthy();
    expect(container.querySelector('.MuiBadge-root')).toBeTruthy();
  });
  test('Header shopping cart should render the number of items in the cart', () => {
    // Arrange
    const shoppingCartItems = 2;
    // Act
    const { container } = render(
      <BrowserRouter>
        <Header shoppingCart={shoppingCartItems} routes={[]} />
      </BrowserRouter>,
    );

    const { getByText } = within(container.querySelector('.MuiBadge-badge'));

    // Assertions
    expect(getByText(shoppingCartItems)).toBeInTheDocument();
  });
});
