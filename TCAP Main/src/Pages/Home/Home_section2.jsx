import React, { useEffect } from "react";
import { FaChartLine, FaLayerGroup, FaBrain, FaCogs } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home_section2.css";

const data = [
  {
    title: "Equity",
    desc: "High-growth investments focused on long-term capital appreciation with strong market potential.",
    icon: <FaChartLine />,
  },
  {
    title: "Mutual Funds",
    desc: "Professionally managed diversified funds offering stability, growth, and lower risk exposure.",
    icon: <FaLayerGroup />,
  },
  {
    title: "Portfolio Management Services",
    desc: "Customized strategies with focused allocation and expert oversight for consistent wealth creation.",
    icon: <FaBrain />,
  },
  {
    title: "Specialised Investment Funds",
    desc: "Advanced, data-driven investment solutions designed for future-ready portfolios.",
    icon: <FaCogs />,
  },
];

export default function Home_section2() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section className="baskets"
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
      <div className="container-fluid-basket">
        <h2 data-aos="fade-up">Investment Baskets</h2>

        <p className="subtitle" data-aos="fade-up" data-aos-delay="120">
          Carefully structured investment solutions aligned with your goals,
          risk appetite, and long-term vision.
        </p>

        <div className="basket-grid">
          {data.map((item, index) => (
            <div
              className="card"
              key={index}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              data-aos-delay={index * 120}
            >
              <div className="icon-home">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
