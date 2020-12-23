const registerRoute = require('express').Router();
const userModel = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const registerValidation = require('../validation/register.validation.js');
const {
    validationResult
} = require('express-validator');

registerRoute.get('/register', (req, res) => {
    let isEmail;
    let success;
    if (req.flash('isEmail')[0] == false) {
        isEmail = false;
    } else {
        isEmail = true
    }
    if (req.flash('success')[0] == true) {
        success = true;
    } else {
        success = false;
    }
    let errors = req.flash('errors');
    let oldInputs = req.flash('oldInputs')[0];
    if (oldInputs == undefined) {
        oldInputs = {
            name: '',
            email: '',
            password: '',
            PasswordConfirmation: ''
        }
    }
    res.render('register.ejs', {
        isLoggedIn: req.session.isLoggedIn,
        errors,
        oldInputs,
        isEmail,
        success
    })

});
registerRoute.post('/handleRegister', registerValidation, async(req, res) => {

    // console.log(req.body);
    const {
        name,
        email,
        password
    } = req.body;

    let errors = validationResult(req);

    if (errors.isEmpty()) {
        bcrypt.hash(password, 8, async function(err, hash) {
            const userMail = await userModel.findOne({
                email
            })

            if (userMail) {
                req.flash('isEmail', [false]);
                res.redirect('/register');
            } else {

                await userModel.insertMany({
                    name,
                    email,
                    password: hash
                });
                req.flash('success', [true]);
                res.redirect('/register');
            }



        });

    } else {

        req.flash('errors', errors.array());
        req.flash('oldInputs', req.body);
        res.redirect('/register');
    }





});
module.exports = registerRoute;