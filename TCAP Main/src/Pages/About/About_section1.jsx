import React from 'react'
// import './AboutSection1.css';
// import '/About_home.css';
import './About_section1.css';

export default function About_section1() {
  return (
    <>
    {/* Header Section */}
      <header
        className="baskets-about"
        //    style={{
        //   backgroundImage: 'url("/img/Hero-bg2.svg")',
        //   backgroundSize: "cover",
        //   backgroundRepeat: "no-repeat",
        //   backgroundPosition: "center",
        //   minHeight: "385px",
        //   display: "flex",
        //   alignItems: "center",
        //   color: "#fff",
        // }}

         style={{
        backgroundImage: 'url("/img/Hero-bg2.svg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        // minHeight: "385px",
        position: "relative",
        className: "about-main"
        // marginTop: "-143px"
        // marginBottom : "-141px",
      }}
      >
       
        <div className="header-content position-relative z-3">
          {/* <p className="xyz-1  text-white xyz-2">
            T Capital Wealth <span className="text-primary"></span>
          </p> */}

          <p className="display-4 text-white pdt-contacttyyyy ">
            About <span className="text-primary">us</span>
          </p>
        </div>
      </header>
    </>
  )
}
