const path = require('path');
const webpack = require('webpack');
const express = require('express');
const passport = require('passport');
const locationmap =require('./webserver/routes/locationmap')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const index = require('./webserver/routes/index');
const users = require('./webserver/routes/users');
const auth = require('./webserver/routes/auth');
const AccountVerification = require('./webserver/routes/accountVerification');
const ForgotPassword = require('./webserver/routes/forgotPassword');
const vendorProducts = require('./webserver/routes/VendorActions.js')
const uploadimage = require('./webserver/routes/uploadimage');
const populate = require('./webserver/routes/populate');
var updatevendorprofile = require('./webserver/routes/updatevendorprofile');
var SaveShop = require('./webserver/routes/saveshop');
const filterproduct = require('./webserver/routes/populateme');
const useractions = require('./webserver/routes/userAction');
const filterQuery=require('./webserver/routes/filterProducts');
const session = require('express-session');
const updateuserprofile = require('./webserver/routes/updateuserprofile');
const updatecatalogue = require('./webserver/routes/updatecatalogue');
const categoryimage = require('./webserver/routes/categoryimage');
const subcategoryimage = require('./webserver/routes/subcategoryimage');
const shopimages = require('./webserver/routes/shopimage');
const app = express();
const compiler = webpack(config);
// pass passport for configuration
require('./webserver/config/passport')(passport);
// required for passport
app.use(session({
    secret: 'sessionsecret', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, './webclient/')));


// Mongoose
//const db = 'mongodb://mongo/OWLDATABASE';
const db = 'mongodb://localhost:27017/OWLDATABASE';
mongoose.connect(db);

const con = mongoose.connection;
con.on('error', console.error.bind(console, 'connection error:'));
con.once('open', function() {
    console.log("connnected with mongo");
});



// Routes
app.use('/', index);
app.use('/users',users);
app.use('/auth',auth);
app.use('/fPassword',ForgotPassword);
app.use('/aVerification',AccountVerification);
app.use('/vendor',vendorProducts);
app.use('/uploadimage',uploadimage);
app.use('/populate',populate);
app.use('/location',locationmap);
app.use('/updatevendorprofile', updatevendorprofile);
app.use('/SaveShop', SaveShop);
app.use('/filter',filterproduct);
app.use('/userAction',useractions);
app.use('/filterQuery',filterQuery);
app.use('/updateuserprofile', updateuserprofile);
app.use('/categoryimage',categoryimage);
app.use('/subcategoryimage',subcategoryimage);
app.use('/updatecatalogue',updatecatalogue);
app.use('/shopimages',shopimages);
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
}));

app.use(webpackHotMiddleware(compiler));


//Listening to port 8080
app.listen(8080, '0.0.0.0', function(err, result) {
    if (err) {
        console.error("Error ", err);
    }
    console.log("Server started at 8080");
});
