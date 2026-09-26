import { motion } from 'framer-motion'
import { ArrowUp } from './Icons'
import { ease } from '../lib/motion'

export default function BackToTop() {
  return (
    <motion.div
      className="back-top"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.8, ease }}
    >
      <p className="muted">You made it to the end.</p>
      <motion.button
        className="btn btn--ghost"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.96 }}
      >
        <span className="back-top__icon">
          <ArrowUp size={18} />
        </span>
        Back to top
      </motion.button>
    </motion.div>
  )
}
