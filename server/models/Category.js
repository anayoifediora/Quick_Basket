const { Schema, model } = require('mongoose');

const categorySchema = new Schema({

    categoryName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => { return date.toDateString()}
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        get: (date) => { return date.toDateString()}
    }
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
})

const Category = model('Category', categorySchema);

module.exports = Category;