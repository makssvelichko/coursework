import { render, fireEvent } from '@testing-library/react';
import { Office } from '../pages/Office';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Office component', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <Router>
        <Office />
      </Router>
    );
    expect(getByText(/Усі програми/i)).toBeInTheDocument();
    expect(getByText(/Для залу/i)).toBeInTheDocument();
    expect(getByText(/Для майданчика/i)).toBeInTheDocument();
    expect(getByText(/Вдома/i)).toBeInTheDocument();
  });

  it('should open and close modal when clicked', () => {
    const { getByText } = render(
      <Router>
        <Office />
      </Router>
    );
    
    fireEvent.click(getByText(/ПРОГРАМИ ТРЕНУВАНЬ/i));
    fireEvent.click(getByText(/ХАРЧУВАННЯ/i));
    fireEvent.click(getByText(/ПРОГРЕС/i));
  });
});