const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Camp = require('./models/campground')
const Comment = require('./models/comment')
const User = require('./models/user')
//const seedDb = require('./seeds')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose')
const expressSession = require('express-session')
const methodOverride = require('method-override')
const flash = require('connect-flash');

// seedDb()
//mongoose.connect('mongodb://localhost/yelpcamp', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb+srv://mrseewhy:Icui4cuicu2!@@yelpcamp-8tbdi.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))

//Passport Configuration
//Session
app.use(expressSession({
    secret: 'This is the end',
    resave: false,
    saveUninitialized: false
}))

//Configure flash
// app.configure(function() {
//     app.use(express.cookieParser('keyboard cat'));
//     app.use(express.session({ cookie: { maxAge: 60000 }}));
//     app.use(flash());
//   });

app.use(flash());
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use((req,res, next) =>{
    res.locals.user = req.user
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    next();
})


const commentRoute = require('./routes/comments')
const authRoute = require('./routes/auth')
const campgroundRoute = require('./routes/campgrounds')
app.use(commentRoute)
app.use(authRoute)
app.use(campgroundRoute)



app.listen(process.env.PORT || 8000, ()=> console.log("Server has started")) 