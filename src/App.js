import Blockplans from './components/blockplans/blockplans.jsx';
import Blocktrainer from './components/blocktrainer/blocktrainer.jsx';
import Footer from './components/footer/footer.jsx';
import Header from './components/header/header.jsx';
import Mainprograms from './components/mainprograms/mainprograms.jsx';
import Promo from './components/promo/promo.jsx';
import Start from './components/startblock/start.jsx';

function App() {
  return (
    <div className="App">
      <Header/>
      <Promo/>
      <Start/>
      <Mainprograms/>
      <Blocktrainer/>
      <Blockplans/>
      <Footer/>

    </div>
  );
}

export default App;
