const mongoose = require('mongoose');
const Camp = require('./models/campground');
const Comment = require('./models/comment');
const data = [
    {name: "Cloud's Rest", image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec dui laoreet, tincidunt odio ac, placerat mi. Quisque condimentum metus magna, euismod sagittis nisl imperdiet ac. Nullam maximus elementum sem, sit amet vehicula orci gravida quis. Donec vehicula iaculis enim sed vulputate. Aenean eget mauris vitae lorem consectetur tempor at at sapien. Fusce eleifend lorem non feugiat convallis. Fusce quis ipsum placerat, dictum lectus sit amet, semper sem. Ut rhoncus nisi vel eros mollis ornare. Cras in eleifend neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae Duis non libero accumsan, elementum sem sit amet, ultrices urna. Duis congue tristique eros, sit amet varius lacus sollicitudin sed. Suspendisse vitae porttitor metus, nec faucibus dolor. Nunc ac euismod lectus, id auctor lorem. In dignissim nec nunc eu imperdiet. Nam in enim enim. Proin vitae ex ut lectus dapibus euismod tempus quis dolor. Ut luctus ipsum vitae mi porttitor, non laoreet dui ultrices. Nullam semper nisi sit amet massa varius, in eleifend arcu congue. In iaculis tellus nec pharetra dictum. Aliquam erat volutpat. Nullam imperdiet auctor luctus. Sed sapien metus, pellentesque eget placerat et, porta quis turpis. Aenean neque neque, aliquam at lacus nec, eleifend lobortis velit. Fusce bibendum interdum auctor. Vivamus semper purus ac ex sollicitudin euismod." }, 
    {name: "Desert Macer", image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec dui laoreet, tincidunt odio ac, placerat mi. Quisque condimentum metus magna, euismod sagittis nisl imperdiet ac. Nullam maximus elementum sem, sit amet vehicula orci gravida quis. Donec vehicula iaculis enim sed vulputate. Aenean eget mauris vitae lorem consectetur tempor at at sapien. Fusce eleifend lorem non feugiat convallis. Fusce quis ipsum placerat, dictum lectus sit amet, semper sem. Ut rhoncus nisi vel eros mollis ornare. Cras in eleifend neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae Duis non libero accumsan, elementum sem sit amet, ultrices urna. Duis congue tristique eros, sit amet varius lacus sollicitudin sed. Suspendisse vitae porttitor metus, nec faucibus dolor. Nunc ac euismod lectus, id auctor lorem. In dignissim nec nunc eu imperdiet. Nam in enim enim. Proin vitae ex ut lectus dapibus euismod tempus quis dolor. Ut luctus ipsum vitae mi porttitor, non laoreet dui ultrices. Nullam semper nisi sit amet massa varius, in eleifend arcu congue. In iaculis tellus nec pharetra dictum. Aliquam erat volutpat. Nullam imperdiet auctor luctus. Sed sapien metus, pellentesque eget placerat et, porta quis turpis. Aenean neque neque, aliquam at lacus nec, eleifend lobortis velit. Fusce bibendum interdum auctor. Vivamus semper purus ac ex sollicitudin euismod." }, 
    {name: "Canyon Floor", image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec dui laoreet, tincidunt odio ac, placerat mi. Quisque condimentum metus magna, euismod sagittis nisl imperdiet ac. Nullam maximus elementum sem, sit amet vehicula orci gravida quis. Donec vehicula iaculis enim sed vulputate. Aenean eget mauris vitae lorem consectetur tempor at at sapien. Fusce eleifend lorem non feugiat convallis. Fusce quis ipsum placerat, dictum lectus sit amet, semper sem. Ut rhoncus nisi vel eros mollis ornare. Cras in eleifend neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae Duis non libero accumsan, elementum sem sit amet, ultrices urna. Duis congue tristique eros, sit amet varius lacus sollicitudin sed. Suspendisse vitae porttitor metus, nec faucibus dolor. Nunc ac euismod lectus, id auctor lorem. In dignissim nec nunc eu imperdiet. Nam in enim enim. Proin vitae ex ut lectus dapibus euismod tempus quis dolor. Ut luctus ipsum vitae mi porttitor, non laoreet dui ultrices. Nullam semper nisi sit amet massa varius, in eleifend arcu congue. In iaculis tellus nec pharetra dictum. Aliquam erat volutpat. Nullam imperdiet auctor luctus. Sed sapien metus, pellentesque eget placerat et, porta quis turpis. Aenean neque neque, aliquam at lacus nec, eleifend lobortis velit. Fusce bibendum interdum auctor. Vivamus semper purus ac ex sollicitudin euismod." }, 
]

const seedDb = () => {

    //Remove all campgrounds
    Camp.remove({}, (err) => {
        if(err){
            console.log(err)
        }
        console.log("removed campgrounds")
         // add a few campgrounds
    data.forEach(seed =>{
        Camp.create(seed, (err, campground)=>{
            if(err){
                console.log(err)
            }else{
                console.log("Added Campground")
                //create comments
                Comment.create({text: "This Place is great, but i wish there was internet",
            author: 'Homer'}, (err, comment) => {
                
                if(err){
                    console.log(err)
                }else{
                    campground.comments.push(comment)
                    campground.save()
                    console.log("Created new comment")
                }
            })
            }
        })
    })
    })

   
}

module.exports = seedDb;