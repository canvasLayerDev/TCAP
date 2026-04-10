import React from 'react'
import { Helmet } from "react-helmet-async"
import Contact_section1 from './Conatct_section1'
import SEOHelmet from '../../Component/SEOHelmet'

function Contact() {
  return (
    <div>
<SEOHelmet page="contact"/>
      {/* <Helmet>
        <title>Contact Us | T Capital Wealth</title>

        <meta
          name="description"
          content="Get in touch with T Capital Wealth for portfolio analysis, investment advisory, and wealth management services."
        />

        <meta
          name="keywords"
          content="contact T Capital Wealth, investment advisor contact, wealth management consultation"
        />

        <link rel="canonical" href="https://tcapitalwealth.com/contact" />
      </Helmet> */}

      <Contact_section1/>
      {/* <Chat_main/> */}

    </div>
  )
}

export default Contact