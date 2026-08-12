import { Link, NavLink } from 'react-router-dom'
import customKinLogo from '../assets/logos/customkin-navbar-logo.png'

function Navbar() {
  return (
    <header className="site-navbar">
      <div className="site-navbar-inner">
        <Link
          to="/"
          className="site-brand"
          aria-label="CustomKin home"
        >
          <img
            src={customKinLogo}
            alt="CustomKin"
            className="site-brand-logo"
          />
        </Link>

        <nav
          className="site-nav-links"
          aria-label="Main navigation"
        >
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