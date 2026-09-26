import { AnimatePresence, motion } from 'framer-motion'
import { CameraIcon } from './Icons'
import { ease } from '../lib/motion'

/** Instagram-style square tile grid. */
export default function PhotoGrid({ photos, onOpen }) {
  return (
    <motion.ul className="photo-grid" layout>
      <AnimatePresence mode="popLayout">
        {photos.map((p, i) => (
          <motion.li
            key={p.id}
            layout
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease }}
          >
            <button className="tile" onClick={() => onOpen(i)} aria-label={`Open photo: ${p.title}`}>
              <img src={p.src} alt={p.title} loading="lazy" decoding="async" />
              <span className="tile__overlay">
                <span className="tile__cat">
                  <CameraIcon size={14} /> {p.category}
                </span>
                <span className="tile__title">{p.title}</span>
              </span>
            </button>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  )
}
