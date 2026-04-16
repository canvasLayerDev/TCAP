import React from 'react'
import { Helmet } from "react-helmet-async"
import './Career.css'
import SEOHelmet from '../../Component/SEOHelmet'

function Career() {
  return (
    <>
    <SEOHelmet page="career"/>
      {/* <Helmet>
        <title>Careers | T Capital Wealth</title>

        <meta
          name="description"
          content="Explore career opportunities at T Capital Wealth. Apply for Finance and Marketing Intern positions and start your career in wealth management."
        />

        <meta
          name="keywords"
          content="T Capital Wealth careers, finance internship, marketing internship, jobs in finance"
        />

        <link rel="canonical" href="https://tcapitalwealth.com/career" />
      </Helmet> */}

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
        <div className="opening-wrapper">

          <h1 className="opening-title">
            Current Openings
          </h1>

          <div className="opening-card">

            <div className="opening-text">
              <p className="role">Finance & Marketing Interns</p>

              <ul className="opening-info">
                <li>
                  <i className="bi bi-clock"></i>
                  Duration: 2–3 Months
                </li>
              </ul>
            </div>

            <a
              href="https://forms.gle/Akbj545ds6YGKt4k8"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="apply-btn">
                Apply now
              </button>
            </a>

          </div>
        </div>
      </section>
    </>
  )
}

export default Career