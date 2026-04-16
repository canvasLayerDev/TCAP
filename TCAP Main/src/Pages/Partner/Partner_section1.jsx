import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Partner_section1.css";
import axios from "axios";

const Partner_section1 = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile_no: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    // Initialize AOS for scroll animations
    AOS.init({
      duration: 900,
      offset: 100,
      easing: "ease-out",
      mirror: true,  // Animates elements out when scrolling up
      once: false,   // Animates every time element enters viewport
    });

    // Autofocus only on desktop
    if (window.innerWidth > 768) {
      nameInputRef.current?.focus();
    }

    // Refresh to detect elements
    AOS.refresh();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://tcapitalwealth.com/tcap/index.php/Welcome/partners_mail",
        formData
      );

      if (res.data?.status === "true") {
        alert("✅ Partner request submitted successfully");

        setFormData({
          name: "",
          mobile_no: "",
          city: "",
        });
      } else {
        alert("❌ Failed to submit request");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="ep-partner"
      style={{
        backgroundImage: 'url("/img/Hero-bg2.svg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "520px",
        position: "relative",
      }}
    >
      <div className="container">
        <div className="row align-items-stretch">
          {/* LEFT – EXPERTISE */}
          <div className="col-12 col-md-6 ep-left ep-partner-box" data-aos="fade-right">
            <div className="partner-left">
              <h2 data-aos="fade-up">Expertise That Drives <span> Success</span></h2>

              <p data-aos="fade-up" data-aos-delay="100">
                We measure our success by the success of our clients. With a focus on results and a dedication to quality, our mission is to deliver impactful portfolio growth in a real sense.
              </p>

              <div className="partner-stats">
                <div className="partner-stat" data-aos="fade-up" data-aos-delay="200">
                  <h3>+95%</h3>
                  <p>Satisfied Clients</p>
                </div>
                <div className="ep-stat" data-aos="fade-up" data-aos-delay="300">
                  <h3>+55%</h3>
                  <p className="partner-para">Client Acquisitions</p>
                </div>
              </div>

              <div className="partner-features">
                <div className="partner-feature" data-aos="fade-up" data-aos-delay="400">
                  <span className="material-icons">check_circle</span>
                  <div>
                    <h4 className="partner-txt">200+ <small className="text-light">Active Investors</small></h4>
                    <p className="partner-para">Powering growth for a diverse community of over 200+ active investors.</p>
                  </div>
                </div>

                <div className="partner-feature" data-aos="fade-up" data-aos-delay="500">
                  <span className="material-icons">check_circle</span>
                  <div>
                    <h4 className="partner-txt">15+ <small>HNI’s & UHNI’s Catered</small></h4>
                    <p className="partner-para">Providing bespoke financial strategies for elite high-net-worth individuals.</p>
                  </div>
                </div>

                <div className="partner-feature" data-aos="fade-up" data-aos-delay="600">
                  <span className="material-icons">check_circle</span>
                  <div>
                    <h4 className="partner-txt">500+ <small>Portfolio Analysis Reports</small></h4>
                    <p className="partner-para">Generating data-driven insights for 500+ client portfolios.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT – FORM */}
          <div className="col-12 col-md-6 partner-right" data-aos="fade-left">
            <div className="partner-form-box">
              <h2>Partner With Us</h2>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  ref={nameInputRef}
                />

                <input
                  type="tel"
                  name="mobile_no"
                  placeholder="Enter your mobile"
                  value={formData.mobile_no}
                  onChange={handleChange}
                  required
                />

                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select City</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Pune">Pune</option>
                  <option value="Nagpur">Nagpur</option>
                  <option value="Other">Other</option>
                </select>

                <button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "SUBMIT"}
                </button>
              </form>

              <div className="partner-contact">
                <p>CONTACT US</p>
                <span>📞 +91 7588611122</span>
                <span>✉ tcapital.wealth@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partner_section1;
