const express = require('express')
const router = express.Router();
const Camp = require('../models/campground')
const middleware = require('../middleware/index')


router.get('/', (req, res) => {
    res.render('./campgrounds/home')
    // res.redirect('/campgrounds')
})

router.get('/campgrounds', (req, res) => { 
    Camp.find({}, (err, allcampgrounds) => {
        if(err){
            console.log('Something went wrong '+ err)
        }else{
            res.render('./campgrounds/campgrounds', {campgrounds: allcampgrounds, user: req.user})
        }
    })
    
})

//Campground Create Page
router.post('/campgrounds', middleware.isLoggedIn, (req, res) => {
    const author = {
        id: req.user._id,
        username: req.user.username,
    }
    const newCampground = {...req.body, author}
    //console.log(newCampground)
    Camp.create(newCampground, (err, campground) => {
        if(err){
            console.log('Something went wrong '+ err)
        }else{
            //console.log('new Campground created '+ campground)
            res.redirect('/campgrounds')
        }
    })
    
})

//Campground New - shows form to create new campground
router.get('/campgrounds/new', middleware.isLoggedIn, (req, res) => { 
    res.render('./campgrounds/new')
})

//Campground Show individual pages
router.get('/campgrounds/:id', (req, res) => {
    let newCampground = req.params.id
    Camp.findById(newCampground).populate('comments').exec((err, campground) =>{
        if(err){
            console.log('Some error occured '+ err)
        }else{
            //console.log(campground)
            res.render('./campgrounds/show', {campground})
        }
    })
})

//edit  form Route

router.get('/campgrounds/:id/edit', middleware.checkCampgroundOwnership,(req, res) => {
    let newCampground = req.params.id
    Camp.findById(newCampground).populate('comments').exec((err, campground) =>{
            res.render('./campgrounds/edit', {campground})
        })})

// edit and redirect post route

router.put('/campgrounds/:id/', middleware.checkCampgroundOwnership, (req, res) => {
    Camp.findByIdAndUpdate(req.params.id, req.body, (err, campground)=>{
        if(err){
            console.log(err)
        }else {
            res.redirect('/campgrounds/'+req.params.id)
        }
    })
})

router.delete('/campgrounds/:id/', middleware.checkCampgroundOwnership, (req, res) => {
    Camp.findByIdAndRemove(req.params.id,(err, campground)=>{
        if(err){
            console.log(err)
        }else {
            req.flash('error', 'campground deleted')
                res.redirect('/campgrounds/')
        }
    })
})

module.exports = router