const { request } = require('express');
const express = require('express');
const { check, body } = require('express-validator/check');

const router = express.Router();

const authController = require('../controllers/auth');
const User = require('../models/user');

router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);
router.get('/reset', authController.getReset);
router.get('/reset/:token', authController.getNewPassword);


router.post(
    '/login', 
    [
        body('email')
            .isEmail()
            .withMessage('Invalid E-mail')
            .normalizeEmail(),
        body('password').isLength({min: 6})
            .withMessage('Enter a password that is at least 6 charaters long.')
            .trim(),
    ],
    authController.postLogin);

router.post(
    '/signup', 
    [
       check('name')
        .custom((value, { req }) => {
            if( value.length == 0) {
                throw new Error('No name entered.');
            }
            return true;
        })
        .trim(),
       body('email')
        .isEmail()
        .withMessage('Invalid E-mail')
        .custom((value, { req }) => {
            return User.findOne({email: value})
            .then(userDoc => {
              if (userDoc) {
                return Promise.reject(
                    'E-mail already exists.'
                );
              }
            });
       })
       .normalizeEmail(),
       body('password')
        .isLength({min: 6})
        .withMessage('Enter a password that is at least 6 charaters long.')
        .trim(),
       body('confirmPassword')
        .custom((value, { req }) => {
            if(value !==  req.body.password) {
                throw new Error('Passwords have to match.');
            }
            return true;
        })
        .trim(),
    ], 
    authController.postSignup
);

router.post('/logout', authController.postLogout);
router.post('/reset', authController.postReset);
router.post('/new-password', authController.postNewPassword);

module.exports = router;
