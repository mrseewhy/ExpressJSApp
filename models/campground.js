const mongoose = require('mongoose')
const Schema = mongoose.Schema
const campSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: String,
    comments:[
        {type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
        }
    ],
    author: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
})

module.exports = mongoose.model('Camp', campSchema)