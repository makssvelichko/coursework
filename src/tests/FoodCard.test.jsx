import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import FoodCard from './../components/FoodCard';
import '@testing-library/jest-dom';

describe('FoodCard component', () => {
  it('should render correctly', () => {
    const { getByText, getByAltText } = render(
      <Router>
        <FoodCard 
          image="test.jpg" 
          name="Test" 
          calories={100} 
          proteins={10} 
          fats={5} 
          carbs={20} 
          addToMenu={() => {}} 
          removeFromMenu={() => {}}
        />
      </Router>
    );
    expect(getByText('Test')).toBeInTheDocument();
    expect(getByAltText('Test')).toBeInTheDocument();
    expect(getByText('Калорії:')).toBeInTheDocument();
    expect(getByText('100 cal')).toBeInTheDocument();
    expect(getByText('Білки:')).toBeInTheDocument();
    expect(getByText('10 г')).toBeInTheDocument();
    expect(getByText('Жири:')).toBeInTheDocument();
    expect(getByText('5 г')).toBeInTheDocument();
    expect(getByText('Вуглеводи:')).toBeInTheDocument();
    expect(getByText('20 г')).toBeInTheDocument();
  });

  it('should call addToMenu and removeFromMenu when checkbox is toggled', () => {
    const addToMenu = jest.fn();
    const removeFromMenu = jest.fn();
    const { getByLabelText } = render(
      <Router>
        <FoodCard 
          image="test.jpg" 
          name="Test" 
          calories={100} 
          proteins={10} 
          fats={5} 
          carbs={20} 
          addToMenu={addToMenu} 
          removeFromMenu={removeFromMenu}
        />
      </Router>
    );
    
    const checkbox = getByLabelText('Додати до меню');
    fireEvent.click(checkbox);
    expect(addToMenu).toHaveBeenCalledWith({calories: 100, proteins: 10, fats: 5, carbs: 20});
    
    fireEvent.click(checkbox);
    expect(removeFromMenu).toHaveBeenCalledWith({calories: 100, proteins: 10, fats: 5, carbs: 20});
  });
});