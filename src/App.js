import React from 'react';
import AppRouter from "./components/AppRouter.js";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
          <AppRouter />
      </Router>
    </div>
  );
}

export default App;