const { Schema, model } = require('mongoose');

//Creation of Product Schema

const productSchema = new Schema({

    productName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
    },
    stock: {
        type: Number,
        min: 0
    },
    images: {
        type: [String],
        default: []
    },
    averageRating: {
        type: Number
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
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

productSchema.methods.isAvailable = async function() {
    if (this.stock > 0) {
        return true;
    } else {
        throw new Error('Product not available!')
    }
}

const Product = model('Product', productSchema);

module.exports = Product;