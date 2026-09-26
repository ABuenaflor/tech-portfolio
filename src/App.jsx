import { useLayoutEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import DevPage from './pages/DevPage'
import PhotoPage from './pages/PhotoPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'

// Each side of the portfolio gets its own palette (see global.css).
const applyTheme = (pathname) => {
  document.documentElement.dataset.theme = pathname.startsWith('/photography') ? 'photo' : 'dev'
}

export default function App() {
  const location = useLocation()

  useLayoutEffect(() => {
    applyTheme(location.pathname)
    // Only on first load; later changes happen between the fade-out and fade-in (onExitComplete).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a href="#content" className="skip-link">Skip to content</a>
      <Navbar />

      <div id="content">
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            applyTheme(window.location.pathname)
            window.scrollTo({ top: 0, behavior: 'instant' })
          }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<DevPage />} />
            <Route path="/photography" element={<PhotoPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </div>

      <Footer />
    </MotionConfig>
  )
}
