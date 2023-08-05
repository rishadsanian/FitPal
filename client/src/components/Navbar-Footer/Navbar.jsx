const Navbar = () => {
  return (
    <div>
      <nav className="navbar bg-dark navbar-expand-sm" data-bs-theme="dark">
        <div className="container-fluid">
          <a href="/" className="navbar-brand p-3 text-warning" style={{'fontFamily': 'Pacifico', 'fontSize': 30}} >
            FitPal
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar"
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collpase navbar-collapse" id="navbar">
            <ul className="navbar-nav me-auto my-2 my-lg-0">
              <li className="nav-item">
                <a href="/programs/1" className="nav-link">
                  Progams
                </a>
              </li>

              <li className="nav-item">
                <a href="/programs/log" className="nav-link">
                  Log
                </a>
              </li>
            </ul>

            <div className="d-flex">
              <a href="/login" className="btn btn-light">
                Log in
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
