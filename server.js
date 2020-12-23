const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const mongoose = require('mongoose');
let session = require('express-session');
let MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'puplic')));
let store = new MongoDBStore({
    uri: 'mongodb+srv://Admin:Admin@cluster0.q3ixt.mongodb.net/saraha',
    collection: 'mySessions'
});
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(flash());
const homeRoute = require('./routes/home.routes.js');
const loginRoute = require('./routes/login.routes.js');
const registerRoute = require('./routes/register.routes.js');
const messagesRoute = require('./routes/messages.routes.js');
const userRoute = require('./routes/user.routes.js');
const {
    read
} = require('fs');
app.use(homeRoute);
app.use(loginRoute);
app.use(registerRoute);
app.use(messagesRoute);
app.use(userRoute);
app.get('/logOut', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    })
})
mongoose.connect('mongodb+srv://Admin:Admin@cluster0.q3ixt.mongodb.net/saraha', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port port!`));