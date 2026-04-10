import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Disclosure page pe footer hide
  if (location.pathname === "/disclosure") return null;

  return (
    <>
      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <hr className="mt-5" />

        <div className="footer-container">
          {/* COLUMN 1 */}
          <div className="footer-col">
            {/* <h2 className="logo">
              <img src="/img/logo.jpg" className="footer-logo" alt="footer-logo" />
              <span><h5 className="text-start treeu">T Capital Wealth</h5>
                <h6 className="ityy ">No Risk No Story</h6></span>
            </h2> */}

            <div className="footer-brand">
          <img src="/img/tacp_footer-1.png" className="footer-logo" alt="T Capital Wealth" />

          {/* <div className="brand-text">
            <h5 className="brand-name">T Capital Wealth</h5>
            <p className="brand-tagline">No Risk No Story</p>
          </div> */}
        </div>
         
            {/* <p>📞 7588611122</p> */}
            <p className="d-flex ">
              <i className="bi bi-telephone-fill"></i>
              <span>+91 75886 11122 </span>
            </p>

                   <p className="d-flex mt-0">
              <i className="bi bi-telephone-fill"></i>
              <span>+91 70666 66292 </span>
            </p>

            {/* <p>✉️ tcapital.wealth@gmail.com</p> */}
            <p className="d-flex gap-2">
              <i className="bi bi-envelope-fill"></i>
              <span>tcapital.wealth@gmail.com</span>
            </p>
            <p className="footer-add">
              <i className="bi bi-geo-alt "></i>
              <span> C/O. Motilal Oswal Financial Services, <br />
                Plot No.8, Kamgar Nagar,<br />
                Nagpur (East) - 440024</span>
            </p>
          </div>

          {/* COLUMN 2 */}
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link
                  to="/"
                  className="footer-link"
                  onClick={(e) => {
                    e.preventDefault(); // route reload rokta hai
                    window.scrollTo({
                      top: 0,    // top of the page
                      behavior: "smooth", // smooth scroll
                    });
                  }}
                >
                  Home
                </Link>
              </li>
              <li><Link to="/about" className="footer-link">About</Link></li>
              <li><Link to="/product" className="footer-link">Product</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
              <li><Link to="/career" className="footer-link">Careers</Link></li>
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div className="footer-col">
            <h3>Social</h3>
            <ul>
              <li><a href="https://www.facebook.com/share/1PuXBT3FAd/" target="_blank" rel="noreferrer" className="footer-link">Facebook</a></li>
              <li><a href="https://www.instagram.com/adityatalks.finance?igsh=MW9sY3V1ZHd2MDVucA==" target="_blank" rel="noreferrer" className="footer-link">Instagram</a></li>
              <li><a href="https://youtube.com/@thewealthshow.podcast?si=S5d5WSyneLx-sZ2Q" target="_blank" rel="noreferrer" className="footer-link">Youtube</a></li>
              <li><a href="https://whatsapp.com/channel/0029VbBxcJkFi8xTfjCUfc0L" target="_blank" rel="noreferrer" className="footer-link">Whatsapp</a></li>
            </ul>
          </div>

          {/* COLUMN 4 */}
          <div className="footer-col">
            <h3>Policy</h3>
            <ul>
              <li>Privacy Policy</li>
              {/* <li>Terms & Conditions</li> */}
              <li>
                <Link to="/disclosure" className="footer-link">Disclosure</Link>
              </li>
              <li>
                <Link to="/disclaimer" className="footer-link">Disclaimer</Link>
              </li>
              

            </ul>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="footer-bottom">
          © 2026 by Cyberathon Technologies
        </div>
      </footer>
    </>
  );
};

export default Footer;
