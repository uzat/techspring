// ===== ROUTES/INDEX.JS =====
// routes/index.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { 
        title: 'TechSpring - AI Innovation & Technology',
        currentPage: 'home'
    });
});

router.get('/about', (req, res) => {
    res.render('about', { 
        title: 'About TechSpring',
        currentPage: 'about'
    });
});

router.get('/contact', (req, res) => {
    res.render('contact', { 
        title: 'Contact TechSpring',
        currentPage: 'contact'
    });
});

router.get('/acknowledgment', (req, res) => {
    res.render('acknowledgment', { 
        title: 'Acknowledgment of Country - TechSpring',
        currentPage: 'acknowledgment'
    });
});

module.exports = router;