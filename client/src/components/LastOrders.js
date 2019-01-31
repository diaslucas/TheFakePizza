import React, { Component } from 'react'
import { Table } from 'react-materialize'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const Orders = () => (
  <Query
    query={gql`
    {
      orders {
        id,
        pizzas {
          flavor,
          price
        },
        total,
        customer,
        status
      }
    }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <tr><td>Loading...</td></tr>;
      if (error) return <tr><td>Error :(</td></tr>;
      var statusClass = '';

      return data.orders.map(({ id, total, customer, status  }) => (
        <tr key={id}>
          <td>{customer}</td>
          <td>${total}</td>
          <td className={(status === 'Pending' ? 'light-blue-text' : 'light-green-text')} 
          style={{fontWeight: 'bold'}}>{status}</td>
        </tr>
      ));
    }}
  </Query>
);


export default class LastOrders extends Component {
  render() {
    return (
      <React.Fragment>
        <h2 className="orange-text text-darken-2">Last Orders</h2>
        <Table centered={true}>
          <thead>
            <tr>
              <th data-field="customer">Ordered by</th>
              <th data-field="total">Total</th>
              <th data-field="status">Status</th>
            </tr>
          </thead>
          <tbody>
           <Orders />
          </tbody>
        </Table>
      </React.Fragment>
    )
  }
}
