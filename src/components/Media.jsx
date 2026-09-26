import { ImageIcon, UserIcon } from './Icons'

/**
 * Renders the image when `src` is set, otherwise a styled placeholder
 * so the layout is complete before real content arrives.
 */
export default function Media({ src, alt, label, hint, hue = 228, icon = 'image', position, className = '' }) {
  if (src) {
    return (
      <img
        className={`media ${className}`}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={position ? { objectPosition: position } : undefined}
      />
    )
  }

  const Icon = icon === 'person' ? UserIcon : ImageIcon
  return (
    <div className={`media placeholder ${className}`} style={{ '--hue': hue }} role="img" aria-label={alt || label}>
      <div className="placeholder__inner">
        <Icon size={36} />
        <span className="placeholder__label">{label}</span>
        {hint && <span className="placeholder__hint">{hint}</span>}
      </div>
    </div>
  )
}
