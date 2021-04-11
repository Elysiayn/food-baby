import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

// import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import OrderHistory from './pages/OrderHistory';
import Signup from "./pages/Signup";
import Success from "./pages/Success";
import { StoreProvider } from "./utils/GlobalState";
// import 'semantic-ui-css/semantic.min.css';
import { useDarkMode } from './components/Themes/useDarkMode';
import { lightTheme, darkTheme } from "./components/Themes/Themes";
import { ThemeProvider } from "styled-components";
// import { GlobalStyles } from "./components/Themes/GlobalStyles";
// import Toggle from './components/Themes/Toggler'


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

  return (

    <ApolloProvider client={client}>
      <ThemeProvider>
       
          <Router>
            <div>
               {/* <>
          <GlobalStyles />
          <Toggle theme={theme} toggleTheme={themeToggler} /> */}
              <StoreProvider>
                <Nav />
                <Switch>
                  <Route exact path="/" component={Home} />
                  {/* <Route exact path="/dashboard" component={Dashboard} /> */}
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/orderHistory" component={OrderHistory} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/success" component={Success} />
                  <Route component={NoMatch} />
                </Switch>
              </StoreProvider>
            </div>
          </Router>
        {/* </> */}
      </ThemeProvider>
    </ApolloProvider>

  );
}

export default App;
