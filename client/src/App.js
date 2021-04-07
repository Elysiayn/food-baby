import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import firebase from 'firebase';

import Home from "./pages/Home";
// import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch"; 
// import Login from "./pages/Login"; 
// import Signup from "./pages/Signup"; 
// import Nav from "./components/Nav"; 
import { StoreProvider } from "./utils/GlobalState"; 
// import Success from "./pages/Success"; 
// import OrderHistory from "./pages/OrderHistory"; 

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
})


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



const messaging= firebase.messaging();
messaging.requestPermission()
.then(function() {
  console.log('Have permission');
  return messaging.getToken(); 
})
.then( function (token) {
  // firebase.database().ref('users/' + this.currentUid + '/notificationTokens/' + token).set(true)
  console.log(token);
})
.catch(function(err) {
  console.log(err);
})
messaging.onMessage(function(payload) {
  console.log('onMessage: ', payload);
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider> 
            {/* <Nav />  */}
            <Switch>
              <Route exact path="/" component={Home} />
              {/* <Route exact path="/login" component={Login} />  */}
              {/* <Route exact path="/signup" component={Signup} />  */}
              {/* <Route exact path="/success" component={Success} />  */}
              {/* <Route exact path="/orderHistory" component={OrderHistory} />  */}
              {/* <Route exact path="/products/:id" component={Detail} />  */}
              <Route component={NoMatch} /> 
            </Switch>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>

  );
}


export default App;
