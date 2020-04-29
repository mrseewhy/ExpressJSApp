const express = require('express')
const router = express.Router();
const Camp = require('../models/campground')
const Comment = require('../models/comment')
const middleware = require('../middleware/index')

// ===============================
// Comment Routes
// ===============================




router.get('/campgrounds/:id/comments/new', middleware.isLoggedIn, (req, res) => {
    Camp.findById(req.params.id, (err, campground)=> {
        if(err){
            console.log(err)
        }else{
            res.render('./comments/new', {campground})
        }
    })
})

router.post('/campgrounds/:id/comments',middleware.isLoggedIn, (req, res) => {
    Camp.findById(req.params.id, (err, campground)=> {
        if(err){
            console.log(err)
            res.redirect('/campgrounds')
        }else{
            //console.log(req.body)
            Comment.create(req.body, (err, comment) => {
                if(err){
                    req.flash('error', 'Something went wrong')
                    console.log(err)
                }else{
                    comment.author.id = req.user._id
                    comment.author.username = req.user.username
                    comment.save()
                    campground.comments.push(comment)
                    campground.save()
                    //console.log('After save' + comment)
                    req.flash('success', 'Comment Successfully Added')
                    res.redirect('/campgrounds/'+campground._id)
                }
            })
        }
    })
})


//new form for edit comment

router.get('/campgrounds/:id/comments/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
    const campgroundID =  req.params.id
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err){
            res.redirect('back')
        }else{
            res.render('./comments/edit', {campgroundID, comment: foundComment, })
        }
    })
})


//Put route for editing comment
router.put('/campgrounds/:id/comments/:comment_id/', middleware.checkCommentOwnership, (req, res)=>{
    const campgroundID =  req.params.id
    Comment.findByIdAndUpdate(req.params.comment_id, req.body, (err, comment) => {
        if(err){
            res.redirect('back')
        }else{
            //res.send('Put Route')
            res.redirect('/campgrounds/'+campgroundID )
        }
    })
})

router.delete('/campgrounds/:id/comments/:comment_id/', middleware.checkCommentOwnership, (req, res)=>{
    const campgroundID =  req.params.id
    Comment.findByIdAndRemove(req.params.comment_id, (err, comment) => {
        if(err){
            res.redirect('back')
        }else{
            //res.send('Put Route')
            req.flash('error', 'comment deleted')
            res.redirect('/campgrounds/'+campgroundID )
        }
    })
})


module.exports = router