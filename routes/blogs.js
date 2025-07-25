// routes/blogs.js
const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Show all blog posts
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render('blogs/index', { title: 'All Blogs', blogs });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving blog posts.");
  }
});

// Show blog creation form
router.get('/new', (req, res) => {
  res.render('blogs/new', { title: 'Create New Blog' });
});

// Create a new blog post
router.post('/', async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body,
  });

  try {
    await blog.save();
    res.redirect('/blogs');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving blog post.");
  }
});

// Show a single blog post
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send("Blog post not found.");
    res.render('blogs/show', { title: blog.title, blog });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving blog post.");
  }
});

// Show edit form
router.get('/:id/edit', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send("Blog post not found.");
    res.render('blogs/edit', { title: `Edit: ${blog.title}`, blog });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading edit form.");
  }
});

// Update a blog post
router.post('/:id/update', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      snippet: req.body.snippet,
      body: req.body.body
    });
    res.redirect(`/blogs/${blog._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating blog post.");
  }
});

// Delete a blog post
router.post('/:id/delete', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/blogs');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting blog post.");
  }
});

module.exports = router;
