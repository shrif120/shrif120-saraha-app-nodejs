const homeRoute = require('express').Router();
homeRoute.get('/', (req, res) => res.render('home.ejs', {
    isLoggedIn: req.session.isLoggedIn
}));

module.exports = homeRoute;