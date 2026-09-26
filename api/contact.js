// Vercel serverless function: POST /api/contact
// Emails contact-form requests to you through your Gmail account.
//
// Required environment variables (Vercel → Project → Settings → Environment Variables):
//   GMAIL_USER          your Gmail address, e.g. alexbuenaflor0227@gmail.com
//   GMAIL_APP_PASSWORD  a Gmail App Password (not your normal password)
// Optional:
//   CONTACT_TO          where requests are delivered (defaults to GMAIL_USER)

import nodemailer from 'nodemailer'
import { services, limits } from '../src/data/contact.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MIN_FILL_MS = 3000 // real people take longer than this to fill the form

// Best-effort rate limit per warm instance: 5 requests / 10 min per IP.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map()

function rateLimited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_PER_WINDOW
}

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

// Strip line breaks so user input can't inject extra email headers.
const oneLine = (s) => s.replace(/[\r\n]+/g, ' ').trim()

export function validate(body) {
  const name = oneLine(String(body?.name ?? ''))
  const email = oneLine(String(body?.email ?? ''))
  const service = String(body?.service ?? '')
  const message = String(body?.message ?? '').trim()

  const errors = {}
  if (!name) errors.name = 'Please enter your name.'
  else if (name.length > limits.name) errors.name = 'Name is too long.'
  if (!EMAIL_RE.test(email) || email.length > limits.email) errors.email = 'Please enter a valid email address.'
  if (!services.includes(service)) errors.service = 'Please choose a service.'
  if (message.length < limits.minMessage) errors.message = `Please write at least ${limits.minMessage} characters.`
  else if (message.length > limits.message) errors.message = 'Message is too long.'

  return { data: { name, email, service, message }, errors }
}

export function buildEmail({ name, email, service, message }, submittedAt = new Date()) {
  const when = submittedAt.toLocaleString('en-PH', { timeZone: 'Asia/Manila', dateStyle: 'medium', timeStyle: 'short' })
  const text = [
    `New request from your portfolio`,
    ``,
    `Service: ${service}`,
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Sent:    ${when} (PH time)`,
    ``,
    `Message:`,
    message,
    ``,
    `Reply to this email to answer ${name} directly.`,
  ].join('\n')

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;color:#1a1a1a">
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#6b7280">New request from your portfolio</p>
      <h2 style="margin:0 0 16px;font-size:20px">${escapeHtml(service)}</h2>
      <table style="border-collapse:collapse;font-size:14px;margin-bottom:16px">
        <tr><td style="padding:4px 16px 4px 0;color:#6b7280">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#6b7280">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#6b7280">Sent</td><td>${escapeHtml(when)} (PH time)</td></tr>
      </table>
      <div style="white-space:pre-wrap;font-size:15px;line-height:1.6;padding:16px;border-left:3px solid #8aa4ff;background:#f5f7ff">${escapeHtml(message)}</div>
      <p style="margin-top:16px;font-size:13px;color:#6b7280">Reply to this email to answer ${escapeHtml(name)} directly.</p>
    </div>`

  return {
    subject: `[Portfolio] ${service} request from ${name}`,
    text,
    html,
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed.' })
  }

  const body = typeof req.body === 'string' ? safeJson(req.body) : req.body || {}

  // Spam traps: a hidden field only bots fill in, and a too-fast submit.
  // Pretend success so bots don't learn they were caught.
  const filledTooFast = Number(body.startedAt) && Date.now() - Number(body.startedAt) < MIN_FILL_MS
  if (body.website || filledTooFast) return res.status(200).json({ ok: true })

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown'
  if (rateLimited(ip)) {
    return res.status(429).json({ ok: false, error: 'Too many messages. Please try again in a few minutes.' })
  }

  const { data, errors } = validate(body)
  if (Object.keys(errors).length) return res.status(400).json({ ok: false, errors })

  const { GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO } = process.env
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error('contact: GMAIL_USER / GMAIL_APP_PASSWORD are not set')
    return res.status(500).json({ ok: false, error: 'The contact form is not set up yet.' })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD.replace(/\s/g, '') },
    })
    const mail = buildEmail(data)
    await transporter.sendMail({
      from: `"Portfolio Contact" <${GMAIL_USER}>`,
      to: CONTACT_TO || GMAIL_USER,
      replyTo: `"${data.name.replace(/"/g, '')}" <${data.email}>`,
      ...mail,
    })
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('contact: send failed', err?.code, err?.response || err?.message)
    return res.status(502).json({ ok: false, error: 'Your message could not be sent right now.' })
  }
}

function safeJson(s) {
  try {
    return JSON.parse(s)
  } catch {
    return {}
  }
}
