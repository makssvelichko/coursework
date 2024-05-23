import OfferCard from './../pages/Subscriptions';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('OfferCard component', () => {
  it('should render correctly', () => {
    const props = {
      image: 'test-image.jpg',
      duration: 1,
      price: 1000,
      discount: 10,
    };

    render(
      <Router>
        <OfferCard {...props} />
      </Router>
    );

    expect(screen.getByText(`${props.duration} місяці`)).toBeInTheDocument();
    const allButtons = screen.getAllByText('Продовжити');
    allButtons.forEach(button => {
    expect(button).toBeInTheDocument();
    });
  });
});