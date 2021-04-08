const functions = require("firebase-functions");

const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.addMessage = functions.https.onRequest(async( req, res) => {
    const original = req.query.text;
    const writeResult = await admin.firestore().collection('messages').add({ original: original });

    res.json({ result: `Message with ID: ${writeResult.id} added.`});
});

exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
    .onCreate((snap, context) => {
        const original = snap.data().original;

        functions.logger.log('Uppercasing', context.params.documentId, original);

        const uppercase = original.toUpperCase();

        return snap.ref.set({uppercase}, {merge:true});
});

exports.welcomeUser = functions.database.ref('/users/{uid}')
    .onCreate((snapshot, context) => {
        
        const userId = context.params.uid;
        console.log(`testing ${userId}`)
        const token = 'cxI26L__jA7scTWwuCgJuF:APA91bGsJejZfWcibwtZS9vtKyglxb7NGXzB_NuO3avVwTez-naNbUEEP08vRUUwr57PwN31i76RHhJ2HUjYov1e-cXTssDmfecar1xbWesyqCB8UehH7H8JxqWICqFDwtw_3LLCaecT'

        const userData = snapshot.val()

        const payload = {
            notification: {
                title: 'Thanks for clicking the cart',
                body: `Welcome to food baby, ${userData.firstName}`
            }
        }
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