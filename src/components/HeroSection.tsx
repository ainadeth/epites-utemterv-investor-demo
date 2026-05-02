interface Props {
  onGoToAnyagok?: () => void
  onGoToProjektek?: () => void
}

export default function HeroSection({ onGoToProjektek }: Props) {
  const pills = [
    { icon: '⏱️', text: 'Ütemterv' },
    { icon: '💰', text: 'Költségbecslés' },
    { icon: '🧱', text: 'Anyagok' },
    { icon: '👷', text: 'Szakemberek' },
    { icon: '📄', text: 'PDF export' },
    { icon: '📂', text: 'Projektjeim' },
  ]

  return (
    <section
      className="relative overflow-hidden pb-14 text-center"
      style={{ paddingTop: 'calc(var(--header-h) + 48px)' }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(74,124,89,.10) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6">

        {/* Eyebrow */}
        <span
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase rounded-full px-3.5 py-1.5 mb-6 animate-fade-in border"
          style={{ color: '#4A7C59', background: '#F0F7F2', borderColor: '#C8DFD0' }}
        >
          <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ background: '#4A7C59' }} />
          Ingyenes ütemtervkészítő
        </span>

        {/* Brand */}
        <h1
          className="font-serif text-5xl md:text-[3.5rem] font-medium leading-[1.1] mb-3 animate-fade-up"
          style={{ color: 'var(--tx-primary)' }}
        >
          Buildmap
        </h1>

        {/* Tagline */}
        <p
          className="font-serif text-xl md:text-2xl mb-5 animate-fade-up"
          style={{ color: '#4A7C59', animationDelay: '40ms', fontStyle: 'italic' }}
        >
          az építkezésed térképe.
        </p>

        {/* Primary value proposition */}
        <p
          className="text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-2 animate-fade-up font-medium"
          style={{ color: 'var(--tx-secondary)', animationDelay: '60ms' }}
        >
          Tervezd átláthatóbban az építkezésed.
        </p>

        {/* Supporting detail */}
        <p
          className="text-sm leading-relaxed max-w-lg mx-auto mb-8 animate-fade-up"
          style={{ color: 'var(--tx-muted)', animationDelay: '80ms' }}
        >
          A Buildmap segít megbecsülni az építkezés vagy felújítás várható idejét,
          költségsávját, fázisait, szükséges szakembereit és anyaglogikáját.
        </p>

        {/* Feature pills */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 mb-8 animate-fade-up"
          style={{ animationDelay: '100ms' }}
        >
          {pills.map(p => (
            <span
              key={p.text}
              className="inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-3.5 py-2 border transition-all hover:scale-[1.02]"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--tx-secondary)',
                boxShadow: '0 1px 4px rgba(0,0,0,.05)',
              }}
            >
              {p.icon} {p.text}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up"
          style={{ animationDelay: '140ms' }}
        >
          {/* Primary */}
          <a
            href="#calculator"
            className="inline-flex items-center gap-2 text-sm font-semibold rounded-2xl px-6 py-3 text-white transition-all hover:scale-[1.02] active:scale-[.98]"
            style={{
              background: 'linear-gradient(135deg,#3D6B4A,#4A7C59)',
              boxShadow: '0 4px 14px rgba(74,124,89,.3)',
            }}
          >
            🏗️ Ütemterv készítése
          </a>

          {/* Secondary */}
          {onGoToProjektek && (
            <button
              type="button"
              onClick={onGoToProjektek}
              className="inline-flex items-center gap-2 text-sm font-semibold rounded-2xl px-6 py-3 border transition-all hover:scale-[1.02] active:scale-[.98]"
              style={{
                borderColor: 'var(--sage-border)',
                background: 'var(--sage-light)',
                color: 'var(--sage)',
              }}
            >
              📂 Projektjeim megnyitása
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
