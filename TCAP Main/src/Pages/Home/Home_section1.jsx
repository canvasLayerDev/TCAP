import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { Link, useLocation } from 'react-router-dom';
import './Home_section1.css'
import Marquee from '../Marquee/Marquee';


function Home_section1() {
  const typedElement = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: [
        "Wealth Management",
        "Quant Investment",
        "Algo Trading",
        "Portfolio Analysis Report",
        "Mutual Fund Portfolios",
      ],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div>
      <section className="hero-section text-center position-relative" style={{ width: '100%' }}>

        <video autoPlay muted loop playsInline
          className="position-absolute top-0 start-0 bg-video"
          style={{ objectFit: 'cover', zIndex: 1 }}
        >
          <source src="/video/bg_video.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" style={{ zIndex: 2 }}></div>
        <div className="container position-relative hero-content" style={{ width: '100%', maxWidth: '100%', margin: '0 auto', padding: '0 0.75rem', zIndex: 3 }}>
          <h1 className="hero-title">
            Future Ready<br />
            <span className="typing" ref={typedElement}></span>
          </h1>
          {/* <h1  style={{ fontSize: "25px", textAlign:"left", paddingLeft:"73px"}}>
            No Risk No Story<br />
          </h1> */}

          <div className="mt-5">
            <div className="container">
              <div className="row align-items-center">

                {/* LEFT SIDE */}
                <div className="col-md-6">
                  <div className="left-action-wrap">

                    {/* <Link to='https://forms.gle/ARgwDE637MDVXjP97' className='text-decoration-none'>
                    <button className="btn-get-in-touch rounded-pill fw-semibold  ">
                      Get Portfolio Analysis
                    </button>
                     </Link>
                    <Link to='https://forms.gle/ARgwDE637MDVXjP97 ' className='text-decoration-none'>
                    <div className="arrow-button">
                      <span className="material-icons arrow_home">arrow_forward</span>
                    </div>
                    </Link> */}
                    <a
                      href="https://forms.gle/ARgwDE637MDVXjP97"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                    >
                      <button className="btn-get-in-touch rounded-pill fw-semibold">
                        Get Portfolio Analysis
                      </button>
                    </a>

                    <a
                      href="https://forms.gle/ARgwDE637MDVXjP97"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                    >
                      <div className="arrow-button">
                        <span className="material-icons arrow_home">arrow_forward</span>
                      </div>
                    </a>


                  </div>
                </div>


                {/* RIGHT SIDE */}
                <div className="col-md-6 d-flex justify-content-between ">
                  <div className="play-text-wrap1 d-flex justify-content-center align-item-center  ">
                    {/* <div>
                      <button className="play-button rounded-circle d-flex align-items-center justify-content-center border-0">
                      <button className='play-button rounded-circle'>
                        <span className="material-icons text-dark play">
                          play_arrow
                        </span>
                      </button>
                    </div> */}
                    {/* <div className='text-justify d-flex justify-content-end sizee'>
                      Trusted management and transparent stock broking delivering disciplined strategies and personalised guidance to grow your wealth.

                    </div> */}
                  </div>
                </div>

              </div>
            </div>
          </div>


        </div>
      </section>
      <Marquee />
    </div>
  );
}

export default Home_section1;