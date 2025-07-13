const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({

    comment: {
        type: String,
        required: true,
        maxLength: 5800
    },
    commentAuthor: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => { return date.toDateString()}
    },

},
{
    toJSON: {
        virtuals: true,
    },
    //Allows saving sub-documents without an _id property
    id: false,
})

const Review = model('Review', reviewSchema);

module.exports = Review;