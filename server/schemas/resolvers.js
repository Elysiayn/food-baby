const { AuthenticationError } = require('apollo-server-express');
// const { stripIgnoredCharacters } = require('graphql');
const { User, MenuItem, Course, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
        course: async () => {
            return await Course.find();
        },
        menuItems: async () => {
            return await MenuItem.find().populate('course');
        },
        menuItem: async (parent, { _id }) => {
            const menuItem = await MenuItem
                .findById(_id)
                .populate('course')
                .select('-__v');

            return menuItem;
        },
        allUsers : async () => {
            return User.find();
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
            const order = new Order({ menuItems: args.menuItems});
            const { menuItems } = await order.populate('menuItems').execPopulate();

            const line_items = [];

            for (let i = 0; i < menuItems.length; i++) {
                const menuItem = await stripe.products.create({
                    name: menuItems[i].name,
                    description: menuItems[i].description,
                    images: [`${url}/images/${menuItems[i].image}`]
                });

                const price = await stripe.prices.create({
                    product: menuItem.id,
                    unit_amount: menuItems[i].price * 100,
                    currency: 'usd'
                });

                line_items.push({
                    price: price.id,
                    quantity: 1
                })
            }

            console.log('============', line_items);

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
        addMenuItem: async (parent, { menuItem }) => {
            const query = await Course.findOne({ name: menuItem.course });
            const courseId = query._id;

            const newItem = await MenuItem.create({ 
                ...menuItem, 
                course: courseId
            });

            const item = MenuItem.findById(newItem._id).populate('course')

            return item;
        },
        addUser: async (parent, args) => {

            const user = await User.create(args);

            const token = signToken(user);

            return { token, user };
        },
        addOrder: async (parent, { menuItems }, context) => {
            if (context.user) {
                const order = new Order({ menuItems });

                await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

                return order;
            }

            throw new AuthenticationError('Not logged in');
        },
        deleteMenuItem: async (parent, args) => {
            return await MenuItem.findByIdAndDelete(args);
        },
        editMenuItem: async (parent, { menuItem }) => {
            const query = await Course.findOne({ name: menuItem.course });
            const courseId = query._id;

            return await MenuItem.findByIdAndUpdate(
                menuItem._id,
                { ...menuItem, course: courseId}, 
                { new: true });
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true })
            }

            throw new AuthenticationError('Not logged in');
        },

        editMenuItem: async (parent, { menuItem }) => {
            const query = await Course.findOne({ name: menuItem.course });
            const courseId = query._id;

            return await MenuItem.findByIdAndUpdate(
                menuItem._id,
                { ...menuItem, course: courseId}, 
                { new: true });
        },
        editMenuItem: async (parent, { menuItem }) => {
            const query = await Course.findOne({ name: menuItem.course });
            const courseId = query._id;

            return await MenuItem.findByIdAndUpdate(
                menuItem._id,
                { ...menuItem, course: courseId}, 
                { new: true });
        },
        editMenuItem: async (parent, { menuItem }) => {
            const query = await Course.findOne({ name: menuItem.course });
            const courseId = query._id;

            return await MenuItem.findByIdAndUpdate(
                menuItem._id,
                { ...menuItem, course: courseId}, 
                { new: true });
        },
        editMenuItem: async (parent, { menuItem }) => {
            const query = await Course.findOne({ name: menuItem.course });
            const courseId = query._id;

            return await MenuItem.findByIdAndUpdate(
                menuItem._id,
                { ...menuItem, course: courseId}, 
                { new: true });
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