import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

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
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/orderHistory" component={OrderHistory} />
              <Route exact path="/signup" component={Signup} /> 
              <Route exact path="/success" component={Success} />
              <Route component={NoMatch} /> 
            </Switch>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>

  );
}

export default App;
