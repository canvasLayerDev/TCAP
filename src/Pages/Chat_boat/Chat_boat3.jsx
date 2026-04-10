import React, { useState } from "react";
import "./Chat_boat3.css";
import { FaWhatsapp } from "react-icons/fa";

const Chat_boat = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  const togglePopup = () => {
    setPopupOpen(!popupOpen);
  };

  return (
    <div className="chat-container">
      
      {/* WhatsApp Button */}
      <button className="whatsapp-btn" onClick={togglePopup}>
        <FaWhatsapp className="whatsapp-icon" />
      </button>

      {/* Popup */}
      {popupOpen && (
        <div className="chat-popup">
          <div className="popup-header">
            <button
              className="popup-close"
              onClick={togglePopup}
            >
              ×
            </button>
          </div>

          <div className="popup-body">
            <h3>Hi there!</h3>
            <p>How can I help you?</p>

            <div className="chat-pill-wrapper-popup">
              <div className="chat-pill-popup">
                <FaWhatsapp className="whatsapp-icon-popup" />
                Chat with us
              </div>
            </div>
          </div>

          <div className="popup-footer-arrow"></div>
        </div>
      )}
    </div>
  );
};

export default Chat_boat;
