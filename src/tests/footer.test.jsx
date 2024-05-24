import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import Footer from './../components/footer/footer';

test('renders Footer component', () => {
    render(<Router><Footer /></Router>);

    expect(screen.getByText('ПРОГРАМИ')).toBeInTheDocument();
    expect(screen.getByText('ТРЕНЕР')).toBeInTheDocument();
    expect(screen.getByText('ПЛАНИ ПІДПИСОК')).toBeInTheDocument();
    expect(screen.getByText('ОСОБИСТИЙ КАБІНЕТ')).toBeInTheDocument();
    expect(screen.getByText('Правила користування')).toBeInTheDocument();
});