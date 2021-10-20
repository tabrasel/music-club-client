import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <a class="navbar-brand" href="#">Music Club</a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#">Rounds</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Members</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
