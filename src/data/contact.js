// ─────────────────────────────────────────────────────────────
//  EDIT ME — contact form options.
//  Shared by the form (src/pages/ContactPage.jsx) and the email
//  function (api/contact.js), so both always agree.
// ─────────────────────────────────────────────────────────────

export const services = [
  'Website / Web App',
  'UI/UX Design',
  'Portrait Session',
  'Event Coverage',
  'Brand / Product Shoot',
  'Something else',
]

export const limits = {
  name: 100,
  email: 200,
  message: 5000,
  minMessage: 10,
}
