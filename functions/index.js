const functions = require("firebase-functions");
const firebase = require('firebase');

const admin = require('firebase-admin');
admin.initializeApp();

const firebaseConfig = {
    apiKey: "AIzaSyAPYUQl3v49glJc2H1WErSHVGgejiqEfxo",
    authDomain: "food-baby-682db.firebaseapp.com",
    databaseURL: "https://food-baby-682db-default-rtdb.firebaseio.com",
    projectId: "food-baby-682db",
    storageBucket: "food-baby-682db.appspot.com",
    messagingSenderId: "696002118688",
    appId: "1:696002118688:web:c7b3e92a1806d71bb92845",
    measurementId: "G-L9R64LNE17"
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

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

exports.orderConfirmation = functions.database.ref('/orders/{oid}')
    .onCreate((snapshot, context) => {
        const orderId = context.params.oid
        const userData = snapshot.val()
        const userId = userData.firebaseId;

        const dbRef = firebase.database().ref();
            dbRef.child("users").child(userId).get().then((snap) => {
                 const tokenData = snap.val()

                const token = tokenData.token;

                const payload = {
                    notification: {
                        title: 'Order Recieved',
                        body: `Thank you for your order# ${orderId}, ${token.firstName}. It will be ready in 30 minutes.`
                    }
        
                         
                }
                
                admin.messaging.sendToDevice(token, payload);
            })
                        
        return ;
        
    });

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