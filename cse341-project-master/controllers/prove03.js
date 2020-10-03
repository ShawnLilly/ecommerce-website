const Product = require('../models/product');

exports.getProductDetails = (req, res, next) => {
    productId = req.params.productId;
    Product.getProductById(productId, product => {
        res.render('pages/prove03/productDetails.ejs',{
            title: 'Product Details',
            path: '/prove03/productDetails',
            product: product
        });
    });
};

exports.getProve03 = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('pages/prove03/prove03', {
            path: '/prove03',
            title: 'Prove 03',
            products: products
        });
    });
};