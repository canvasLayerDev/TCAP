import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './components/Dashboard/Dashboard'
import BlogList from './components/Blog/BlogList'
import BlogForm from './components/Blog/BlogForm'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/create" element={<BlogForm />} />
        <Route path="/blogs/edit/:id" element={<BlogForm />} />
      </Routes>
    </Layout>
  )
}

export default App
