// import React, { useState } from "react";
// import Consult_button from "./Consult_button";
// import Consult_form from "./Consult_form";

// function Consult_main() {

//   const [popupOpen, setPopupOpen] = useState(false);

//   const openForm = () => {
//     console.log("clicked");
//     setPopupOpen(true);
//   };

//   const closeForm = () => {
//     setPopupOpen(false);
//   };

//   return (
//     <div>

//       <Consult_button onOpen={openForm} popupOpen={popupOpen} />

//       {popupOpen && (
//         <div className="popup-overlay">

//           <div className="popup-box">

//             <button onClick={closeForm}>X</button>

//             <Consult_form />

//           </div>

//         </div>
//       )}

//     </div>
//   );
// }

// export default Consult_main;







import React, { useState } from "react";
import Consult_button from "./Consult_button";
import Consult_form from "./Consult_form";
import "./Consult_main.css"; // Sab styling isi me rakh sakte hain

const MainConsult = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form kholne ke liye
  const handleOpen = () => setIsFormOpen(true);
  
  // Form band karne ke liye
  const handleClose = () => setIsFormOpen(false);

  return (
    <div className="consult-main-wrapper">
      {/* Agar form khula hai toh button chhupa do, nahi toh dikhao */}
      {!isFormOpen && (
        <Consult_button onOpen={handleOpen} />
      )}

      {/* Popup Overlay: Sirf tab dikhega jab isFormOpen true hoga */}
      {isFormOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* <button className="close-btn" onClick={handleClose}>×</button> */}
            <Consult_form onClose={handleClose} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainConsult;