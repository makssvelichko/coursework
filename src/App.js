import AppRouter from './components/AppRouter.js';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Registration from './pages/Registration.jsx';
import RegistrationTwo from './pages/RegistrationTwo.jsx';

import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <AppRouter/>
      </Router>

    </div>
  );
}

export default App;
