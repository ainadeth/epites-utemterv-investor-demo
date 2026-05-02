/**
 * BuildmapLogo — temporary designer-ready brand mark.
 * Concept: stylised B formed from two stacked rectangular layers (construction/map layers),
 * with a subtle location-pin dot. Sage green + mist blue palette.
 */

interface Props {
  /** Icon only (default false = icon + wordmark) */
  iconOnly?: boolean
  /** Height of the icon in px. Width scales proportionally. Default 24 */
  size?: number
  className?: string
}

export default function BuildmapLogo({ iconOnly = false, size = 24, className = '' }: Props) {
  return (
    <span className={`inline-flex items-center gap-2 select-none ${className}`}>
      {/* ── Icon mark ── */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer rounded container */}
        <rect width="32" height="32" rx="8" fill="#4A7C59" />

        {/* Layer 1 — bottom bar (warm sand / mist tint) */}
        <rect x="7" y="19" width="14" height="4" rx="2" fill="#E8F5EC" opacity="0.55" />

        {/* Layer 2 — mid bar */}
        <rect x="7" y="13" width="11" height="4" rx="2" fill="#E8F5EC" opacity="0.75" />

        {/* Layer 3 — top bar (brightest) */}
        <rect x="7" y="7" width="8" height="4" rx="2" fill="#ffffff" />

        {/* B right-side vertical connector — thin charcoal line */}
        <rect x="17" y="7" width="2.5" height="10" rx="1.25" fill="#ffffff" opacity="0.85" />

        {/* Mid connector crossbar */}
        <rect x="15" y="13.5" width="4.5" height="2" rx="1" fill="#A8C5B0" />

        {/* Location pin dot — top right */}
        <circle cx="24" cy="9" r="2.5" fill="#7FB3C8" />
        <circle cx="24" cy="9" r="1.2" fill="#ffffff" />
      </svg>

      {/* ── Wordmark ── */}
      {!iconOnly && (
        <span
          style={{
            fontFamily: 'inherit',
            fontSize: `${Math.round(size * 0.58)}px`,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--tx-primary)',
            lineHeight: 1,
          }}
        >
          Buildmap
        </span>
      )}
    </span>
  )
}
