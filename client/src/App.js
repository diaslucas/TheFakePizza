import React, { Component } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import ApolloClient from "apollo-boost"
import { ApolloProvider } from 'react-apollo'
import AppNavBar from './components/AppNavBar';
import AllOrders from './components/AllOrders';

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <Router>
        <React.Fragment>
          <AppNavBar />
          <Route exact path="/" component={Home} />
          <Route path="/AllOrders" component={AllOrders} />
          <Route path="/Menu" component={Home} />
        </React.Fragment>
      </Router>
      </ApolloProvider>
    );
  }
}

export default App;
