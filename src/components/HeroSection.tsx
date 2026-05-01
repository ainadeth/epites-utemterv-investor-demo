export default function HeroSection() {
  const badges = [
    { icon: '📅', text: 'Automatikus dátumszámítás' },
    { icon: '🗺️', text: 'Fázisokra bontott roadmap' },
    { icon: '💰', text: 'Költségbecslés' },
    { icon: '📄', text: 'PDF export' },
  ]

  return (
    <section className="relative overflow-hidden pt-24 pb-14 text-center">
      {/* Ambient glow — sage green */}
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(ellipse at center, rgba(74,124,89,.10) 0%, transparent 65%)', filter: 'blur(40px)' }} />

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        {/* Eyebrow */}
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase rounded-full px-3.5 py-1.5 mb-6 animate-fade-in border"
          style={{ color: '#4A7C59', background: '#F0F7F2', borderColor: '#C8DFD0' }}>
          <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ background: '#4A7C59' }} />
          Ingyenes ütemtervkészítő
        </span>

        {/* Brand name */}
        <h1 className="font-serif text-5xl md:text-[3.5rem] font-medium leading-[1.1] mb-3 animate-fade-up"
          style={{ color: 'var(--tx-primary)' }}>
          Buildmap
        </h1>

        {/* Tagline */}
        <p className="font-serif text-xl md:text-2xl mb-5 animate-fade-up"
          style={{ color: '#4A7C59', animationDelay: '40ms', fontStyle: 'italic' }}>
          az építkezésed térképe.
        </p>

        {/* Supporting text */}
        <p className="text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-3 animate-fade-up"
          style={{ color: 'var(--tx-secondary)', animationDelay: '60ms' }}>
          Idő, költség, szakemberek és anyagok egy helyen.
        </p>
        <p className="text-sm leading-relaxed max-w-lg mx-auto mb-9 animate-fade-up"
          style={{ color: 'var(--tx-muted)', animationDelay: '80ms' }}>
          Tervezd meg építkezésed vagy felújításod átlátható ütemtervvel, költségbecsléssel,
          fázisokkal és szakemberlogikával.
        </p>

        {/* Feature badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 animate-fade-up" style={{ animationDelay: '120ms' }}>
          {badges.map(b => (
            <span key={b.text}
              className="inline-flex items-center gap-2 text-xs font-medium rounded-full px-4 py-2 border transition-all hover:scale-[1.02]"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--tx-secondary)', boxShadow: '0 1px 4px rgba(0,0,0,.05)' }}>
              {b.icon} {b.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
