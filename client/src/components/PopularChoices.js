import React, { Component } from 'react'
import { Table } from 'react-materialize'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const CommonPizzas = () => (
  <Query
    query={gql`
    {
      popularChoices {
        _id
        count
      }
    }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <tr><td>Loading...</td></tr>;
      if (error) return <tr><td>Error :(</td></tr>;

      return data.popularChoices.map(({ _id, count }) => (
        <tr key={_id}>
          <td>{_id}</td>
          <td>{count}</td>
        </tr>
      ));
    }}
  </Query>
);

export default class PopularChoices extends Component {
  render() {
    return (
      <React.Fragment>
        <h2 className="orange-text text-darken-2">Popular Choices</h2>
        <Table centered={true}>
          <thead>
            <tr>
              <th data-field="id">Pizza</th>
              <th data-field="price">Total Orders</th>
            </tr>
          </thead>
          <tbody>
            <CommonPizzas />
          </tbody>
        </Table>
      </React.Fragment>
    )
  }
}
