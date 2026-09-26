import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data/profile'
import { ChevronLeft, ChevronRight, CloseIcon, PinIcon } from './Icons'
import { ease } from '../lib/motion'

const initials = profile.name
  .split(' ')
  .map((w) => w[0])
  .join('')
  .slice(0, 2)
  .toUpperCase()

/**
 * Instagram-like lightbox: photo on the left, caption panel on the right.
 * Esc closes, ← / → navigate, click outside closes.
 */
export default function PhotoModal({ photos, index, onClose, onNavigate }) {
  const photo = index == null ? null : photos[index]
  const isOpen = photo != null
  const closeRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate(1)
      if (e.key === 'ArrowLeft') onNavigate(-1)
    }
    const lastFocus = document.activeElement
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      lastFocus?.focus?.()
    }
  }, [isOpen, onClose, onNavigate])

  const stop = (e) => e.stopPropagation()

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-label={photo.title}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button ref={closeRef} className="modal__close" onClick={onClose} aria-label="Close">
            <CloseIcon size={26} />
          </button>

          <button
            className="modal__nav modal__nav--prev"
            onClick={(e) => { stop(e); onNavigate(-1) }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="modal__nav modal__nav--next"
            onClick={(e) => { stop(e); onNavigate(1) }}
            aria-label="Next photo"
          >
            <ChevronRight size={24} />
          </button>

          <motion.div
            className="modal__dialog"
            onClick={stop}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.45, ease }}
          >
            <div className="modal__media">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={photo.id}
                  src={photo.src}
                  alt={photo.title}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </div>

            <aside className="modal__panel">
              <header className="modal__head">
                <span className="avatar">{initials}</span>
                <div>
                  <p className="modal__author">{profile.name}</p>
                  {photo.location && (
                    <p className="modal__loc">
                      <PinIcon size={12} /> {photo.location}
                    </p>
                  )}
                </div>
              </header>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={photo.id}
                  className="modal__body"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="modal__cat">{photo.category}</span>
                  <h3 className="modal__title">{photo.title}</h3>
                  <p className="modal__caption">{photo.caption}</p>

                  {(photo.camera || photo.settings || photo.date) && (
                  <dl className="modal__meta">
                    {photo.camera && (
                      <div>
                        <dt>Camera</dt>
                        <dd>{photo.camera}</dd>
                      </div>
                    )}
                    {photo.settings && (
                      <div>
                        <dt>Settings</dt>
                        <dd>{photo.settings}</dd>
                      </div>
                    )}
                    {photo.date && (
                      <div>
                        <dt>Date</dt>
                        <dd>{photo.date}</dd>
                      </div>
                    )}
                  </dl>
                  )}
                </motion.div>
              </AnimatePresence>

              <footer className="modal__foot">
                <span>
                  {index + 1} / {photos.length}
                </span>
                <span className="muted">Use ← → to browse</span>
              </footer>
            </aside>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
