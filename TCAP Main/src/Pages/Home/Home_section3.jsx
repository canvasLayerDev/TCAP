import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import './Home_section3.css'

function Home_section3() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section className="why-choose-section"
    
        style={{
        backgroundImage: 'url("/img/Hero-bg2.svg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "520px",
        display: "flex",
        alignItems: "center",
        padding: "1px 0px",
        color: "#fff",
      }}>
      <div className="container-fluid-why py-5">
        <div className="row align-items-center">

          {/* LEFT CONTENT */}
          <div className="col-12 col-xl-6">
            <h2 className="section-title">WHY T Capital Wealth?</h2>

            <p className="section-subtitle">
              {/* This is the space to introduce the Services section. Briefly describe
              the types of services offered and highlight any special benefits or
              features. */}
              Your TRUST is our priority
            </p>

            <div className="feature-wrapper">
              <div className="feature-card" data-aos="fade-up">
                <h3>
                 A Relentless  <span>Client-First</span> Philosophy
                </h3>
                <p>
                 In a world of automated robo-advisors, we prioritize the human touch by developing goal
                 based plans tailored to your needs, measuring success through your milestones instead of 
                 just market indices.
                </p>
              </div>

              <div
                className="feature-card"
                data-aos="fade-up"
                data-aos-delay="150"
              >
                <h3>
                  Institutional <span>Strength</span> Boutique Care
                </h3>
                <p>
                  Our collaboration with Motilal Oswal Financial Services merges top-tier research and 
                  execution with personalized support from our dedicated team, offering the best of both 
                  worlds.
                </p>
              </div>

              <div
                className="feature-card"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <h3>
                 Integrated <span>Wealth Management</span>
                </h3>
                <p>
                  We see ourselves as stewards of your financial ecosystem, managing everything from direct 
                  equity and AIFs to insurance and bonds. Our goal is to create a cohesive strategy, ensuring all 
                  assets work together to protect and grow your legacy.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-12 col-xl-6">
            <div className="choose-img-wrapper ">
              <img
                src="/img/choose_bg.jpg"
                alt="Why Choose Us"
                className="choose-img " 
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Home_section3;
