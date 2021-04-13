import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
const firebase = require('firebase');

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import OrderHistory from './pages/OrderHistory';
import Signup from "./pages/Signup";
import Success from "./pages/Success";
import { StoreProvider } from "./utils/GlobalState";
import 'semantic-ui-css/semantic.min.css';
import { useDarkMode } from './components/Themes/useDarkMode';
import { lightTheme, darkTheme } from "./components/Themes/Themes";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/Themes/GlobalStyles";
import Toggle from './components/Themes/Toggler'
import { Message } from "semantic-ui-react";


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

const App = () => {


  const [theme, themeToggler] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  
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

  const onMessageListener = () => 
    new Promise((resolve) => {
      messaging.onMessage((payload) => {
        resolve(payload)
      })
    })


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

    const messaging= firebase.messaging();
      // messaging.requestPermission()
      // .then(function() {
      //   console.log('Have permission');
      //   return messaging.getToken(); 
      // })
      // .then( function (token) {
      
      //   console.log(token);
      // })
      // .catch(function(err) {
      //   console.log(err);
      // })
      messaging.onMessage(payload => {
        console.log('onMessage:', payload)
      });

  function App() {

    const [show, setShow ] = useState(false)
    const [notification, setNotification] = useState({title: '', body: ''});

    onMessageListener().then(payload => {
      setShow(true);
      setNotification({title: payload.notification.title, body: payload.notification.body})
      console.log(payload);
    }).catch(err => console.log('failed: ', err));

    const handleDismiss = () => {
      setShow(false)

    }

    return (

      <ApolloProvider client={client}>
            
        <Router>
          <ThemeProvider theme={themeMode}>
        <>
            <GlobalStyles />
          <div>
            <Toggle theme={theme} toggleTheme={themeToggler} />
            <StoreProvider>
              <Nav />
              { (show) && <Message 
                onDismiss={() => handleDismiss()}
                show={show}
                delay={100}
                header={notification.title}
                content={notification.body}
              />}
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/orderHistory" component={OrderHistory} />
                <Route exact path="/signup" component={Signup} /> 
                <Route exact path="/success" component={Success} />
                <Route component={NoMatch} /> 
              </Switch>
            </StoreProvider>
          </div>
          </>
        </ThemeProvider>
        </Router> 
        <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-database.js"></script>  
      </ApolloProvider>
  
    );
  }
}

export default App;
