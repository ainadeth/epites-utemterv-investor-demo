import type { TimelineResult } from '../types'
import { evaluateRisk } from '../utils/riskUtils'

interface Props {
  result: TimelineResult
}

export default function RiskBadge({ result }: Props) {
  const risk = evaluateRisk(result)

  return (
    <div
      className="flex items-center gap-2 rounded-2xl px-4 py-3 border mb-6 transition-all"
      style={{
        background:   risk.bgColor,
        borderColor:  risk.borderColor,
      }}
      title={`Kockázat: ${risk.label} (${risk.reason})`}
    >
      {/* Status dot + label */}
      <span className="text-base leading-none">{risk.emoji}</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold leading-none mb-0.5" style={{ color: risk.color }}>
          {risk.label}
        </p>
        <p className="text-[11px] leading-snug truncate" style={{ color: risk.color, opacity: 0.75 }}>
          {risk.reason}
        </p>
      </div>
      <span
        className="shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-lg"
        style={{ background: `${risk.borderColor}60`, color: risk.color }}
      >
        Projekt kockázat
      </span>
    </div>
  )
}
