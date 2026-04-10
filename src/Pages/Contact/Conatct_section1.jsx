
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Contact_section1.css";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import axios from "axios";


export default function Contact_section1() {

  const firstNameRef = useRef(null);
  const location = useLocation();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_no: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔹 Focus logic
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("focus") === "firstname") {
      firstNameRef.current?.focus();
      firstNameRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [location]);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://tcapitalwealth.com/tcap/index.php/Welcome/send",
        formData
      );

      if (res.data.status === "true") {
        alert("✅ Message sent successfully");

        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          mobile_no: "",
          message: "",
        });
      } else {
        alert("❌ Failed to send message");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section
        className="contact-section"
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
        <div className="container-fluid-contact   contact-main">

          {/* Heading */}
          <div className="contact-heading">
            <h2>
              Get in <span>touch</span> with us
            </h2>
            <p className="contact-heading">Your wealth journey starts with a conversation.</p>
            <p className="con-text-2">
              Reach out to discuss how our disciplined approach to wealth management helps preserve, grow, and accumulate wealth with clarity and care.
            </p>
          </div>

          <div className="contact-grid">

            {/* LEFT SIDE */}
            <div className="contact-info">
              <div className="row">
                <div className="info-card">
                  <div className="info-item col-md-6">
                    <FaPhoneAlt className="fs-1" />
                    <h4>Phone</h4>
                    <p className="text-contact">+91 75886 11122</p> 
                    <p >+91 70666 66292</p>
                  </div>

                  <div className="info-item col-md-6">
                    <FaEnvelope className="fs-1" />
                    <h4>Email</h4>
                    <p>tcapital.wealth@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="info-card1 address-card">
                <FaMapMarkerAlt className="fs-1" />
                <div>
                  <h4>Address</h4>
                  <p> C/O. Motilal Oswal Financial Services, <br />
                Plot No.8, Kamgar Nagar,<br />
                Nagpur(East) - 440024</p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE FORM */}
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  ref={firstNameRef}
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="mobile_no"
                  placeholder="Phone"
                  value={formData.mobile_no}
                  onChange={handleChange}
                  required
                />
              </div>

              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Request Callback"}
              </button>
            </form>

          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </>
  );
}
