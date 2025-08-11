const { Schema, model } = require("mongoose");
const Product = require("./Product");

//Create an Order schema

const orderSchema = new Schema(
  { 
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        productName: String,
        price: Number,
        quantity: Number,
      },
    ],

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
        maxLength: 20,
      },
      postCode: {
        type: String,
        required: true,
        maxLength: 10,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        return date.toDateString();
      },
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//Set up pre-save middleware to check stock before placing an order
orderSchema.pre('save', async function(next) {
  try {
    for (let item of this.products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return next(new Error(`Product with ID ${item.productId} not found`));
      }

      if (product.stock < item.quantity) {
        return next(new Error(`Insufficient stock for product: ${product.productName}`));
      }

    }  

    next();
  } catch (err) {
    return next(err);
  }
});


const Order = model("Order", orderSchema);

module.exports = Order;
