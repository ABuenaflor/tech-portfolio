// ─────────────────────────────────────────────────────────────
//  EDIT ME — About Me page (content from the resume).
//  portrait: '/images/about.jpg' (empty = placeholder)
//  end: 'Present' marks a role as current.
// ─────────────────────────────────────────────────────────────

export const about = {
  eyebrow: 'About me',
  headline: 'Web Developer · IT Support',
  portrait: '/images/about_me.jpg',
  portraitAlt: 'Portrait of Alex A. Buenaflor',
  // Which part stays visible when cropped: 'x% y%' (lower y = keep more of the top)
  portraitPosition: '50% 30%',
  bio: [
    'I\'m a Computer Science graduate with experience in government administrative support, IT troubleshooting, document management, and web system development.',
    'Organized and adaptable, I bring practical experience supporting office operations, official documentation, meetings, trainings, and government programs.',
  ],

  experience: [
    {
      org: 'Department of Labor and Employment Regional Office 5',
      role: 'Support Staff (GIP), Labor Relations Unit',
      start: 'February 2026',
      end: 'Present',
      location: 'Legazpi City, Albay',
      points: [
        'Assist in the preparation of notices of conference on the conciliation-mediation under the Single Entry Approach (SEnA).',
        'Develop an RFA Monitoring System for the process of RFA and PCT under the SEnA program.',
        'Handle basic troubleshooting on printers, desktops, and scanners.',
        'Create layouts for tarpaulins, t-shirts, programs, and PowerPoint presentation designs.',
        'Handle audio-visual presentations during meetings and conferences.',
        'Assist as a photographer during events, meetings, seminars, and trainings.',
        'Handle and file documents such as communications, indorsements, SEnA files, and case profiles.',
      ],
    },
    {
      org: 'Andale – Sili Deli',
      role: 'Business Analyst (Intern)',
      start: 'February 2025',
      end: 'March 2025',
      location: 'Legazpi City, Albay',
      points: [
        'Researched customer behavior regarding tourism and tourist destinations.',
        'Conducted studies on local foods and cuisines that may attract tourists and visitors.',
        'Studied community-based tourism activities that tourists can take part in, such as pottery making.',
      ],
    },
    {
      org: 'Divine Word College of Legazpi',
      role: 'Student Assistant, Human Resources Department Office',
      start: 'August 2022',
      end: 'May 2024',
      location: 'Legazpi City, Albay',
      points: [
        'Sorted and filed documents such as employee records, leave requests, and other HR-related paperwork.',
        'Encoded employee and applicant information into databases and spreadsheets.',
        'Prepared letters, memos, and reports as requested by the secretary or HR staff.',
        'Handled sensitive employee information with discretion.',
      ],
    },
  ],

  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'Divine Word College of Legazpi',
      start: 'August 2021',
      end: 'June 2025',
      note: 'Thesis: "Applicant Filtering and Faculty Ranking using Simple Additive Weighting for DWCL"',
    },
  ],

  trainings: [
    'Basic Occupational Safety and Health for SO1 Training',
    '3-Day Basic Single Entry Approach Desk Officer Training',
    'Basic Occupational Safety and Health for SO2 Training',
  ],
}
