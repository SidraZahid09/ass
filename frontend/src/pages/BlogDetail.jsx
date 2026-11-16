import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlog } from "../api";
import { formatDate } from "./Home";

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    getBlog(slug).then((d) => setPost(d.post)).catch((e) => setError(e.message));
  }, [slug]);

  if (error) return <section className="section"><div className="container empty-state"><h1>Article not found</h1><p>This article may have been moved or is not published.</p><Link className="btn btn-dark" to="/blogs">Back to blogs</Link></div></section>;
  if (!post) return <section className="section"><div className="container">Loading article…</div></section>;

  return <>
    <section className="page-hero"><div className="container"><div className="breadcrumbs"><Link to="/">Home</Link><span>→</span><Link to="/blogs">Blogs</Link><span>→</span>Article</div><span className="eyebrow">AssetElevatte insights</span><h1>{post.title}</h1><p>{post.excerpt}</p></div></section>
    <section className="section"><article className="container article"><div className="blog-meta">{formatDate(post.publishedAt, { month: "long", day: "numeric", year: "numeric" })}</div>{post.coverImage && <img className="article-cover" src={post.coverImage} alt={post.title}/>}<div className="article-body">{post.content}</div><div className="article-back"><Link className="btn btn-dark" to="/blogs">← Back to all blogs</Link></div></article></section>
  </>;
}
