// ── Data ──────────────────────────────────────────────────────────────────

const SCALE_CARDS = [
  {
    icon: '🚪',
    title: 'Ingyenes kalkulátor mint belépési pont',
    text: 'A felhasználó azonnali értéket kap, miközben a rendszer építkezési szándékot, projektméretet, időzítést és költségkeretet azonosít.',
    color: '#3B82F6',
    bg:    '#EFF6FF',
  },
  {
    icon: '📧',
    title: 'PDF export mint lead capture',
    text: 'A saját ütemterv e-mail címért cserébe letölthető. Ez magas szándékú leadet jelent, nem passzív hírlevél-feliratkozást.',
    color: '#8B5CF6',
    bg:    '#F5F3FF',
  },
  {
    icon: '🎯',
    title: 'Projektadat-alapú ajánlás',
    text: 'A megadott adatokból később célzott szakember-, anyagbeszerzési, finanszírozási és jogi ajánlások építhetők.',
    color: '#10B981',
    bg:    '#ECFDF5',
  },
  {
    icon: '🏪',
    title: 'Marketplace konverzió',
    text: 'A kalkuláció után természetes következő lépés az ajánlatkérés: kivitelezők, szakemberek, tüzépek, ügyvédek és finanszírozók felé.',
    color: '#F59E0B',
    bg:    '#FFFBEB',
  },
  {
    icon: '💸',
    title: 'Több bevételi pont',
    text: 'Pro csomag, PDF export, szakember lead díj, kiemelt partnermegjelenés, affiliate jutalék és finanszírozási közvetítés.',
    color: '#EC4899',
    bg:    '#FDF2F8',
  },
  {
    icon: '🗄️',
    title: 'Adatvagyon és visszamérés',
    text: 'A projektadatok és később ajánlatkérések alapján pontosabb becslések, jobb ajánlások és magasabb konverzió építhető.',
    color: '#06B6D4',
    bg:    '#ECFEFF',
  },
]

const FUNNEL_STEPS = [
  { label: 'Forgalom',     icon: '📡', color: '#3B82F6' },
  { label: 'Kalkulátor',   icon: '🏗️', color: '#8B5CF6' },
  { label: 'PDF lead',     icon: '📧', color: '#10B981' },
  { label: 'Projektadat',  icon: '🗂️', color: '#F59E0B' },
  { label: 'Ajánlatkérés', icon: '📩', color: '#EC4899' },
  { label: 'Partnerbevétel',icon: '💸', color: '#06B6D4' },
]

// ── Main component ─────────────────────────────────────────────────────────

export default function ScalabilitySection() {
  return (
    <section className="mt-10 mb-16 animate-fade-up">

      {/* Divider */}
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
        <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border shrink-0"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--tx-muted)' }}>
          Platformstratégia
        </span>
        <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 px-4">
        <h2 className="font-serif text-2xl md:text-3xl font-medium mb-3 leading-snug" style={{ color: 'var(--tx-primary)' }}>
          Skálázható platformmodell
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
          Az építkezési kalkulátor csak a belépési pont. A valódi érték a projektadatokra
          épülő, többszereplős építőipari ökoszisztéma.
        </p>
      </div>

      {/* 6 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {SCALE_CARDS.map((card) => (
          <ScaleCard key={card.title} card={card} />
        ))}
      </div>

      {/* Funnel + investor note */}
      <div className="rounded-3xl border p-6 sm:p-8 mb-6" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <p className="text-[10px] font-bold uppercase tracking-widest text-center mb-6" style={{ color: 'var(--tx-muted)' }}>
          Platform értéklánc
        </p>
        <div className="overflow-x-auto pb-2">
          <div className="flex items-center justify-center gap-0 min-w-max mx-auto">
            {FUNNEL_STEPS.map((step, i) => (
              <FunnelStep key={step.label} step={step} isLast={i === FUNNEL_STEPS.length - 1} />
            ))}
          </div>
        </div>
        <div className="mt-7 rounded-2xl p-4 border-l-4" style={{ background: 'var(--surface-subtle)', borderLeftColor: '#3B82F6' }}>
          <p className="text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#3B82F6' }}>Skálázási logika</p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--tx-secondary)' }}>
            Az ingyenes kalkulátorok és SEO tartalmak forgalmat hoznak, a PDF export e-mail leadet gyűjt,
            a projektadat pedig később Pro, marketplace és partneri bevétellé alakítható.
          </p>
        </div>
      </div>

    </section>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────

function ScaleCard({ card }: { key?: string; card: (typeof SCALE_CARDS)[0] }) {
  return (
    <div className="card p-5 flex flex-col gap-3 transition-all hover:scale-[1.01]">
      <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0" style={{ background: card.bg }}>
        {card.icon}
      </div>
      <div>
        <p className="text-sm font-semibold mb-1.5 leading-snug" style={{ color: 'var(--tx-primary)' }}>{card.title}</p>
        <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>{card.text}</p>
      </div>
      <div className="h-0.5 rounded-full mt-auto" style={{ background: `linear-gradient(90deg, ${card.color} 0%, transparent 100%)` }} />
    </div>
  )
}

function FunnelStep({ step, isLast }: { key?: string; step: (typeof FUNNEL_STEPS)[0]; isLast: boolean }) {
  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center gap-1.5 px-2">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg shadow-sm border"
          style={{ background: `${step.color}15`, borderColor: `${step.color}35` }}>
          {step.icon}
        </div>
        <span className="text-[10px] font-semibold text-center leading-tight whitespace-nowrap"
          style={{ color: step.color, maxWidth: '64px' }}>
          {step.label}
        </span>
      </div>
      {!isLast && (
        <div className="flex items-center pb-5 px-0.5">
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path d="M1 5h12M10 1l4 4-4 4" stroke="var(--border-strong)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </div>
  )
}
