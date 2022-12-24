import './App.css';
import { LandingPage } from './components/LandingPage/LandingPage';
import { BrowserRouter, Route } from "react-router-dom"
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/home" component={Home}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
