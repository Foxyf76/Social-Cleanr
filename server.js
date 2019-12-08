const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');

// Connect to DB
connectDB();

app.use(
  session({
    secret: 'test',
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// Init middleware
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(express.json({ extended: false }));

// Fix Cors error
app.use(
  cors({
    origin: 'http://localhost:3000', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // allow session cookie from browser to pass through
  })
);

// Init passport
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Init session
app.get('/', (req, res) => {
  res.send('welcome');
});

// Define routes here
app.use('/api/facebook-auth', require('./routes/api/auth'));
app.use('/api/scrape', require('./routes/api/scrape'));
app.use('/api/passport-auth', require('./routes/api/auth-passport'));
app.use('/api/classifier', require('./routes/api/classifier'));
/////

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
