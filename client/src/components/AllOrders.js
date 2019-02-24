import React, { Component } from 'react'
import { Container, Row, Col, Table, Icon } from 'react-materialize'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const Orders = () => (
  <Query
    query={gql`
    {
      orders(lastOrders: true) {
        id,
        pizzas {
          flavor,
          price
        },
        customer,
        customerPhotoURL,
        total,
        status
      }
    }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <tr><td>Loading...</td></tr>;
      if (error) return <tr><td>Error :( {error.message}</td></tr>;
      return data.orders.map(({ id, total, customer, customerPhotoURL, status }) => (
        <tr key={id}>
          <td><img alt="Twitter User" src={customerPhotoURL} className="circle responsive-img" /></td>
          <td>{customer}</td>
          <td>${total}</td>
          <td className={(status === 'Pending' ? 'light-blue-text' : 'light-green-text')}
            style={{ fontWeight: 'bold' }}>{status}</td>
        </tr>
      ));
    }}
  </Query>
);


export default class AllOrders extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col m={6} s={12}>
            <h2 className="orange-text text-darken-2">All Orders <Icon medium>shopping_cart</Icon></h2>
            <Table centered={true}>
              <thead>
                <tr>
                  <th></th>
                  <th data-field="customer">Ordered by</th>
                  <th data-field="total">Total</th>
                  <th data-field="status">Status</th>
                </tr>
              </thead>
              <tbody>
                <Orders />
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    )
  }
}
