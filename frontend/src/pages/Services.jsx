import { Link } from "react-router-dom";
import { CTA, PageHero } from "../components/Layout";

const services = [
  { id: "finance", number: "01", name: "Finance", title: "Financial clarity and operational confidence.", text: "Keep your books organised, understand performance and build reliable financial processes to support better decisions.", points: ["Bookkeeping and financial reporting", "Accounts payable and receivable support", "Reconciliation and management reporting", "Tax and compliance coordination", "Finance process improvement"], image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85", caption: "Know your numbers. Plan with confidence." },
  { id: "marketing", number: "02", name: "Marketing", title: "Marketing that connects attention to action.", text: "Develop a recognisable brand, build an engaged audience and make your marketing activity work towards clear business objectives.", points: ["Brand strategy and positioning", "Social media management and content", "Search engine optimisation", "Performance advertising and campaign support", "Influencer and brand collaborations"], image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85", caption: "Build your brand. Grow your reach.", reverse: true },
  { id: "technology", number: "03", name: "Technology", title: "Digital solutions designed to move you forward.", text: "Use technology to improve customer experiences, simplify operations and prepare your business to scale.", points: ["Website design and development", "Web applications and digital products", "AI integration and business automation", "Technology consulting", "SEO and website performance improvements"], image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=85", caption: "Smarter systems. Scalable growth." }
];

export default function Services() {
  return <>
    <PageHero eyebrow="Our services" title="Connected expertise for your next stage.">Choose the support you need today, with a partner who understands how finance, marketing and technology fit together.</PageHero>
    {services.map((s) => <section key={s.id} id={s.id} className={`section service-section ${s.reverse ? "section-soft" : ""}`}><div className={`container service-layout ${s.reverse ? "reverse-layout" : ""}`}>
      <div className="service-content"><span className="eyebrow">{s.number} · {s.name}</span><h2>{s.title}</h2><p>{s.text}</p><ul className="check-list">{s.points.map((p) => <li key={p}>{p}</li>)}</ul><Link className="btn btn-dark" to={`/contact?service=${encodeURIComponent(s.id === "finance" ? "Finance & Accounting" : s.id === "marketing" ? "Marketing & Brand Growth" : "Technology Solutions")}`}>Discuss {s.name.toLowerCase()} support ↗</Link></div>
      <div className="service-image" style={{ backgroundImage: `linear-gradient(0deg, rgba(7,23,43,.88), rgba(7,23,43,.10) 65%), url("${s.image}")` }}><div className="image-caption"><span>{s.number} / {s.name.toUpperCase()}</span><h3>{s.caption}</h3></div></div>
    </div></section>)}
    <CTA title="Not sure which service you need?" text="Tell us your challenge and we'll help you identify a sensible starting point."/>
  </>;
}
