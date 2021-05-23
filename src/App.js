
import './App.css';
import CryptocurrencyTable from './Components/CryptocurrencyTable';
import DragCard from './Components/DragCard/DragCard';
import ViewTable from './Components/ViewTable';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";


function App() {
  return (
    <div className="App">
     <DragCard/>

     <Router>
        <Switch>
              <Route path="/home">
                  <CryptocurrencyTable/>
              </Route>

              <Route path="/view">
                  <ViewTable/>
              </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
