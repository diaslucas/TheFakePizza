import React, { Component } from 'react'
import { Table } from 'react-materialize'

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
            <tr>
              <td>Pepperoni</td>
              <td>$9</td>
            </tr>
            <tr>
              <td>Cheese</td>
              <td>$9</td>
            </tr>
            <tr>
              <td>Three Meat</td>
              <td>$10</td>
            </tr>
          </tbody>
        </Table>
      </React.Fragment>
    )
  }
}
