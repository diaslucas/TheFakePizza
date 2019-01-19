import React, { Component } from 'react'
import { Table } from 'react-materialize'

export default class LastOrders extends Component {
  render() {
    return (
      <React.Fragment>
        <h2 className="orange-text text-darken-2">Last Orders</h2>
        <Table centered={true}>
          <thead>
            <tr>
              <th data-field="id">Ordered by</th>
              <th data-field="price">Total</th>
              <th data-field="price">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lucas</td>
              <td>$9</td>
              <td>Pending</td>
            </tr>
            <tr>
              <td>Agatha</td>
              <td>$19</td>
              <td>Deliverd</td>
            </tr>
            <tr>
              <td>Chris</td>
              <td>$10</td>
              <td>Delivered</td>
            </tr>
          </tbody>
        </Table>
      </React.Fragment>
    )
  }
}
