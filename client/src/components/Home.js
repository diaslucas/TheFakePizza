import React, { Component } from 'react'
import { Row, Col } from 'react-materialize'
import Menu from './Menu';
import LastOrders from './LastOrders';
import Banners from './Banners';

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Banners />
        <Row>
          <Col m={5} s={12}>
            <Menu />
          </Col>
          <Col m={2} s={12}></Col>
          <Col m={5} s={12}>
           <LastOrders />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}