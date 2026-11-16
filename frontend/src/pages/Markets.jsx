import { Link } from "react-router-dom";
import { PageHero } from "../components/Layout";

const markets = [
  ["India", "in", "Finance, tax and compliance support alongside digital and marketing services for businesses operating in India."],
  ["Saudi Arabia", "sa", "Business support for teams exploring financial operations, digital systems and market growth."],
  ["United States", "us", "Accounting and technology-enabled business support shaped around your operational needs."],
  ["Australia", "au", "Flexible support for businesses seeking connected finance, technology and marketing services."],
  ["United Kingdom", "gb", "Practical support for finance workflows, digital presence and business operations."],
  ["United Arab Emirates", "ae", "Integrated business support across finance, digital solutions and customer acquisition."]
];

export default function Markets() {
  return <>
    <PageHero eyebrow="Global reach" title="Local understanding. A global outlook.">AssetElevatte supports businesses with finance, accounting, technology and marketing solutions across key international markets. Our approach connects practical execution with the needs of each business and its operating environment.</PageHero>
    <section className="section"><div className="container"><div className="section-head"><span className="eyebrow">Markets we serve</span><h2>Working across borders and business needs.</h2><p>Our current market footprint includes India, Saudi Arabia, the United States, Australia, the United Kingdom and the United Arab Emirates. Contact us to discuss the services and support relevant to your location.</p></div>
      <div className="cards market-grid">{markets.map(([name, code, description]) => <article className="card market-card" key={code}><img className="market-flag" src={`https://flagcdn.com/w80/${code}.png`} alt={`Flag of ${name}`} width="64" height="43" loading="lazy"/><h3>{name}</h3><p>{description}</p></article>)}</div>
      <p className="market-note">Service availability and local compliance requirements depend on the engagement. Contact our team to confirm the right scope for your market.</p>
    </div></section>
    <section className="section section-soft"><div className="container"><div className="cta-band"><div><span className="eyebrow">Let's talk</span><h2>Planning to grow across markets?</h2><p>Tell us where you operate and what you need help with. We'll discuss the next steps with you.</p></div><Link className="btn btn-gold" to="/contact">Contact AssetElevatte ↗</Link></div></div></section>
  </>;
}
