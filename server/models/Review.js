const { Schema, model } = require('mongoose');
// const Product = require('./Product');

const reviewSchema = new Schema({

    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    reviewText: {
        type: String,
        required: true,
        maxLength: 5800
    },
    reviewAuthor: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true
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