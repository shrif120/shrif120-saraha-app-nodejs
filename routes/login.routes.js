const loginRoute = require('express').Router();
const userModel = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const {
    validationResult
} = require('express-validator');
const loginValidation = require('../validation/login.validation.js');
loginRoute.get('/login', (req, res) => {
    let emailError;
    let passwordError;
    if (req.flash('emailError')[0] == false) {
        emailError = false;
    } else {
        emailError = true;
    }
    if (req.flash('passwordError')[0] == false) {
        passwordError = false;
    } else {
        passwordError = true;
    }
    let errors = req.flash('errors');
    let oldInputs = req.flash('oldInputs')[0];
    if (oldInputs == undefined) {
        oldInputs = {
            email: '',
            password: ''
        }
    }
    res.render('login.ejs', {
        isLoggedIn: req.session.isLoggedIn,
        errors,
        oldInputs,
        emailError,
        passwordError
    })
});
loginRoute.post('/handleLogin', loginValidation, async(req, res) => {

    // console.log(req.body);

    let errors = validationResult(req);

    if (errors.isEmpty()) {
        const {
            email,
            password
        } = req.body;
        const user = await userModel.findOne({
            email
        });


        if (user != null) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                req.session.userID = user._id;
                req.session.Name = user.name;
                req.session.isLoggedIn = true;
                res.redirect('/messages');
            } else {
                req.flash('passwordError', [false]);
                res.redirect('/login');
            }


        } else {
            req.flash('emailError', [false]);
            res.redirect('/login');
        }


    } else {
        req.flash('errors', errors.array());
        req.flash('oldInputs', req.body);
        res.redirect('/login');
    }







});
module.exports = loginRoute;