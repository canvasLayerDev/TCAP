import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'https://tcapitalwealth.com/tcap'

// Create an Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
})

// Intercept requests to add the Authorization token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// Intercept responses to handle 401 Unauthorized globally
apiClient.interceptors.response.use((response) => response, (error) => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  return Promise.reject(error)
})

const blogApi = {
  // Login
  login: async (credentials) => {
    try {
      // POST to Welcome/login
      const response = await axios.post(`${BASE_URL}/index.php/Welcome/login`, credentials)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response.data
      }
      throw error
    }
  },

  // Get all blogs
  getAllBlogs: async () => {
    try {
      const response = await apiClient.post(`/index.php/Welcome/list_blog`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get single blog by ID
  getBlogById: async (blogId) => {
    try {
      const response = await apiClient.post(
        `/index.php/Welcome/get_by_id_blog`,
        { blog_id: blogId }
      )
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Create new blog (FormData for image upload)
  createBlog: async (formData) => {
    try {
      const response = await apiClient.post(
        `/index.php/Welcome/add_blog`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Update blog (FormData for image upload)
  updateBlog: async (formData) => {
    try {
      const response = await apiClient.post(
        `/index.php/Welcome/update_blog`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Delete blog
  deleteBlog: async (blogId) => {
    try {
      const response = await apiClient.post(
        `/index.php/Welcome/delete_blog`,
        { blog_id: blogId }
      )
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export default blogApi
