import React from 'react'
import Blog_section1 from './Blog_section1'
import Blog from './Blog'
import SEOHelmet from '../../Component/SEOHelmet'

function Blog_main() {
  return (
    <div>
      <SEOHelmet page="blog"/>
        <Blog_section1/>
        <Blog/>
    </div>
  )
}

export default Blog_main