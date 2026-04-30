export default function CTASection() {
  return (
    <section className="mt-14 mb-14">
      <div className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 55%, #4F46E5 100%)' }}>
        {/* Decorative blobs */}
        <div aria-hidden className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-10 translate-x-1/3 -translate-y-1/3"
          style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }} />
        <div aria-hidden className="absolute bottom-0 left-0 w-56 h-56 rounded-full pointer-events-none opacity-10 -translate-x-1/3 translate-y-1/3"
          style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }} />

        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase text-blue-200 bg-white/10 border border-white/20 rounded-full px-3.5 py-1.5 mb-5">
            🚀 Hamarosan
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-white mb-3 leading-tight">
            Ez csak az első verzió.
          </h2>
          <p className="text-blue-100 text-sm md:text-base max-w-lg mx-auto leading-relaxed mb-8">
            A következő lépésben részletes költségbecslés, kivitelezői checklist és PDF export is készülhet.
          </p>
          <button type="button"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold text-sm rounded-2xl px-7 py-3.5 transition-all duration-200 hover:bg-blue-50 hover:scale-[1.02] active:scale-[.98] shadow-lg"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,.25)' }}>
            Részletes terv készítése
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
