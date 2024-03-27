import Footer from './components/footer/footer.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route path='/' element={ <Home/> } />
          <Route path='/login' element={<Login/>} />
        </Routes>

        <Footer/>
      </Router>

    </div>
  );
}

export default App;
