import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import { Helmet } from "react-helmet-async";
import "./Blog_detail.css";

const BASE_URL = import.meta.env.VITE_API_URL || "https://tcapitalwealth.com/tcap";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readProgress, setReadProgress] = useState(0);

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
            image: res.data.image ? `${BASE_URL}/${res.data.image}` : null,
            meta_description: res.data.meta_description || "",
            focus_keyword: res.data.focus_keyword || "",
          });
        }
      })
      .catch(() => console.log("Error fetching blog"))
      .finally(() => setLoading(false));
  }, [id]);

  /* ── Reading Progress Bar ── */
  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH > 0) setReadProgress((window.scrollY / docH) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const formatDate = (d) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
  };

  const estimateReadTime = (text = "") => {
    const words = text.replace(/<[^>]*>/g, "").split(/\s+/).length;
    return Math.ceil(words / 200);
  };

  if (loading) {
    return (
      <div className="bd2-loading">
        <div className="bd2-spinner" />
        <p>Loading article…</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="bd2-loading">
        <p style={{ color: "#94a3b8" }}>Article not found.</p>
        <Link to="/blog" className="bd2-back-btn" style={{ marginTop: "1rem" }}>← Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>{blog.name} | TCapital Wealth</title>
        {blog.meta_description && <meta name="description" content={blog.meta_description} />}
        {blog.focus_keyword && <meta name="keywords" content={blog.focus_keyword} />}
      </Helmet>

      {/* Reading Progress */}
      <div className="bd2-progress-bar" style={{ width: `${readProgress}%` }} />

      <div className="bd2-page">
        {/* Ambient background */}
        <div className="bd2-ambient" aria-hidden="true" />

        <div className="bd2-layout">
          {/* Back Button */}
          <motion.div
            className="bd2-nav-row"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link to="/blog" className="bd2-back-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              All Articles
            </Link>
          </motion.div>

          {/* Hero Section */}
          <motion.header
            className="bd2-hero"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <div className="bd2-hero-meta">
              <span className="bd2-tag">Article</span>
              {blog.focus_keyword && <span className="bd2-kw-tag">{blog.focus_keyword}</span>}
            </div>
            <h1 className="bd2-title">{blog.name}</h1>
            <div className="bd2-by-row">
              <div className="bd2-avatar">TW</div>
              <div className="bd2-author-info">
                <span className="bd2-author-name">TCapital Wealth</span>
                <div className="bd2-author-sub">
                  <time>{formatDate(blog.date)}</time>
                  <span className="bd2-dot">·</span>
                  <span>{estimateReadTime(blog.details + blog.description)} min read</span>
                </div>
              </div>
            </div>
          </motion.header>

          {/* Featured Image */}
          {blog.image && (
            <motion.div
              className="bd2-img-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              <img src={blog.image} alt={blog.name} className="bd2-hero-img" />
            </motion.div>
          )}

          {/* Article Content */}
          <motion.article
            className="bd2-article"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35 }}
          >
            {/* Overview */}
            {blog.description && (
              <div className="bd2-overview">
                <div
                  className="bd2-rich"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.description) }}
                />
              </div>
            )}

            {/* Full Article */}
            {blog.details && (
              <div
                className="bd2-rich bd2-body"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.details) }}
              />
            )}
          </motion.article>

          {/* Bottom CTA / Back */}
          <motion.div
            className="bd2-footer-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bd2-share-label">Share this article</div>
            <div className="bd2-share-btns">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.name)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="bd2-share-btn"
              >
                𝕏 Twitter
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(blog.name)}`}
                target="_blank"
                rel="noreferrer"
                className="bd2-share-btn"
              >
                in LinkedIn
              </a>
            </div>
            <Link to="/blog" className="bd2-back-link">
              ← Back to all articles
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default BlogDetail;