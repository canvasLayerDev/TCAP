import React from 'react'
import { Helmet } from "react-helmet-async"

import Partner_section1 from './Partner_section1'
import Home_section7 from '../Home/Home_section7'
import SEOHelmet from '../../Component/SEOHelmet'

function Partner() {
  return (
    <div>

      {/* <Helmet>
        <title>Partnership | T Capital Wealth</title>

        <meta
          name="description"
          content="Partner with T Capital Wealth to provide financial advisory, investment solutions, and wealth management services."
        />

        <meta
          name="keywords"
          content="T Capital Wealth partnership, financial partnership, investment advisory partnership"
        />

        <link rel="canonical" href="https://tcapitalwealth.com/partner" />
      </Helmet> */}
<SEOHelmet page="partner"/>
      <Partner_section1/>
      <Home_section7/>

    </div>
  )
}

export default Partner