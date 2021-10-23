import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="NavBar navbar sticky-top navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Music Club</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">Rounds</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Members</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
