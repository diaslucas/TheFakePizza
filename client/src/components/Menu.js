import React, { Component } from 'react'
import { Table } from 'react-materialize'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const Pizzas = () => (
  <Query
    query={gql`
    {
      pizzas {
        id
        flavor
        price
      }
    }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

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
      <React.Fragment>
        <h2 className="orange-text text-darken-2">Menu</h2>
        <Table centered={true}>
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
      </React.Fragment>
    )
  }
}
