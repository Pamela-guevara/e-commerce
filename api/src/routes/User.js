const server = require('express').Router();
const { User, Order, Product, OrderLine } = require('../db.js');
const bcrypt = require('bcrypt');

const redirectHome = (req, res, next) => {
    if (req.cookies.user) {
        res.send('OK');
    } else {
        next();
    }
};

server.post('/login', redirectHome, (req, res, next) => {
    const { mail, password } = req.body;

    if (mail && password) {
        User.findOne({
                where: {
                    mail
                }
            })
            .then(user => {
                const compa = bcrypt.compareSync(password, user.password);
                if (compa) {
                    res.cookie('user', user.name)
                    res.status(200).send('ingresó')
                } else {
                    res.status(400).send('password no coincide')
                }
            })
            .catch(e => { res.status(400).send('mail no encontrado') })
    }
})

server.put('/reset', (req, res, next) => {

    const { mail, currentPassword, confirmPassword } = req.body;

    if (currentPassword === confirmPassword) {
        const salt = bcrypt.genSaltSync(10);
        const hashCurrent = bcrypt.hashSync(currentPassword, salt);

        User.findOne({
                where: {
                    mail: mail
                }
            })
            .then(user => {

                User.update({ password: hashCurrent }, {
                        where: {
                            id: user.id
                        }
                    })
                    .then(() => {
                        res.status(200).send('Contraseña modificada')
                    })
                    .catch(e => { res.status(400).send('no se modificó') })
            })
            .catch(e => { res.status(401).send('mail no encontrado' + e) })
    } else {
        res.status(400).send({ message: 'las contraseñas no coinciden' })
    }

});

server.delete('/logout', (req, res) => {
    res.clearCookie('user');
    res.send('ok')
});


server.route('/')
    .get((req, res, next) => {
        User.findAll()
            .then(users => {
                res.status(200).json(users)
            })
            .catch(e => { res.send(e) })
    })
    .post((req, res, next) => {
        const { name, lastName, password, mail } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        Promise.all([
                User.create({
                    name,
                    lastName,
                    mail,
                    password: hash
                }),
                Order.create()
            ])
            .then(results => {
                if (results[0].id === 1) {
                    Promise.all([
                        User.update({
                            isAdmin: true
                        }, {
                            where: {
                                id: 1
                            }
                        }),
                        Order.destroy({
                            where: {
                                id: 1
                            }
                        })
                    ]);
                } else {
                    results[0].addOrder(results[1]);
                }
                res.cookie('user', results[0].name)
            })
            .then(() => {
                res.status(200).send('Usuario creado');
            })
            .catch(e => { res.send(e) });
    });


server.get('/find/:mail', (req, res, next) => {
    const { mail } = req.params;

    User.findOne({
            where: {
                mail: mail
            }
        })
        .then(result => res.status(200).send(result ? result : false))
        .catch(e => { res.send(e) })
})

server.route('/:id')
    .put((req, res, next) => {
        const { id } = req.params
        const { name, lastName, mail, isAdmin } = req.body;
        User.update({
                name,
                lastName,
                mail,
                isAdmin
            }, {
                where: {
                    id: id
                }
            })
            .then(() => {
                Order.destroy({
                    where: {
                        userId: id,
                        status: "carrito"
                    }
                });
            })
            .then(() => {
                res.status(200).send("Usuario modificado");
            })
            .catch(e => { res.send(e) })

    })
    .delete((req, res, next) => {
        const { id } = req.params;

        User.destroy({
                where: {
                    id: id
                }
            })
            .then(() => {
                res.status(200).send('Usuario eliminado exitosamente')
            })
            .catch(e => { res.send(e) })

    })
    .get((req, res, next) => {
        const { id } = req.params;
        User.findByPk(id)
            .then(result => res.status(200).json(result));

    })

server.get('/:id/orders', (req, res, next) => {

    const { id } = req.params;

    User.findByPk(id, {
            where: {
                userId: id
            },
            include: Order
        })
        .then(user => {
            res.status(201).json(user.orders)
        })
        .catch(e => { res.send(e) })
})

server.post('/cart/:idUser', (req, res, next) => {
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

server.route('/:id/profile')
    .get((req, res) => {
        const { id } = req.params;
        User.findByPk(id)
            .then(usuario => {
                res.status(200).json(usuario)
            })
            .catch(() => {
                res.status(400).send('Usuario no encontrado')
            })
    })
    .put((req, res, next) => {
        const { id } = req.params
        const { name, lastName, mail } = req.body;
        User.update({
                name,
                lastName,
                mail
            }, {
                where: {
                    id: id
                }
            })
            .then(user => { res.status(200).send(user) })
            .catch(e => { res.status(400).send(e) })
    })

module.exports = server;