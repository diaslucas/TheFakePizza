import React, { Component } from 'react'
import { Container, Row, Col, Table, Icon } from 'react-materialize'

export default class Commands extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col m={6} s={12}>
            <h2 className="orange-text text-darken-2">Commands <Icon medium>games</Icon></h2>
            <Table centered={true}>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Commands</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>To see the menu</td>
                  <td>Menu</td>
                </tr>
                <tr>
                  <td>To order pizzas</td>
                  <td>I'll have [1 Pepperoni, 2 Cheese]</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    )
  }
}
