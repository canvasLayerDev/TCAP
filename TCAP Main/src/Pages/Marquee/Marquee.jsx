
import React from "react";
import './Marquee.css'

function Marquee() {
  return (
    <div className="marquee-section-product">
      <div className="marquee-track">

        <div className="marquee">
          <span className="dot">•</span><span>Mutual Funds</span>
          <span className="dot">•</span><span>Stocks</span>
          <span className="dot">•</span><span>Bonds</span>
          <span className="dot">•</span><span>SIF</span>
          <span className="dot">•</span><span>AIF</span>
          <span className="dot">•</span><span>Insurance</span>
          <span className="dot">•</span><span>Portfolio Management Services</span>
          <span className="dot">•</span><span>Quant Based Strategies</span>
          <span className="dot">•</span><span>Investor Awareness Programmes</span>
        </div>

        {/* perfect clone */}
        <div className="marquee">
          <span className="dot">•</span><span>Mutual Funds</span>
          <span className="dot">•</span><span>Stocks</span>
          <span className="dot">•</span><span>Bonds</span>
          <span className="dot">•</span><span>SIF</span>
          <span className="dot">•</span><span>AIF</span>
          <span className="dot">•</span><span>Insurance</span>
          <span className="dot">•</span><span>Portfolio Management Services</span>
          <span className="dot">•</span><span>Quant Based Strategies</span>
          <span className="dot">•</span><span>Investor Awareness Programmes</span>
        </div>

      </div>
    </div>
  );
}

export default Marquee;
