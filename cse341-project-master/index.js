// initial setup (package requires, port number setup)
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000
const cors = require('cors')
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://new_user:AXYHrupDUWdkCILP@cluster0.j240c.mongodb.net/shop?retryWrites=true&w=majority';                      

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URL, 
  collection: 'sessions' 
});
const csrfProtection = csrf();

const corsOptions = {
    origin: "https://cse341ecom.herokuapp.com/",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    family: 4
};

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Route setup
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
//const { collection } = require('./models/user');

app.use(bodyParser({extended: false})) // For parsing the body of a POST
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
    secret: 'my secret', 
    resave: false, 
    saveUninitialized: 
    false, store: store
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  if(!req.session.user){
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      if(!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err));
    });   
});

app.use('/admin', adminRoutes);


app.get('/shop', (req, res, next) => {
})

app.use( shopRoutes);
app.use( authRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);


// removed for error testing

app.use((error, req, res, next) => {
  res.status(500).render('500', { 
    pageTitle: 'Server Error', 
    path: '/500',
    isAuthenticated: req.session.isLoggedIn 
  });
});

mongoose
  .connect(MONGODB_URL, options)
  .then(result => {
    app.listen(PORT, () => {console.log(`Listening on ${ PORT }`)});
  })
  .catch(err => {
    console.log(err);
  });

    



  
