// routes/blog.js
const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// GET all posts
router.get('/', async (req, res) => {
  const posts = await Blog.find().sort({ createdAt: -1 });
  res.render('blog/index', { posts });
});

// GET form to create a new post
router.get('/new', (req, res) => {
  res.render('blog/new');
});

// POST a new blog post
router.post('/', async (req, res) => {
  const { title, excerpt, body } = req.body;
  await Blog.create({ title, excerpt, body });
  res.redirect('/blog');
});

// GET a single blog post
router.get('/:id', async (req, res) => {
  const post = await Blog.findById(req.params.id);
  res.render('blog/show', { post });
});

// GET form to edit a post
router.get('/:id/edit', async (req, res) => {
  const post = await Blog.findById(req.params.id);
  res.render('blog/edit', { post });
});

// PUT update a blog post
router.put('/:id', async (req, res) => {
  const { title, excerpt, body } = req.body;
  await Blog.findByIdAndUpdate(req.params.id, { title, excerpt, body });
  res.redirect(`/blog/${req.params.id}`);
});

// DELETE a blog post
router.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect('/blog');
});

module.exports = router;
