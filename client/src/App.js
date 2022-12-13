import './App.css';
import { LandingPage } from './components/LandingPage/LandingPage';
import {BrowserRouter, Route, Switch} from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Route exact path="/" component={LandingPage}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
