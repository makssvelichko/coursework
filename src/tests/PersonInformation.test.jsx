import { render, fireEvent } from '@testing-library/react';
import { Card, PersonInformation } from './../pages/PersonInformation';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Card component', () => {
  it('should render correctly', () => {
    const { getByText: getByText1 } = render(
        <MemoryRouter>
          <Card title="Test" initialValue={5} onSelect={() => {}} min={1} max={10} />
        </MemoryRouter>
      );
    expect(getByText1('Test')).toBeInTheDocument();
    expect(getByText1('5')).toBeInTheDocument();
  });

  it('should call onSelect with correct value when increaseValue and decreaseValue are called', () => {
    const onSelect = jest.fn();
    const { getByText: getByText2 } = render(
        <MemoryRouter>
          <Card title="Test" initialValue={5} onSelect={onSelect} min={1} max={10} />
        </MemoryRouter>
      );
    
    fireEvent.click(getByText2('+'));
    expect(onSelect).toHaveBeenCalledWith(6);
    
    fireEvent.click(getByText2('-'));
    expect(onSelect).toHaveBeenCalledWith(5);
  });
});

describe('PersonInformation component', () => {
  it('should render correctly', () => {
    const { getByText: getByText3 } = render(
        <MemoryRouter>
          <PersonInformation />
        </MemoryRouter>
      );
    expect(getByText3('Особиста інформація')).toBeInTheDocument();
    expect(getByText3('Ваше ім\'я')).toBeInTheDocument();
  });

  it('should update state when input changes', () => {
    const { getByPlaceholderText } = render(
        <MemoryRouter>
          <PersonInformation />
        </MemoryRouter>
      );
    const input = getByPlaceholderText('Username');
    
    fireEvent.change(input, { target: { value: 'Test' } });
    expect(input.value).toBe('Test');
  });
});