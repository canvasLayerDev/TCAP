import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home_section5.css";

function Home_section5() {
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    AOS.init({
      once: false,
      duration: 900,
      easing: "ease-out-cubic",
    });
    AOS.refresh();
  }, []);

  return (
    <section
      className="about-services"
      style={{
        backgroundImage: `url("/img/Hero-bg2.svg")`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        minHeight: "520px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div className="about-container-fluid">

        {/* ===== HEADER ===== */}
        <div className="about-header">
          <div className="about-heading">
            <span className="about-badge">★ ABOUT US</span>

            <h2 className="about-title">
              With <span>Decades Of Experience</span> Our Team Is Perfectly Positioned
              To Lead With Insight And <span>Confidence</span>.
            </h2>
          </div>

          <div className="about-action">
            <p className="about-description">
             Our team brings together decades of cumulative experience across diverse market cycles, ensuring we lead with perspective rather than reaction
            </p>
          </div>
        </div>

        {/* ===== TEAM SECTION ===== */}
        <div className="about-team">
          <div className="about-team-grid">

            {/* CARD 1 */}
            <div
              className={`about-team-card ${activeCard === 0 ? "active" : ""}`}
              onClick={() => setActiveCard(0)}
            >
              <div className="about-team-img">
                <img src="/img/about4.jpg" alt="Aditi Lanjekar" />
              </div>

              <div className="about-team-info">
                <h4>Aditi Lanjekar (Tadas)</h4>
                <p>Authorised Person - MOFSL</p>
              </div>
            </div>

            {/* CARD 2 */}
            <div
              className={`about-team-card ${activeCard === 1 ? "active" : ""}`}
              onClick={() => setActiveCard(1)}
            >
              <div className="about-team-img">
                <img src="/img/about2.jpg" alt="Aditya Tadas" />
              </div>

              <div className="about-team-info">
                <h4>Aditya Tadas</h4>
                <p>Head - Partnerships & Sales</p>
              </div>
            </div>

            {/* CARD 3 */}
            <div
              className={`about-team-card ${activeCard === 2 ? "active" : ""}`}
              onClick={() => setActiveCard(2)}
            >
              <div className="about-team-img">
                <img src="/img/about3.jpg" alt="Harsh Patle" />
              </div>

              <div className="about-team-info">
                <h4>Harsh Patle</h4>
                <p>Head - Admin & Operation</p>
              </div>
            </div>

            {/* CARD 4 */}
            <div
              className={`about-team-card ${activeCard === 3 ? "active" : ""}`}
              onClick={() => setActiveCard(3)}
            >
              <div className="about-team-img">
                <img src="/img/about1.jpg" alt="Mahesh Bhajankar" />
              </div>

              <div className="about-team-info">
                <h4>Mahesh Bhajankar</h4>
                <p>Sr. Manager - Marketing</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Home_section5;
