import React, { Component } from 'react'
import { Row, Navbar, NavItem } from 'react-materialize'
import { Link } from 'react-router-dom';

export default class AppNavBar extends Component {
  render() {
    return (
      <Row>
        <Navbar brand='thefakepizza' className="orange darken-2" right>
          <NavItem tag={Link} to="/AllOrders">All Orders</NavItem>
          <NavItem tag={Link} to="/Menu">Menu</NavItem>
        </Navbar>
      </Row>
    )
  }
}
