import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Backdrop from '../components/Backdrop'
import SectionHeading from '../components/SectionHeading'
import BackToTop from '../components/BackToTop'
import Media from '../components/Media'
import { MailIcon, PhoneIcon, PinIcon } from '../components/Icons'
import { profile } from '../data/profile'
import { about } from '../data/about'
import { ease } from '../lib/motion'

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
})

const inView = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease },
}

export default function AboutPage() {
  return (
    <PageTransition>
      <Backdrop />

      {/* Intro: image left, description right */}
      <section className="about container">
        <motion.div className="about__media-wrap" {...fadeIn(0.05)}>
          <span className="about__bar" aria-hidden="true" />
          <div className="about__media">
            <Media src={about.portrait} alt={about.portraitAlt} label="Your photo" hint="4:5 · min 1200px tall" icon="person" />
          </div>
        </motion.div>

        <div className="about__text">
          <motion.p className="eyebrow" {...fadeIn(0.08)}>
            <span className="eyebrow__line" /> {about.eyebrow}
          </motion.p>
          <motion.h1 className="about__name" {...fadeIn(0.12)}>
            {profile.name}
          </motion.h1>
          <motion.p className="about__headline" {...fadeIn(0.15)}>
            {about.headline}
          </motion.p>
          {about.bio.map((p, i) => (
            <motion.p className="hero__bio" key={i} {...fadeIn(0.18)}>
              {p}
            </motion.p>
          ))}
          <motion.ul className="about__contact" {...fadeIn(0.22)}>
            <li>
              <MailIcon size={16} />
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <PhoneIcon size={16} />
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
            </li>
            <li>
              <PinIcon size={16} />
              <span>{profile.address.line1}</span>
            </li>
          </motion.ul>
        </div>
      </section>

      {/* Work experience */}
      <section className="section container" id="experience">
        <SectionHeading eyebrow="Experience" title="Where I've worked" />
        <ol className="timeline">
          {about.experience.map((job) => {
            const current = job.end === 'Present'
            return (
              <motion.li className="timeline__item" key={job.org + job.start} {...inView}>
                <div className="timeline__when">
                  <span className="timeline__dates">
                    {job.start} – {job.end}
                  </span>
                  {current && <span className="badge">Current</span>}
                  <span className="timeline__loc">
                    <PinIcon size={13} /> {job.location}
                  </span>
                </div>
                <div className="timeline__body">
                  <h3 className="timeline__role">{job.role}</h3>
                  <p className="timeline__org">{job.org}</p>
                  <ul className="timeline__points">
                    {job.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            )
          })}
        </ol>
      </section>

      {/* Education + trainings */}
      <section className="section section--tight container" id="education">
        <SectionHeading eyebrow="Education" title="Where I learned" />
        <div className="edu">
          {about.education.map((ed) => (
            <motion.article className="edu__card" key={ed.degree} {...inView}>
              <span className="timeline__dates">
                {ed.start} – {ed.end}
              </span>
              <h3 className="timeline__role">{ed.degree}</h3>
              <p className="timeline__org">{ed.school}</p>
              {ed.note && <p className="edu__note">{ed.note}</p>}
            </motion.article>
          ))}

          <motion.article className="edu__card" {...inView}>
            <span className="timeline__dates">Trainings & certifications</span>
            <ul className="timeline__points">
              {about.trainings.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </motion.article>
        </div>

        <BackToTop />
      </section>
    </PageTransition>
  )
}
