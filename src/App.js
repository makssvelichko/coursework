import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Registration from './pages/Registration.jsx';
import RegistrationTwo from './pages/RegistrationTwo.jsx';

import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route path='/' element={ <Home/> } />
          <Route path='/login' element={<Login/>} />
          <Route path='/registration' element={<Registration/>} />
          <Route path='/registrationtwo' element={<RegistrationTwo/>} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
