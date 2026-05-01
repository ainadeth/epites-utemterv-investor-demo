import { useState } from 'react'
import { EarlyAccessModal, type RegistrationRole } from './Szakemberek'

// ── Data — edit here to update content ────────────────────────────────────

const PLATFORM_PILLARS = [
  {
    icon: '⏱️',
    title: 'Időtervezés',
    text: 'Építési fázisok, becsült időtartamok, függőségek és várható csúszási pontok érthetően.',
    color: '#3B82F6',
    bg:    '#EFF6FF',
  },
  {
    icon: '💰',
    title: 'Költségbecslés',
    text: 'Nagyságrendi költségsáv, minőségi szint, kockázati tényezők és pénzügyi döntéstámogatás.',
    color: '#10B981',
    bg:    '#ECFDF5',
  },
  {
    icon: '👷',
    title: 'Validált szakember-ökoszisztéma',
    text: 'Kivitelezők, szakági szakemberek, műszaki ellenőrök, ügyvédek és finanszírozók későbbi előszűrt rendszere.',
    color: '#8B5CF6',
    bg:    '#F5F3FF',
  },
  {
    icon: '🧱',
    title: 'Anyagbeszerzési iránytű',
    text: 'Fázisokhoz kötött anyaglista, tüzépek, márkák, akciók és beszerzési ajánlások későbbi integrációja.',
    color: '#F59E0B',
    bg:    '#FFFBEB',
  },
]

const REVENUE_STREAMS = [
  {
    icon: '🔐',
    title: 'Pro előfizetés',
    text: 'Részletes terv, PDF export, naptár, checklist, anyaglista és mélyebb költségtervezés.',
  },
  {
    icon: '🤝',
    title: 'Szakember lead díj',
    text: 'Ajánlatkérések közvetítése validált szakembereknek és szolgáltatóknak.',
  },
  {
    icon: '🏷️',
    title: 'Kiemelt partnermegjelenés',
    text: 'Tüzépek, márkák, finanszírozók, ügyvédek és kivitelezők célzott megjelenése.',
  },
  {
    icon: '🔗',
    title: 'Affiliate / ajánlói jutalék',
    text: 'Anyagbeszerzési ajánlások, termékajánlók és akciók későbbi monetizációja.',
  },
]

// ── Main component ─────────────────────────────────────────────────────────

export default function StrategicSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const [initRole,  setInitRole]  = useState<RegistrationRole | ''>('')

  function openModal(role: RegistrationRole | '') {
    setInitRole(role)
    setModalOpen(true)
  }

  return (
    <>
      <section className="mt-16 mb-4 animate-fade-up">

        {/* ── Section eyebrow ── */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border shrink-0"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--tx-muted)' }}
          >
            Termékjövőkép
          </span>
          <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
        </div>

        {/* ── Platform vision header ── */}
        <div className="text-center max-w-2xl mx-auto mb-10 px-4">
          <h2
            className="font-serif text-2xl md:text-3xl font-medium mb-3 leading-snug"
            style={{ color: 'var(--tx-primary)' }}
          >
            Több, mint építkezési kalkulátor
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
            Egy döntéstámogató platform civil építkezőknek: idő, költség, fázisok,
            szakemberek és anyagbeszerzés egy helyen.
          </p>
          <p className="text-sm leading-relaxed mt-2 font-medium" style={{ color: '#4A7C59' }}>
            Buildmap nem csak kalkulátor, hanem belépési pont egy építőipari platformhoz:
            ütemterv, költség, szakemberek, anyagok és később projektmenedzsment egy rendszerben.
          </p>
          <p className="text-xs leading-relaxed mt-2" style={{ color: 'var(--tx-muted)' }}>
            A fiókalapú működés később lehetővé teszi a mentett projekteket,
            szakember-hozzáféréseket, Pro csomagokat és projektmenedzsment irányt.
          </p>
        </div>

        {/* ── 4 platform pillars ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {PLATFORM_PILLARS.map(p => (
            <PillarCard key={p.title} pillar={p} />
          ))}
        </div>

        {/* ── Revenue streams section ── */}
        <div
          className="rounded-3xl p-8 mb-10 border"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <div className="flex items-center gap-2.5 mb-6">
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center text-sm shrink-0"
              style={{ background: 'linear-gradient(135deg,#1D4ED8,#7C3AED)', color: '#fff' }}
            >
              <span className="text-[11px] font-bold">₣</span>
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>
                Lehetséges bevételi lábak
              </p>
              <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>
                Egymásra épülő, skálázható modell
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {REVENUE_STREAMS.map((s, i) => (
              <RevenueCard key={s.title} stream={s} index={i} />
            ))}
          </div>
        </div>

        {/* ── Future workspace vision ── */}
        <div className="card p-7 mb-8">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0" style={{ background: '#EFF6FF' }}>🗂️</div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>Későbbi projekt workspace</p>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)', color: 'var(--tx-muted)' }}>Vízió</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                A hosszabb távú vízió szerint egy-egy építkezés saját projektfelületet kaphat, ahol a tulajdonos,
                projektmenedzser vagy generálkivitelező meghívhatja az érintett szakembereket. A szakemberek e-mailes
                hozzáféréssel csak a saját fázisukat és a kapcsolódó előtte/utána lévő feladatokat látnák, így
                átláthatóbbá válhat a kivitelezés szervezése.
              </p>
            </div>
          </div>
          <ul className="flex flex-col gap-2 pl-14">
            {[
              'Tulajdonos, projektmenedzser vagy generálkivitelező kezelheti a projektet',
              'Szakemberek e-mail alapján meghívhatók',
              'Minden szereplő csak a releváns fázisokat láthatja',
              'Státuszok és következő lépések követhetők',
              'Hosszabb távon SaaS + marketplace irányba bővíthető',
            ].map(item => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: '#3B82F6' }} />
                <span className="text-xs leading-relaxed" style={{ color: 'var(--tx-secondary)' }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Technical roadmap card ── */}
        <div className="card p-6 mb-6 border-l-4" style={{ borderLeftColor: '#3B82F6' }}>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="text-lg">🛠️</span>
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>Következő technikai lépés: valódi lead mentés</p>
              <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>Roadmap — még nem implementált</p>
            </div>
          </div>
          <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--tx-secondary)' }}>
            A PDF export élesítéséhez backend vagy serverless funkció, e-mail szolgáltató, adatbázis és adatkezelési oldal szükséges. Ezzel a kalkulátor valódi leadgeneráló eszközzé válhat.
          </p>
          <ul className="flex flex-col gap-1.5">
            {['PDF generálás', 'e-mail küldés', 'lead mentés', 'adatkezelési checkbox és privacy oldal', 'CRM / Google Sheets / Airtable / Supabase integráció'].map(item => (
              <li key={item} className="flex items-center gap-2 text-[11px]" style={{ color: 'var(--tx-secondary)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />{item}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Early access strip ── */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #312E81 100%)',
          }}
        >
          {/* Decorative blur */}
          <div
            aria-hidden
            className="pointer-events-none absolute w-96 h-96 rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, #60A5FA 0%, transparent 70%)',
              filter: 'blur(60px)',
              top: '-4rem',
              right: '-4rem',
            }}
          />

          <div className="relative px-8 py-10 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

              {/* Left: copy */}
              <div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-300 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  Érdeklődői adatbázis
                </span>
                <h3 className="font-serif text-xl md:text-2xl font-medium text-white mb-3 leading-snug">
                  Érdeklődői adatbázis építése már az első verziótól
                </h3>
                <p className="text-sm text-blue-100 leading-relaxed">
                  Az értesítést kérek és szakember jelentkezés funkciók később
                  validációs és értékesítési csatornává alakíthatók.
                </p>
              </div>

              {/* Right: CTAs */}
              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => openModal('epitkezo')}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold text-white border border-white/25 bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-[1.02] active:scale-[.98]"
                >
                  🏠 Építkező vagyok
                </button>
                <button
                  type="button"
                  onClick={() => openModal('kivitelező')}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold border border-white/25 bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-[1.02] active:scale-[.98]"
                  style={{ color: '#fff' }}
                >
                  👷 Szakember vagyok
                </button>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Modal */}
      {modalOpen && (
        <EarlyAccessModal
          initialRole={initRole}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────

function PillarCard({ pillar }: {
  key?: string
  pillar: (typeof PLATFORM_PILLARS)[0]
}) {
  return (
    <div
      className="card p-6 flex gap-5 items-start transition-all hover:scale-[1.01]"
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0"
        style={{ background: pillar.bg }}
      >
        {pillar.icon}
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p className="text-sm font-semibold mb-1.5 leading-snug" style={{ color: 'var(--tx-primary)' }}>
          {pillar.title}
        </p>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
          {pillar.text}
        </p>
      </div>

      {/* Right accent dot */}
      <div
        className="w-2 h-2 rounded-full mt-1 shrink-0"
        style={{ background: pillar.color, opacity: 0.5 }}
      />
    </div>
  )
}

function RevenueCard({ stream, index }: {
  key?: string
  stream: (typeof REVENUE_STREAMS)[0]
  index: number
}) {
  // Subtle gradient strip at top keyed to index
  const accents = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B']
  const accent  = accents[index % accents.length]

  return (
    <div
      className="rounded-2xl p-4 border relative overflow-hidden transition-all hover:scale-[1.02]"
      style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${accent} 0%, transparent 100%)` }}
      />
      <div className="text-xl mb-3 mt-1">{stream.icon}</div>
      <p className="text-xs font-semibold mb-1.5" style={{ color: 'var(--tx-primary)' }}>{stream.title}</p>
      <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>{stream.text}</p>
    </div>
  )
}
