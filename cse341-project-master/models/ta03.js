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
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static getItemsByTag(tag, cb) {
        getProductsFromFile(products => {
            const product = products.filter(prod => {
                for (let t of prod.tags) {
                    if (tag === t) {
                        return true;
                    }
                }
            });
            cb(product);
        });
    }
};