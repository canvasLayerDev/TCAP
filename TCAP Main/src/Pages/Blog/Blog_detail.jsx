import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "./Blog_detail.css";

const BASE_URL = "https://tcapitalwealth.com/tcap";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    axios
      .post(`${BASE_URL}/index.php/Welcome/get_by_id_blog`, { blog_id: id })
      .then((res) => {
        if (res.data.status === "true") {
          setBlog({
            name: res.data.name,
            description: res.data.description,
            date: res.data.date,
            details: res.data.details,
            image: `${BASE_URL}/${res.data.image}`,
          });
        }
      })
      .catch(() => console.log("Error fetching blog"))
      .finally(() => setLoading(false));
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="bd-loading-screen">
        <div className="bd-loader" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="bd-loading-screen">
        <p style={{ color: "#fff" }}>Blog not found.</p>
      </div>
    );
  }

  return (
    <div className="bd-page">
      {/* ── BACKGROUND BLOBS ── */}
      <div className="bd-blob bd-blob-1" />
      <div className="bd-blob bd-blob-2" />

      {/* ── BACK BUTTON ── */}
      <motion.div
        className="bd-back-wrap"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/blog" className="bd-back-btn">
          ← Back to Blogs
        </Link>
      </motion.div>

      {/* ── HERO SECTION: NAME + META ── */}
      <motion.div
        className="bd-hero"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
      >
        {/* <span className="bd-tag">Article</span> */}
        <h1 className="bd-title">{blog.name}</h1>
        <div className="bd-meta">
          <span className="bd-date">{formatDate(blog.date)}</span>
        </div>
      </motion.div>

      {/* ── FEATURED IMAGE ── */}
      <motion.div
        className="bd-img-wrap"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        <img src={blog.image} alt={blog.name} className="bd-featured-img" />
        <div className="bd-img-overlay" />
      </motion.div>

      {/* ── CONTENT BODY ── */}
      <motion.div
        className="bd-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        {/* DESCRIPTION */}
        {blog.description && (
          <div className="bd-section">
            <div className="bd-section-label">
              <span className="bd-dot" />
              Overview
            </div>
            <div
              className="bd-rich-text bd-description"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
          </div>
        )}

        {/* DIVIDER */}
        <div className="bd-divider" />

        {/* DETAILS */}
        {blog.details && (
          <div className="bd-section">
            <div className="bd-section-label">
              <span className="bd-dot" />
              Details
            </div>
            <div
              className="bd-rich-text bd-details"
              dangerouslySetInnerHTML={{ __html: blog.details }}
            />
          </div>
        )}
      </motion.div>

      {/* ── BOTTOM BACK LINK ── */}
      <motion.div
        className="bd-bottom-nav"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link to="/blog" className="bd-back-btn bd-back-btn--outline">
          ← All Articles
        </Link>
      </motion.div>
    </div>
  );
}

export default BlogDetail;