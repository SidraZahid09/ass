import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { submitEnquiry } from "../api";
import { PageHero } from "../components/Layout";

const serviceOptions = ["Finance & Accounting", "Marketing & Brand Growth", "Technology Solutions", "Business Growth Strategy", "Other"];

export default function Contact() {
  const [params] = useSearchParams();
  const initialService = params.get("service") || "";
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", service: serviceOptions.includes(initialService) ? initialService : "", message: "" });
  const [status, setStatus] = useState({ loading: false, success: "", error: "" });

  function update(e) { setForm((old) => ({ ...old, [e.target.name]: e.target.value })); }
  async function submit(e) {
    e.preventDefault();
    setStatus({ loading: true, success: "", error: "" });
    try {
      const result = await submitEnquiry(form);
      setStatus({ loading: false, success: result.message, error: "" });
      setForm({ name: "", email: "", phone: "", company: "", service: "", message: "" });
    } catch (error) {
      setStatus({ loading: false, success: "", error: error.message });
    }
  }

  return <>
    <PageHero eyebrow="Let's connect" title="Tell us what you're building.">Share a little about your business, your goals or the challenge you're working through. We'll take it from there.</PageHero>
    <section className="section section-soft"><div className="container"><div className="form-card"><div className="section-head"><span className="eyebrow">Contact form</span><h2>Start a conversation.</h2><p>Fields marked with * are required.</p></div>
      {status.success && <div className="notice">{status.success}</div>}{status.error && <div className="notice error">{status.error}</div>}
      <form onSubmit={submit}><div className="form-grid">
        <div className="field"><label htmlFor="name">Full name *</label><input id="name" name="name" required maxLength="160" value={form.name} onChange={update}/></div>
        <div className="field"><label htmlFor="email">Email address *</label><input id="email" type="email" name="email" required maxLength="190" value={form.email} onChange={update}/></div>
        <div className="field"><label htmlFor="phone">Phone number</label><input id="phone" name="phone" maxLength="60" value={form.phone} onChange={update}/></div>
        <div className="field"><label htmlFor="company">Company / business</label><input id="company" name="company" maxLength="190" value={form.company} onChange={update}/></div>
      </div>
      <div className="field"><label htmlFor="service">What can we help with?</label><select id="service" name="service" value={form.service} onChange={update}><option value="">Select a service</option>{serviceOptions.map((s) => <option key={s}>{s}</option>)}</select></div>
      <div className="field"><label htmlFor="message">Tell us about your goals *</label><textarea id="message" name="message" required maxLength="5000" value={form.message} onChange={update}/></div>
      <button className="btn btn-dark" type="submit" disabled={status.loading}>{status.loading ? "Submitting…" : "Submit enquiry ↗"}</button></form>
    </div></div></section>
    <section className="section"><div className="container"><div className="section-head"><span className="eyebrow">Other ways to reach us</span><h2>Contact AssetElevatte directly.</h2><p>Choose the channel that works best for you.</p></div><div className="cards contact-grid">
      <article className="card"><h3>Call us</h3><p><a href="tel:+919369405511">+91 93694 05511</a></p><p className="muted">For enquiries and initial discussions.</p></article>
      <article className="card"><h3>Email us</h3><p><a href="mailto:assetelevatte@gmail.com">assetelevatte@gmail.com</a></p><p className="muted">Share your requirements by email.</p></article>
      <article className="card"><h3>LinkedIn</h3><p><a href="https://www.linkedin.com/company/assetelevatte/" target="_blank" rel="noreferrer">AssetElevatte ↗</a></p><p className="muted">Company updates and professional news.</p></article>
      <article className="card"><h3>Instagram</h3><p><a href="https://www.instagram.com/assetelevatte/" target="_blank" rel="noreferrer">@assetelevatte ↗</a></p><p className="muted">Updates and brand highlights.</p></article>
    </div><p className="market-note">Location: Lucknow, Uttar Pradesh, India.</p></div></section>
  </>;
}
