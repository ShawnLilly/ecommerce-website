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
    origin: "https://cse341-2020.herokuapp.com/",
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
const ta01Routes = require('./routes/ta01');
const ta02Routes = require('./routes/ta02');
const ta03Routes = require('./routes/ta03'); 
const ta04Routes = require('./routes/ta04'); 
const prove01Routes = require("./routes/prove01");
const prove02Routes = require("./routes/prove02");
const prove03Routes = require("./routes/prove03");
const prove04Routes = require("./routes/prove04");
const classActivities = require("./routes/03/routes");
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
  if(!req.session.user){
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));   
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/ta01', ta01Routes);
app.use('/ta02', ta02Routes);
app.use('/ta03', ta03Routes); 
app.use('/ta04', ta04Routes);
app.use('/prove01', prove01Routes);
app.use('/prove02', prove02Routes);
app.use('/prove03', prove03Routes);
app.use('/prove04', prove04Routes);
app.use('/03', classActivities);
app.use('/admin', adminRoutes);


app.get('/', (req, res, next) => {
  // This is the primary index, always handled last. 
  res.render('pages/index', {title: 'Welcome to my CSE341 repo', path: '/'});
})

app.use( shopRoutes);
app.use( authRoutes);
app.use(errorController.get404);

mongoose
  .connect(MONGODB_URL, options)
  .then(result => {
    app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
  })
  .catch(err => {
    console.log(err);
  });

    



  
