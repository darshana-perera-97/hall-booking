import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure Bootstrap is imported

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            BrandName
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/SuperAdmin">
                  SuperAdmin
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  View Hotel
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/hotel">
                  Hotel
                </Link>
              </li>
              {/* <li className="nav-item">
              <Link className="nav-link" to="/quote">
                Quote
              </Link>
            </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
