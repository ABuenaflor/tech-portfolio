// ─────────────────────────────────────────────────────────────
//  EDIT ME — all personal info lives here.
//  Images: drop files in /public/images and set the path,
//  e.g. portrait: '/images/me.jpg'. Empty string = placeholder.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Alex A. Buenaflor',
  role: 'Web Developer & Photographer',

  email: 'alexbuenaflor0227@gmail.com',
  phone: '+63 939 492 9907',
  address: {
    line1: 'Purok 3 Tagas, Daraga, Albay',
    line2: 'Legazpi City, 4501',
    country: 'Philippines',
  },

  // icon: github | linkedin | instagram | facebook | mail
  socials: [
    { label: 'GitHub', href: 'https://github.com/ABuenaflor', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alex-buenaflor-62672224a', icon: 'linkedin' },
    { label: 'Instagram', href: 'https://www.instagram.com/b_lxee/', icon: 'instagram' },
    { label: 'Facebook', href: 'https://www.facebook.com/LeeexxxB.27', icon: 'facebook' },
  ],

  dev: {
    eyebrow: 'Web Developer',
    heading: 'I build interfaces that feel as good as they look.',
    highlight: ['feel', 'look.'],
    bio: [
      "I'm a Computer Science graduate from Divine Word College of Legazpi, currently building web-based systems and supporting day-to-day operations at the Department of Labor and Employment Regional Office V. I like making tools that help real people get their work done.",
      'I work with care and structure: organized, detail-oriented, and comfortable working on my own. I pick up new tools quickly and I care about clean, accurate work, from the first draft to the last pixel.',
    ],
    portrait: '/images/me_web.jpg',
    portraitAlt: 'Portrait of Alex A. Buenaflor',
    stats: [
      { value: '3+', label: 'Years building' },
      { value: '2+', label: 'Projects shipped' },
      { value: '∞', label: 'Cups of coffee' },
    ],
    skillsLabel: 'Tech I work with',
    // Each group becomes its own column. Add, rename, or remove groups freely.
    skills: [
      { title: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Framer Motion'] },
      { title: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'MongoDB', 'PostgreSQL'] },
      { title: 'Tools & Workflow', items: ['Git & GitHub', 'Figma', 'Vercel', 'VS Code'] },
    ],
  },

  photo: {
    eyebrow: 'Photographer',
    heading: 'I chase light, moments, and quiet stories.',
    highlight: ['light,', 'stories.'],
    bio: [
      "Capture not only fleeting moments but also the depth of human emotion. The ability to freeze a specific point in time, preserving its essence, is incredibly appealing. I aim to create lasting images that allow individuals to revisit cherished memories and relive the feelings associated with them. It's a powerful medium for preserving and sharing life's most precious experiences.",
      'Available for portraits, events, and brand shoots.',
    ],
    portrait: '/images/me_photo.jpg',
    portraitAlt: 'Alex A. Buenaflor shooting with a Canon camera',
    // Which part of the photo stays visible when cropped: 'x% y%' (50% 50% = center)
    portraitPosition: '52% 50%',
    stats: [
      { value: '4+', label: 'Years shooting' },
      { value: '100+', label: 'Hours of Sessions' },
      { value: '2', label: 'Favourite lens' },
    ],
    skillsLabel: 'Craft & tools',
    skills: [
      { title: 'Genres', items: ['Portrait', 'Street', 'Landscape', 'Events', 'Product','Stars'] },
      { title: 'Techniques', items: ['Natural Light', 'Studio Lighting', 'Color Grading', 'Film Photography'] },
      { title: 'Software', items: ['Lightroom', 'Photoshop', 'Da Vinci', 'Capcut'] },
    ],
  },
}
