import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';

import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="NavBar navbar sticky-top navbar-expand-sm navbar-light">
      <div className="container p-0">
        <Link className="navbar-brand" to="/">Music Club</Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Rounds</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/members">Members</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
