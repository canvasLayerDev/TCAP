import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './components/Dashboard/Dashboard'
import BlogList from './components/Blog/BlogList'
import BlogForm from './components/Blog/BlogForm'
import Login from './components/Login/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Protected Routes wrapped in Layout */}
      <Route path="/" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard" element={<Navigate to="/" replace />} />
      <Route path="/blogs" element={
        <ProtectedRoute>
          <Layout>
            <BlogList />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/blogs/create" element={
        <ProtectedRoute>
          <Layout>
            <BlogForm />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/blogs/edit/:id" element={
        <ProtectedRoute>
          <Layout>
            <BlogForm />
          </Layout>
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App
