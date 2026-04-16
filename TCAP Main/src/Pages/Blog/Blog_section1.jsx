import React from 'react';
import './Blog_section1.css';

export default function Blog_section1() {
  return (
    <>
      {/* Header Section */}
      <header
        className="blog-about"
        style={{
          backgroundImage: 'url("/img/Hero-bg2.svg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div className="header-content position-relative z-3">
          <p className="display-4 text-white blog-contact-title">
            Blog <span className="text-primary"></span>
          </p>
        </div>
      </header>
    </>
  );
}