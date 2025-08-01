const { ApolloServer } = require("@apollo/server");
const { GraphQLError } = require("graphql");
const { signToken } = require("../utils/auth");

const { User, Product, Category, Order, Review } = require("../models");

const resolvers = {
  Query: {
    //Lists all users
    users: async () => {
      return await User.find().populate('orders');
    },
    //List all products
    products: async () => {
      return await Product.find().populate('reviews');
    },
    //List a product by Id
    product: async (parent, { productId }) => {
      return await Product.findOne({ _id: productId });
    },
    //List all categories
    categories: async () => {
      return await Category.find().populate('products');
    },
    //List all orders
    orders: async () => {
      return await Order.find();
    },
    //List an Order by Id
    order: async (parent, { orderId }) => {
      const order = await Order.findOne({ _id: orderId });
      return order;
    }
  },

  Mutation: {
    //Creates a new user
    addUser: async (
      parent,
      { username, email, password, firstName, lastName, phone, address }
    ) => {
      const user = await User.create({
        username,
        email,
        password,
        firstName,
        lastName,
        phone,
        address,
      });
      const token = signToken(user);

      return { token, user };
    },
    //Logs in a user by checking email and password
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new GraphQLError("Incorrect Email or Password!", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      //Confirm password is correct
      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new GraphQLError("Incorrect Email or Password!", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const token = signToken(user);
      return { token, user };
    },
    //Updates User information
    updateUser: async (
      parent,
      { userId, email, firstName, lastName, phone, address }
    ) => {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { email, firstName, lastName, phone, address },
        { new: true }
      );
      return user;
    },

    //Deletes a User
    // removeUser: async (parent, { userId }) => {
    //   const user = await User.findOneAndDelete({ _id: userId });
    // },

    //Creates a new product
    addProduct: async (
      parent,
      { productName, description, price, category, brand, stock, images, categoryId }
    ) => {
      const product = await Product.create({
        productName,
        description,
        price,
        category,
        brand,
        stock,
        images,
      });

      await Category.findOneAndUpdate(
        { _id: categoryId },
        { $addToSet: { products: product._id }},
        { runValidators: true, new: true }
      );
      return product;
    },

    //Updates a product info
    updateProduct: async (
      parent,
      { productId, productName, description, price, category, brand, stock, images }
      ) => {
      const product = await Product.findOneAndUpdate(
        { _id: productId },
        { productName, description, price, category, brand, stock, images },
        { runValidators: true },
        { new: true }
      );
      return product;
    },

    //Deletes a Product by Id
    removeProduct: async (parent, { productId }) => {
      return Product.findOneAndDelete({ _id: productId });
    },

    //Create a Category
    addCategory: async (parent, { categoryName, description }) => {
      const category = Category.create({ categoryName, description});
      return category;
    },

    //Update a Category
    updateCategory: async (parent, { categoryId, categoryName, description }) => {
      const updatedCategory = await Category.find(
        { _id: categoryId },
        { categoryName, description },
        { new: true }
      )
      return updatedCategory;
    },

    //Delete a Category by Id
    removeCategory: async (parent, { categoryId }) => {
      return Category.findOneAndDelete({ _id: categoryId });
    },

    //Create an Order
    createOrder: async (parent, { userId, products, totalPrice, deliveryAddress }) => {
      try {
        const formattedProducts= products.map(item => ({
          productId: item.productId,
          productName: item.productName,
          price: item.price,
          quantity: item.quantity
        }));

        const order = await Order.create({
          products: formattedProducts,
          totalPrice,
          deliveryAddress
        });

        for (const productItem of order.products) {
          await Product.findByIdAndUpdate(
            productItem.productId,
            { $inc: { stock: -productItem.quantity } },
            { new: true }
          )
        }

        await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { orders: order._id } },
          { new: true }
        )
        return order;
      } catch(error) {
        throw new Error(error.message);
      }
    },

    //Add a review
    addReview: async (parent, {productId, reviewText, reviewAuthor, rating }) => {
      const review = await Review.create({ reviewText, reviewAuthor, rating, productId });
      const product = await Product.findOneAndUpdate(
        { _id: productId },
        { $addToSet: { reviews: review._id } },
        { new: true, runValidators: true }

      );
      //Populate reviews to compute updated average rating
      const productWithNewRating = await product.populate('reviews');

      const productRatings = productWithNewRating.reviews.map((review) => review.rating);
      const avgRating = productRatings.reduce((a, b) => a + b, 0) / productRatings.length;
      //Save new averageRating to product
      productWithNewRating.averageRating = avgRating;
      await productWithNewRating.save();

      return product;
    },
    //Delete a review
    removeReview: async (parent, { productId, reviewId }) => {
      const product = await Product.findOneAndUpdate(
        { _id: productId },
        { $pull: { reviews: reviewId }},
        { new: true }
      );

      return product;
    }
  },

  
  
};

module.exports = resolvers;
