const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = (cb) => { 
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        }
        else {
            cb(JSON.parse(fileContent));
        }
    });
}

module.exports = class Product {
    constructor(imageUrl, category, name, description, id) {
        this.imageUrl = imageUrl;
        this.category = category;
        this.name = name;
        this.description = description;
        this.id = id;
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static getProductById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(prod => {
                return prod.id === id;
            });
            cb(product);
        });
    }
};