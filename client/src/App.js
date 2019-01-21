import React, { Component } from 'react'
import { Row, Navbar, NavItem } from 'react-materialize'
import './App.css'
import Home from './components/Home'
import ApolloClient from "apollo-boost"
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <Row>
            <Navbar brand='thefakepizza' className="orange darken-2" right>
              <NavItem onClick={() => console.log('test click')}>All Orders</NavItem>
              <NavItem href='components.html'>Hours</NavItem>
            </Navbar>
          </Row>
          <Home />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
