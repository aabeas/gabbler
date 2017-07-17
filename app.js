
const express = require("express");
const app = express();
const mustache = require("mustache-express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const morgan = require('morgan');
const bodyParser = require('body-parser');
const authentication = require("./middleware/authentication")
const mongoURL = process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/gabbler"
mongoose.connect(mongoURL)
const port = process.env.PORT || 3000;
app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.use(express.static('public'));
app.set('layout', 'layout');
app.use(morgan('tiny'))
app.listen(port)
app.use(bodyParser.urlencoded({extended: false}))
mongoose.Promise = require("bluebird");
// mongoose.connect("mongodb://0.0.0.0:27017/gabbler")

var sess = {
  secret: ']AnC%j8Y:wybVfedxKQA}taR',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {},
  resave: true,
  saveUninitialized: true
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
  sess.cookie.secure = true
}

app.use(session(sess))

const homepageRoute = require("./routes/homepage")
const sessionRoutes = require("./routes/session")
const registrationRoutes = require("./routes/registration")
const linksRoutes = require("./routes/links")
const votesRoutes = require("./routes/votes")

app.use(sessionRoutes)
app.use(registrationRoutes)
app.use(authentication)
app.use(homepageRoute);
app.use(linksRoutes);
app.use(votesRoutes);

app.listen(3000, function(){
  console.log("We are listening")
})
