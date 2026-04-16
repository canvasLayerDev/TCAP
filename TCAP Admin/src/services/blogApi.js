import axios from 'axios'

const BASE_URL = 'https://tcapitalwealth.com/tcap'

const blogApi = {
  // Get all blogs
  getAllBlogs: async () => {
    try {
      const response = await axios.post(`${BASE_URL}/index.php/Welcome/list_blog`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get single blog by ID
  getBlogById: async (blogId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/index.php/Welcome/get_by_id_blog`,
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
      const response = await axios.post(
        `${BASE_URL}/index.php/Welcome/add_blog`,
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
      const response = await axios.post(
        `${BASE_URL}/index.php/Welcome/update_blog`,
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
      const response = await axios.post(
        `${BASE_URL}/index.php/Welcome/delete_blog`,
        { blog_id: blogId }
      )
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export default blogApi
