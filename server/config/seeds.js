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
            name: 'Headcrab Cakes',
            description: 'Crabby goodness, watch out it doesn\'t swallow you whole!',
            image: 'https://firebasestorage.googleapis.com/v0/b/food-baby-682db.appspot.com/o/images%2Fcrab-cakes.jpg?alt=media&token=b86505f7-163b-49c8-9c49-7580fbd59d0a',
            price: 10,
            course: categories[0]._id
        },
        {
            name: 'Traveler\'s Stew',
            description: 'A earthy and hearty beef, ale and vegetable stew straight from a flame-licked cauldron. For optimal flavour served in a wooden bowl and spoon.',
            image: 'https://firebasestorage.googleapis.com/v0/b/food-baby-682db.appspot.com/o/images%2Ftravelers-stew.jpg?alt=media&token=8650eec3-a990-4c09-8797-688704b705d5',
            price: 9,
            course: categories[0]._id
        },
        {
            name: 'Delzoun Tide-Me-Overs',
            description: 'Beef, pork, onions, and a smathering of dwarven seasonings are rolled up into delicious little balls and coated in dark dwarven gravy for snacking. Also known as meatballs in the multiverse.',
            image: 'https://firebasestorage.googleapis.com/v0/b/food-baby-682db.appspot.com/o/images%2Ftide-me-overs.jpg?alt=media&token=0a88e742-469a-443d-8ba9-f696457b1089',
            price: 11,
            course: categories[0]._id
        },
        {
            name: 'Lord of the Onion Rings',
            description: 'Lightly battered and seasoned crispy golden onion rings sure to be your new precious! Just make sure Gollum isn\'t around.',
            image: 'https://firebasestorage.googleapis.com/v0/b/food-baby-682db.appspot.com/o/images%2Fonion-rings.jpg?alt=media&token=a093adb3-b2ff-46c5-aefc-2615e111f0df',
            price: 7,
            course: categories[0]._id
        },
        {
            name: 'Barrens Chat',
            description: 'Chuck Norris and Mankrik\'s wife\'s favorite dish.',
            image: 'https://firebasestorage.googleapis.com/v0/b/food-baby-682db.appspot.com/o/images%2Floaded-fries.jpg?alt=media&token=e40ccf7e-860f-4aca-98aa-222e123c654d',
            price: 8,
            course: categories[0]._id
        },
        {
            name: 'Petyr "Little Chicken Finger" Baelish',
            description: 'Crispy, batter-spiced chicken fingers served with a side of dipping sauce. Chaos is a ladder, but chicken fingers are best served on a paltter.',
            image: 'https://firebasestorage.googleapis.com/v0/b/food-baby-682db.appspot.com/o/images%2Fchicken-fingers.jpg?alt=media&token=c208b1d4-598b-40bb-9f4d-3596c1753af9',
            price: 7,
            course: categories[0]._id
        },
        { 
            name: 'The Mimic',
            description: 'While the Mimic remains motionless, it is indistinguishable from an ordinary object. Be careful this veggie burger bites back.',
            image: 'https://firebasestorage.googleapis.com/v0/b/food-baby-682db.appspot.com/o/images%2Fveggie-burger.jpg?alt=media&token=232dffc2-0247-4090-b48e-6f9cb8078848',
            price: 12,
            course: categories[1]._id
        },
        {
            name: 'Better Than Ichiraku Ramen',
            description: 'Believe it!',
            image: 'https://firebasestorage.googleapis.com/v0/b/food-baby-682db.appspot.com/o/images%2Framen.jpg?alt=media&token=7af17f93-f7f1-4b0b-9664-098f9f653d8e',
            price: 13,
            course: categories[1]._id
        },
        {
            name: 'Moonshae Seafood Rice',
            description: 'Recipe derived from the mythical elven isle of Evermeet, this creamy fish rice dish includes shrimps and scallops and refined with the finest seasonings of all the Sword Coast!',
            image: 'https://firebasestorage.googleapis.com/v0/b/food-baby-682db.appspot.com/o/images%2Fseafood-rice.jpg?alt=media&token=aedbcbec-68d3-409f-aaeb-3b19da3575c9',
            price: 14,
            course: categories[1]._id
        },
        {
            name: 'Fire-Spiced Abyssal Chicken Kebabs',
            description: 'Flame-licked skewers dipped in a spicy pepper glaze straight from your tieflings grandma\'s cookbook!',
            image: 'https://firebasestorage.googleapis.com/v0/b/food-baby-682db.appspot.com/o/images%2Fchicken-kebabs.png?alt=media&token=537bef56-0f9e-4709-881b-1a999231fbad',
            price: 9,
            course: categories[1]._id
        },
        {
            name: 'Tavern Steak',
            description: 'Juicy beef patties kneaded with a chock-full of rich seasongings and seared over an open flame. These steaks are fast dinner options for the hurried tavern hopper.',
            image: 'https://firebasestorage.googleapis.com/v0/b/food-baby-682db.appspot.com/o/images%2Ftavern-steak.jpg?alt=media&token=b0e66100-47ef-44cd-bbaa-4cc3fffdaa11',
            price: 12,
            course: categories[1]._id
        },
        {
            name: 'King Robert\'s Boar',
            description: 'Fall off the bone tender smoked ribs seasoned with spices and simmered in a thick barbecue sauce. A favorite of King Robert Baratheon before his.... ironic end, dish considered.',
            image: 'https://firebasestorage.googleapis.com/v0/b/food-baby-682db.appspot.com/o/images%2Fribs.jpg?alt=media&token=4bb705b0-ad91-4974-886c-4ac6ac86e58f',
            price: 13,
            course: categories[1]._id
        },
        { 
            name: 'The Cake Is A Lie',
            description: 'This was a triumph!  I\'m making a note here: huge success.',
            image: 'https://firebasestorage.googleapis.com/v0/b/food-baby-682db.appspot.com/o/images%2Fchocolate-cake.jpg?alt=media&token=3a6cf648-c6a2-4b0d-b7f3-6f8d31c30429',
            price: 6,
            course: categories[2]._id
        },
        {
            name: 'Owlbear Claws',
            description: 'Freshly baked, lighly glazed and almond paste filled puff pastry dessert sure to intice all surrounding owlbears keen smell for miles around! No owlbears where hurt in the making of this dessert. ',
            image: 'https://firebasestorage.googleapis.com/v0/b/food-baby-682db.appspot.com/o/images%2Fowlbear-claws.png?alt=media&token=fb23120c-a6f3-4f70-b795-ae5c75acf2d5',
            price: 7,
            course: categories[2]._id
        },
        {
            name: 'Versicolor Treat',
            description: 'Crunchy and swirled cherry syrup. This sweet meringue is sold by the night elves of Kalimdor making it a much sought-after dessert for visitors of Azeroth. Warning, may be habit forming.',
            image: 'https://firebasestorage.googleapis.com/v0/b/food-baby-682db.appspot.com/o/images%2Fversicolor-treat.jpg?alt=media&token=18964ad7-a673-4a5c-bda8-7acb4c0298a8',
            price: 11,
            course: categories[2]._id
        },
        {
            name: 'Conjured Mana Buns',
            description: 'Conjured by our very live-in wizard and flavored wuth a rich brown sugar glaze and cinnimon sugar filling.',
            image: 'https://firebasestorage.googleapis.com/v0/b/food-baby-682db.appspot.com/o/images%2Fbuns.jpg?alt=media&token=a061c49f-5c7f-49e8-bbb2-80290cc71bd7',
            price: 8,
            course: categories[2]._id
        },
        {
            name: 'Halfling Oatmeal Sweet Nibbles',
            description: 'Dense with oats, chocolate chips, and butterscotch, these diminutive cookies are perfect for halfling hands... and the stomachs of everyone.',
            image: 'https://firebasestorage.googleapis.com/v0/b/food-baby-682db.appspot.com/o/images%2Fsweet-nibbles.jpg?alt=media&token=4289d8ef-5e99-46b4-b250-e8fece603adb',
            price: 5,
            course: categories[2]._id
        },
        {
            name: 'Game of Scones',
            description: 'Sweet and hearty treats, useful for those traversing though Westeros. Betrayal not included.',
            image: 'https://firebasestorage.googleapis.com/v0/b/food-baby-682db.appspot.com/o/images%2Fscones.jpg?alt=media&token=b47c19e6-3d02-40b0-9507-a77fbe941d01',
            price: 4,
            course: categories[2]._id
        },
        {
            name: 'Professor Putricide\'s Slime',
            description: 'Gooooood news everybody! This matcha boba has all the nutrients you\'d ever need, and has bobas!',
            image: 'https://firebasestorage.googleapis.com/v0/b/food-baby-682db.appspot.com/o/images%2Fboba.jpg?alt=media&token=38a009fc-5cff-423a-8ac9-c8228da6b767',
            price: 5,
            course: categories[3]._id
        },
        {
            name: 'Par-Salian\'s Tea',
            description: 'A resorative and potent tea blend of fresh ginger infusion, honey, dried lemon, and mint. Highmage Par-Salian approved.',
            image: 'https://firebasestorage.googleapis.com/v0/b/food-baby-682db.appspot.com/o/images%2Fginger-tea.jpg?alt=media&token=d68ffefd-a2fd-4970-899b-b4c8f6c815a2',
            price: 6,
            course: categories[3]._id
        },
        {
            name: 'Potion of Restoration',
            description: 'The perfect pick me up before any dungeon, this rejuvenatingly fruity and sweet sparkling potion is made with strawberries. Drink enough of these and you will know neither pain nor fear, guaranteed.',
            image: 'https://firebasestorage.googleapis.com/v0/b/food-baby-682db.appspot.com/o/images%2Fpotion.jpg?alt=media&token=90eeeb47-0be7-4d5f-8f4e-298f99dd9c9d',
            price: 4,
            course: categories[3]._id
        },
        {
            name: 'Cactus Apple Surprise',
            description: 'Straight from the Valley of Trials, this refreshing apple treat is a perfect reward after a long day of raiding.',
            image: 'https://firebasestorage.googleapis.com/v0/b/food-baby-682db.appspot.com/o/images%2Fapple.png?alt=media&token=bc38d1f7-e138-40ca-8813-ab98d98b5de9',
            price: 5,
            course: categories[3]._id
        },
        {
            name: 'Mug of Jon Snow',
            description: 'A refreshing and icy milkshake, just like the snow north of the Wall. You\'ll be brought to life with it\'s icy vanilla-cinnamon flavor!',
            image: 'https://firebasestorage.googleapis.com/v0/b/food-baby-682db.appspot.com/o/images%2Fvanilla-milkshake.jpg?alt=media&token=0b46b8de-dd7b-4baa-8731-d290d084eb2f',
            price: 7,
            course: categories[3]._id
        },
        {
            name: 'Moonglow',
            description: 'Celebrate the Lunar festival with fellow druids in Moonglade with this sweet and refreshing lemon sparkling fruit drink.',
            image:'https://firebasestorage.googleapis.com/v0/b/food-baby-682db.appspot.com/o/images%2Fmoonglow.jpg?alt=media&token=fdc8e695-d19a-4bac-b779-cbbcb1b25aac',
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