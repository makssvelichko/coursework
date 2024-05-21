import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './styles/reset.css';
import './styles/common.css';
import UserStore from './store/UserStore';



export const Context = createContext(null)

const div = document.createElement('div');
div.id = 'root';
document.body.appendChild(div);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Context.Provider value={{
        user: new UserStore()
      }}>
        
        <App />
        
      </Context.Provider>
  </React.StrictMode>

);
