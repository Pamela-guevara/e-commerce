const server = require('express').Router();
const { Category, ProductCategory } = require('../db.js');

server.route('/')
    .get((req, res, next) => {
        Category.findAll()
            .then(categories => {
                res.status(200).json(categories);
            })  
            .catch(message => res.send(message));
    })
    .post((req, res, next) => {
        Category.create({
            ...req.body
        })
            .then(category => res.status(201).json(category.name + " creada"))
            .catch(message => res.send(message));
    });

server.route('/:id')
    .delete((req, res, next) => {
        const { id } = req.params;

        Promise.all([
            ProductCategory.destroy({
                where: {
                    categoryId: id
                }
            }),
            Category.destroy({
                where: {
                    id: id
                }
            })
        ])
            .then(() => {
                res.send("Category and its associations were destroyed");
            })
    })
    .put((req, res, next) => {
        const { id } = req.params;
        const { nameCategory, descriptionCategory } = req.body;
        Category.update({
            name: nameCategory,
            description: descriptionCategory
        }, {
            where: {
                id: id
            }
        })
            .then(cat => res.json(cat));
    });

module.exports = server;