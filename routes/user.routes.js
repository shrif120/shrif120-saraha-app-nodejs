const userRoute = require('express').Router();
const messageModel = require('../models/message.model.js');
const userModel = require('../models/user.model.js');
let userId;
userRoute.get('/user/:id', async(req, res) => {

    if (req.session.isLoggedIn == true) {
        userId = req.params.id;
        const user = await userModel.findOne({
            _id: userId
        });
        // console.log(user);
        res.render('user.ejs', {
            isLoggedIn: req.session.isLoggedIn,
            name: user.name
        });
    } else {
        res.redirect('/');
    }

});
userRoute.post('/handleMessage', async(req, res) => {
    // console.log(req.body);
    const {
        message
    } = req.body;
    await messageModel.insertMany({
        message,
        userId
    })
    res.redirect('/user/' + userId);
});
module.exports = userRoute;