import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar from './NavBar';
import RoundsView from './RoundsView';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="h-100 container-lg p-0">
        <RoundsView />
      </div>
    </div>
  );
}

export default App;
