import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Markets from "./pages/Markets";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

function NotFound() {
  return <section className="section"><div className="container empty-state"><h1>Page not found</h1><p>The page you're looking for doesn't exist.</p><a className="btn btn-dark" href="/">Back home</a></div></section>;
}

export default function App() {
  return <Layout><Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/services" element={<Services/>}/>
    <Route path="/markets" element={<Markets/>}/>
    <Route path="/blogs" element={<Blogs/>}/>
    <Route path="/blog/:slug" element={<BlogDetail/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/admin" element={<Admin/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Routes></Layout>;
}
