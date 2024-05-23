import React, { createContext, useContext, useState } from 'react';

// Створюємо UserContext
export const UserContext = createContext();

// Компонент провайдер, який буде надавати дані користувача всім підлеглим компонентам
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Кастомний хук для зручного використання контексту
export const useUser = () => useContext(UserContext);