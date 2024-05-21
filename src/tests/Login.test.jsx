import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Context } from '../index';
import Login from '../pages/Login';

test('renders Login component and checks user interaction', async () => {
    const setUser = jest.fn();
    const setIsAuth = jest.fn();
    const user = {
      setUser,
      setIsAuth,
    };
  
    const { getByPlaceholderText, getByText } = render(
      <Context.Provider value={{ user }}>
        <Router>
          <Login />
        </Router>
      </Context.Provider>
    );

  const emailInput = getByPlaceholderText('E-mail');
  const passwordInput = getByPlaceholderText('Пароль');
  const loginButton = getByText('УВІЙТИ');


  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });


  fireEvent.click(loginButton);
});