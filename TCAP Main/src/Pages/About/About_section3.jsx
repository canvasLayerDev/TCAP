import React, { useEffect, useState } from "react";
import "./About_section3.css";

const testimonials = [
  {
    text:
      "I started my investment journey with zero clarity.T Capital Wealth helped me understand mutual funds in a simple way and created a portfolio that matches my goals. The guidance is honest, transparent, and educational. I finally feel confident about my financial future.",
    user: "Subodh Rokde",
    role: "Executive Unreal Engine Artist",
    // img1: "/img/subodh.png",
    img1: "/img/subodh-blank.png",
  },
  {
    text:
      "T Capital wealth & their team has a very professional outlook about market, business & finance. They help me in so many ways to arrange all my finance. Thank you for all the guidance from the team.",
    user: "Khushi Chamaria",
    role: "Social media management & coach",
    // img1: "/img/Khushi42.jpg",
    img1: "/img/Khushi-crop-bg.png",
  

  },
  {
    text:
      "As a business owner, I needed structured investment planning. T Capital Wealth helped me manage cash flow, investments, and risk efficiently. Their professional approach and continuous.",
    user: "Shivam Gothe",
    role: "Co-founder of Cleaning Tribe India",
    img1: "/img/Shivam.jpg",
  },
  {
    text:
      "T Capital Wealth focuses on long-term wealth creation, not short-term noise. Their approach is practical, data-driven, and aligned with my life goals. I trust them completely for my family’s financial planning.",
    user: "Kailash Banote",
    role: "Real Estate Consultant",
    img1: "/img/kailash.jpg",
  },
  {
    text:
      "What I like most about T Capital Wealth is their clarity and discipline. No random tips, only structured advice. They regularly review my portfolio and explain everything patiently. It feels more like financial mentorship than just investment service.",
    user: "Pratyush Goel ",
    role: "Director, Mittal Infrastructure Pvt.Ltd.",
    img1: "/img/pratyush-crop.jpg",
  },

  {
    text:
      "I like the disciplined approach of T Capital Wealth. They review my portfolio regularly, explain market situations calmly, and focus on long-term growth. It feels more like having a financial mentor than just an advisor.",
    user: "Dev Jain ",
    company: "Jinvani Media and Entertainment UG, Germany",
    role: "Founder and Managing Director",
    // img1: "/img/devjain.png",
    img1: "/img/devjain-blank.png",
  },

];

function About_section3() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prevTestimonial = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextTestimonial = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section
      className="rt-wrapper py-3"
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
      }}
    >
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col-lg-6 col-md-6">
            <h6 className="badge2">★ TESTIMONIALS</h6>
            <h2 className="testi-text">
              Read what they have to say about{" "}
              <span className="rtt-tag12">working with us</span>
            </h2>
          </div>
          <div className="col-lg-6 col-md-6">
            <p>
              Discover how our clients have achieved success through our
              innovative solutions and dedicated support.
            </p>
          </div>
        </div>

        <div className="row align-items-center">
          {/* LEFT CARD */}
          <div className="col-lg-4">
            <div className="rt-left-card">
              <h1>5</h1>
              <div className="rt-stars">★★★★★</div>
              {/* <p>(40+ Reviews)</p> */}
              <p>
                <a
                  href="https://maps.app.goo.gl/rCGKAVuqYLZz9fqW8"
                  target="_blank"
                  className="review-text review-link"
                >
                  (40+ Reviews)
                </a>
              </p>


              <h5>Customer experiences that speak for themselves</h5>

              <div className="rt-overlap-users">
                <img src="/img/Shivam.jpg" alt="shivam" />
                {/* <img src="/img/Khushi43.jpg" alt="" /> */}
                <img src="/img/Khushi-crop.jpg" alt="khushi" />
                {/* <img src="/img/kailash24.jpg" alt="" /> */}
                 <img src="/img/kailash.jpg" alt="kailash" />
                <img src="/img/subodh-blank.png" alt="subodh" />
                <img src="/img/test_image4.jpg" alt="pratyush" />
                <img src="/img/devjain-blank.png" alt="devjain" />
              </div>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="col-lg-8">
            <div className="rt-right-card">
              {/* ANIMATING CONTENT */}
              <div className="rt-animate-wrapper" key={index}>
                <p className="rt-text">{testimonials[index].text}</p>

                <div className="rt-user">
                  <img
                    src={testimonials[index].img1}
                    alt=""
                    className="rt-user-avatar"
                  />
                  <div className="rt-user-info">
                    <h5>{testimonials[index].user}</h5>
                    <span>{testimonials[index].role}</span>


                    {testimonials[index].company && (
                      <p className="rt-company">
                        {testimonials[index].company}
                      </p>
                    )}


                  </div>
                </div>
              </div>

              {/* CONSTANT ARROWS */}
              <div className="rt-arrow-container">
                <div className="rt-left-arrow" onClick={prevTestimonial}>
                  <i className="bi bi-arrow-left-short"></i>
                </div>
                <div className="rt-right-arrow" onClick={nextTestimonial}>
                  <i className="bi bi-arrow-right-short"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About_section3;
