const functions = require("firebase-functions");

const admin = require('firebase-admin');
admin.initializeApp();

exports.welcomeUser = functions.database.ref('/users/{userId}')
    .onWrite((change, context) => {

        const userId = context.params.userId
        const userData = change.after.val()
        const token = userData.token   
        const payload = {
            notification: {
                title: 'Thanks for signing in!',
                body: `Welcome to food baby, ${userData.firstName}`
            }
        }

        console.log(`${userId} from firebase`);

    return admin.messaging().sendToDevice(token, payload);
});

// exports.orderConfirmation = functions.database.ref('/checkout/{oid}/{uid}')
//     .onCreate((snapshot, context) => {
//         const orderId = context.params.oid
//         const userId = context.params.uid;

//         const token = " user token"

//         const payload = {
//             notification: {
//                 title: 'Order Recieved',
//                 body: `Thank you for your order, ${userId}. ${orderId}`
//             }
//         }

//         return admin.messaging.sendToDevice(token, payload);
//     })

// exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
//     // [END onCreateTrigger]
//       // [START eventAttributes]
//       const email = user.email; // The email of the user.
//       const displayName = user.displayName; // The display name of the user.
//       // [END eventAttributes]
    
//       return sendWelcomeEmail(email, displayName);
// });

// async function sendWelcomeEmail(email, displayName) {
//     const mailOptions = {
//       from: `${APP_NAME} <noreply@firebase.com>`,
//       to: email,
//     };
  
//     // The user subscribed to the newsletter.
//     mailOptions.subject = `Welcome to ${APP_NAME}!`;
//     mailOptions.text = `Hey ${displayName || ''}! Welcome to ${APP_NAME}. I hope you will enjoy our service.`;
//     await mailTransport.sendMail(mailOptions);
//     functions.logger.log('New welcome email sent to:', email);
//     return null;
//   }