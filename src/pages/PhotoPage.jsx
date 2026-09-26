import { useCallback, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Hero from '../components/Hero'
import SectionHeading from '../components/SectionHeading'
import PhotoGrid from '../components/PhotoGrid'
import PhotoModal from '../components/PhotoModal'
import BackToTop from '../components/BackToTop'
import Backdrop from '../components/Backdrop'
import { profile } from '../data/profile'
import { photos } from '../data/photos'

export default function PhotoPage() {
  const categories = useMemo(() => ['All', ...new Set(photos.map((p) => p.category))], [])
  const [filter, setFilter] = useState('All')
  const [openIndex, setOpenIndex] = useState(null)

  const visible = useMemo(
    () => (filter === 'All' ? photos : photos.filter((p) => p.category === filter)),
    [filter],
  )

  const close = useCallback(() => setOpenIndex(null), [])
  const navigate = useCallback(
    (dir) => setOpenIndex((i) => (i == null ? i : (i + dir + visible.length) % visible.length)),
    [visible.length],
  )

  return (
    <PageTransition>
      <Backdrop />
      <Hero content={profile.photo} portraitLabel="You, behind the camera" hue={28} />

      <section className="section container" id="gallery">
        <SectionHeading eyebrow="The gallery" title="Frames I keep coming back to">
          <div className="filters" role="tablist" aria-label="Filter photos">
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={filter === c}
                className={`filter ${filter === c ? 'is-active' : ''}`}
                onClick={() => setFilter(c)}
              >
                {filter === c && (
                  <motion.span layoutId="filter-pill" className="filter__pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                )}
                <span className="filter__label">{c}</span>
              </button>
            ))}
          </div>
        </SectionHeading>

        <PhotoGrid photos={visible} onOpen={setOpenIndex} />
        <BackToTop />
      </section>

      <PhotoModal photos={visible} index={openIndex} onClose={close} onNavigate={navigate} />
    </PageTransition>
  )
}
