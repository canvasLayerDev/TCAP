

// import React, { useState } from "react";
// import "./Consult_form.css";

// function Consult_form() {

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     city: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//   };

//   return (

//     <form className="consult-form" onSubmit={handleSubmit}>

//       <h3>Book Your Consultation</h3>

      

//       <input
//         type="text"
//         name="name"
//         placeholder="Full Name"
//         value={formData.name}
//         onChange={handleChange}
//       />

//       <input
//         type="text"
//         name="phone"
//         placeholder="Phone Number"
//         value={formData.phone}
//         onChange={handleChange}
//       />

//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//       />

//       <input
//         type="text"
//         name="city"
//         placeholder="City"
//         value={formData.city}
//         onChange={handleChange}
//       />

//       <button type="submit">
//         Book Your Consultation
//       </button>

//     </form>

//   );
// }

// export default Consult_form;




// import React, { useState } from "react";
// import "./Consult_form.css";

// function Consult_form({ onClose }) {

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     city: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//   };

//   return (

//     <form className="consult-form" onSubmit={handleSubmit}>

//       {/* header + cross */}
//       <div className="form-header">

//         {/* <h3>Book Your Consultation</h3> */}

//         <button
//           type="button"
//           className="form-close"
//           onClick={onClose}
//         >
//           ×
//         </button>

//       </div>


//       <input
//         type="text"
//         name="name"
//         placeholder="Full Name"
//         value={formData.name}
//         onChange={handleChange}
//       />

//       <input
//         type="text"
//         name="phone"
//         placeholder="Phone Number"
//         value={formData.phone}
//         onChange={handleChange}
//       />

//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//       />

//       <input
//         type="text"
//         name="city"
//         placeholder="City"
//         value={formData.city}
//         onChange={handleChange}
//       />

//       <button type="submit">
//         Free Consultation
//       </button>

//     </form>

//   );
// }

// export default Consult_form;

import React, { useState } from "react";
import "./Consult_form.css";
import axios from "axios";

function Consult_form({ onClose }) {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔹 handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔸 basic validation
    // if (!/^\d{10}$/.test(formData.phone)) {
    //   alert("❌ Enter valid 10 digit phone number");
    //   return;
    // }

    // setLoading(true);

      // ✅ atleast one required
  if (!formData.phone && !formData.email) {
    alert("❌ Please enter either Phone or Email");
    return;
  }

  // ✅ phone validation (only if entered)
  if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
    alert("❌ Enter valid 10 digit phone number");
    return;
  }

  // ✅ email validation (only if entered)
  if (
    formData.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
  ) {
    alert("❌ Enter valid email address");
    return;
  }

  setLoading(true);

    // 🔹 fullname split
    const nameParts = formData.name.trim().split(" ");
    const first_name = nameParts[0] || "";
    const last_name = nameParts.slice(1).join(" ") || "";

    // 🔹 final payload (API format)
    const payload = {
      first_name,
      last_name,
      email: formData.email,
      mobile_no: Number(formData.phone),
      city: formData.city,
    };

    try {
      const res = await axios.post(
        "https://tcapitalwealth.com/tcap/index.php/Welcome/send",
        payload
      );

      if (res.data.status === "true") {
        alert("✅ Consultation request sent successfully");

        // 🔹 reset form
        setFormData({
          name: "",
          phone: "",
          email: "",
          city: "",
        });

        onClose(); // popup close
      } else {
        alert("❌ Failed to send request");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (

    <form className="consult-form" onSubmit={handleSubmit}>

      {/* header + close button */}
      <div className="form-header">
        <button
          type="button"
          className="form-close"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      {/* inputs */}
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        // required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        // required
      />

      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        // required
      />

      {/* button */}
      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Free Consultation"}
      </button>

    </form>

  );
}

export default Consult_form;