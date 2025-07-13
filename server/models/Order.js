const { Schema, model } = require('mongoose');

//Create an Order schema

const orderSchema = new Schema({

    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    totalPrice: {
        type: Number,
        required: true,
    },
    deliveryAddress: {
        street: {
            type: String,
            required: true,
            maxLength: 30,
        },
        suburb: {
            type: String,
            required: true,
            maxLength: 30,
            trim: true,
        },
        state: {
            type: String,
            trim: true,
            maxLength: 20
        },
        postCode: {
            type: String,
            required: true,
            maxLength: 10,
        }
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
        id: false,
})

const Order = model('Order', orderSchema);

module.exports = Order;