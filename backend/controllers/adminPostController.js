
const db = require("../config/db");

function validate(b) {
  const p = {};

  for (const k of [
    "title",
    "slug",
    "excerpt",
    "content",
    "cover_image",
    "status"
  ]) {
    p[k] = String(b[k] ?? "").trim();
  }

  if (!p.title || !p.slug || !p.content) {
    return {
      error: "Title, URL slug and article content are required."
    };
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug)) {
    return {
      error: "Slug must use lowercase letters, numbers and hyphens only."
    };
  }

  if (!["draft", "published"].includes(p.status)) {
    return {
      error: "Choose draft or published status."
    };
  }

  if (
    p.title.length > 220 ||
    p.slug.length > 240 ||
    p.cover_image.length > 500
  ) {
    return {
      error: "A field exceeds its maximum length."
    };
  }

  return { p };
}

async function list(_req, res, next) {
  try {
    const result = await db.query(
      `SELECT id, title, slug, excerpt, content, cover_image,
              status, published_at, created_at, updated_at
       FROM posts
       ORDER BY updated_at DESC, id DESC`
    );

    res.json({ posts: result.rows });
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const v = validate(req.body);

    if (v.error) {
      return res.status(400).json({ message: v.error });
    }

    const p = v.p;
    const date = p.status === "published" ? new Date() : null;

    const result = await db.query(
      `INSERT INTO posts
       (title, slug, excerpt, content, cover_image, status, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [
        p.title,
        p.slug,
        p.excerpt,
        p.content,
        p.cover_image || null,
        p.status,
        date
      ]
    );

    res.status(201).json({
      message: "Article created.",
      id: result.rows[0].id
    });

  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "That URL slug is already in use."
      });
    }

    next(error);
  }
}

async function update(req, res, next) {
  try {
    const v = validate(req.body);

    if (v.error) {
      return res.status(400).json({ message: v.error });
    }

    const oldResult = await db.query(
      "SELECT status, published_at FROM posts WHERE id = $1",
      [req.params.id]
    );

    if (!oldResult.rows.length) {
      return res.status(404).json({
        message: "Article not found."
      });
    }

    const p = v.p;
    let date = oldResult.rows[0].published_at;

    if (p.status === "published" && !date) {
      date = new Date();
    }

    if (p.status === "draft") {
      date = null;
    }

    await db.query(
      `UPDATE posts
       SET title = $1,
           slug = $2,
           excerpt = $3,
           content = $4,
           cover_image = $5,
           status = $6,
           published_at = $7
       WHERE id = $8`,
      [
        p.title,
        p.slug,
        p.excerpt,
        p.content,
        p.cover_image || null,
        p.status,
        date,
        req.params.id
      ]
    );

    res.json({ message: "Article updated." });

  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "That URL slug is already in use."
      });
    }

    next(error);
  }
}

async function remove(req, res, next) {
  try {
    const result = await db.query(
      "DELETE FROM posts WHERE id = $1",
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Article not found."
      });
    }

    res.json({ message: "Article deleted." });

  } catch (error) {
    next(error);
  }
}

module.exports = {
  list,
  create,
  update,
  remove
};
