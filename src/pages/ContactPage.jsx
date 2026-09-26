import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { MailIcon, PhoneIcon, PinIcon, ArrowRight } from '../components/Icons'
import { profile } from '../data/profile'
import { services, limits } from '../data/contact'
import { ease, fadeUp, stagger } from '../lib/motion'

const emptyForm = { name: '', email: '', service: services[0], message: '' }

export default function ContactPage() {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [sentTo, setSentTo] = useState(null)
  const startedAt = useRef(Date.now())
  const honeypot = useRef(null)

  const update = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (fieldErrors[name]) setFieldErrors((fe) => ({ ...fe, [name]: undefined }))
  }

  // Sends the request to /api/contact (api/contact.js), which emails it via Gmail.
  const submit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    setError('')
    setFieldErrors({})

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website: honeypot.current?.value || '', startedAt: startedAt.current }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) {
        setSentTo({ name: form.name, service: form.service, email: form.email })
        setForm(emptyForm)
        setStatus('sent')
        return
      }
      if (data.errors) setFieldErrors(data.errors)
      setError(data.error || (data.errors ? 'Please check the highlighted fields.' : 'Something went wrong.'))
      setStatus('error')
    } catch {
      setError('Could not reach the server. Check your connection and try again.')
      setStatus('error')
    }
  }

  const reset = () => {
    startedAt.current = Date.now()
    setSentTo(null)
    setStatus('idle')
  }

  const fieldError = (name) =>
    fieldErrors[name] && (
      <span className="field__error" id={`${name}-error`} role="alert">
        {fieldErrors[name]}
      </span>
    )

  return (
    <PageTransition>
      <section className="contact container">
        <motion.div className="contact__intro" variants={stagger(0.08, 0.05)} initial="hidden" animate="show">
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

        <motion.div
          className="contact__form-wrap"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {status === 'sent' && sentTo ? (
              <motion.div
                key="sent"
                className="contact__form contact__sent"
                role="status"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease }}
              >
                <span className="contact__sent-icon" aria-hidden="true">✓</span>
                <h2>Request sent!</h2>
                <p className="muted">
                  Thanks, {sentTo.name}. Your <strong>{sentTo.service}</strong> request is in my inbox. I&apos;ll reply to{' '}
                  <strong>{sentTo.email}</strong> within 48 hours.
                </p>
                <button type="button" className="btn btn--ghost contact__again" onClick={reset}>
                  Send another request
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="contact__form"
                onSubmit={submit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                aria-busy={status === 'sending'}
              >
                <div className="field-row">
                  <label className={`field ${fieldErrors.name ? 'has-error' : ''}`}>
                    <span>Name</span>
                    <input
                      name="name" value={form.name} onChange={update} required maxLength={limits.name}
                      autoComplete="name" placeholder="Jane Doe"
                      aria-invalid={!!fieldErrors.name} aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                    />
                    {fieldError('name')}
                  </label>
                  <label className={`field ${fieldErrors.email ? 'has-error' : ''}`}>
                    <span>Email</span>
                    <input
                      name="email" type="email" value={form.email} onChange={update} required maxLength={limits.email}
                      autoComplete="email" placeholder="jane@company.com"
                      aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                    />
                    {fieldError('email')}
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
                  {fieldError('service')}
                </fieldset>

                <label className={`field ${fieldErrors.message ? 'has-error' : ''}`}>
                  <span>Tell me about it</span>
                  <textarea
                    name="message" rows={6} value={form.message} onChange={update} required
                    minLength={limits.minMessage} maxLength={limits.message}
                    placeholder="Goals, date, location, timeline, budget…"
                    aria-invalid={!!fieldErrors.message} aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                  />
                  {fieldError('message')}
                </label>

                {/* Spam trap: hidden from people, bots tend to fill it in. */}
                <div className="hp" aria-hidden="true">
                  <label>
                    Website
                    <input ref={honeypot} name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
                  </label>
                </div>

                {status === 'error' && error && (
                  <p className="form-alert" role="alert">
                    {error} You can also email me directly at <a href={`mailto:${profile.email}`}>{profile.email}</a>.
                  </p>
                )}

                <motion.button
                  type="submit"
                  className="btn btn--primary"
                  disabled={status === 'sending'}
                  whileHover={status === 'sending' ? undefined : { y: -2 }}
                  whileTap={status === 'sending' ? undefined : { scale: 0.97 }}
                >
                  {status === 'sending' ? (
                    <>
                      <span className="spinner" aria-hidden="true" /> Sending…
                    </>
                  ) : (
                    <>
                      Send message <ArrowRight size={18} />
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </PageTransition>
  )
}
