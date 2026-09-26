import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Hero from '../components/Hero'
import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import BackToTop from '../components/BackToTop'
import Backdrop from '../components/Backdrop'
import { ArrowRight } from '../components/Icons'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { ease } from '../lib/motion'

export default function DevPage() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <Backdrop />
      <Hero content={profile.dev} portraitLabel="Your photo" />

      <section className="section container" id="projects">
        <SectionHeading eyebrow="Selected work" title="Projects I've built" />
        <div className="projects">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </section>

      <motion.section
        className="talents container"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
      >
        <p className="talents__kicker">There&apos;s more than code.</p>
        <button className="btn-talent" onClick={() => navigate('/photography')}>
          <span>See more talents</span>
          <span className="btn-talent__icon">
            <ArrowRight size={22} />
          </span>
        </button>

        <BackToTop />
      </motion.section>
    </PageTransition>
  )
}
