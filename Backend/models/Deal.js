const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const DealSchema = new Schema({
    userID: {
        type: String,
        default:true,
    },
    productID: { type: String },
    isDeal: { type: Boolean },
    
    
},{timestamps:true})



const Deal = mongoose.model('deal', DealSchema)

module.exports = Deal