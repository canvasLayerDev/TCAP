import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import './Home_section4.css'
import { useNavigate } from "react-router-dom";

export default function Home_section4() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: false,
      mirror: true,
      offset: 120,
    });

    window.addEventListener("scroll", AOS.refresh);

    return () => {
      window.removeEventListener("scroll", AOS.refresh);
    };
  }, []);


  return (
    <section className="about-agency"
      style={{
        backgroundImage: `url("/img/Hero-bg2.svg")`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        minHeight: "520px",
        position: "relative", // ensure boxes z-index works
        zIndex: 1,
      }}>
      <div className="agency-container">

        {/* LEFT SIDE */}
        <div className="left-content">
          <span className="badge">★ Our Value Chain</span>

          {/* <h1>
           Stay <span>secure & informed</span> with two-factor authentication and instant alerts
          </h1> */}

          <h1>Tailored <span> Financial Architecture</span>  Leveraging Global Insights For Your <span>Personal Goals.</span>
          </h1>

          {/* <div className="cta">
      <button
        className="contact-btn-cu"
        onClick={() => navigate("/contact")}
      >
        Contact Us
      </button>

      <button
        className="arrow-btn-home"
        onClick={() => navigate("/contact")}
      >
        ↗
      </button>
    </div> */}

        </div>

        {/* RIGHT TIMELINE */}
        {/* <div className="right-timeline">

          <div className="timeline-item" data-aos="fade-up" data-aos-delay="0"   data-aos-once="false">
            <div className="icon"><i className="bi bi-shield-check"></i></div>
            <h3>Direct Equity</h3>
            <p>
              Institutional-grade execution and advisory powered by Motilal Oswal research.
            </p>
          </div>

          <div className="timeline-item" data-aos="fade-up" data-aos-delay="200" data-aos-once="false">
            <div className="icon"><i className="bi bi-lock"></i></div>
            <h3>Managed Solutions</h3>
            <p>
             Curated Mutual Funds, Portfolio Management Services (PMS), and Alternative Investment Funds (AIF).
            </p>
          </div>

          <div className="timeline-item" data-aos="fade-up" data-aos-delay="400" data-aos-once="false">
            <div className="icon"><i className="bi bi-chat-dots"></i></div>
            <h3>Fixed Income & Niche</h3>
            <p> Bonds and structured products for capital preservation and sophisticated yield            </p>
          </div>

        </div> */}

        <div className="right-timeline">

          <div className="timeline-item" data-aos="fade-up" data-aos-delay="0">

            <div className="icon-baskt">
              <img src="./img/service1.svg" alt="Direct Equity" className="baset" />
            </div>

            {/* 🔥 YE WRAPPER ADD HUA */}
            <div className="timeline-text">
              <h3>Direct Equity</h3>
              <p>
                Institutional-grade execution and advisory powered by Motilal Oswal research.
              </p>
            </div>

          </div>

          <div className="timeline-item" data-aos="fade-up" data-aos-delay="200">

            <div className="icon-baskt">
              <img src="./img/service2.svg" alt="Managed Solutions" className="baset" />
            </div>

            <div className="timeline-text">
              <h3>Managed Solutions</h3>
              <p>
                Curated Mutual Funds, Portfolio Management Services (PMS), and Alternative Investment Funds (AIF).
              </p>
            </div>

          </div>

          <div className="timeline-item" data-aos="fade-up" data-aos-delay="400">

            <div className="icon-baskt">
              <img src="./img/service3.svg" alt="Fixed Income" className="baset" />
            </div>

            <div className="timeline-text">
              <h3>Fixed Income & Niche</h3>
              <p>
                Bonds and structured products for capital preservation and sophisticated yield
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}