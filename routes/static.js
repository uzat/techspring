const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('index'));
router.get('/contact', (req, res) => res.render('contact'));
router.get('/acknowledgment', (req, res) => res.render('acknowledgment'));
router.get('/404', (req, res) => res.render('404'));

module.exports = router;
