const mongoose = require('mongoose')
const validator = require('validator')  // npm install validator
const shorthash = require('shorthash')  // npm install shorthash

const Schema = mongoose.Schema
const urlSchema = new Schema({
    title : {
        type: String,
        minlength : [3,'Title should be more than 3 characters'],
        required: true
    },
    originalUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(value){
                return validator.isURL(value)
            },
            message: function(){
                return 'pass a valid URL'                            
            }
        }
    },
    hashedUrl : {
        type: String
    },
    clicks: [{
        clickDateTime: {
            type: Date,
            default: Date.now
        },
        ipAddress: {
            type: String
        },
        browser: {
            type: String
        },
        platform: {
            type: String
        },
        device: {
            type: String
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

urlSchema.pre('save', function(next){
    const hash = shorthash.unique(this.originalUrl)
    if(this.originalUrl !== ''){
        this.hashedUrl = hash
    }
    console.log(this.hashedUrl)
    next()
})


const Url = mongoose.model('Url', urlSchema)

module.exports = Url