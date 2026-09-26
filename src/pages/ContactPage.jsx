import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { MailIcon, PhoneIcon, PinIcon, ArrowRight } from '../components/Icons'
import { profile } from '../data/profile'
import { ease, fadeUp, stagger } from '../lib/motion'

const services = ['Website / Web App', 'UI/UX Design', 'Portrait Session', 'Event Coverage', 'Brand / Product Shoot', 'Something else']

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', service: services[0], message: '' })
  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  // No backend yet: opens the visitor's mail app with the message pre-filled.
  // Swap for Formspree / EmailJS / a Vercel function when ready.
  const submit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`[${form.service}] Inquiry from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <PageTransition>
      <section className="contact container">
        <motion.div className="contact__intro" variants={stagger(0.1, 0.35)} initial="hidden" animate="show">
          <motion.p className="eyebrow" variants={fadeUp}>
            <span className="eyebrow__line" /> Let&apos;s talk business
          </motion.p>
          <motion.h1 className="contact__title" variants={fadeUp}>
            Have an idea? <span className="accent">Let&apos;s make it real.</span>
          </motion.h1>
          <motion.p className="hero__bio" variants={fadeUp}>
            Whether it&apos;s a website, a product, or a photoshoot, tell me a bit about it and I&apos;ll get back to you within 48 hours.
          </motion.p>

          <motion.ul className="contact__info" variants={fadeUp}>
            <li>
              <span className="contact__icon"><MailIcon size={18} /></span>
              <div>
                <span className="muted">Email</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
            </li>
            <li>
              <span className="contact__icon"><PhoneIcon size={18} /></span>
              <div>
                <span className="muted">Phone</span>
                <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
              </div>
            </li>
            <li>
              <span className="contact__icon"><PinIcon size={18} /></span>
              <div>
                <span className="muted">Based in</span>
                <span>{profile.address.line2}, {profile.address.country}</span>
              </div>
            </li>
          </motion.ul>
        </motion.div>

        <motion.form
          className="contact__form"
          onSubmit={submit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease }}
        >
          <div className="field-row">
            <label className="field">
              <span>Name</span>
              <input name="name" value={form.name} onChange={update} required autoComplete="name" placeholder="Jane Doe" />
            </label>
            <label className="field">
              <span>Email</span>
              <input name="email" type="email" value={form.email} onChange={update} required autoComplete="email" placeholder="jane@company.com" />
            </label>
          </div>

          <fieldset className="field">
            <legend>What do you need?</legend>
            <div className="chips">
              {services.map((s) => (
                <label key={s} className={`chip ${form.service === s ? 'is-active' : ''}`}>
                  <input type="radio" name="service" value={s} checked={form.service === s} onChange={update} />
                  {s}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="field">
            <span>Tell me about it</span>
            <textarea name="message" rows={6} value={form.message} onChange={update} required placeholder="Goals, timeline, budget…" />
          </label>

          <motion.button type="submit" className="btn btn--primary" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
            Send message <ArrowRight size={18} />
          </motion.button>
        </motion.form>
      </section>
    </PageTransition>
  )
}
