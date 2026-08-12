import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import customKinLogo from '../assets/logos/customkin-logo.png'

function HomePage() {
  return (
    <div className="home-page">
      <Navbar />

      <main>
        <section className="home-hero">
          <div className="home-hero-copy">
            <p className="hero-eyebrow">
              A FAMILY TREE MADE TO TREASURE
            </p>

            <h1>
              Every family has a story.
              <span> Make yours beautiful.</span>
            </h1>

            <p className="hero-description">
              Create a personalized, frame-worthy family tree
              designed for families of every shape and size.
              Build your connections, choose your style, and
              create something worth passing down.
            </p>

            <div className="hero-actions">
              <Link
                to="/builder"
                className="hero-primary"
              >
                Start Your Family Tree
              </Link>

              <a
                href="#how-it-works"
                className="hero-secondary"
              >
                See How It Works
              </a>
            </div>

            <p className="hero-note">
              No design experience needed.
            </p>
          </div>

          <div className="home-hero-visual">
            <div className="hero-logo-card">
              <img
                src={customKinLogo}
                alt="CustomKin — Your family, beautifully connected. Crafted to treasure."
              />
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="how-it-works-section"
        >
          <div className="section-heading">
            <p className="section-eyebrow">
              HOW IT WORKS
            </p>

            <h2>
              From family connections to something
              you’ll want to frame.
            </h2>
          </div>

          <div className="how-it-works-grid">
            <article>
              <span>01</span>
              <h3>Build your family</h3>
              <p>
                Add parents, partners, children, siblings,
                and the people who make your family yours.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Make it beautiful</h3>
              <p>
                Choose a theme and customize the look without
                changing the family story underneath.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Treasure it</h3>
              <p>
                Preview your finished tree and prepare it for
                printing, gifting, and sharing.
              </p>
            </article>
          </div>
        </section>

        <section
          id="designs"
          className="design-showcase-section"
        >
          <div className="section-heading centered">
            <p className="section-eyebrow">
              MADE FOR YOUR FAMILY
            </p>

            <h2>
              No two families grow the same way.
            </h2>

            <p>
              CustomKin is designed to celebrate families
              of all shapes, generations, and connections.
            </p>
          </div>

          <div className="design-pill-row">
            <span>Elegant</span>
            <span>Floral</span>
            <span>Farmhouse</span>
            <span>Modern</span>
          </div>
        </section>

        <section className="home-final-cta">
          <p className="section-eyebrow">
            YOUR FAMILY. YOUR STORY.
          </p>

          <h2>
            Create something your family can keep.
          </h2>

          <p>
            Start with the people you love. We’ll help you
            turn the connections into something beautiful.
          </p>

          <Link
            to="/builder"
            className="hero-primary"
          >
            Start Your Tree
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage