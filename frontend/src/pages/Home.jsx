import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLatestPosts } from "../api";
import { CTA } from "../components/Layout";

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => { getLatestPosts().then((d) => setPosts(d.posts || [])).catch(() => setPosts([])); }, []);
  return <>
    <section className="hero"><div className="container hero-grid">
      <div><span className="eyebrow">Your integrated growth partner</span><h1>Build smarter.<br/><em>Grow stronger.</em></h1>
        <p>Bring finance, marketing and technology together with one growth partner. We help ambitious businesses build strong foundations and scale with confidence.</p>
        <div className="hero-actions"><Link className="btn btn-gold" to="/contact">Book a discovery call ↗</Link><Link className="btn btn-outline" to="/services">Explore our services</Link></div>
        <div className="stats"><div className="stat"><strong>01</strong><span>Connected growth partner</span></div><div className="stat"><strong>03</strong><span>Core service pillars</span></div><div className="stat"><strong>∞</strong><span>Room to grow</span></div></div>
      </div>
      <div className="hero-panel"><span className="panel-label">THE ASSETELEVATTE APPROACH</span>
        <div className="pillar"><div className="pillar-icon">↗</div><div><h3>Finance with clarity</h3><p>Practical accounting, reporting and compliance support to help you make informed decisions.</p></div></div>
        <div className="pillar"><div className="pillar-icon">✳</div><div><h3>Marketing with purpose</h3><p>Build visibility, strengthen your brand and turn attention into meaningful growth.</p></div></div>
        <div className="pillar"><div className="pillar-icon">⌘</div><div><h3>Technology that scales</h3><p>Digital experiences and systems designed around your business goals.</p></div></div>
      </div>
    </div></section>
    <section className="section"><div className="container"><div className="section-head center"><span className="eyebrow">What we do</span><h2>Everything your business needs to move forward.</h2><p>One connected team to help you navigate the details, focus on what matters and build for the next stage.</p></div>
      <div className="cards three"><ServiceCard icon="▤" title="Finance & Accounting" text="Bookkeeping, financial reporting, tax and compliance support that helps you keep your numbers organised and your decisions informed." href="/services#finance" /><ServiceCard icon="✳" title="Marketing & Brand Growth" text="Brand strategy, digital marketing, social media, SEO and performance campaigns built around your audience and goals." href="/services#marketing" /><ServiceCard icon="⌘" title="Technology Solutions" text="Website development, digital transformation, automation and AI integration that make your business more capable." href="/services#technology" /></div>
    </div></section>
    <section className="section section-soft"><div className="container split"><div><span className="eyebrow">A more connected approach</span><h2>Growth works better when every part works together.</h2><p>Growing businesses often coordinate multiple partners for accounting, marketing and technology. We help connect those priorities so strategy and execution move in the same direction.</p><ul className="check-list"><li>Clear priorities and practical next steps</li><li>Solutions tailored to your business stage</li><li>A joined-up view of operations and growth</li><li>Support that can evolve as you scale</li></ul><Link className="btn btn-dark" to="/about">Get to know us ↗</Link></div><div className="feature-panel"><div><span className="eyebrow">Built around your goals</span><h2>Clarity first.<br/><span className="gold">Growth follows.</span></h2><p>We connect the moving parts so you can focus on building your business.</p></div><div className="big-mark"><span>.</span><span>.</span></div></div></div></section>
    <section className="section"><div className="container"><div className="section-head"><span className="eyebrow">Ideas & insights</span><h2>Useful thinking for your next move.</h2><p>Explore practical perspectives on business finance, marketing and technology.</p></div>
      {posts.length ? <div className="blog-grid">{posts.map((post) => <BlogCard key={post.id} post={post}/>)}</div> : <div className="empty-state"><h3>Fresh insights are on the way.</h3><p>Our blog will feature practical ideas on business, finance, marketing and technology.</p></div>}
      <div className="mt-30"><Link className="btn btn-dark" to="/blogs">Visit the blog ↗</Link></div>
    </div></section>
    <CTA />
  </>;
}

function ServiceCard({ icon, title, text, href }) {
  return <article className="card"><div className="card-icon">{icon}</div><h3>{title}</h3><p>{text}</p><Link className="text-link" to={href}>Explore services <span>↗</span></Link></article>;
}
export function BlogCard({ post }) {
  return <article className="blog-card"><div className="blog-image">{post.coverImage ? <img src={post.coverImage} alt={post.title}/> : <span className="blog-placeholder">A.<b>E.</b></span>}</div><div className="blog-content"><div className="blog-meta">{formatDate(post.publishedAt)}</div><h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.excerpt}</p><Link className="text-link" to={`/blog/${post.slug}`}>Read article <span>↗</span></Link></div></article>;
}
export function formatDate(value, options = { month: "short", day: "numeric", year: "numeric" }) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("en-IN", options);
}
