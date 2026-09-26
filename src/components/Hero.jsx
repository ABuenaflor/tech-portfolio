import { motion } from 'framer-motion'
import Media from './Media'
import SkillGroups from './SkillGroups'
import { ease } from '../lib/motion'

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
})

/**
 * Shared hero used by both the developer and photography sides:
 * image (middle-left) · description (middle-right) · skills (bottom).
 */
export default function Hero({ content, portraitLabel, hue }) {
  const { eyebrow, heading, highlight = [], bio, portrait, portraitAlt, portraitPosition, stats, skillsLabel, skills } = content

  return (
    <section className="hero">
      <div className="container hero__grid">
        <motion.div className="hero__media-wrap" {...fadeIn(0.05)}>
          <div className="hero__media">
            <Media src={portrait} alt={portraitAlt} label={portraitLabel} hint="4:5 · min 1200px tall" icon="person" hue={hue} position={portraitPosition} />
          </div>
          <div className="hero__badge">
            <span className="hero__badge-dot" /> Available for work
          </div>
        </motion.div>

        <div className="hero__text">
          <motion.p className="eyebrow" {...fadeIn(0.08)}>
            <span className="eyebrow__line" /> {eyebrow}
          </motion.p>

          <motion.h1 className="hero__title" {...fadeIn(0.12)}>
            {heading.split(' ').map((w, i) => (
              <span key={i} className={highlight.includes(w) ? 'accent' : undefined}>
                {w}{' '}
              </span>
            ))}
          </motion.h1>

          {bio.map((p, i) => (
            <motion.p className="hero__bio" key={i} {...fadeIn(0.18)}>
              {p}
            </motion.p>
          ))}

          <motion.dl className="hero__stats" {...fadeIn(0.22)}>
            {stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      <SkillGroups label={skillsLabel} groups={skills} />
    </section>
  )
}
