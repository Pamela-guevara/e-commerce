const server = require('express').Router();
const { Order, Product, OrderLine } = require('../db.js');

server.route('/:idUser')
    .post((req, res, next) => {
        const { idUser } = req.params;
        const { idProduct } = req.body;

        Promise.all([
            Order.findAll({
                where: {
                    userId: idUser,
                    status: "carrito"
                }
            }),
            Product.findByPk(idProduct),
        ])
            .then(results => {
                OrderLine.create({
                    orderId: results[0][0].id,
                    productId: results[1].id,
                    quantity: 1,
                    sub_price: results[1].price
                })
            })
            .then(result => res.status(201).json(result))
            .catch(e => { res.send(e) })
    })
    .delete((req, res, next) => {
        const { idUser } = req.params;

        Order.findAll({
            where: {
                userId: idUser,
                status: "carrito"
            }
        })
        .then(results => {
            OrderLine.destroy({
                where: {
                    orderId: results[0].id,
                }
            });
        })
        .then(() => res.status(201).send("Productos eliminados"))
        .catch(e => { res.send(e) })
    });

server.put('/quantity/:idUser', (req, res, next) => {
    const { idUser } = req.params;
    const { quantity, idProduct } = req.body;

    Promise.all([
        Order.findAll({
            where: {
                userId: idUser,
                status: "carrito"
            }
        }),
        Product.findByPk(idProduct),
    ])
        .then(results => {
            if (quantity > 0 && quantity <= results[1].stock) {
                OrderLine.update({
                    quantity: quantity,
                    sub_price: results[1].price * quantity,
                }, {
                    where: {
                        orderId: results[0][0].id,
                        productId: results[1].id,
                    }
                });
            }
        })
        .then(() => res.status(201).send(true))
        .catch(e => { res.send(e) })
})

module.exports = server;