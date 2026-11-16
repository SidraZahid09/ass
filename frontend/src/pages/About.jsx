import { Link } from "react-router-dom";
import { CTA, PageHero } from "../components/Layout";

export default function About() {
  return <>
    <PageHero eyebrow="Who we are" title="About Us">AssetElevatte brings finance, marketing and technology together to help businesses grow with clarity and confidence.</PageHero>
    <section className="about-intro"><div className="container about-intro-grid">
      <div className="about-intro-content"><span className="eyebrow">Who we are</span><h2>Smarter decisions,<br/><span>stronger businesses.</span></h2>
        <p>AssetElevatte brings finance, marketing and technology together to help founders and teams build strong foundations and move forward with confidence.</p>
        <p>We help businesses connect their priorities, simplify complex decisions and create practical strategies for sustainable growth.</p>
        <ul className="about-checklist"><li>Clear priorities and practical next steps</li><li>Solutions tailored to your business stage</li><li>A connected approach to business growth</li><li>Support that can evolve as you scale</li></ul>
        <Link className="btn btn-dark" to="/contact">Get to know us ↗</Link>
      </div>
      <div className="about-image"><img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85" alt="Modern professional office environment" loading="lazy"/><div className="about-image-caption"><span className="caption-line"></span><p>Finance. Marketing. Technology.</p></div></div>
    </div></section>
    <section className="about-purpose"><div className="container"><div className="about-purpose-heading"><span className="eyebrow">Our purpose</span><h2>Growth works better when every part works together.</h2><p>Growing businesses often coordinate multiple partners for accounting, marketing and technology. We connect those priorities so strategy and execution move in the same direction.</p></div>
      <div className="cards three"><article className="principle-card"><div className="principle-icon">◎</div><h3>Clarity</h3><p>Make complex business priorities easier to understand and act on.</p></article><article className="principle-card"><div className="principle-icon">◇</div><h3>Collaboration</h3><p>Bring people, expertise and execution together around shared goals.</p></article><article className="principle-card"><div className="principle-icon">↗</div><h3>Progress</h3><p>Focus on meaningful outcomes and sustainable long-term business growth.</p></article></div>
    </div></section>
    <CTA title="Let's discuss where your business can go next." text="Start with a conversation about your goals and challenges."/>
  </>;
}
