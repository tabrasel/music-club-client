import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  HashRouter,
  Switch,
  Route
} from "react-router-dom";

import NavBar from '../NavBar/NavBar';
import AlbumView from '../AlbumView/AlbumView';
import ClubView from '../ClubView/ClubView';
import MemberView from '../MemberView/MemberView';
import RoundView from '../RoundView/RoundView';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <NavBar />

        <div className="h-100 container">
          <Switch>
            <Route exact path="/" component={ClubView} />
            <Route exact path="/album/:id" component={AlbumView} />
            <Route exact path="/member/:id" component={MemberView} />
            <Route exact path="/round/:id" component={RoundView} />
          </Switch>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
