// import React from 'react'
// import { Helmet } from "react-helmet-async"

// import About_section1 from './About_section1'
// import Home_section5 from '../Home/Home_section5'
// import Home_section8 from '../Home/Home_Section8'
// import About_section3 from './About_section3'
// // import About_section2 from './About_section2'

// function About() {
//   return (
//     <div>

//       <Helmet>
//         <title>About Us | T Capital Wealth</title>

//         <meta
//           name="description"
//           content="Learn about T Capital Wealth, our mission, expertise in wealth management, portfolio analysis, and investment advisory services."
//         />

//         <meta
//           name="keywords"
//           content="T Capital Wealth, investment advisory, wealth management company, portfolio management services"
//         />

//         <link rel="canonical" href="https://tcapitalwealth.com/about" />
//       </Helmet>

//       <About_section1/>
//       <Home_section5/>
//       {/* <About_section2/> */}
//       <About_section3/>
//       <Home_section8/>

//     </div>
//   )
// }

// export default About


import React from 'react'
import About_section1 from './About_section1'
import Home_section5 from '../Home/Home_section5'
import Home_section8 from '../Home/Home_Section8'
import About_section3 from './About_section3'
import SEOHelmet from '../../Component/SEOHelmet'

function About() {

  return (
    <div>

      {/* Dynamic SEO */}
      <SEOHelmet page="about" />

      <About_section1/>
      <Home_section5/>
      <About_section3/>
      <Home_section8/>

    </div>
  )
}

export default About;