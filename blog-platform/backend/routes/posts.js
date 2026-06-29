const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// CREATE a new blog post
router.post('/', async (req, res) => {
  try {
    const newPost = new Post({ title: req.body.title, content: req.body.content, author: req.body.userId });
    const post = await newPost.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
