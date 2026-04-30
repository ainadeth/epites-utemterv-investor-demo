export default function HeroSection() {
  const badges = [
    { icon: '📅', text: 'Automatikus dátumszámítás' },
    { icon: '🗺️', text: 'Fázisokra bontott roadmap' },
    { icon: '📄', text: 'PDF export' },
  ]

  return (
    <section className="relative overflow-hidden pt-24 pb-14 text-center">
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(ellipse at center, rgba(37,99,235,.12) 0%, transparent 65%)', filter: 'blur(40px)' }} />

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-100 dark:border-blue-900/60 rounded-full px-3.5 py-1.5 mb-6 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block animate-pulse" />
          Ingyenes ütemtervkészítő
        </span>

        <h1 className="font-serif text-4xl md:text-[3.25rem] font-medium leading-[1.18] mb-5 animate-fade-up"
          style={{ color: 'var(--tx-primary)' }}>
          Építkezési ütemterv{' '}
          <span style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            percek alatt
          </span>
        </h1>

        <p className="text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-9 animate-fade-up"
          style={{ color: 'var(--tx-secondary)', animationDelay: '60ms' }}>
          Tervezze meg lakásfelújítását, családi ház építését vagy bővítését átlátható,
          fázisokra bontott ütemtervvel.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2.5 animate-fade-up" style={{ animationDelay: '120ms' }}>
          {badges.map(b => (
            <span key={b.text}
              className="inline-flex items-center gap-2 text-xs font-medium rounded-full px-4 py-2 border transition-all hover:scale-[1.02]"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--tx-secondary)', boxShadow: '0 1px 4px rgba(0,0,0,.06)' }}>
              {b.icon} {b.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
