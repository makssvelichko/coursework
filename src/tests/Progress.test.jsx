import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Progress from './../pages/Progress';
import '@testing-library/jest-dom';


describe('Progress component', () => {
  it('should render correctly', () => {
    const { getByText } = render(
        <Router>
          <Progress />
        </Router>
    );

    expect(getByText('Прогрес')).toBeInTheDocument();
    expect(getByText('Графік втрати ваги')).toBeInTheDocument();
  });

  // Інші тести для компонента Progress
});