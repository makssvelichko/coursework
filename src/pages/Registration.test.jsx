import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { Card, Card2 } from './../pages/Registration';

describe('Card component', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Card title="Test" initialValue={5} onSelect={() => {}} min={1} max={10} />);
    expect(getByText('Test')).toBeInTheDocument();
    expect(getByText('5')).toBeInTheDocument();
  });

  it('should call onSelect with correct value when increaseValue and decreaseValue are called', () => {
    const onSelect = jest.fn();
    const { getByText } = render(<Card title="Test" initialValue={5} onSelect={onSelect} min={1} max={10} />);
    
    fireEvent.click(getByText('+'));
    expect(onSelect).toHaveBeenCalledWith(6);
    
    fireEvent.click(getByText('-'));
    expect(onSelect).toHaveBeenCalledWith(5);
  });
});

describe('Card2 component', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Card2 text="Test" selected={false} onSelect={() => {}} />);
    expect(getByText('Test')).toBeInTheDocument();
  });

  it('should call onSelect when card is clicked', () => {
    const onSelect = jest.fn();
    const { getByText } = render(<Card2 text="Test" selected={false} onSelect={onSelect} />);
    
    fireEvent.click(getByText('Test'));
    expect(onSelect).toHaveBeenCalled();
  });
});