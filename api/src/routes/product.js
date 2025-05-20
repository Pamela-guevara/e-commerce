const server = require('express').Router();
const { Product, Category, ProductCategory, Review } = require('../db.js');
const { Op } = require('sequelize');

// -------------------------------------------------------------------
// Configuraciones de multer
const path = require('path');
const multer = require('multer');
// Para hacer la conexion con el modelo 
// const Reviews = require('../models/Reviews.js');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../../client/public/uploads'),
});

const upload = multer({
    storage,
    dest: path.join(__dirname, '../../../client/public/uploads'),
}).single('img');
// -------------------------------------------------------------------

function comprobar(valor, res) {

    const values = Object.values(valor)
    values.forEach(val => {
        if (!val) {

            return res.status(400).send('Faltan valores');
        }

    })
};

server.get('/', (req, res, next) => {
    Product.findAll({
            include: Category
        })
        .then(products => {
            res.status(200).json(products);
        })
        .catch(message => res.send(message));
})

server.post('/', upload, (req, res, next) => {
    comprobar(req.body, res);

    Product.create({
            ...req.body,
            img: "/uploads/" + req.file.filename
        })
        .then(product => {
            res.status(201).send(product);
        })
        .catch(message => {
            res.send(message)
        });
});

server.route('/:idProducto/category/:idCategoria')
    .post((req, res, next) => {
        const { idProducto, idCategoria } = req.params;

        Promise.all([
            Product.findByPk(idProducto),
            Category.findByPk(idCategoria)
        ]).then(results => {
            return results[0].addCategory(results[1])
        }).then(productAssociated => {
            res.json(productAssociated)
        })

    })
    .delete((req, res, next) => {
        const { idProducto, idCategoria } = req.params;

        Promise.all([
            Product.findByPk(idProducto),
            Category.findByPk(idCategoria)
        ]).then(results => {
            ProductCategory.destroy({
                where: {
                    productId: results[0].id,
                    categoryId: results[1].id,
                }
            });
        }).then(() => {
            res.send("productDissociated");
        })
    })

server.get('/category/:categoryName', (req, res, next) => {
    const { categoryName } = req.params;
    Category.findOne({
            where: {
                name: categoryName
            },
            include: Product
        })
        .then(category => res.send(category.products));
});

server.get('/search', (req, res, next) => {
    // Rutas ejemplo
    // http://localhost:8080/products/search?keyWord=zapato
    // http://localhost:8080/products/search?keyWord=corbata
    Product.findAll({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: `%${req.query.keyWord}%`
                    }
                }, {
                    description: {
                        [Op.iLike]: `%${req.query.keyWord}%`
                    }
                }]
            }
        })
        .then(results => {
            res.status(200).send(results)
        })
        .catch(msgError => res.send(msgError));
});

server.route('/:id')
    .get((req, res, next) => {
        const { id } = req.params;

        Product.findByPk(id)
            .then(product => res.send(product));
    })
    .delete((req, res, next) => {
        const { id } = req.params;
        Promise.all([
                Product.destroy({
                    where: { id: id }
                }),
                ProductCategory.destroy({
                    where: {
                        productId: id
                    }
                })
            ])
            .then(() => {
                res.status(200).send('Product and its associations were destroyed')
            })
    });

server.put('/:id', upload, (req, res, next) => {
    const { id } = req.params;
    Product.update({
            ...req.body,
            img: "/uploads/" + req.file.filename
        }, {
            where: {
                id: id
            }
        })
        .then((prod) => {
            res.status(200).send(prod)
        })
        .catch(e => { res.status(400).send(e) })
})
server.route('/:id/reviews')
    .post((req, res, next) => {
        const { id } = req.params;
        Review.create({
                ...req.body
            })
            .then(resp => {
                res.send(201).json(resp)
            })
            .catch(e => { res.send(e) })
    })
    .get((req, res, next) => {
        const { id } = req.params;
        Review.findAll({
                where: {
                    productId: id
                }
            })
            .then(prods => {
                res.status(200).json(prods)
            })
            .catch(e => { res.send(e) })

    })
server.route('/:id/reviews/:idReview')
    .put((req, res, next) => {
        const { id, idReview } = req.params;
        const { description, score } = req.body;
        Review.update({
                description: description,
                score: score

            }, {
                where: {
                    productId: id,
                    id: idReview
                }
            })
            .then(() => res.status(200).json('Review modificada'))
            .catch(e => { res.send(e) })

    })
    .delete((req, res, next) => {
        const { id, idReview } = req.params;
        Review.destroy({
                where: {
                    id: idReview
                }
            })
            .then(resp => { res.status(200).send('El review ha sido eliminado') })
            .catch(e => { res.send(e) })
    })
module.exports = server;