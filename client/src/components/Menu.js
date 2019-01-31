import React, { Component } from 'react'
import { Container, Table } from 'react-materialize'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Row from 'react-materialize/lib/Row';
import Col from 'react-materialize/lib/Col';

const Pizzas = () => (
  <Query
    query={gql`
    {
      pizzas(orderBy: "flavor_ASC") {
        id
        flavor
        price
      }
    }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <tr><td>Loading...</td></tr>;
      if (error) return <tr><td>Error :(</td></tr>;

      return data.pizzas.map(({ id, flavor, price }) => (
        <tr key={id}>
          <td>{flavor}</td>
          <td>${price}</td>
        </tr>
      ));
    }}
  </Query>
);

export default class Menu extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col m={6} s={12}>
            <h2 className="orange-text text-darken-2">Menu</h2>
            <Table>
              <thead>
                <tr>
                  <th data-field="id">Pizza</th>
                  <th data-field="price">Price</th>
                </tr>
              </thead>
              <tbody>
                <Pizzas />
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    )
  }
}
