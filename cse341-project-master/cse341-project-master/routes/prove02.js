//TA02 PLACEHOLDER

const express = require('express');
const router = express.Router();
 
const words = [];

router.post('/input',(req, res, next) => {
        const newWords = req.body.newWords;
        words.push(newWords);
        res.render('pages/prove02/display', { 
            title: 'Prove Assignment 1', 
            path: '/prove02', // For pug, EJS 
            activeTA03: true, // For HBS
            contentCSS: true, // For HBS
            input1: req.body.title,
            input2: req.body.author,
            input3: req.body.summary,
            });
    });
 

router.get('/',(req, res, next) => {
    res.render('pages/prove02/prove02', { 
        title: 'Prove 02', 
        words: words,
        path: '/ta02', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
    });
});
module.exports = router;