const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const userRouter = require('./User.js');
const categoryRouter = require('./category.js');
const orderRouter = require('./Order.js');
const cartRouter = require('./cart.js');
const checkoutRouter = require('./checkout.js');
const auth_Google = require('./auth-google.js');
const auth_Github = require('./auth-github.js');
const passportSetup = require('../config-pass/config.js');
const cookieSession = require('cookie-session');
const passport = require('passport');

const router = Router();

router.use(cookieSession({
    maxAge: 60 * 1000,
    keys: ['henry_grupo2']
}));

router.use(passport.initialize());
router.use(passport.session());

// load each router on a route
router.use('/auth', auth_Google);
router.use('/auth', auth_Github);
router.use('/products', productRouter);
router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/orders', orderRouter);
router.use('/carts', cartRouter);
router.use('/checkout', checkoutRouter);

module.exports = router;