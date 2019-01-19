import React, { Component } from 'react'
import { Carousel, Row, Col, Table } from 'react-materialize'

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Carousel options={{ fullWidth: true, indicators: true }} images={[
          'https://www.horizonbradco.com/wp-content/uploads/2018/05/pizza.jpg',
          'https://www.ilromanos.com/image/130115991.jpg',
          'http://nicospizzami.com/wordpress/wp-content/uploads/2017/02/deluxe-banner.jpg',
          'https://www.pizzazoneonline.com/uploads/images/slideshow/1528464417pizza3203417_960_720.png'
        ]} />
        <Row>
          <Col s={5}>
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
          </Col>
          <Col s={2}></Col>
          <Col s={5}>
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
          </Col>
        </Row>

      </React.Fragment>
    )
  }
}
