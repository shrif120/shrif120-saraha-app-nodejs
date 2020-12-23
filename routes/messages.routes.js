const messagesRoute = require('express').Router();
const message = require('../models/message.model.js');
messagesRoute.get('/messages', async(req, res) => {
    if (req.session.isLoggedIn == true) {
        const messages = await message.find({
            userId: req.session.userID
        });
        // console.log(messages);
        const fullUrl = req.protocol + '://' + req.headers.host + '/user/' + req.session.userID
        res.render('messages.ejs', {
            messages,
            name: req.session.Name,
            fullUrl,
            isLoggedIn: req.session.isLoggedIn
        });
    } else {
        res.redirect('/');
    }

});

module.exports = messagesRoute;