const { Schema, model } = require('mongoose');

const categorySchema = new Schema({

    name: {
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
    }]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
})

const Category = model('Category', categorySchema);

module.exports = Category;