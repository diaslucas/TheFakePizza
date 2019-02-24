import React, { Component } from 'react'
import { Container, Table, Row, Col, Icon } from 'react-materialize'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

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
            <h2 className="orange-text text-darken-2">Menu <Icon medium>local_pizza</Icon> </h2>
            <div style={{ maxHeight: "350px", overflow: "auto" }}>
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
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}
