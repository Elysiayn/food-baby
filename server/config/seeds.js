const db = require('./connection');
const { Course, MenuItem, User } = require('../models');

db.once('open', async () => {
    await Course.deleteMany();

    const categories = await Course.insertMany([
        { name: 'appetizers' },
        { name: 'mains' },
        { name: 'desserts' },
        { name: 'drinks' }
    ]);

    console.log('courses seeded');

    await MenuItem.deleteMany();

    const menuItems = await MenuItem.insertMany([
        {
            name: 'Head Crab Cakes',
            description: 'Crabby goodness, watch out it doesn\'t swallow you whole!',
            image: 'crab-cakes.jpg',
            price: 10,
            course: categories[0]._id
        },
        {
          name: 'Traveler\'s Stew',
          description: 'A earthy and hearty beef, ale and vegetable stew straight from a flame-licked cauldron. For optimal flavour served in a wooden bowl and spoon.',
          image: 'travelers-stew.jpg',
          price: 9,
          course: categories[0]._id
      },
      {
        name: 'Delzoun Tide-Me-Overs',
        description: 'Beef, pork, onions, and a smathering of dwarven seasonings are rolled up into delicious little balls and coated in dark dwarven gravy for snacking. Also known as meatballs in the multiverse.',
        image: 'tide-me-overs.jpg',
        price: 11,
        course: categories[0]._id
        },
        {
          name: 'Lord of the Onion Rings',
          description: 'Lightly battered and seasoned crispy golden onion rings sure to be your new precious! Just make sure Gollum isn\'t around.',
          image: 'onion-rings.jpg',
          price: 7,
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
            description: 'While the Mimic remains motionless, it is indistinguishable from an ordinary object. Be careful this veggie burger bites back.',
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
          name: 'Moonshae Seafood Rice',
          description: 'Recipe derived from the mythical elven isle of Evermeet, this creamy fish rice dish includes shrimps and scallops and refined with the finest seasonings of all the Sword Coast!',
          image: 'seafood-rice.jpg',
          price: 14,
          course: categories[1]._id
        },
        {
          name: 'Fire-Spiced Abyssal Chicken Kebabs',
          description: 'Flame-licked skewers dipped in a spicy pepper glaze straight from your tieflings grandma\'s cookbook!',
          image: 'chicken-kebabs.png',
          price: 9,
          course: categories[1]._id
        },
        {
          name: 'Tavern Steak',
          description: 'Juicy beef patties kneaded with a chock-full of rich seasongings and seared over an open flame. These steaks are fast dinner options for the hurried tavern hopper.',
          image: 'tavern-steak.jpg',
          price: 12,
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
          name: 'Owlbear Claws',
          description: 'Freshly baked, lighly glazed and almond paste filled puff pastry dessert sure to intice all surrounding owlbears keen smell for miles around! No owlbears where hurt in the making of this dessert. ',
          image: 'owlbear-claws.png',
          price: 7,
          course: categories[2]._id
        },
        {
          name: 'Versicolor Treat',
          description: 'Crunchy and swirled cherry syrup. This sweet meringue is sold by the night elves of Kalimdor making it a much sought-after dessert for visitors of Azeroth. Warning, may be habit forming.',
          image: 'versicolor-treat.jpg',
          price: 11,
          course: categories[2]._id
        },
        {
          name: 'Conjured Mana Buns',
          description: 'Conjured by our very live-in wizard and flavored wuth a rich brown sugar glaze and cinnimon sugar filling.',
          image: 'buns.jpg',
          price: 8,
          course: categories[2]._id
        },
        {
          name: 'Halfling Oatmeal Sweet Nibbles',
          description: 'Dense with oats, chocolate chips, and butterscotch, these diminutive cookies are perfect for halfling hands... and the stomachs of everyone.',
          image: 'sweet-nibbles.jpg',
          price: 5,
          course: categories[2]._id
        },
        {
            name: 'Professor Putricide\'s Slime',
            description: 'Gooooood news everybody! This matcha boba has all the nutrients you\'d ever need, and has bobas!',
            image: 'boba.jpg',
            price: 5,
            course: categories[3]._id
        },
        {
          name: 'Par-Salian\'s Tea',
          description: 'A resorative and potent tea blend of fresh ginger infusion, honey, dried lemon, and mint. Highmage Par-Salian approved.',
          image: 'ginger-tea.jpg',
          price: 6,
          course: categories[3]._id
        },
        {
          name: 'Potion of Restoration',
          description: 'The perfect pick me up before any dungeon, this rejuvenatingly fruity and sweet sparkling potion is made with strawberries. Drink enough of these and you will know neither pain nor fear, guaranteed.',
          image: 'potion.jpg',
          price: 4,
          course: categories[3]._id
        },
        {
          name: 'Cactus Apple Surprise',
          description: 'Straight from the Valley of trials, this refreshing apple treat is a perfect reward after a long day of raiding.',
          image: 'apple.jpg',
          price: 5,
          course: categories[3]._id
        },
        {
          name: 'Moonglow',
          description: 'Celebrate the Lunar festival with fellow druids in Moonglade with this sweet and refreshing lemon sparkling fruit drink.',
          image:'moonglow.jpg',
          price: 6,
          course: categories[3]._id
        }
    ]);

    console.log('menu seeded');

    await User.deleteMany();

    await User.create({
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@food-baby.com',
        password: 'password12345',
        role: 'owner'
    });

    await User.create({
        firstName: 'John',
        lastName: 'Cena',
        email: 'jcena@food-baby.com',
        password: 'password12345',
        role: 'user'
    });

    console.log('users seeded')

    process.exit();
});