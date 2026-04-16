import React from "react";
import { Link } from "react-router-dom";
import './Product_section2.css'


import { FaChartLine, FaLayerGroup, FaBrain, FaCogs,FaCoins, FaShieldAlt } from "react-icons/fa";
// import Homee from "../../Careers/Homee";





function Product_section2() {
  return (
    <>

      {/* Services / Process Section */}
      <section className="py-5"
        style={{
          backgroundImage: 'url("/img/Hero-bg2.svg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "520px",
          alignItems: "center",
          color: "#fff",
        }}>
        <div className="container-fluid-product py-5">
          {/* <div className="col-md-7 col-lg-7 col-sm-7 right-shift-text">
            <p className="process-tag">EXPLORE LUMINU SOLUTIONS</p>
            <p className="process-sub-heading">
              This is the space to introduce the Services section. Briefly describe the types of services offered and highlight any special benefits or features.
            </p>
          </div> */}

          <h2 className="process-heading-product text-center">
            {/* CHOOSE YOUR TRACK */} INVESTMENT SOLUTIONS
          </h2>
          <span className="process-subheading text-center">
            Research-driven investment solutions for consistent, long-term outcomes
          </span>

          <div className="row g-4 mt-4">
            <div className="col-md-4">
              <div className="process-card">
                <h3 className="process-card-title"> Equity</h3>
                <p className="process-card-text">
                  Equity builds long-term wealth by owning strong businesses, riding growth cycles, beating inflation,
                  and letting compounding reward patience, discipline, and informed risk-taking.               </p>
                <div className="process-card-footer">
                  {/* <span className="process-number">01</span> */}
                  {/* <div className="process-icon">
                    <span className="material-icons">widgets</span>
                  </div> */}
                  <div className="process-icon">
                    <FaChartLine color="#4da3ff" size={32} />
                  </div>

                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="process-card">
                <h3 className="process-card-title"> Mutual Funds</h3>
                <p className="process-card-text">
                  Mutual funds simplify investing by pooling money, spreading risk, delivering professional
                  management, steady growth, and disciplined wealth creation for every life goal.</p>
                <div className="process-card-footer">
                  {/* <span className="process-number">02</span> */}
                  {/* <div className="process-icon">
                    <span className="material-icons">layers</span>
                  </div> */}
                  <div className="process-icon">
                    <FaLayerGroup color="#4da3ff" size={32} />
                  </div>

                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="process-card">
                <h3 className="process-card-title"> Portfolio Management Services (PMS)</h3>
                <p className="process-card-text-third">
                  PMS offers personalized portfolios, active strategies, focused stock selection, risk control, and expert
                  decisions designed for high-growth investors seeking differentiated returns.                </p>
                <div className="process-card-footer">
                  {/* <span className="process-number">03</span> */}
                  {/* <div className="process-icon">
                    <span className="material-icons">data_saver_on</span>
                  </div> */}
                  <div className="process-icon">
                    <FaBrain color="#4da3ff" size={32} />
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="row g-4 mt-4">
            <div className="col-md-4">
              <div className="process-card">
                <h3 className="process-card-title">Specialized Investment Funds</h3>
                <p className="process-card-text">
                  Specialized investment funds target unique themes, sectors, or strategies, helping investors capture
                  specific opportunities beyond traditional markets with professional expertise.                </p>
                <div className="process-card-footer">
                  {/* <span className="process-number">04</span> */}
                  {/* <div className="process-icon">
                    <span className="material-icons">widgets</span>
                  </div> */}
                  <div className="process-icon">
                    <FaCogs color="#4da3ff" size={32} />
                  </div>

                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="process-card">
                <h3 className="process-card-title"> Fixed Income / Bonds</h3>
                {/* <p className="process-card-subtitle">Uncovering Insights, Shaping Vision</p> */}
                <p className="process-card-text">
                  Fixed income investments provide stability, predictable returns, capital protection, and steady cash
                  flows, balancing volatility and strengthening overall portfolio resilience.                </p>
                <div className="process-card-footer">
                  {/* <span className="process-number">05</span> */}
                  {/* <div className="process-icon">
                    <span className="material-icons">widgets</span>
                  </div> */}
                  <div className="process-icon">
  <FaCoins size={32} color="#4da3ff" />
</div>


                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="process-card">
                <h3 className="process-card-title">Insurance</h3>
                {/* <p className="process-card-subtitle">Planning and Execution</p> */}
                <p className="process-card-text">
                  Insurance secures your financial future by protecting income, health, assets, and family goals against
                  uncertainty, emergencies, and life’s unexpected risks.
                </p>
                <div className="process-card-footer">
                  {/* <span className="process-number">06</span> */}
                  {/* <div className="process-icon">
                    <span className="material-icons">widgets</span>
                  </div> */}
                 <div className="process-icon">
  <FaShieldAlt size={32} color="#4da3ff" />
</div>

                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Counting/> */}
        {/* <Homee/> */}
      </section>


    </>
  );
}

export default  Product_section2;
