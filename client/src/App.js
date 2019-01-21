import React, { Component } from 'react';
import { Row, Navbar, NavItem } from 'react-materialize'
import './App.css';
import Home from './components/Home';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

client
  .query({
    query: gql`
      {
        pizzas {
          flavor
          price
        }
      }
    `
  })
  .then(result => console.log(result));

class App extends Component {
  render() {
    return (
      <div>
        <Row>
          <Navbar brand='thefakepizza' className="orange darken-2" right>
            <NavItem onClick={() => console.log('test click')}>All Orders</NavItem>
            <NavItem href='components.html'>Hours</NavItem>
          </Navbar>
        </Row>
        <Home />
      </div>
    );
  }
}

export default App;
