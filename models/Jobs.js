const mongoose = require('mongoose')


const Schema = mongoose.Schema;


const jobsSchema = new Schema({
    positionName: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    platform: {
        type: String,
        required: true,
    },
    gotAnReply: {
        type: String,
        required: true,
    },
    googleName: {
        type: String,
        required: true,
    }


}, { timestamps: true })


module.exports = mongoose.model('Job', jobsSchema)



