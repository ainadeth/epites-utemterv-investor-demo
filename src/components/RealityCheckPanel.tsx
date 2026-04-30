import type { TimelineResult } from '../types'
import { evaluateRisk } from '../utils/riskUtils'

interface Props {
  result: TimelineResult
}

// Static delay risk items — edit here to update content
const DELAY_RISKS: {
  icon: string
  title: string
  range: string
  weeks: string
  description: string
  severity: 'low' | 'medium' | 'high'
}[] = [
  {
    icon: '📋',
    title: 'Engedélyeztetési csúszás',
    range: '+2–6 hét',
    weeks: '14–42 nap',
    description: 'Hatósági ügyintézés, hiánypótlások, fellebbezések.',
    severity: 'high',
  },
  {
    icon: '🧱',
    title: 'Anyaghiány / szállítási késés',
    range: '+1–3 hét',
    weeks: '7–21 nap',
    description: 'Egyedi anyagok, import termékek hosszabb átfutással.',
    severity: 'medium',
  },
  {
    icon: '🌧️',
    title: 'Időjárási hatás',
    range: '+1–2 hét',
    weeks: '7–14 nap',
    description: 'Esős vagy téli időszak lassíthatja a szerkezeti munkákat.',
    severity: 'low',
  },
  {
    icon: '👷',
    title: 'Alvállalkozói hozzáférhetőség',
    range: '+1–4 hét',
    weeks: '7–28 nap',
    description: 'Szabad kapacitás és ütemezési ütközések a szakiparágakban.',
    severity: 'medium',
  },
]

const SEVERITY_STYLE = {
  low:    { bg: '#F0FDF4', border: '#86EFAC', text: '#15803D', dot: '#22C55E' },
  medium: { bg: '#FFFBEB', border: '#FCD34D', text: '#92400E', dot: '#F59E0B' },
  high:   { bg: '#FEF2F2', border: '#FCA5A5', text: '#991B1B', dot: '#EF4444' },
}

export default function RealityCheckPanel({ result }: Props) {
  const risk       = evaluateRisk(result)
  const totalDelay = '5–15 hét'   // rough cumulative estimate

  return (
    <div className="card p-7 mt-6 animate-fade-up">

      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-rose-500/10 flex items-center justify-center text-sm">🔍</div>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>Valósági ellenőrzés</p>
            <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>Tipikus csúszási okok és becsült hatásuk</p>
          </div>
        </div>

        {/* Risk summary pill */}
        <div
          className="flex items-center gap-2 rounded-xl px-3.5 py-2 border text-xs font-semibold shrink-0"
          style={{ background: risk.bgColor, borderColor: risk.borderColor, color: risk.color }}
        >
          <span>{risk.emoji}</span>
          <span>{risk.label} ütemterv</span>
        </div>
      </div>

      {/* Delay risk cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {DELAY_RISKS.map(item => {
          const s = SEVERITY_STYLE[item.severity]
          return (
            <div
              key={item.title}
              className="rounded-2xl p-4 border transition-all hover:scale-[1.01]"
              style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl leading-none mt-0.5">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                    <p className="text-xs font-semibold" style={{ color: 'var(--tx-primary)' }}>{item.title}</p>
                    <span
                      className="shrink-0 text-[10px] font-bold rounded-lg px-2 py-0.5 border"
                      style={{ background: s.bg, borderColor: s.border, color: s.text }}
                    >
                      {item.range}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                    {item.description}
                  </p>
                  <p className="text-[10px] mt-1.5 font-medium" style={{ color: s.text }}>
                    <span className="inline-block w-1.5 h-1.5 rounded-full mr-1" style={{ background: s.dot }} />
                    {item.weeks}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary row */}
      <div
        className="rounded-2xl px-5 py-4 border flex items-center justify-between gap-4 flex-wrap"
        style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}
      >
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--tx-muted)' }}>
            Kumulált csúszás (becsült)
          </p>
          <p className="text-sm font-bold" style={{ color: 'var(--tx-primary)' }}>
            {totalDelay} összesen
          </p>
        </div>
        <TipsBlock risk={risk.level} />
      </div>

      {/* Disclaimer */}
      <p className="mt-4 text-[11px] leading-relaxed flex gap-1.5 items-start" style={{ color: 'var(--tx-muted)' }}>
        <span className="shrink-0 mt-px">ℹ️</span>
        A feltüntetett csúszások iparági tapasztalati adatokon alapulnak, nem garantált értékek.
        Egyedi projekteknél eltérések lehetségesek.
      </p>
    </div>
  )
}

// ── Tips based on risk level ───────────────────────────────────────────────

function TipsBlock({ risk }: { risk: 'realistic' | 'tight' | 'risky' }) {
  const tips: Record<typeof risk, { text: string; icon: string }[]> = {
    realistic: [
      { icon: '✅', text: 'Az ütemterv kellő tartalékkal rendelkezik.' },
    ],
    tight: [
      { icon: '💡', text: 'Tervezzen be legalább 3–4 hét puffert.' },
      { icon: '📞', text: 'Engedélyezést korán indítsa el.' },
    ],
    risky: [
      { icon: '⚠️', text: 'Javaslom az ütemterv felülvizsgálatát.' },
      { icon: '💡', text: 'Tervezzen be 6–8 hét tartalékidőt.' },
      { icon: '👷', text: 'Generálkivitelező csökkentheti a kockázatot.' },
    ],
  }

  return (
    <div className="flex flex-col gap-1.5">
      {tips[risk].map(t => (
        <p key={t.text} className="text-xs flex items-center gap-1.5" style={{ color: 'var(--tx-secondary)' }}>
          <span>{t.icon}</span>{t.text}
        </p>
      ))}
    </div>
  )
}
