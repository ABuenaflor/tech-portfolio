import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../lib/motion'

export default function SectionHeading({ eyebrow, title, children }) {
  return (
    <motion.header
      className="section-head"
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.p className="eyebrow" variants={fadeUp}>
        <span className="eyebrow__line" /> {eyebrow}
      </motion.p>
      <motion.h2 variants={fadeUp}>{title}</motion.h2>
      {children && (
        <motion.div variants={fadeUp} className="section-head__extra">
          {children}
        </motion.div>
      )}
    </motion.header>
  )
}
