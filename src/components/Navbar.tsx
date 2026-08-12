import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="site-navbar">
      <div className="site-navbar-inner">
        <Link
          to="/"
          className="site-brand"
        >
          CustomKin<span>.</span>
        </Link>

        <nav className="site-nav-links">
          <NavLink to="/">
            Home
          </NavLink>

          <a href="/#how-it-works">
            How It Works
          </a>

          <a href="/#designs">
            Designs
          </a>

          <NavLink to="/builder">
            Create
          </NavLink>
        </nav>

        <div className="site-nav-actions">
          <button
            type="button"
            className="nav-sign-in"
          >
            Sign In
          </button>

          <Link
            to="/builder"
            className="nav-primary-cta"
          >
            Start Your Tree
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar