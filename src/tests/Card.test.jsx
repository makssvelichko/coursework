import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Card from './../components/Card';
import '@testing-library/jest-dom';

describe('Card component', () => {
  it('should render correctly', () => {
    const { getByText, getByAltText } = render(
      <Router>
        <Card id="1" title="Test" image="test.jpg" sessions={5} duration="25-30 хв" intensity="Низька" />
      </Router>
    );
    expect(getByText('Test')).toBeInTheDocument();
    expect(getByAltText('Test')).toBeInTheDocument();
    expect(getByText('Тренувань:')).toBeInTheDocument();
    expect(getByText('5')).toBeInTheDocument();
    expect(getByText('Тривалість:')).toBeInTheDocument();
    expect(getByText('25-30 хв')).toBeInTheDocument();
    expect(getByText('Інтенсивність:')).toBeInTheDocument();
    expect(getByText('Низька')).toBeInTheDocument();
  });
});