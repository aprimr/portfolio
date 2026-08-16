import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import Blogs from './pages/Blogs'
import BlogDetail from './pages/BlogDetail'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects/:id" element={<ProjectDetail />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/:id" element={<BlogDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}