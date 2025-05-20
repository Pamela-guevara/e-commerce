const server = require('express').Router();
const passport = require("passport");

// Auth with Github
server.get('/github', 
    passport.authenticate('github', {
        scope: ['profile', 'user:email']
    })
);


// Callback 
server.get('/github/callback', passport.authenticate('github'), (req,res) => {
    res.redirect('http://localhost:3000/check/' + req.user.id)
})

module.exports = server;


