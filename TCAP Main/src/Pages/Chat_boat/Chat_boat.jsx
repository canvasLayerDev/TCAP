import React, { useState } from "react";
import "./Chat_boat.css";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const Chat_boat = ({ onOpen, popupOpen }) => {
  const [show, setShow] = useState(true);

  return (
    <div className="chat-container">

      {/* Chat with us pill – show only if popup NOT open */}
      {show && !popupOpen && (
        <div className="chat-pill-wrapper" onClick={onOpen}>
          <div className="chat-pill">Chat with us</div>

          <button
            className="chat-close"
            onClick={(e) => {
              e.stopPropagation();
              setShow(false); // pill close
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* WhatsApp button – ALWAYS visible */}
      {/* <button className="whatsapp-btn" onClick={onOpen}>
        <FaWhatsapp className="whatsapp-icon" />
      </button> */}

      <button className="whatsapp-btn" onClick={onOpen}>
  {popupOpen ? (
    <IoIosArrowDown className="whatsapp-icon" />
  ) : (
    <FaWhatsapp className="whatsapp-icon" />
  )}
</button>

    </div>
  );
};

export default Chat_boat;
