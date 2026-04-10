import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home_Section6.css";

function Home_section6() {
  useEffect(() => {
    AOS.init({
      once: false,
      duration: 900,
      offset: 100,
      easing: "ease-out",
    });
  }, []);

  return (
    <section className="hs-expertise-bg">
      <div className="hs-expertise-box">

        {/* LEFT SIDE */}
        <div className="hs-expertise-left" data-aos="fade-right">
          <h2>
            Expertise That Drives <span>Success</span>
          </h2>

          <p className="hs-expertise-para">
            We measure our success by the success of our clients. With a focus on results and a dedication to quality, our mission is to deliver impactful portfolio growth in a real sense
          </p>

          <div className="hs-stats">
            <div className="hs-stat" data-aos="fade-up" data-aos-delay="100">
              <h3>+95%</h3>
              <p>Satisfied Clients</p>
            </div>

            <div className="hs-stat" data-aos="fade-up" data-aos-delay="200">
              <h3>+55%</h3>
              <p>Client Acquisitions</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hs-expertise-right" data-aos="fade-left">
          <div className="hs-feature" data-aos="fade-up" data-aos-delay="300">
            <span className="material-icons">check_circle</span>
            <div className="hs-feature-text hs-feature-inline">
              <h4>200+
                <span className="exp-text">Active Investors
                </span>
              </h4>
              <p className="exp-subtext">
               Powering growth for a diverse community of over 200+ active investors.
              </p>
            </div>
          </div>


          <div className="hs-feature" data-aos="fade-up" data-aos-delay="500">
            <span className="material-icons">check_circle</span>
            <div className="hs-feature-text hs-feature-inline">
              <h4>500+ <span className="exp-text-two">Portfolio Analysis Reports</span></h4>
              <p className="exp-subtext-two">
                Generating data-driven insights for 500+ client portfolios.    </p>
            </div>
          </div>

          <div className="hs-feature" data-aos="fade-up" data-aos-delay="400">
            <span className="material-icons">check_circle</span>
            <div className="hs-feature-text hs-feature-inline">
              <h4>15+ <span className="exp-text-one"> HNI’s & UHNI’s Catered </span></h4>
              {/* New paragraph below the span */}
              <p className="exp-subtext-one">
                Providing bespoke financial strategies for elite high-net-worth individuals.   </p>
            </div>
          </div>


        </div>

      </div>
    </section>
  );
}

export default Home_section6;
