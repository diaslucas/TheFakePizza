import React, { Component } from 'react'
import { Carousel } from 'react-materialize'

export default class Banners extends Component {
  render() {
    return (
      <React.Fragment>
        <Carousel options={{ fullWidth: true, indicators: true }} images={[
          'https://www.horizonbradco.com/wp-content/uploads/2018/05/pizza.jpg',
          'https://www.ilromanos.com/image/130115991.jpg',
          'http://nicospizzami.com/wordpress/wp-content/uploads/2017/02/deluxe-banner.jpg',
          'https://www.pizzazoneonline.com/uploads/images/slideshow/1528464417pizza3203417_960_720.png'
        ]} />
      </React.Fragment>
    )
  }
}
