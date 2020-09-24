//TA02 PLACEHOLDER

const express = require('express');
const router = express.Router();

const users = [];

router.post('/addUser',(req, res, next) => {
        const newUser = req.body.newUser;
        users.push(newUser);
        res.redirect('/ta02/');
    });

router.post('/removeUser',(req, res, next) => {
    const rUser = req.body.rUser;
    const index = users.indexOf(rUser);
    if (index !== -1 ) {
        users.splice(index, 1);
    }

    res.redirect('/ta02/');
});

router.get('/',(req, res, next) => {
    res.render('pages/ta02', { 
        title: 'Team Activity 02', 
        users: users,
        path: '/ta02', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
    });
});
module.exports = router;