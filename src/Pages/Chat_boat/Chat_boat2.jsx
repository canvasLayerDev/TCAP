import { FaWhatsapp, FaChevronUp, FaChevronRight} from "react-icons/fa";
import "./Chat_boat2.css";

export default function Chat_boat2({ open, setOpen }) {
  return (
    <div className={`wa-chatbox ${open ? "show" : ""}`}>
      {/* Close button inside popup */}
      <div className="wa-logo-section" onClick={() => setOpen(false)}>
          <div className="yellow-circle">
            <FaChevronUp size={22} color="black" />
          </div>

      <h3>Hi there!</h3>
      <h3>How can</h3>
      <h3>I help you?</h3>

      <a
        href="https://wa.me/7588611122"
        target="_blank"
        rel="noreferrer"
        className="wa-btn"
      >
       <FaWhatsapp size={30} /> {/* WhatsApp icon */}
        <p className="boat-text text-light"> Chat with us </p>
      </a>
    
      <div className="wa-powered">⚡ Powered by wati.io</div>

       {/* SHARP POINTY TAIL */}
        <div className="wa-sharp-pointy-tail"></div>
    </div>
    </div>
  );
}
