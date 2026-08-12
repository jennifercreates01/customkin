import { Link } from 'react-router-dom'
import customKinMark from '../assets/logos/customkin-mark.png'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand">
          <img
            src={customKinMark}
            alt=""
            className="footer-mark"
          />

          <div>
            <strong>CustomKin</strong>
            <p>
              Your family, beautifully connected.
              Crafted to treasure.
            </p>
          </div>
        </div>

        <nav className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/builder">Create Your Tree</Link>
          <a href="/#how-it-works">How It Works</a>
          <a href="/#designs">Designs</a>
        </nav>

        <p className="footer-credit">
          CustomKin — built by <span>Jennifer.</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer