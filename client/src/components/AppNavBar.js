import React, { Component } from 'react'
import { Row, Col } from 'react-materialize'
import { Link } from 'react-router-dom';

export default class AppNavBar extends Component {
  render() {
    return (
      <nav className="orange darken-2">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo" style={{ marginLeft: 20 }}>thefakepizza</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/AllOrders">All Orders</Link></li>
            <li><Link to="/Menu">Menu</Link></li>
          </ul>
        </div>
      </nav>
    )
  }
}



