import { motion } from 'framer-motion'
import { ease } from '../lib/motion'

/** Skills split into labeled columns, separated by divider lines. */
export default function SkillGroups({ label, groups }) {
  return (
    <motion.div
      className="skills container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.28, ease }}
    >
      <p className="eyebrow skills__label">
        <span className="eyebrow__line" /> {label}
      </p>

      <div className="skills__groups">
        {groups.map((g, i) => (
          <section className="skills__group" key={g.title} aria-labelledby={`skills-${i}`}>
            <h2 className="skills__title" id={`skills-${i}`}>
              <span className="skills__num">{String(i + 1).padStart(2, '0')}</span>
              {g.title}
            </h2>
            <ul className="skills__list">
              {g.items.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </motion.div>
  )
}
