import React, { Component } from 'react'
import { Container, Row, Col } from 'react-materialize'
import LastOrders from './LastOrders';
import PopularChoices from './PopularChoices';

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col m={6} s={12}>
              <PopularChoices />
            </Col>
            <Col m={6} s={12}>
              <LastOrders />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}
