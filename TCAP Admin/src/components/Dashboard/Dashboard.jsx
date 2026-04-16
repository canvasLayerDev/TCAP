import { useState, useEffect } from "react";
import {
  FaBlog,
  FaEye,
  FaPlus,
  FaNewspaper,
  FaCalendarAlt,
  FaArrowUp,
  FaArrowRight,
  FaChartLine,
  FaClock,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import blogApi from "../../services/blogApi";

function Dashboard() {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    recentBlogs: [],
    loading: true,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await blogApi.getAllBlogs();
      if (response.status === "true") {
        const blogs = response.data || [];
        const sortedBlogs = [...blogs].sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );

        setStats({
          totalBlogs: blogs.length,
          recentBlogs: sortedBlogs.slice(0, 5),
          loading: false,
        });
      }
    } catch (error) {
      setStats((prev) => ({ ...prev, loading: false }));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  return (
    <div className="dashboard-container">
      {/* Page Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">
            Welcome back! Here's what's happening with your blog.
          </p>
        </div>
        <Link to="/blogs/create" className="btn btn-primary btn-lg">
          <FaPlus className="me-2" />
          Create Blog
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">
            <FaNewspaper />
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.totalBlogs}</h3>
            <p className="stat-label">Total Blogs</p>
          </div>
          <div className="stat-trend">
            <FaArrowUp />
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">
            <FaCalendarAlt />
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.recentBlogs.length}</h3>
            <p className="stat-label">Recent Posts</p>
          </div>
          <div className="stat-trend">
            <FaClock />
          </div>
        </div>

        <div className="stat-card info">
          <div className="stat-icon">
            <FaChartLine />
          </div>
          <div className="stat-content">
            <h3 className="stat-number">Active</h3>
            <p className="stat-label">System Status</p>
          </div>
          <div className="stat-indicator"></div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Recent Blogs Section */}
        <div className="dashboard-section">
          <div className="section-header">
            <h5 className="section-title">
              <FaBlog className="me-2" />
              Recent Blogs
            </h5>
            <Link to="/blogs" className="btn btn-outline-primary btn-sm">
              View All
              <FaArrowRight className="ms-1" />
            </Link>
          </div>

          <div className="recent-blogs-list">
            {stats.loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : stats.recentBlogs.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <FaBlog />
                </div>
                <p>No blogs yet</p>
                <Link to="/blogs/create" className="btn btn-primary btn-sm">
                  Create your first blog
                </Link>
              </div>
            ) : (
              stats.recentBlogs.map((blog, index) => (
                <div key={blog.blog_id} className="recent-blog-item">
                  <div className="blog-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="blog-info">
                    <h6 className="blog-title">{blog.name}</h6>
                    <p className="blog-excerpt">
                      {stripHtml(blog.description).substring(0, 80)}...
                    </p>
                  </div>
                  <div className="blog-meta">
                    <span className="blog-date">{formatDate(blog.date)}</span>
                    <Link
                      to={`/blogs/edit/${blog.blog_id}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="dashboard-sidebar">
          <div className="dashboard-section">
            <h5 className="section-title">
              <FaEye className="me-2" />
              Quick Actions
            </h5>
            <div className="quick-actions-list">
              <Link to="/blogs/create" className="quick-action-item primary">
                <div className="quick-action-icon">
                  <FaPlus />
                </div>
                <div className="quick-action-content">
                  <h6>Create New Blog</h6>
                  <p>Write and publish a new article</p>
                </div>
                <FaArrowRight className="quick-action-arrow" />
              </Link>

              <Link to="/blogs" className="quick-action-item">
                <div className="quick-action-icon">
                  <FaEye />
                </div>
                <div className="quick-action-content">
                  <h6>View All Blogs</h6>
                  <p>Manage your published content</p>
                </div>
                <FaArrowRight className="quick-action-arrow" />
              </Link>

              <a
                href="https://tcapitalwealth.com/blog"
                target="_blank"
                rel="noopener noreferrer"
                className="quick-action-item"
              >
                <div className="quick-action-icon">
                  <FaNewspaper />
                </div>
                <div className="quick-action-content">
                  <h6>View Website</h6>
                  <p>See how blogs appear to users</p>
                </div>
                <FaArrowRight className="quick-action-arrow" />
              </a>
            </div>
          </div>

          {/* System Status */}
          <div className="dashboard-section mt-4">
            <h5 className="section-title">
              <FaChartLine className="me-2" />
              System Status
            </h5>
            <div className="system-status">
              <div className="status-item">
                <div className="status-dot online"></div>
                <span>API Server</span>
                <span className="status-text">Online</span>
              </div>
              <div className="status-item">
                <div className="status-dot online"></div>
                <span>Database</span>
                <span className="status-text">Connected</span>
              </div>
              <div className="status-item">
                <div className="status-dot online"></div>
                <span>Image Upload</span>
                <span className="status-text">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
