import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { FaArrowLeft, FaSave, FaImage } from 'react-icons/fa'
import blogApi from '../../services/blogApi'

function BlogForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const isEditMode = Boolean(id)

  const BASE_URL = 'https://tcapitalwealth.com/tcap'

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    details: '',
    date: new Date().toISOString().split('T')[0],
    image: null,
  })

  const [existingImage, setExistingImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(isEditMode)

  useEffect(() => {
    if (isEditMode) {
      fetchBlogData()
    }
  }, [id])

  const fetchBlogData = async () => {
    try {
      setFetchLoading(true)
      const response = await blogApi.getBlogById(id)
      if (response.status === 'true') {
        setFormData({
          name: response.name || '',
          description: response.description || '',
          details: response.details || '',
          date: response.date || new Date().toISOString().split('T')[0],
          image: null,
        })
        if (response.image) {
          setExistingImage(response.image)
        }
      } else {
        toast.error(response.message || 'Failed to fetch blog')
        navigate('/blogs')
      }
    } catch (error) {
      toast.error('Error fetching blog: ' + error.message)
      navigate('/blogs')
    } finally {
      setFetchLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDescriptionChange = (event, editor) => {
    const data = editor.getData()
    setFormData(prev => ({ ...prev, description: data }))
  }

  const handleDetailsChange = (event, editor) => {
    const data = editor.getData()
    setFormData(prev => ({ ...prev, details: data }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast.error('Blog title is required')
      return
    }
    if (!formData.description.trim()) {
      toast.error('Description is required')
      return
    }
    if (!formData.details.trim()) {
      toast.error('Blog content is required')
      return
    }
    if (!formData.date) {
      toast.error('Date is required')
      return
    }

    try {
      setLoading(true)

      const submitFormData = new FormData()
      submitFormData.append('name', formData.name)
      submitFormData.append('description', formData.description)
      submitFormData.append('details', formData.details)
      submitFormData.append('date', formData.date)

      if (formData.image) {
        submitFormData.append('image', formData.image)
      }

      let response
      if (isEditMode) {
        submitFormData.append('blog_id', id)
        response = await blogApi.updateBlog(submitFormData)
      } else {
        response = await blogApi.createBlog(submitFormData)
      }

      if (response.status === 'true') {
        toast.success(isEditMode ? 'Blog updated successfully' : 'Blog created successfully')
        navigate('/blogs')
      } else {
        toast.error(response.message || 'Operation failed')
      }
    } catch (error) {
      toast.error('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const editorConfig = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'blockQuote',
      'insertTable',
      'undo',
      'redo'
    ],
  }

  if (fetchLoading) {
    return (
      <div className="blog-form-container">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading blog data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="blog-form-container">
      <div className="page-header">
        <Link to="/blogs" className="btn btn-outline-secondary btn-sm">
          <FaArrowLeft className="me-1" />
          Back to Blogs
        </Link>
        <h2 className="page-title mb-0">
          {isEditMode ? 'Edit Blog' : 'Create New Blog'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="blog-form">
        <div className="row">
          {/* Left Column */}
          <div className="col-lg-8">
            <div className="form-card">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Blog Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter blog title"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Publication Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Short Description <span className="text-danger">*</span>
                </label>
                <CKEditor
                  editor={ClassicEditor}
                  config={editorConfig}
                  data={formData.description}
                  onChange={handleDescriptionChange}
                />
                <small className="text-muted">
                  Brief description shown in blog listings
                </small>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Full Content <span className="text-danger">*</span>
                </label>
                <CKEditor
                  editor={ClassicEditor}
                  config={editorConfig}
                  data={formData.details}
                  onChange={handleDetailsChange}
                />
                <small className="text-muted">
                  Complete blog content shown on detail page
                </small>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-4">
            <div className="form-card">
              <label className="form-label">Featured Image</label>
              <div className="image-upload-area">
                {(imagePreview || existingImage) ? (
                  <div className="image-preview-container">
                    <img
                      src={imagePreview || `${BASE_URL}/${existingImage}`}
                      alt="Preview"
                      className="image-preview"
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-danger remove-image"
                      onClick={() => {
                        setImagePreview(null)
                        setExistingImage(null)
                        setFormData(prev => ({ ...prev, image: null }))
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div
                    className="upload-placeholder"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FaImage className="upload-icon" />
                    <p>Click to upload image</p>
                    <small>Recommended: 1200x630px</small>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="d-none"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              {formData.image && (
                <p className="selected-file mt-2">
                  Selected: {formData.image.name}
                </p>
              )}
            </div>

            <div className="form-card mt-3">
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    {isEditMode ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <FaSave className="me-2" />
                    {isEditMode ? 'Update Blog' : 'Create Blog'}
                  </>
                )}
              </button>
              <Link
                to="/blogs"
                className="btn btn-outline-secondary w-100 mt-2"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
