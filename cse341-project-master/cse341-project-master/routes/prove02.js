const express = require('express');
const fs = require('fs'); // File system for TA01
const router = express.Router();
// Remember Team Activity 01? 
// This is the same solution, but implemented in our app using 
// proper routing for the view engine

const activities = ['soccer', "basketball", "football", "swimming"];
router.get('/', (req, res, next) => {
    // Request handling
    // CORE CHALLENGE 1 -
    // HTML page is written
    res.write('<html>');
    res.write('<head><title>Hello Browser!</Title></head>');
    res.write('<body>');
    res.write('<h1>Welcome to my world!</h1>');
    res.write('</body>');
    res.write('</html>');
    return res.end(); 
});

module.exports = router;