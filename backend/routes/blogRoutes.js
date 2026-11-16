const express = require("express");
const router = express.Router();
const {
  getLatestPosts,
  getPosts,
  getPostBySlug
} = require("../controllers/blogController");

router.get("/latest", getLatestPosts);
router.get("/", getPosts);
router.get("/:slug", getPostBySlug);

module.exports = router;
