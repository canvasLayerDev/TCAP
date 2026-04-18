import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import "./Blog.css";

const BASE_URL = import.meta.env.VITE_API_URL || "https://tcapitalwealth.com/tcap";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/index.php/Welcome/list_blog`);
      if (res.data.status === "true") setBlogs(res.data.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (d) => {
    if (!d) return "";
    const date = new Date(d);
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  const stripHtml = (html) => DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });

  /* Split hero (first) + rest */
  const [hero, ...rest] = blogs;

  return (
    <div className="bl-page">
      {/* ── HERO BANNER ── */}
      <section className="bl-banner">
        <div className="bl-banner-inner">
          <motion.span
            className="bl-banner-label"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            TCapital Wealth · Insights
          </motion.span>
          <motion.h1
            className="bl-banner-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            Financial Intelligence.<br />
            <span className="bl-banner-accent">Delivered.</span>
          </motion.h1>
          <motion.p
            className="bl-banner-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.25 }}
          >
            Expert analysis, investment strategies, and wealth-building insights — curated for your financial future.
          </motion.p>
        </div>
        <div className="bl-banner-grid-lines" aria-hidden="true" />
      </section>

      {loading ? (
        <div className="bl-loader-wrap">
          <div className="bl-loader" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="bl-empty">No articles published yet.</div>
      ) : (
        <div className="bl-content">

          {/* ── FEATURED ARTICLE ── */}
          {hero && (
            <motion.div
              className="bl-featured"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Link to={`/blog-detail/${hero.blog_id}`} className="bl-featured-img-link">
                <div className="bl-featured-img-wrap">
                  {hero.image ? (
                    <img src={`${BASE_URL}/${hero.image}`} alt={hero.name} className="bl-featured-img" />
                  ) : (
                    <div className="bl-featured-img-placeholder" />
                  )}
                  <div className="bl-featured-img-overlay" />
                  <span className="bl-tag bl-tag--featured">Featured</span>
                </div>
              </Link>
              <div className="bl-featured-body">
                <div className="bl-featured-meta">
                  <span className="bl-tag bl-tag--article">Article</span>
                  <span className="bl-meta-date">{formatDate(hero.date)}</span>
                </div>
                <Link to={`/blog-detail/${hero.blog_id}`} className="bl-featured-title-link">
                  <h2 className="bl-featured-title">{hero.name}</h2>
                </Link>
                <p className="bl-featured-desc">{stripHtml(hero.description)}</p>
                <Link to={`/blog-detail/${hero.blog_id}`} className="bl-read-btn">
                  Read Article
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </motion.div>
          )}

          {/* ── REST OF ARTICLES GRID ── */}
          {rest.length > 0 && (
            <>
              <div className="bl-section-title-row">
                <h3 className="bl-section-title">More Articles</h3>
                <div className="bl-section-line" />
              </div>
              <motion.div
                className="bl-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
              >
                {rest.map((blog, idx) => (
                  <motion.article
                    key={blog.blog_id}
                    className="bl-card"
                    variants={cardVariants}
                  >
                    <Link to={`/blog-detail/${blog.blog_id}`} className="bl-card-img-link">
                      <div className="bl-card-img-wrap">
                        {blog.image ? (
                          <img src={`${BASE_URL}/${blog.image}`} alt={blog.name} className="bl-card-img" />
                        ) : (
                          <div className="bl-card-img-placeholder">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9l4 4 4-4 6 8"/></svg>
                          </div>
                        )}
                        <span className="bl-card-num">0{idx + 2}</span>
                      </div>
                    </Link>
                    <div className="bl-card-body">
                      <div className="bl-card-meta">
                        <span className="bl-tag bl-tag--article">Article</span>
                        <span className="bl-meta-date">{formatDate(blog.date)}</span>
                      </div>
                      <Link to={`/blog-detail/${blog.blog_id}`} className="bl-card-title-link">
                        <h3 className="bl-card-title">{blog.name}</h3>
                      </Link>
                      <p className="bl-card-desc">{stripHtml(blog.description)}</p>
                      <Link to={`/blog-detail/${blog.blog_id}`} className="bl-card-arrow" aria-label="Read article">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Blog;