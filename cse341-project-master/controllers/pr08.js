const Product = require('../models/pr08');

const ITEMS_PER_PAGE = 10

exports.getIndex = (req, res, next) => {
    const page = +req.query.page || 1;
    let totalItems;

    /*Product.find()
    .countDocuments()
    .then(numProducts => {
        totalItems = numProducts;
        return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then(products => {
        res.render('pages/Prove08/Prove08', { 
            title: 'Prove Activity 00', 
            path: '/pr08',
            products: products,
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalItems,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1
            lastPage: Math.cel(totalItems / ITEMS_PER_PAGE)
        });
    })
    .catch();*/

    Product.fetchAll(products => {
        res.render('pages/Prove08/Prove08', { 
            title: 'Prove Activity 00', 
            path: '/pr08',
            products: products
        });
    })

};
