import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  HashRouter,
  Switch,
  Route
} from "react-router-dom";

import NavBar from '../NavBar/NavBar';
import ClubView from '../ClubView/ClubView';
import RoundView from '../RoundView/RoundView';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <NavBar />

        <div className="h-100 container">
          <Switch>
            <Route exact path="/" component={ClubView} />
            <Route exact path="/round/:id" component={RoundView} />
          </Switch>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
