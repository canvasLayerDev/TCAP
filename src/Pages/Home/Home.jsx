import React from 'react'
import { Helmet } from "react-helmet-async"
import Home_section1 from './Home_section1';
import Home_section2 from './Home_section2';
import Home_section3 from './Home_section3';
import Home_section4 from './Home_section4';
import Home_section5 from './Home_section5';
import Home_section6 from './Home_Section6';
import Home_section7 from './Home_section7';
import Home_section8 from './Home_Section8';
import About_section3 from '../About/About_section3';
import SEOHelmet from '../../Component/SEOHelmet';


// import Home_section5 from '../Home/Home_section5'
// import Home_section8 from '../Home/Home_Section8'
// import About_section3 from '../About/About_section3'
// import About_section1 from '../About/About_section1'
// import About_section2 from './About_section2'

function Home() {
  return (
    <div>

      {/* <Helmet>
        <title>Home | T Capital Wealth</title>

        <meta
          name="description"
          content="Learn about T Capital Wealth, our mission, expertise in wealth management, portfolio analysis, and investment advisory services."
        />

        <meta
          name="keywords"
          content="T Capital Wealth, investment advisory, wealth management company, portfolio management services"
        />

        <link rel="canonical" href="https://tcapitalwealth.com/" />
      </Helmet> */}
      <SEOHelmet page="home"/>

      {/* <About_section1/> */}
      {/* <Home_section5/> */}
      {/* <About_section2/> */}
      {/* <About_section3/> */}
      {/* <Home_section8/> */}

      <Home_section1/>
      <Home_section2/>
      <Home_section3/>
      <Home_section4/>
      <Home_section5/>
      <Home_section6/>
      <Home_section7/>
      <Home_section8/>
      <About_section3/>

    </div>
  )
}

export default Home;