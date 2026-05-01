import type { TimelineResult } from '../types'
import SummaryCards from './SummaryCards'
import PhaseTable from './PhaseTable'
import EmptyState from './EmptyState'

export default function OutputCard({ result }: { result: TimelineResult | null }) {
  return (
    <div className="card overflow-hidden animate-fade-up" style={{ animationDelay: '80ms' }}>
      {result === null
        ? <EmptyState />
        : <div className="p-6 animate-scale-in">
            <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b flex-wrap min-w-0" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base shrink-0"
                  style={{ background: '#E8F5EC' }}>✅</div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>Ütemterv</p>
                  <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>Fázisonkénti bontás</p>
                </div>
              </div>
              <FinalMultiplierPill result={result} />
            </div>
            <SummaryCards result={result} />
            <PhaseTable rows={result.rows} />
          </div>
      }
    </div>
  )
}

function FinalMultiplierPill({ result }: { result: TimelineResult }) {
  const { finalMultiplier, sizeM2 } = result
  const isNeutral = Math.abs(finalMultiplier - 1) < 0.005
  const isBelow   = finalMultiplier < 0.995

  const bg     = isNeutral ? 'var(--surface-subtle)' : isBelow ? '#F0FDF4' : '#EFF6FF'
  const border = isNeutral ? 'var(--border)'          : isBelow ? '#86EFAC' : '#93C5FD'
  const color  = isNeutral ? 'var(--tx-muted)'        : isBelow ? '#15803D' : '#1D4ED8'

  return (
    <div
      className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 border text-xs font-medium shrink-0 transition-all max-w-[200px]"
      style={{ background: bg, borderColor: border, color }}
      title={`Méret: ${sizeM2} m² · Végső szorzó: ${finalMultiplier.toFixed(3)}×`}
    >
      <span className="text-sm shrink-0">📐</span>
      <span className="truncate">
        <span className="font-bold">{sizeM2} m²</span>
        {' · '}
        <span>{finalMultiplier.toFixed(2).replace('.', ',')}×</span>
      </span>
    </div>
  )
}
