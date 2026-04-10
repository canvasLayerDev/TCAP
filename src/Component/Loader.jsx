import React from 'react'
import './Loader.css'

const Loader = () => {
  return (
    <div className="loader-container"
    style={{
        backgroundImage: `url("/img/Hero-bg2.svg")`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        minHeight: "520px",
        position: "relative", // ensure boxes z-index works
        zIndex: 1,
      }}>
    <h1>It's Time For Modern Wealth Management</h1>
    
  </div>
  )
}

export default Loader
