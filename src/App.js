import AppRouter from "./components/AppRouter.js";

import { BrowserRouter as Router } from "react-router-dom";

import { UserProvider } from './components/UserContext.js';

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
        <AppRouter />
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
