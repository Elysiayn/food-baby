importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyAPYUQl3v49glJc2H1WErSHVGgejiqEfxo",
    authDomain: "food-baby-682db.firebaseapp.com",
    projectId: "food-baby-682db",
    storageBucket: "food-baby-682db.appspot.com",
    messagingSenderId: "696002118688",
    appId: "1:696002118688:web:c7b3e92a1806d71bb92845",
    measurementId: "G-L9R64LNE17"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
    const title= 'Hello World';
    const options = {
        body: payload.data.status
    }
    return self.registration.showNotification(title, options);
})