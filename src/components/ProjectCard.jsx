import { motion } from 'framer-motion'
import Media from './Media'
import { ArrowUpRight } from './Icons'
import { ease } from '../lib/motion'

// '' or '#' means "no link yet": the link is hidden instead of going nowhere.
const hasUrl = (url) => Boolean(url) && url !== '#'

/** Image on the left, project overview on the right. */
export default function ProjectCard({ project, index }) {
  const num = String(index + 1).padStart(2, '0')
  const live = hasUrl(project.live) ? project.live : null
  const code = hasUrl(project.code) ? project.code : null

  const media = (
    <Media
      src={project.image}
      alt={`${project.title} screenshot`}
      label={project.title}
      hint="16:10 screenshot"
      hue={project.hue}
    />
  )

  return (
    <motion.article
      className="project"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease }}
    >
      {live ? (
        <a href={live} target="_blank" rel="noreferrer" className="project__media" aria-label={`Open ${project.title}`}>
          {media}
        </a>
      ) : (
        <div className="project__media">{media}</div>
      )}

      <div className="project__body">
        <span className="project__num">{num}</span>
        <h3 className="project__title">{project.title}</h3>
        <p className="project__meta">
          {project.role} · {project.year}
        </p>
        <p className="project__desc">{project.description}</p>
        <ul className="tags">
          {project.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {(live || code) && (
          <div className="project__links">
            {live && (
              <a href={live} target="_blank" rel="noreferrer" className="link-arrow">
                Live site <ArrowUpRight size={16} />
              </a>
            )}
            {code && (
              <a href={code} target="_blank" rel="noreferrer" className="link-arrow">
                Source code <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  )
}
