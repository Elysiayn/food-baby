// const admin = require("firebase-admin")

// admin.initializeApp({ 
//     credential: admin.credential.applicationDefault(),
// });

// let topicName = 'Order Received'

// let message = {
//     notification: {
//         title: 'Cart has been opened',
//         body: 'You opened up the cart. Good job!'
//     },
//     topic: topicName,
// };

// admin.messaging().send(message)
//     .then((response) => {
//         // Response is a message ID string
//         console.log('Successfully sent message', response);
//     })
//     .catch((error) => {
//         console.log('Error sending message', error);
//     });