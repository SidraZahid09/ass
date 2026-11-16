
const db = require("../config/db");

function publicPost(row) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.cover_image,
    publishedAt: row.published_at || row.created_at
  };
}

async function getLatestPosts(_req, res, next) {
  try {
    const result = await db.query(
      `SELECT id, title, slug, excerpt, content, cover_image,
              published_at, created_at
       FROM posts
       WHERE status = 'published'
       ORDER BY published_at DESC NULLS LAST, id DESC
       LIMIT 3`
    );

    res.json({ posts: result.rows.map(publicPost) });
  } catch (error) {
    next(error);
  }
}

async function getPosts(req, res, next) {
  try {
    const q = String(req.query.q || "").trim().slice(0, 120);
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const perPage = 9;
    const offset = (page - 1) * perPage;

    let where = "status = 'published'";
    const params = [];

    if (q) {
      where += " AND (title ILIKE $1 OR excerpt ILIKE $1 OR content ILIKE $1)";
      params.push(`%${q}%`);
    }

    const countResult = await db.query(
      `SELECT COUNT(*) AS total FROM posts WHERE ${where}`,
      params
    );

    const total = Number(countResult.rows[0].total);

    const limitPosition = params.length + 1;
    const offsetPosition = params.length + 2;

    const result = await db.query(
      `SELECT id, title, slug, excerpt, cover_image,
              published_at, created_at
       FROM posts
       WHERE ${where}
       ORDER BY published_at DESC NULLS LAST, id DESC
       LIMIT $${limitPosition} OFFSET $${offsetPosition}`,
      [...params, perPage, offset]
    );

    res.json({
      posts: result.rows.map(publicPost),
      pagination: {
        page,
        perPage,
        total,
        pages: Math.ceil(total / perPage)
      }
    });
  } catch (error) {
    next(error);
  }
}

async function getPostBySlug(req, res, next) {
  try {
    const result = await db.query(
      `SELECT id, title, slug, excerpt, content, cover_image,
              published_at, created_at
       FROM posts
       WHERE slug = $1 AND status = 'published'
       LIMIT 1`,
      [String(req.params.slug)]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        message: "Article not found."
      });
    }

    res.json({ post: publicPost(result.rows[0]) });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getLatestPosts,
  getPosts,
  getPostBySlug
};
