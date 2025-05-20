const server = require('express').Router();
const nodemailer = require('nodemailer');
const { Order, Product } = require('../db.js');
const { Op } = require('sequelize');

server.get('/', (req, res, next) => {

    const { status } = req.query;

    if (!status) {

        Order.findAll({
            include: Product,
        })
            .then(orders => {
                res.status(200).send(orders)
            })
            .catch(e => { res.send(e) })

    } else {

        Order.findAll({
                where: {
                    status: status
                },
                include: Product
            })
            .then(order => {
                res.status(200).json(order)
            })
            .catch(e => { res.send(e) })


    };

})
server.route('/:id')
    .get((req, res, next) => {

        const { id } = req.params;

        Order.findOne({
                where: {
                    id: id
                },
                include: Product
            })
                .then(order => {
                    res.status(200).send(order)
                })
                .catch(e => { res.send(e) })
    })
    .put((req, res, next) => {

        const { id } = req.params;
        const { status, userId } = req.body;

        if( status === 'creada'){
            Order.create({userId: userId })
        }

        Order.update({
                ...req.body
            }, {
                where: {
                    id: id
                }
            })
            .then(order => {
                res.status(200).send('Orden: ' + order + ' actualizada exitosamente')
            })
            .catch(e => { res.send(e) })
    })
    .post((req, res, next) => {
        const { id } = req.params;
        var { mail, name } = req.body;
        //---------CONFIG NODEMAILER----------------
        Order.findByPk(id)
            .then(datos => {
                var estado = datos.status;
                
                    // Create a SMTP transporter object
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: 'henry.grupo2@gmail.com',
                          pass: '1357WXYZ' 
                        }
                      });
                    
                    if (estado === 'creada') {
                        var message = {
                            from: 'Un E-commerce Genial <sender@example.com>',
                            to: `Recipient <${mail}>`,
                            subject: `Orden N° ${id}`,
                            text: 'Gracias por su compra!',
                            html: `<p><b>Hola ${name}.</b> Su compra ha sido creada exitosamente, recibirá un mail cuando su compra esté siendo procesada. Gracias.</p>`
                        };
                    } else if (estado === 'procesando') {
                        var message = {
                            from: 'Un E-commerce Genial <sender@example.com>',
                            to: `Recipient <${mail}>`,
                            subject: `Orden N° ${id}`,
                            text: 'Gracias por su compra!',
                            html: `<p><b>Hola ${name}.</b> Su compra está siendo procesada, recibirá un mail cuando su compra esté completa. Gracias.</p>`
                        };
                    } else if (estado === 'completada') {
                        var message = {
                            from: 'Un E-commerce Genial <sender@example.com>',
                            to: `Recipient <${mail}>`,
                            subject: `Orden N° ${id}`,
                            text: 'Gracias por su compra!',
                            html: `<p><b>Hola ${name}.</b> Su compra ha sido completada; lo esperamos para su próxima compra. Gracias.</p>`
                        };
                    } else if (estado === 'cancelada') {
                        var message = {
                            from: 'Un E-commerce Genial <sender@example.com>',
                            to: `Recipient <${mail}>`,
                            subject: `Orden N° ${id}`,
                            text: 'Compra Cancelada!',
                            html: `<p><b>Hola ${name}.</b> Su compra ha sido cancelada debido a inconvenientes con su orden, recibirá el reintegro por su compra. Lamentamos el inconveniente y le invitamos a seguir comprando en nuestra plataforma. Muchas gracias.</p>`
                        };
                    };
                    transporter.sendMail(message, (err, info) => {
                        if (err) {
                            console.log('Error occurred. ' + err.message);
                            return process.exit(1);
                        };
                        console.log('Message sent: %s', info.messageId);
                        // Preview only available when sending through an Ethereal account
                        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                        res.status(200).send('mail enviado exitosamente')
                    })
                
            })
            .catch(e => { res.status(400).send('Mail no funcionando' + e) })
    })

server.get('/lastOrder/:userId', (req, res, next) => {
    const { userId } = req.params;

        Order.findOne({
                where: {
                    userId: userId,
                    status: 'carrito'
                },
                include: Product
            })
                .then(order => {
                    res.status(200).send(order)
                })
                .catch(e => { res.send(e) })
})

server.get('/history/:userId', (req, res, next) => {
    const { userId } = req.params;

    Order.findAll({
        where: {
            userId: userId,
            status: {
                [Op.or]: ['creada', 'procesando', 'completada', 'cancelada']
            }
        },
        include: Product
    })
    .then(results => {
        res.json(results)
    })
    .catch(err => res.send(err))
})

module.exports = server;