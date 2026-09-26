import { Link } from 'react-router-dom'
import { profile } from '../data/profile'
import { MailIcon, PhoneIcon, PinIcon, socialIcons } from './Icons'

export default function Footer() {
  const { name, role, email, phone, address, socials } = profile

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__cta">
          <p className="eyebrow">Got a project in mind?</p>
          <Link to="/contact" className="footer__big">
            Let&apos;s talk business <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="footer__grid">
          <div>
            <p className="footer__name">{name}</p>
            <p className="muted">{role}</p>
          </div>

          <div>
            <h3 className="footer__heading">Contact</h3>
            <ul className="footer__list">
              <li>
                <MailIcon size={16} />
                <a href={`mailto:${email}`}>{email}</a>
              </li>
              <li>
                <PhoneIcon size={16} />
                <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer__heading">Address</h3>
            <address>
              <ul className="footer__list">
                <li>
                  <PinIcon size={16} />
                  <span>
                    {address.line1}
                    <br />
                    {address.line2}
                    <br />
                    {address.country}
                  </span>
                </li>
              </ul>
            </address>
          </div>

          <div>
            <h3 className="footer__heading">Follow</h3>
            <ul className="footer__socials">
              {socials.map((s) => {
                const Icon = socialIcons[s.icon] ?? MailIcon
                return (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} title={s.label}>
                      <Icon size={18} />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} {name}. All rights reserved.</span>
          <span>Built with React · Hosted on Vercel</span>
        </div>
      </div>
    </footer>
  )
}
