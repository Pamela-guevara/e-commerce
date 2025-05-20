const server = require('express').Router();
const passport = require('passport');


// Auth con google
server.get('/google', 
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

// Callback
server.get('/google/callback', passport.authenticate('google'), (req,res) => {
    res.redirect('http://localhost:3000/check/' + req.user.id)
})

module.exports = server;