const express = require('express')
const router = express.Router();
const User = require('../models/user')
const passport = require('passport')


// Auth Route
//show form
router.get('/register', (req,res)=>{
    res.render('register')
})
//registration logic
router.post('/register', (req, res) => {
    const newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            req.flash('error', err.message)
            return res.redirect('register')
        }else{
            req.flash('success','Welcome to YelpCamp' + user.username)
            passport.authenticate('local')(req, res, ()=>{
                res.redirect('/campgrounds')
            })
        }
    })
})

router.get('/login', (req, res) => {
    res.render('login')})


router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect:'/login'
}),(req, res) => {
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged You Out')
    res.redirect('/campgrounds')
})



module.exports = router