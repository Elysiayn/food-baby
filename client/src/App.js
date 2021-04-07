import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Home from "./pages/Home";
// import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch"; 
<<<<<<< HEAD
// import Login from "./pages/Login"; 
// import Signup from "./pages/Signup"; 
import Nav from "./components/Nav"; 
=======
import Login from "./pages/Login"; 
import Signup from "./pages/Signup"; 
// import Nav from "./components/Nav"; 
>>>>>>> c8f9c6d852468148ee82c11b33d4ac880ccaf69a
import { StoreProvider } from "./utils/GlobalState"; 
// import Success from "./pages/Success"; 
// import OrderHistory from "./pages/OrderHistory"; 
import 'semantic-ui-css/semantic.min.css';

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

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider> 
            <Nav /> 
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              {/* <Route exact path="/signup" component={Signup} /> 
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
