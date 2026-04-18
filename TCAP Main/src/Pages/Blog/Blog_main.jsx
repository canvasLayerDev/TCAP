import React from 'react'
import Blog from './Blog'
import SEOHelmet from '../../Component/SEOHelmet'

function Blog_main() {
  return (
    <div>
      <SEOHelmet page="blog"/>
      <Blog/>
    </div>
  )
}

export default Blog_main