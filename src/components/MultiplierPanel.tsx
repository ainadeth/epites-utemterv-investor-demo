import type { TimelineResult } from '../types'
import { getExecutionMode, getComplexity } from '../config/modifiers'

interface Props {
  result: TimelineResult
}

export default function MultiplierPanel({ result }: Props) {
  const {
    sizeMultiplier,
    executionMultiplier,
    complexityMultiplier,
    finalMultiplier,
    sizeM2,
    executionModeKey,
    complexityKey,
  } = result

  const executionLabel = getExecutionMode(executionModeKey).label
  const complexityLabel = getComplexity(complexityKey).label

  const rows: { label: string; value: number; detail: string }[] = [
    {
      label:  'Méret szorzó',
      value:  sizeMultiplier,
      detail: `${sizeM2} m²`,
    },
    {
      label:  'Kivitelezés mód',
      value:  executionMultiplier,
      detail: executionLabel,
    },
    {
      label:  'Komplexitás',
      value:  complexityMultiplier,
      detail: complexityLabel,
    },
  ]

  return (
    <div className="card p-6 mt-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-xl bg-violet-500/10 flex items-center justify-center text-sm">🔢</div>
        <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>
          Számítási tényezők
        </p>
      </div>

      {/* Factor rows */}
      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
        {rows.map((row, i) => (
          <div
            key={row.label}
            className="flex items-center justify-between px-5 py-3.5 gap-4"
            style={{
              borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : undefined,
              background: i % 2 === 0 ? 'var(--surface)' : 'var(--surface-subtle)',
            }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <p className="text-sm font-medium" style={{ color: 'var(--tx-primary)' }}>{row.label}</p>
              <p className="text-xs truncate" style={{ color: 'var(--tx-muted)' }}>{row.detail}</p>
            </div>
            <MultiplierBadge value={row.value} />
          </div>
        ))}

        {/* Final multiplier row — highlighted */}
        <div
          className="flex items-center justify-between px-5 py-4 gap-4"
          style={{ background: 'var(--surface-subtle)', borderTop: '2px solid var(--border-strong)' }}
        >
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>Végső időszorzó</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--tx-muted)' }}>
              {sizeMultiplier.toFixed(2)} × {executionMultiplier.toFixed(2)} × {complexityMultiplier.toFixed(2)}
            </p>
          </div>
          <MultiplierBadge value={finalMultiplier} large />
        </div>
      </div>

      {/* Disclaimer */}
      <p
        className="mt-4 text-xs leading-relaxed flex gap-2 items-start"
        style={{ color: 'var(--tx-muted)' }}
      >
        <span className="shrink-0 mt-0.5">ℹ️</span>
        Az ütemterv tájékoztató jellegű becslés. A tényleges időtartam függ a kivitelezéstől,
        engedélyezéstől és egyedi körülményektől.
      </p>
    </div>
  )
}

// ── Multiplier badge ───────────────────────────────────────────────────────

function MultiplierBadge({ value, large = false }: { value: number; large?: boolean }) {
  const pct     = Math.round((value - 1) * 100)
  const isAbove = value > 1.005
  const isBelow = value < 0.995
  const isNeutral = !isAbove && !isBelow

  const bg     = isNeutral ? 'var(--surface-subtle)' : isBelow ? '#F0FDF4' : '#EFF6FF'
  const border = isNeutral ? 'var(--border)'          : isBelow ? '#86EFAC' : '#93C5FD'
  const color  = isNeutral ? 'var(--tx-secondary)'    : isBelow ? '#15803D' : '#1D4ED8'

  const label = isNeutral
    ? `${value.toFixed(2).replace('.', ',')}×`
    : `${isBelow ? '−' : '+'}${Math.abs(pct)}% · ${value.toFixed(2).replace('.', ',')}×`

  return (
    <span
      className="shrink-0 rounded-xl border font-semibold tabular-nums transition-all"
      style={{
        background: bg,
        borderColor: border,
        color,
        fontSize:   large ? '13px' : '11px',
        padding:    large ? '6px 14px' : '4px 10px',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  )
}
