const express = require('express');//!!!!!!
const router = express.Router();//!!!!!!

router.get('/',(req, res) => {

    res.render('pages/prove01/form', { 
            title: 'Prove Assignment 1', 
            path: '/prove01', // For pug, EJS 
            activeTA03: true, // For HBS
            contentCSS: true, // For HBS
        });
    });


router.post('/message' ,(req, res) =>{
    res.render('pages/prove01/display', { 
    title: 'Prove Assignment 1', 
    path: '/prove01', // For pug, EJS 
    activeTA03: true, // For HBS
    contentCSS: true, // For HBS
    input1: req.body.message1,
    input2: req.body.message2
    });
});

    
module.exports = router;


