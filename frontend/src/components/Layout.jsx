import { Link, NavLink } from "react-router-dom";

const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/services", "Services"],
  ["/markets", "Markets"],
  ["/blogs", "Blogs"],
  ["/contact", "Contact"]
];

export default function Layout({ children }) {
  return (
    <>
      <header className="site-header">
        <div className="container nav-wrap">
          <Link className="brand" to="/" aria-label="AssetElevatte home">
            <img className="brand-logo" src="/assetelevatte-logo.png" alt="AssetElevatte — Global Finance & Technology Solutions" />
          </Link>
          <nav className="main-nav" aria-label="Main navigation">
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === "/"}>{label}</NavLink>
            ))}
          </nav>
          <Link className="nav-cta" to="/contact">Let's Talk <span>↗</span></Link>
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <Link className="brand footer-brand" to="/">
              <img className="brand-logo footer-logo" src="/assetelevatte-logo.png" alt="AssetElevatte — Global Finance & Technology Solutions" />
            </Link>
            <p>Bringing finance, marketing and technology together to help businesses grow with clarity and confidence.</p>
          </div>
          <div><h4>Explore</h4>{links.slice(1).map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}</div>
          <div><h4>Get in touch</h4><a href="tel:+919369405511">+91 93694 05511</a><a href="mailto:assetelevatte@gmail.com">assetelevatte@gmail.com</a><a href="https://www.linkedin.com/company/assetelevatte/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://www.instagram.com/assetelevatte/" target="_blank" rel="noreferrer">Instagram ↗</a></div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} AssetElevatte. All rights reserved.</span><span>Lucknow, Uttar Pradesh, India</span></div>
      </footer>
    </>
  );
}

export function PageHero({ eyebrow, title, children }) {
  return <section className="page-hero"><div className="container">
    <div className="breadcrumbs"><Link to="/">Home</Link><span>→</span>{title}</div>
    <span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{children && <p>{children}</p>}
  </div></section>;
}

export function CTA({ title = "Ready to bring your growth plans together?", text = "Tell us where you want to go. We'll help you explore the next steps." }) {
  return <section className="section"><div className="container"><div className="cta-band"><div><h2>{title}</h2><p>{text}</p></div><Link className="btn btn-gold" to="/contact">Start a conversation ↗</Link></div></div></section>;
}
