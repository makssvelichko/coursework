import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './styles/reset.css';
import './styles/common.css';
import UserStore from './store/UserStore';

import { GoogleOAuthProvider } from '@react-oauth/google';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Context.Provider value={{
        user: new UserStore()
      }}>
        <GoogleOAuthProvider clientId="899348282415-rhce4qf0726geh0t9316g296sksn3u1c.apps.googleusercontent.com">
        <App />
        </GoogleOAuthProvider>
      </Context.Provider>
  </React.StrictMode>

);
