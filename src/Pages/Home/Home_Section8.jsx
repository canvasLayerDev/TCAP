// import React from 'react';
// import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
// import './Home_section8.css';

// function Home_section8() {
//   return (
//     <section
//       className="social-section baskets"
//       style={{
//         backgroundImage: 'url("/img/Hero-bg2.svg")',
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         backgroundPosition: "center",
//         minHeight: "520px",
//         position: "relative",
//       }}
//     >
//       <p className="join-subtitle badge">★ STAY CONNECTED</p>
//       <h2 className="join-title">
//         Join Our Community of <span>Managing Wealth</span>
//       </h2>

//       <div className="social-container">
//         <a
//           href="https://www.facebook.com/share/1PuXBT3FAd/"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="social-card"
//         >
//           <FaFacebookF className="icon" />
//           <span className='join-text'>Facebook</span>
//           <span className="arrow">→</span>
//         </a>

//         <a
//           href="https://www.instagram.com/adityatalks.finance?igsh=MW9sY3V1ZHd2MDVucA=="
//           target="_blank"
//           rel="noopener noreferrer"
//           className="social-card"
//         >
//           <FaInstagram className="icon" />
//           <span className='join-text'>Instagram</span>
//           <span className="arrow">→</span>
//         </a>

//         <a
//           href="https://youtube.com/@thewealthshow.podcast?si=S5d5WSyneLx-sZ2Q"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="social-card"
//         >
//           <FaYoutube className="icon" />
//           <span className='join-text'>YouTube</span>
//           <span className="arrow">→</span>
//         </a>

//         <a
//           href="https://whatsapp.com/channel/0029VbBxcJkFi8xTfjCUfc0L"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="social-card"
//         >
//           <FaWhatsapp className="icon" />
//           <span className='join-text'>Whatsapp Community</span>
//           <span className="arrow">→</span>
//         </a>
//       </div>
//     </section>
//   );
// }

// export default Home_section8;




import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaLinkedinIn, FaTelegramPlane, FaGoogle } from "react-icons/fa";
import './Home_section8.css';

function Home_section8() {
  const socialLinks = [
    // { icon: <FaFacebookF />, url: "https://www.facebook.com/share/1PuXBT3FAd/" },
    // { icon: <FaInstagram />, url: "https://www.instagram.com/adityatalks.finance?igsh=MW9sY3V1ZHd2MDVucA==" },
     { icon: <FaWhatsapp />, url: "https://whatsapp.com/channel/0029VbBxcJkFi8xTfjCUfc0L" },
      { icon: <FaGoogle />, url: "https://maps.app.goo.gl/DrbCxUQGZCs15mfR6?g_st=aw" }, 
       { icon: <FaLinkedinIn />, url: "https://www.linkedin.com/in/adityatadas1122" }, 
    { icon: <FaYoutube />, url: "https://youtube.com/@thewealthshow.podcast?si=S5d5WSyneLx-sZ2Q" },
    { icon: <FaTelegramPlane />, url: "https://t.me/thewealthshow" }, 
    
  ];

  return (
    <section
      className="social-section"
      style={{
        backgroundImage: 'url("/img/Hero-bg2.svg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <p className="join-subtitle badge">★ STAY CONNECTED</p>
      <h2 className="join-title">
        Join Our Community of <span>Managing Wealth</span>
      </h2>

      <div className="social-container">
        {socialLinks.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-card"
          >
            <span className="icon">{item.icon}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Home_section8;