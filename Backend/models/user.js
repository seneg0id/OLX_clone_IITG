const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    Username: String,
    OID: String,
    email: String,
    isAdmin: {
        type: Boolean,
        default:false
    },
    accessToken:String,
},{ timestamps: true })

const User = mongoose.model('user', userSchema)

module.exports = User
