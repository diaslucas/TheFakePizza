import React, { Component } from 'react'
import { Navbar } from 'react-materialize';
import { Link } from 'react-router-dom';

export default class AppNavBar extends Component {
  render() {
    return (
      <Navbar brand='thefakepizza' className="orange darken-2" right>
        <li><Link to="/AllOrders">All Orders</Link></li>
        <li><Link to="/Menu">Menu</Link></li>
        <li><Link to="/Commands">Commands</Link></li>
      </Navbar>
    )
  }
}



