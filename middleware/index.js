const Camp = require('../models/campground');
const Comment = require('../models/comment');

//All middlewares goes here
const middlewareObj = {};

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
        let newCampground = req.params.id
    Camp.findById(newCampground,(err, campground) =>{
        if(err){
            req.flash('error', "Campground Not Found")
            res.redirect('back')
        }else{
            //console.log(campground)
            if(campground.author.id.equals(req.user._id)){
            next()
        }else{
            req.flash('error', "You don't have permission to do that")
            res.redirect('back')
        }
        }
    })
    }else{
        req.flash('error', "You need to be logged in to do that")
        res.redirect('back')
    }
};


middlewareObj.checkCommentOwnership = (req, res,next) => {
    if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id,(err, comment) =>{
        if(err){
            res.redirect('back')
        }else{
            //console.log(campground)
            if(comment.author.id.equals(req.user._id)){
            next()
        }else{
            req.flash('error', 'You don\'t have permission to do that')
            res.redirect('back')
        }
        }
    })
    }else{
        req.flash('error', 'You need to be logged in to do that')
        res.redirect('back')
    }
};


middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }else {
        req.flash('error', "You need to be logged in to do that")
        res.redirect('/login')
    }
} ;

module.exports = middlewareObj