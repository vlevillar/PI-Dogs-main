import './App.css';
import { LandingPage } from './components/LandingPage/LandingPage';
import { BrowserRouter, Route } from "react-router-dom"
import Home from './components/Home/Home';
import DogCreate from './components/DogCreate/DogCreate';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/dog" component={DogCreate}/>
        <Route exact path="/dogs/:id" component={Detail}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
