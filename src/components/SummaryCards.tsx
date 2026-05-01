import type { TimelineResult } from '../types'
import { formatDate } from '../utils/dateUtils'
import RiskBadge from './RiskBadge'

export default function SummaryCards({ result }: { result: TimelineResult }) {
  const items = [
    { label: 'Kezdés',            value: formatDate(result.projectStart), icon: '🚀' },
    { label: 'Várható befejezés', value: formatDate(result.projectEnd),   icon: '🏁' },
    { label: 'Teljes időtartam',  value: `${result.totalDays} nap`,        icon: '⏱️' },
  ]

  return (
    <>
      {/* Risk status badge — sits between card header and the three metric cards */}
      <RiskBadge result={result} />

      {/* Three summary metric cards */}
      <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 mb-6" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        {items.map(it => (
          <div key={it.label}
            className="rounded-2xl p-4 border transition-all hover:scale-[1.01]"
            style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}
          >
            <div className="text-lg mb-2">{it.icon}</div>
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--tx-muted)' }}>
              {it.label}
            </p>
            <p className="text-sm font-bold leading-snug" style={{ color: 'var(--tx-primary)' }}>
              {it.value}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}
