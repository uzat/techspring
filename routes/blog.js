// ===== ROUTES/BLOG.JS =====
// routes/blog.js
const express = require('express');
const router = express.Router();

// Blog list
router.get('/', (req, res) => {
    const db = req.app.locals.db;
    db.all('SELECT * FROM posts ORDER BY created_at DESC', (err, posts) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
        res.render('blog/index', { 
            title: 'TechSpring Blog',
            currentPage: 'blog',
            posts: posts
        });
    });
});

// New post form
router.get('/new', (req, res) => {
    res.render('blog/new', { 
        title: 'New Post - TechSpring Blog',
        currentPage: 'blog'
    });
});

// Create post
router.post('/new', (req, res) => {
    const { title, content } = req.body;
    const db = req.app.locals.db;
    
    db.run('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
        res.redirect('/blog');
    });
});

// Show individual post
router.get('/:id', (req, res) => {
    const db = req.app.locals.db;
    const id = req.params.id;
    
    db.get('SELECT * FROM posts WHERE id = ?', [id], (err, post) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.render('blog/show', { 
            title: post.title + ' - TechSpring Blog',
            currentPage: 'blog',
            post: post
        });
    });
});

// Edit post form
router.get('/:id/edit', (req, res) => {
    const db = req.app.locals.db;
    const id = req.params.id;
    
    db.get('SELECT * FROM posts WHERE id = ?', [id], (err, post) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.render('blog/edit', { 
            title: 'Edit: ' + post.title + ' - TechSpring Blog',
            currentPage: 'blog',
            post: post
        });
    });
});

// Update post
router.post('/:id/edit', (req, res) => {
    const { title, content } = req.body;
    const db = req.app.locals.db;
    const id = req.params.id;
    
    db.run('UPDATE posts SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', 
           [title, content, id], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
        res.redirect('/blog/' + id);
    });
});

// Delete post
router.post('/:id/delete', (req, res) => {
    const db = req.app.locals.db;
    const id = req.params.id;
    
    db.run('DELETE FROM posts WHERE id = ?', [id], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
        res.redirect('/blog');
    });
});

module.exports = router;