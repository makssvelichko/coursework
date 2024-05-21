import { render, fireEvent } from '@testing-library/react';
import { Food } from './../pages/Food';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

test('renders Food component', () => {
  render(
    <MemoryRouter>
      <Food />
    </MemoryRouter>
  );
});

describe('Food component', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Food />
      </MemoryRouter>
    );
    expect(getByText('Харчування')).toBeInTheDocument();
    expect(getByText('Сніданок')).toBeInTheDocument();
  });

  it('should open and close modal when clicked', () => {
    const { getByText, getAllByText } = render(
      <MemoryRouter>
        <Food />
      </MemoryRouter>
    );
    
    fireEvent.click(getByText(/ПРОГРАМИ ТРЕНУВАНЬ/i));
    fireEvent.click(getAllByText(/ХАРЧУВАННЯ/i)[0]); // виберіть перший елемент з масиву
    fireEvent.click(getByText(/ПРОГРЕС/i));
  });
});