import type { TabKey } from './StickyHeader'

interface Props {
  onNavigate?: (tab: TabKey) => void
}

export default function CTASection({ onNavigate }: Props) {
  return (
    <section className="mt-14 mb-14">
      <div className="rounded-3xl p-10 md:p-14 text-center border relative overflow-hidden"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>

        {/* Subtle sage ambient glow */}
        <div aria-hidden className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{ background: 'radial-gradient(ellipse at 60% 0%, rgba(74,124,89,.07) 0%, transparent 65%)' }} />

        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase rounded-full px-3.5 py-1.5 mb-5 border"
            style={{ color: 'var(--sage)', background: 'var(--sage-light)', borderColor: 'var(--sage-border)' }}>
            ✦ Pro verzió
          </span>

          <h2 className="font-serif text-2xl md:text-3xl font-medium mb-3 leading-tight"
            style={{ color: 'var(--tx-primary)' }}>
            Ez csak az első verzió.
          </h2>

          <p className="text-sm md:text-base max-w-lg mx-auto leading-relaxed mb-8"
            style={{ color: 'var(--tx-muted)' }}>
            A következő lépésben a projektedhez kapcsolódó részletesebb terv, checklisták,
            szakember- és anyaglogika is elérhetővé válik.
          </p>

          <button
            type="button"
            onClick={() => { onNavigate?.('pro'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="inline-flex items-center gap-2 font-semibold text-sm rounded-2xl px-7 py-3.5 text-white transition-all hover:scale-[1.02] active:scale-[.98]"
            style={{
              background: 'linear-gradient(135deg,#3D6B4A,#4A7C59)',
              boxShadow: '0 4px 14px rgba(74,124,89,.30)',
            }}
          >
            Pro terv előnézet
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
