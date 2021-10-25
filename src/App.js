import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import NavBar from './NavBar';
import RoundsView from './RoundsView';
import Round from './Round';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />

        <div className="h-100 container-lg p-0">
          <Switch>
            <Route path="/" component={RoundsView} exact />
            <Route path="/round/:id" component={Round} exact />
          </Switch>
        </div>
      </div>

    </Router>
  );
}

export default App;
