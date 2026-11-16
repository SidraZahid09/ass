import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getBlogs } from "../api";
import { PageHero } from "../components/Layout";
import { BlogCard } from "./Home";

export default function Blogs() {
  const [params, setParams] = useSearchParams();
  const initialQ = params.get("q") || "";
  const [query, setQuery] = useState(initialQ);
  const [data, setData] = useState({ posts: [], pagination: { page: 1, pages: 0 } });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true); setError("");
    getBlogs(params.get("q") || "", Number(params.get("page") || 1))
      .then((result) => { if (active) setData(result); })
      .catch((e) => { if (active) setError(e.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [params]);

  function search(e) {
    e.preventDefault();
    setParams(query.trim() ? { q: query.trim() } : {});
  }

  return <>
    <PageHero eyebrow="The AssetElevatte journal" title="Ideas to help you build and grow.">Practical perspectives on business finance, brand building, technology and the decisions that move companies forward.</PageHero>
    <section className="section"><div className="container">
      <form className="search-row" onSubmit={search}><input aria-label="Search articles" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles..."/><button className="btn btn-dark" type="submit">Search</button>{params.get("q") && <button className="clear-search" type="button" onClick={() => { setQuery(""); setParams({}); }}>Clear</button>}</form>
      {loading ? <p className="muted">Loading articles…</p> : error ? <div className="notice error">{error}. Check that the API and database are configured.</div> : data.posts.length ? <>
        <div className="blog-grid">{data.posts.map((post) => <BlogCard key={post.id} post={post}/>)}</div>
        {data.pagination.pages > 1 && <div className="pagination">{Array.from({ length: data.pagination.pages }, (_, i) => i + 1).map((page) => <button key={page} className={page === data.pagination.page ? "current" : ""} onClick={() => setParams({ ...(params.get("q") ? { q: params.get("q") } : {}), page: String(page) })}>{page}</button>)}</div>}
      </> : <div className="empty-state"><h3>{params.get("q") ? "No matching articles found." : "The journal is getting ready."}</h3><p>{params.get("q") ? "Try a different search phrase." : "Publish your first article through the admin panel and it will appear here automatically."}</p>{params.get("q") && <Link className="btn btn-dark" to="/blogs">View all articles</Link>}</div>}
    </div></section>
  </>;
}
