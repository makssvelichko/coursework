import React from 'react';
import { render, screen} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import Home from './../pages/Home';


test('renders Home component', () => {
    render(<Router><Home /></Router>);


    expect(screen.getByText('Почни зміни вже зараз')).toBeInTheDocument();
    expect(screen.getByText('Побудуй форму своєї мрії')).toBeInTheDocument();
    expect(screen.getByText('Різні рівні підготовки')).toBeInTheDocument();
    expect(screen.getByText('Тренування будь-де та відео уроки для тебе')).toBeInTheDocument();
    expect(screen.getByText('Почати')).toBeInTheDocument();
    expect(screen.getByText('Програми')).toBeInTheDocument();
    expect(screen.getByText('Всі програми')).toBeInTheDocument();
    expect(screen.getByText('Тренер')).toBeInTheDocument();
    expect(screen.getByText('Плани підписки для тебе')).toBeInTheDocument();
    expect(screen.getByText('Кругляк Артем, 18')).toBeInTheDocument();

});