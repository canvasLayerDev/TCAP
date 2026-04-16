import React, { useState } from "react";
import "./Consult.css";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const Consult_button = ({ onOpen, popupOpen }) => {
  const [show, setShow] = useState(true);

  return (
    <div className="consult-container">

      {/* Free Consultation pill */}
      {show && !popupOpen && (
        <div className="consult-pill-wrapper" onClick={onOpen}>
          
          <div className="consult-pill">
            Free Consultation
          </div>


        </div>
      )}



    </div>
  );
};

export default Consult_button;