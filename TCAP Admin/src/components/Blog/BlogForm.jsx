import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { FaArrowLeft, FaSave, FaImage, FaSearch, FaGlobe, FaLink, FaTags } from 'react-icons/fa'
import { MdPreview } from 'react-icons/md'
import blogApi from '../../services/blogApi'

/* ── helpers ── */
const slugify = (str) =>
  str.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

const charCountColor = (len, max) => {
  if (len === 0) return '#64748b'
  if (len > max) return '#ef4444'
  if (len > max * 0.85) return '#f59e0b'
  return '#22c55e'
}

function SeoScoreBar({ formData }) {
  const checks = [
    { label: 'URL Slug set', pass: formData.slug.length > 0 },
    { label: 'Meta description (120–160 chars)', pass: formData.meta_description.length >= 120 && formData.meta_description.length <= 160 },
    { label: 'Focus keyword defined', pass: formData.focus_keyword.length > 0 },
    { label: 'OG title set', pass: formData.og_title.length > 0 },
    { label: 'OG description set', pass: formData.og_description.length > 0 },
    { label: 'Secondary keywords added', pass: formData.secondary_keywords.length > 0 },
    { label: 'Canonical URL set', pass: formData.canonical_url.length > 0 },
  ]
  const passed = checks.filter(c => c.pass).length
  const pct = Math.round((passed / checks.length) * 100)
  const color = pct >= 80 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#ef4444'
  const label = pct >= 80 ? 'Good' : pct >= 50 ? 'Needs Work' : 'Poor'

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase' }}>SEO Score</span>
        <span style={{ fontSize: '13px', fontWeight: 700, color }}>{pct}% — {label}</span>
      </div>
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '100px', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '100px', transition: 'width 0.4s ease' }} />
      </div>
      <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {checks.map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
            <span style={{ color: c.pass ? '#22c55e' : '#475569', fontSize: '14px' }}>{c.pass ? '✓' : '○'}</span>
            <span style={{ color: c.pass ? '#94a3b8' : '#475569' }}>{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function BlogForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const isEditMode = Boolean(id)

  const BASE_URL = import.meta.env.VITE_API_URL || 'https://tcapitalwealth.com/tcap'

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    details: '',
    date: new Date().toISOString().split('T')[0],
    image: null,
    /* SEO */
    slug: '',
    meta_description: '',
    focus_keyword: '',
    og_title: '',
    og_description: '',
    secondary_keywords: '',
    canonical_url: '',
    blog_status: 'published',
  })

  const [existingImage, setExistingImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(isEditMode)
  const [slugLocked, setSlugLocked] = useState(isEditMode)

  /* auto-generate slug from title if not locked */
  useEffect(() => {
    if (!slugLocked && formData.name) {
      setFormData(prev => ({ ...prev, slug: slugify(formData.name) }))
    }
  }, [formData.name, slugLocked])

  useEffect(() => {
    if (isEditMode) fetchBlogData()
  }, [id])

  const fetchBlogData = async () => {
    try {
      setFetchLoading(true)
      const response = await blogApi.getBlogById(id)
      if (response && String(response.status).toLowerCase() === 'true') {
        setFormData({
          name: response.name || '',
          description: response.description || '',
          details: response.details || '',
          date: response.date || new Date().toISOString().split('T')[0],
          image: null,
          slug: response.slug || '',
          meta_description: response.meta_description || '',
          focus_keyword: response.focus_keyword || '',
          og_title: response.og_title || '',
          og_description: response.og_description || '',
          secondary_keywords: response.secondary_keywords || '',
          canonical_url: response.canonical_url || '',
          blog_status: response.blog_status || 'published',
        })
        if (response.image) setExistingImage(response.image)
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
    if (name === 'slug') setSlugLocked(true)
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleDescriptionChange = (event, editor) =>
    setFormData(prev => ({ ...prev, description: editor.getData() }))

  const handleDetailsChange = (event, editor) =>
    setFormData(prev => ({ ...prev, details: editor.getData() }))

  const handleSubmit = async (e, forcedStatus = null) => {
    if (e) e.preventDefault()
    
    // If forcedStatus is provided (from buttons), update the form data state
    const targetStatus = forcedStatus || formData.blog_status

    if (!formData.name.trim()) { toast.error('Blog title is required'); return }
    if (!formData.description.trim()) { toast.error('Description is required'); return }
    if (!formData.details.trim()) { toast.error('Blog content is required'); return }
    if (!formData.date) { toast.error('Date is required'); return }

    try {
      setLoading(true)
      const fd = new FormData()
      fd.append('name', formData.name)
      fd.append('description', formData.description)
      fd.append('details', formData.details)
      fd.append('date', formData.date)
      /* SEO fields */
      fd.append('slug', formData.slug)
      fd.append('meta_description', formData.meta_description)
      fd.append('focus_keyword', formData.focus_keyword)
      fd.append('og_title', formData.og_title)
      fd.append('og_description', formData.og_description)
      fd.append('secondary_keywords', formData.secondary_keywords)
      fd.append('canonical_url', formData.canonical_url)
      fd.append('blog_status', targetStatus)
      if (formData.image) fd.append('image', formData.image)

      let response
      if (isEditMode) {
        fd.append('blog_id', id)
        response = await blogApi.updateBlog(fd)
      } else {
        response = await blogApi.createBlog(fd)
      }

      if (response.status === 'true') {
        toast.success(targetStatus === 'published' ? (isEditMode ? 'Blog updated & published!' : 'Blog published!') : 'Draft saved successfully!')
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
    toolbar: ['heading','|','bold','italic','link','bulletedList','numberedList','|','outdent','indent','|','blockQuote','insertTable','undo','redo'],
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

  const mdLen = formData.meta_description.length
  const ogDescLen = formData.og_description.length
  const slugUrl = `${window.location.origin.replace('admin.', '')}/blog-detail/[id]`

  return (
    <div className="blog-form-container">
      <div className="page-header">
        <Link to="/blogs" className="btn btn-outline-secondary btn-sm">
          <FaArrowLeft className="me-1" /> Back to Blogs
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h2 className="page-title mb-0">{isEditMode ? 'Edit Blog' : 'Create New Blog'}</h2>
          {isEditMode && (
            <span className={`badge ${formData.blog_status === 'published' ? 'bg-success' : 'bg-secondary'}`} style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {formData.blog_status}
            </span>
          )}
        </div>
      </div>

      <form onSubmit={(e) => handleSubmit(e)} className="blog-form">
        <div className="row g-4">

          {/* ── LEFT: main content ── */}
          <div className="col-lg-8">

            {/* Content Card */}
            <div className="form-card">
              <h6 className="form-card-title mb-3">📝 Content</h6>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">Blog Title <span className="text-danger">*</span></label>
                <input type="text" className="form-control" id="name" name="name"
                  value={formData.name} onChange={handleInputChange}
                  placeholder="Enter a compelling blog title" required />
              </div>

              <div className="mb-3">
                <label htmlFor="date" className="form-label">Publication Date <span className="text-danger">*</span></label>
                <input type="date" className="form-control" id="date" name="date"
                  value={formData.date} onChange={handleInputChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Short Description <span className="text-danger">*</span></label>
                <CKEditor editor={ClassicEditor} config={editorConfig}
                  data={formData.description} onChange={handleDescriptionChange} />
                <small className="text-muted">Shown in blog listing cards</small>
              </div>

              <div className="mb-0">
                <label className="form-label">Full Content <span className="text-danger">*</span></label>
                <CKEditor editor={ClassicEditor} config={editorConfig}
                  data={formData.details} onChange={handleDetailsChange} />
                <small className="text-muted">Full article shown on the detail page</small>
              </div>
            </div>

            {/* ── SEO CARD ── */}
            <div className="form-card mt-4" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.07), rgba(79,70,229,0.04))', borderColor: 'rgba(59,130,246,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h6 className="form-card-title mb-0" style={{ color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaSearch /> SEO Settings
                </h6>
                <span style={{ fontSize: '11px', color: '#475569', background: 'rgba(59,130,246,0.08)', padding: '3px 10px', borderRadius: '100px', border: '1px solid rgba(59,130,246,0.15)' }}>
                  Search Engine Optimization
                </span>
              </div>

              {/* ── Live SEO Score ── */}
              <SeoScoreBar formData={formData} />

              <hr style={{ borderColor: 'rgba(255,255,255,0.06)', margin: '20px 0' }} />

              {/* Row 1: Slug + Focus Keyword */}
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label htmlFor="slug" className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaLink style={{ color: '#60a5fa', fontSize: '12px' }} /> URL Slug
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input type="text" className="form-control" id="slug" name="slug"
                      value={formData.slug} onChange={handleInputChange}
                      placeholder="auto-generated-from-title" />
                    {!slugLocked && (
                      <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '10px', color: '#22c55e', fontWeight: 600 }}>AUTO</span>
                    )}
                  </div>
                  {formData.slug && (
                    <small style={{ color: '#475569', fontSize: '11px' }}>
                      URL: <span style={{ color: '#60a5fa' }}>tcapitalwealth.com/blog/{formData.slug}</span>
                    </small>
                  )}
                  <div style={{ marginTop: '4px' }}>
                    <small className="text-muted">Click to edit and lock the slug</small>
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="focus_keyword" className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaSearch style={{ color: '#60a5fa', fontSize: '12px' }} /> Focus Keyword
                  </label>
                  <input type="text" className="form-control" id="focus_keyword" name="focus_keyword"
                    value={formData.focus_keyword} onChange={handleInputChange}
                    placeholder="e.g. Retirement Planning Smart Investment" />
                  <small className="text-muted">Main keyword to rank for</small>
                </div>
              </div>

              {/* Row 2: Secondary Keywords */}
              <div className="mb-3">
                <label htmlFor="secondary_keywords" className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaTags style={{ color: '#60a5fa', fontSize: '12px' }} /> Secondary Keywords
                  <span style={{ fontSize: '11px', color: '#475569', fontWeight: 400, marginLeft: '4px' }}>(comma separated)</span>
                </label>
                <input type="text" className="form-control" id="secondary_keywords" name="secondary_keywords"
                  value={formData.secondary_keywords} onChange={handleInputChange}
                  placeholder="e.g. retirement corpus, SIP investment, passive income, long-term investment" />
                <small className="text-muted">LSI / secondary keywords for better topic coverage</small>
              </div>

              {/* Meta Description */}
              <div className="mb-3">
                <label htmlFor="meta_description" className="form-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaGlobe style={{ color: '#60a5fa', fontSize: '12px' }} /> Meta Description
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: charCountColor(mdLen, 160) }}>
                    {mdLen}/160
                  </span>
                </label>
                <textarea className="form-control" id="meta_description" name="meta_description"
                  rows={3} value={formData.meta_description} onChange={handleInputChange}
                  placeholder="Describe this article in 120–160 characters for search engines..." />
                <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', marginTop: '6px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min((mdLen / 160) * 100, 100)}%`, height: '100%', background: charCountColor(mdLen, 160), borderRadius: '100px', transition: 'all 0.3s' }} />
                </div>
                <small className="text-muted">Ideal: 120–160 chars · Shown in Google search results</small>
              </div>

              {/* ── Open Graph Section ── */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px', marginBottom: '0' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#64748b', marginBottom: '14px' }}>
                  Open Graph (Social Share Preview)
                </div>

                <div className="mb-3">
                  <label htmlFor="og_title" className="form-label">OG Title</label>
                  <input type="text" className="form-control" id="og_title" name="og_title"
                    value={formData.og_title} onChange={handleInputChange}
                    placeholder="Title shown when shared on Facebook, LinkedIn, WhatsApp…" />
                  <small className="text-muted">Leave blank to use blog title · Ideal: ≤ 60 chars</small>
                </div>

                <div className="mb-0">
                  <label htmlFor="og_description" className="form-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>OG Description</span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: charCountColor(ogDescLen, 200) }}>
                      {ogDescLen}/200
                    </span>
                  </label>
                  <textarea className="form-control" id="og_description" name="og_description"
                    rows={2} value={formData.og_description} onChange={handleInputChange}
                    placeholder="Description shown in social share cards…" />
                  <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', marginTop: '6px', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min((ogDescLen / 200) * 100, 100)}%`, height: '100%', background: charCountColor(ogDescLen, 200), borderRadius: '100px', transition: 'all 0.3s' }} />
                  </div>
                </div>
              </div>

              {/* Canonical URL */}
              <div className="mt-3">
                <label htmlFor="canonical_url" className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaLink style={{ color: '#60a5fa', fontSize: '12px' }} /> Canonical URL
                  <span style={{ fontSize: '11px', color: '#475569', fontWeight: 400, marginLeft: '4px' }}>(optional)</span>
                </label>
                <input type="url" className="form-control" id="canonical_url" name="canonical_url"
                  value={formData.canonical_url} onChange={handleInputChange}
                  placeholder="https://tcapitalwealth.com/blog/retirement-planning-smart-investment" />
                <small className="text-muted">Set only for syndicated/duplicate content — prevents Google duplicate penalties</small>
              </div>

              {/* SERP Preview */}
              {(formData.name || formData.slug || formData.meta_description) && (
                <div style={{ marginTop: '20px', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#64748b', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MdPreview /> Google SERP Preview
                  </div>
                  <div style={{ padding: '14px 16px', background: '#fff', borderRadius: '8px' }}>
                    <div style={{ fontFamily: 'Arial, sans-serif' }}>
                      <div style={{ fontSize: '12px', color: '#4d5156', marginBottom: '2px' }}>
                        https://tcapitalwealth.com › blog › {formData.slug || 'article'}
                      </div>
                      <div style={{ fontSize: '18px', color: '#1a0dab', marginBottom: '4px', fontWeight: 400, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {formData.og_title || formData.name || 'Blog Title'} | TCapital Wealth
                      </div>
                      <div style={{ fontSize: '14px', color: '#4d5156', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {formData.meta_description || 'Add a meta description to preview how this article appears in Google search results.'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: image + publish ── */}
          <div className="col-lg-4">
            <div className="form-card">
              <h6 className="form-card-title mb-3">🖼 Featured Image</h6>
              <div className="image-upload-area">
                {(imagePreview || existingImage) ? (
                  <div className="image-preview-container">
                    <img src={imagePreview || `${BASE_URL}/${existingImage}`} alt="Preview" className="image-preview" />
                    <button type="button" className="btn btn-sm btn-danger remove-image"
                      onClick={() => { setImagePreview(null); setExistingImage(null); setFormData(prev => ({ ...prev, image: null })) }}>
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder" onClick={() => fileInputRef.current?.click()}>
                    <FaImage className="upload-icon" />
                    <p>Click to upload image</p>
                    <small>Recommended: 1200×630px</small>
                  </div>
                )}
                <input type="file" ref={fileInputRef} className="d-none" accept="image/*" onChange={handleImageChange} />
              </div>
              {formData.image && <p className="selected-file mt-2">Selected: {formData.image.name}</p>}
            </div>

            <div className="form-card mt-3">
              <h6 className="form-card-title mb-3">🚀 Publish</h6>
              
              <button type="button" className="btn btn-primary w-100 mb-2" 
                onClick={(e) => handleSubmit(e, 'published')}
                disabled={loading}>
                {loading ? (
                  <><span className="spinner-border spinner-border-sm me-2" />Processing...</>
                ) : (
                  <><FaSave className="me-2" />{isEditMode ? 'Update & Publish' : 'Publish Live'}</>
                )}
              </button>

              <button type="button" className="btn btn-outline-primary w-100" 
                onClick={(e) => handleSubmit(e, 'draft')}
                disabled={loading}>
                {loading ? (
                  <><span className="spinner-border spinner-border-sm me-2" />Saving...</>
                ) : (
                  <>{isEditMode ? 'Save as Draft' : 'Save Draft'}</>
                )}
              </button>

              <Link to="/blogs" className="btn btn-link w-100 mt-2 text-decoration-none text-muted" style={{ fontSize: '13px' }}>Cancel</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
