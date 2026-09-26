import { motion } from 'framer-motion'
import { ease } from '../lib/motion'

/**
 * Quick crossfade between pages. The old page fades out, the theme colors
 * swap (body background eases between palettes), and the new page fades in.
 * Opacity only: a transform here would break the fixed-position Backdrop.
 */
export default function PageTransition({ children }) {
  return (
    <motion.main
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35, ease } }}
      exit={{ opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
    >
      {children}
    </motion.main>
  )
}
