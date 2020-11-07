const Product = require('../models/ta03');

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('pages/ta03', { 
            title: 'Team Activity 03', 
            path: '/ta03',
            products: products
        });
    });
};

exports.postSearchProducts = (req, res, next) => {
    const searchName = req.body.searchName;
    Product.getItemsByTag(searchName, products => {
        res.render('pages/ta03', {
            title: 'Search Results', 
            path: '/ta03/results',
            products: products
        });
    });
};