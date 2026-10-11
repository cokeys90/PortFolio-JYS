import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SiteLayout } from './components/site/SiteLayout'
import { Home } from './pages/Home'
import { AboutDetail } from './pages/AboutDetail'
import { Resume } from './pages/Resume'
import { ProjectDetail } from './pages/ProjectDetail'
import { Blog } from './pages/Blog'
import { BlogPost } from './pages/BlogPost'
import { NotFound } from './pages/NotFound'
import { SubPage } from './components/site/SubPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route element={<SubPage />}>
            <Route path="about" element={<AboutDetail />} />
            <Route path="resume" element={<Resume />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
