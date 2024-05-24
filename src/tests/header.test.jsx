import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './../components/header/header';
import '@testing-library/jest-dom';


test('renders Header component', () => {
    render(<Router><Header /></Router>);

    expect(screen.getByAltText('LOGO')).toBeInTheDocument();
    expect(screen.getByText('ПРОГРАМИ')).toBeInTheDocument();
    expect(screen.getByText('ТРЕНЕР')).toBeInTheDocument();
    expect(screen.getByText('ПЛАНИ ПІДПИСОК')).toBeInTheDocument();
    expect(screen.getByText('ПРИДБАТИ ПІДПИСКУ')).toBeInTheDocument();
    expect(screen.getByText('УВІЙТИ')).toBeInTheDocument();
});