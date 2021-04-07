const { AuthenticationError } = require('apollo-server-express');
// const { stripIgnoredCharacters } = require('graphql');
const { User, MenuItem, Course, Order } = require('../models');
const { signToken } = require('../utils/auth');
// const stripe = require('stripe')

const resolvers = { 
    Query: {
        course: async () => {
            return await Course.find();
        },
        menuItems: async () => {
            return await MenuItem.find().populate('course');
        },
        menuItem: async (parent, { _id }) => {
            return await MenuItem.findById(_id).populate('course');
        },
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.menuItems',
                    populate: 'course'
                });

                user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

                return user;
            }

            throw new AuthenticationError('Not logged in');
        },
        order: async (parent, { _id }, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.menuItems',
                    populate: 'course'
                });

                return user.orders.id(_id);
            }

            throw new AuthenticationError('Not logged in');
        },
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ menuItem: args.menuItem });
            const { menuItems } = await order.populate('menuItem').execPopulate();

            const line_items = [];

            for (let i = 0; i < args.length; i++) {
                const menuItem = await stripe.menuItem.create({
                    name: menuItem[i].name,
                    description: menuItem[i].description,
                    images: [`${url}/images/${menuItem[i].image}`]
                });

                const price = await stripe.prices.create({
                    product: menuItem.id,
                    unit_amount: menuItem[i].price * 100,
                    currency: 'usd'
                });

                line_items.push({
                    price: price.id,
                    quantity: 1
                })
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_i={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`
            });

            return { session: session.id };
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        addOrder: async (parent, {menuItems}, context) => {
            if (context.user) {
                const order = new Order({ menuItems });
                console.log(order);

                await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

                return order;
            }

            throw new AuthenticationError('Not logged in');
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true })
            }

            throw new AuthenticationError('Not logged in');
        },
        updateMenuItem: async (parent, args, context) => {
            // const decrement = Math.abs(args.quantity) * -1;

            return await MenuItem.findByIdAndUpdate(args._id, args, { new: true });
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect email');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }

            const token = signToken(user);

            return { token, user };
        }
    }
};

module.exports = resolvers;