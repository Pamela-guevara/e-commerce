const server = require('express').Router();
// const { User, Order, Product, OrderLine } = require('../db.js');
// const MailingSender = require('../Mailing/mail.js');
const nodemailer = require('nodemailer');


server.post('/', (req, res, next) => {

    const { status, id, mail, name } = req.body;

    nodemailer.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account. ' + err.message);
            return process.exit(1);
        }

        console.log('Credentials obtained, sending message...');

        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });

        var message = {
            from: 'Sender Name <sender@example.com>',
            to: `Recipient <${mail}>`,
            subject: `Orden N° ${id}`,
            text: 'Gracias por su compra!',
            html: `<p><b>Hola ${name}.</b> Su compra ha sido creada exitosamente, recibirá un mail cuando su compra esté siendo procesada. Gracias.</p>`
        };


        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }

            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
        res.status(200)
    });
})

server.put('/', (req, res, next) => {

    const { status, id, mail, name } = req.body;

    nodemailer.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account. ' + err.message);
            return process.exit(1);
        }

        console.log('Credentials obtained, sending message...');

        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });

        if (status === 'procesando') {
            var message = {
                from: 'Sender Name <sender@example.com>',
                to: `Recipient <${mail}>`,
                subject: `Orden N° ${id}`,
                text: 'Gracias por su compra!',
                html: `<p><b>Hola ${name}.</b> Su compra está siendo procesada, recibirá un mail cuando su compra esté completa. Gracias.</p>`
            };
            return message;
        } else if (status === 'completada') {
            var message = {
                from: 'Sender Name <sender@example.com>',
                to: `Recipient <${mail}>`,
                subject: `Orden N° ${id}`,
                text: 'Gracias por su compra!',
                html: `<p><b>Hola ${name}.</b> Su compra ha sido completada; lo esperamos para su próxima compra. Gracias.</p>`
            };
            return message;
        } else if (status === 'cancelada') {
            var message = {
                from: 'Sender Name <sender@example.com>',
                to: `Recipient <${mail}>`,
                subject: `Orden N° ${id}`,
                text: 'Gracias por su compra!',
                html: `<p><b>Hola ${name}.</b> Su compra ha sido cancelada debido a inconvenientes con su orden, recibirá el reintegro por su compra. Lamentamos el inconveniente y le invitamos a seguir comprando en nuestra plataforma. Muchas gracias.</p>`
            };
            return message;
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }

            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
        res.status(200)
    });
});
module.exports = server;