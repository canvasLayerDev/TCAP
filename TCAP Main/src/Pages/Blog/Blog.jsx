// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Link } from "react-router-dom";
// // import { motion } from "framer-motion";
// // import styles from "./Blog.module.css";


// // const BASE_URL = "https://tcapitalwealth.com/tcap";

// // const containerVariants = {
// //   hidden: {},
// //   show: {
// //     transition: { staggerChildren: 0.1 },
// //   },
// // };

// // const cardVariants = {
// //   hidden: { opacity: 0, y: 40 },
// //   show: {
// //     opacity: 1,
// //     y: 0,
// //     transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
// //   },
// // };

// // const headingVariants = {
// //   hidden: { opacity: 0, y: -20 },
// //   show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
// // };

// // function Blog() {
// //   const [blogs, setBlogs] = useState([]);

// //   useEffect(() => {
// //     fetchBlogs();
// //   }, []);

// //   /* ================= FETCH BLOG ================= */
// //   const fetchBlogs = async () => {
// //     try {
// //       const res = await axios.post(
// //         `${BASE_URL}/index.php/Welcome/list_blog`
// //       );

// //       if (res.data.status === "true") {
// //         setBlogs(res.data.data);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   /* ================= DATE FORMAT ================= */
// //   const formatDate = (dateString) => {
// //     const date = new Date(dateString);

// //     const day = date.getDate();
// //     const month = date.toLocaleString("default", { month: "short" });
// //     const year = date.getFullYear();

// //     return `${day} ${month} ${year}`;
// //   };

// //   return (
// //     <div className={styles.wrapper}>

// //       {/* HEADER */}
// //       <motion.div
// //         className={styles.header}
// //         variants={headingVariants}
// //         initial="hidden"
// //         animate="show"
// //       >
// //         <div className={styles.eyebrow}>Editorial</div>
// //         <h2 className={styles.heading}>Blogs</h2>
// //       </motion.div>

// //       {/* GRID */}
// //       <motion.div
// //         className={styles.grid}
// //         variants={containerVariants}
// //         initial="hidden"
// //         animate="show"
// //       >
// //         {blogs.map((blog, index) => (
// //           <motion.div
// //             key={blog.blog_id}
// //             className={styles.card}
// //             variants={cardVariants}
// //           >
// //             {/* IMAGE */}
// //             <div className={styles.imgWrapper}>
// //               <img
// //                 src={`${BASE_URL}/${blog.image}`}
// //                 alt={blog.name}
// //                 className={styles.cardImg}
// //               />
// //               <div className={styles.imgTag}>Article</div>
// //             </div>

// //             {/* BODY */}
// //             <div className={styles.cardBody}>
// //               <span className={styles.cardIndex}>
// //                 {String(index + 1).padStart(2, "0")}
// //               </span>

// //               <h5 className={styles.cardTitle}>
// //                 {blog.name}
// //               </h5>

// //               <p className={styles.cardDesc}>
// //                 {blog.description}
// //               </p>

// //               <div className={styles.cardFooter}>
// //                 <span className={styles.cardDate}>
// //                   {formatDate(blog.date)}
// //                 </span>

// //                 <Link
// //                   to={`/blog`}
// //                   className={styles.cardBtn}
// //                 >
// //                   <svg viewBox="0 0 24 24">
// //                     <line x1="5" y1="12" x2="19" y2="12" />
// //                     <polyline points="12 5 19 12 12 19" />
// //                   </svg>
// //                 </Link>
// //               </div>
// //             </div>
// //           </motion.div>
// //         ))}
// //       </motion.div>

      
// //     </div>
// //   );
// // }

// // export default Blog;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import "./Blog.css";

// const BASE_URL = "https://tcapitalwealth.com/tcap";

// const containerVariants = {
//   hidden: {},
//   show: {
//     transition: { staggerChildren: 0.1 },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 40 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.55 },
//   },
// };

// const headingVariants = {
//   hidden: { opacity: 0, y: -20 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
// };

// function Blog() {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const fetchBlogs = async () => {
//     try {
//       const res = await axios.post(
//         `${BASE_URL}/index.php/Welcome/list_blog`
//       );

//       if (res.data.status === "true") {
//         setBlogs(res.data.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);

//     const day = date.getDate();
//     const month = date.toLocaleString("default", { month: "short" });
//     const year = date.getFullYear();

//     return `${day} ${month} ${year}`;
//   };

//   return (
//     <div className="blog-wrapper"
//      style={{
//           backgroundImage: 'url("/img/Hero-bg2.svg")',
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//           backgroundPosition: "center",
//           minHeight: "520px",
//           alignItems: "center",
//           color: "#fff",
//         }}>

//       {/* HEADER */}
//       <motion.div
//         className="blog-header"
//         variants={headingVariants}
//         initial="hidden"
//         animate="show"
//       >
//       </motion.div>

//       {/* GRID */}
//       <motion.div
//         className="container-fluid-blog  blog-grid"
//         variants={containerVariants}
//         initial="hidden"
//         animate="show"
//       >
//         {blogs.map((blog, index) => (
//           <motion.div
//             key={blog.blog_id}
//             className="blog-card"
//             variants={cardVariants}
//           >

//             {/* IMAGE */}
//             <div className="blog-img-wrapper">
//               <img
//                 src={`${BASE_URL}/${blog.image}`}
//                 alt={blog.name}
//                 className="blog-img"
//               />
//               <div className="blog-img-tag">Article</div>
//             </div>

//             {/* BODY */}
//             <div className="blog-body">

//               <span className="blog-index">
//                 {String(index + 1).padStart(2, "0")}
//               </span>

//               <h5 className="blog-title">
//                 {blog.name}
//               </h5>

//               <p className="blog-desc">
//                 {blog.description}
//               </p>

//               <div className="blog-footer">

//                 <span className="blog-date">
//                   {formatDate(blog.date)}
//                 </span>

//                 <Link
//                   to="/blog"
//                   className="blog-btn"
//                 >
//                   →
//                 </Link>

//               </div>

//             </div>

//           </motion.div>
//         ))}
//       </motion.div>

//     </div>
//   );
// }

// export default Blog;










// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import "./Blog.css";

// const BASE_URL = "https://tcapitalwealth.com/tcap";

// const containerVariants = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.1 } },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 40 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
// };

// const headingVariants = {
//   hidden: { opacity: 0, y: -20 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
// };

// /* ✅ Custom Scrollbar Component */
// function ScrollableDesc({ text }) {
//   const descRef = useRef(null);
//   const thumbRef = useRef(null);

//   useEffect(() => {
//     const desc = descRef.current;
//     const thumb = thumbRef.current;
//     if (!desc || !thumb) return;

//     function updateThumb() {
//       const scrollHeight = desc.scrollHeight;
//       const clientHeight = desc.clientHeight;

//       if (scrollHeight <= clientHeight) {
//         thumb.style.display = "none";
//         return;
//       }

//       thumb.style.display = "block";

//       const thumbHeight = Math.max(
//         (clientHeight / scrollHeight) * clientHeight,
//         16
//       );
//       const maxScrollTop = scrollHeight - clientHeight;
//       const maxThumbTop = clientHeight - thumbHeight;
//       const thumbTop = (desc.scrollTop / maxScrollTop) * maxThumbTop;

//       thumb.style.height = thumbHeight + "px";
//       thumb.style.top = thumbTop + "px";
//     }

//     updateThumb();
//     desc.addEventListener("scroll", updateThumb);
//     window.addEventListener("resize", updateThumb);

//     return () => {
//       desc.removeEventListener("scroll", updateThumb);
//       window.removeEventListener("resize", updateThumb);
//     };
//   }, []);

//   return (
//     <div className="blog-desc-wrapper">
//       <p className="blog-desc" ref={descRef}>
//         {text}
//       </p>
//       <div className="blog-scrollbar">
//         <div className="blog-scrollbar-thumb" ref={thumbRef}></div>
//       </div>
//     </div>
//   );
// }

// function Blog() {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const fetchBlogs = async () => {
//     try {
//       const res = await axios.post(
//         `${BASE_URL}/index.php/Welcome/list_blog`
//       );
//       if (res.data.status === "true") {
//         setBlogs(res.data.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = date.getDate();
//     const month = date.toLocaleString("default", { month: "short" });
//     const year = date.getFullYear();
//     return `${day} ${month} ${year}`;
//   };

//   return (
//     <div
//       className="blog-wrapper"
//       style={{
//         backgroundImage: 'url("/img/Hero-bg2.svg")',
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         backgroundPosition: "center",
//         minHeight: "520px",
//         alignItems: "center",
//         color: "#fff",
//       }}
//     >
//       {/* HEADER */}
//       <motion.div
//         className="blog-header"
//         variants={headingVariants}
//         initial="hidden"
//         animate="show"
//       />

//       {/* GRID */}
//       <motion.div
//         className="container-fluid-blog blog-grid"
//         variants={containerVariants}
//         initial="hidden"
//         animate="show"
//       >
//         {blogs.map((blog, index) => (
//           <motion.div
//             key={blog.blog_id}
//             className="blog-card"
//             variants={cardVariants}
//           >
//             {/* IMAGE */}
//             <div className="blog-img-wrapper">
//               <img
//                 src={`${BASE_URL}/${blog.image}`}
//                 alt={blog.name}
//                 className="blog-img"
//               />
//               <div className="blog-img-tag">Article</div>
//             </div>

//             {/* BODY */}
//             <div className="blog-body">
//               <span className="blog-index">
//                 {String(index + 1).padStart(2, "0")}
//               </span>

//               <h5 className="blog-title">{blog.name}</h5>

//               {/* ✅ Custom scrollbar wala component */}
//               <ScrollableDesc text={blog.description} />

//               <div className="blog-footer">
//                 <span className="blog-date">{formatDate(blog.date)}</span>
//                 <Link to="/blog" className="blog-btn">→</Link>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>
//     </div>
//   );
// }

// export default Blog;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Blog.css";

const BASE_URL = "https://tcapitalwealth.com/tcap";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/index.php/Welcome/list_blog`);
      if (res.data.status === "true") {
        setBlogs(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  /* Strip HTML tags from CKEditor content */
  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  return (
    <div
      className="blog-wrapper"
      style={{
        backgroundImage: 'url("/img/Hero-bg2.svg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "520px",
        alignItems: "center",
        color: "#fff",
      }}
    >
      {/* HEADER */}
      <motion.div
        className="blog-header"
        variants={headingVariants}
        initial="hidden"
        animate="show"
      />

      {/* GRID */}
      <motion.div
        className="container-fluid-blog blog-grid"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.blog_id}
            className="blog-card"
            variants={cardVariants}
          >
            {/* IMAGE — clickable */}
            <Link to={`/blog-detail/${blog.blog_id}`} className="blog-img-link">
              <div className="blog-img-wrapper">
                <img
                  src={`${BASE_URL}/${blog.image}`}
                  alt={blog.name}
                  className="blog-img"
                />
                <div className="blog-img-tag">Article</div>
              </div>
            </Link>

            {/* BODY */}
            <div className="blog-body">
              <span className="blog-index">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* TITLE — clickable, max 2 lines */}
              <Link to={`/blog-detail/${blog.blog_id}`} className="blog-title-link">
                <h5 className="blog-title">{blog.name}</h5>
              </Link>

              {/* DESCRIPTION — plain text, max 3 lines, no scroll */}
              <p className="blog-desc">
                {stripHtml(blog.description)}
              </p>

              <div className="blog-footer">
                <span className="blog-date">{formatDate(blog.date)}</span>

                {/* ARROW BUTTON — clickable */}
                <Link to={`/blog-detail/${blog.blog_id}`} className="blog-btn">
                  →
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Blog;