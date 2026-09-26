/**
 * Slow-moving textured background. Colors come from the active theme
 * (dev = dot grid, photo = film grain); see .backdrop in global.css.
 */
export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop__glow backdrop__glow--a" />
      <div className="backdrop__glow backdrop__glow--b" />
      <div className="backdrop__texture" />
    </div>
  )
}
