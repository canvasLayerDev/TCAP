import React from 'react'
import { Helmet } from "react-helmet-async"

import Product_section1 from './Product_section1'
import Marquee from '../Marquee/Marquee'
import Product_section2 from './Product_section2'
import Home_section7 from '../Home/Home_section7'
import SEOHelmet from '../../Component/SEOHelmet'

function Product() {
  return (
    <div>

    <SEOHelmet page="product"/>
      {/* <Helmet>
        <title>Investment Products | T Capital Wealth</title>

        <meta
          name="description"
          content="Discover investment products and financial solutions offered by T Capital Wealth including portfolio management, mutual funds, and wealth advisory services."
        />

        <meta
          name="keywords"
          content="investment products, wealth management, portfolio management, mutual funds, T Capital Wealth"
        />

        <link rel="canonical" href="https://tcapitalwealth.com/product" />
      </Helmet> */}

      <Product_section1/>
      <Marquee/>
      <Product_section2/>
      <Home_section7/>

    </div>
  )
}

export default Product