const db = require('./connection');
const { Course, MenuItem } = require('../models');

db.once('open', async () => {
    await Course.deleteMany();

    const categories = await Course.insertMany([
        { name: 'appetizer' },
        { name: 'mains' },
        { name: 'desserts' },
        { name: 'drinks' }
    ]);

    console.log('courses seeded');

    await MenuItem.deleteMany();

    const menuItems = await MenuItem.insertMany([
        {
            name: 'Head Crab Cakes',
            description: 'Some description here',
            image: 'crab-cakes.jpg',
            price: 10,
            course: categories[0]._id
        },
        {
            name: 'Barrens Chat',
            description: 'Chuck Norris and Mankrik\'s wife\'s favorite dish.',
            image: 'loaded-fries.jpg',
            price: 8,
            course: categories[0]._id
        },
        { 
            name: 'The Mimic',
            description: 'While the Mimic remains motionless, it is indistinguishable from an ordinary object.   Be careful this veggie burger bites back.',
            image: 'veggie-burger.jpg',
            price: 12,
            course: categories[1]._id
        },
        {
            name: 'Better Than Ichiraku Ramen',
            description: 'Believe it!',
            image: 'ramen.jpg',
            price: 13,
            course: categories[1]._id
        },
        { 
            name: 'The Cake Is A Lie',
            description: 'This was a triumph!  I\'m making a note here: huge success.',
            image: 'chocolate-cake.jpg',
            price: 6,
            course: categories[2]._id
        },
        {
            name: 'Professor Putricide\'s Slime',
            description: 'Gooooood news everybody! This matcha boba has all the nutrients you\'d ever need, and has bobas!',
            image: 'boba.jpg',
            price: 5,
            course: categories[3]._id
        }
    ]);

    console.log('menu seeded');

    process.exit();
});