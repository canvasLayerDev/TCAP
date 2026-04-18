import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa'
import blogApi from '../../services/blogApi'

function BlogList() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const BASE_URL = import.meta.env.VITE_API_URL || 'https://tcapitalwealth.com/tcap'

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await blogApi.getAllBlogs()
      if (response && String(response.status).toLowerCase() === 'true') {
        setBlogs(response.data || [])
      } else {
        toast.error(response.message || 'Failed to fetch blogs')
      }
    } catch (error) {
      toast.error('Error fetching blogs: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (blogId) => {
    try {
      const response = await blogApi.deleteBlog(blogId)
      if (response.status === 'true') {
        toast.success('Blog deleted successfully')
        setBlogs(blogs.filter(blog => blog.blog_id !== blogId))
        setDeleteConfirm(null)
      } else {
        toast.error(response.message || 'Failed to delete blog')
      }
    } catch (error) {
      toast.error('Error deleting blog: ' + error.message)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const stripHtml = (html) => {
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
  }

  if (loading) {
    return (
      <div className="blog-list-container">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading blogs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="blog-list-container">
      <div className="page-header">
        <h2 className="page-title">Blog Management</h2>
        <Link to="/blogs/create" className="btn btn-primary">
          <FaPlus className="me-2" />
          Create New Blog
        </Link>
      </div>

      <div className="blog-table-wrapper">
        <table className="table table-hover blog-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  <p className="mb-0">No blogs found</p>
                  <Link to="/blogs/create" className="btn btn-sm btn-outline-primary mt-2">
                    Create your first blog
                  </Link>
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog.blog_id}>
                  <td className="blog-image-cell">
                    {blog.image ? (
                      <img
                        src={`${BASE_URL}/${blog.image}`}
                        alt={blog.name}
                        className="blog-thumbnail"
                      />
                    ) : (
                      <div className="blog-thumbnail-placeholder">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="blog-title-cell">
                    <h6 className="blog-title">{blog.name}</h6>
                  </td>
                  <td className="blog-desc-cell">
                    <p className="blog-description">
                      {stripHtml(blog.description).substring(0, 100)}...
                    </p>
                  </td>
                  <td className="blog-date-cell">
                    {formatDate(blog.date)}
                  </td>
                  <td className="blog-status-cell">
                    {blog.blog_status === 'published' ? (
                      <span className="badge bg-success" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Live</span>
                    ) : (
                      <span className="badge bg-secondary" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Draft</span>
                    )}
                  </td>
                  <td className="blog-actions-cell">
                    <div className="action-buttons">
                      <a
                        href={`https://tcapitalwealth.com/blog-detail/${blog.blog_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-info"
                        title="View on website"
                      >
                        <FaEye />
                      </a>
                      <Link
                        to={`/blogs/edit/${blog.blog_id}`}
                        className="btn btn-sm btn-outline-primary"
                        title="Edit blog"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => setDeleteConfirm(blog)}
                        title="Delete blog"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">Confirm Delete</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setDeleteConfirm(null)}
              ></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete the blog:</p>
              <p className="fw-bold text-danger">"{deleteConfirm.name}"</p>
              <p className="text-muted small">This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(deleteConfirm.blog_id)}
              >
                Delete Blog
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogList
