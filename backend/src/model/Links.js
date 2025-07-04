const momgoose = require('mongoose');

const linkSchema = new momgoose.Schema({
    campaignTitle: {
        type: String,
        required: true,
    },
    originalUrl: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        
        required: false,
    },
    clickCount: {
        type: Number,
        default: 0,
    },
    user: {
        type:  momgoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});


module.exports = momgoose.model('Links', linkSchema);