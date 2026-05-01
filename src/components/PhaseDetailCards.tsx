import { useState, type ReactNode, type MouseEvent } from 'react'
import type { TimelineResult, PhaseRow } from '../types'
import { formatDate } from '../utils/dateUtils'
import { PHASE_DETAILS } from '../data/phaseDetails'

interface Props {
  result: TimelineResult
}

const PHASE_COLORS = ['#4A7C59', '#4A7090', '#9A7A50', '#4A8090', '#7A7860', '#5A6A80', '#8A6A50']

export default function PhaseDetailCards({ result }: Props) {
  const phaseRows = result.rows.filter(
    (r): r is PhaseRow => r.kind === 'phase' && !r.hidden,
  )

  if (phaseRows.length === 0) return null

  return (
    <div className="card p-7 mt-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-6">
        <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center text-sm">
          📋
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>
            Fázis részletek
          </p>
          <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>
            Kattints egy fázisra a részletek megtekintéséhez
          </p>
        </div>
        {/* Free teaser label */}
        <span
          className="ml-auto shrink-0 text-[10px] font-semibold uppercase tracking-wider rounded-lg px-2.5 py-1 border"
          style={{
            background: 'var(--surface-subtle)',
            borderColor: 'var(--border)',
            color: 'var(--tx-muted)',
          }}
        >
          Ingyenes verzió
        </span>
      </div>

      {/* Accordion list */}
      <div className="flex flex-col gap-2">
        {phaseRows.map((row, i) => (
          <PhaseAccordionItem
            key={row.num}
            row={row}
            color={PHASE_COLORS[(row.num - 1) % PHASE_COLORS.length]}
            defaultOpen={i === 0}
          />
        ))}
      </div>

      {/* Bottom disclaimer */}
      <p className="mt-5 text-[11px] leading-relaxed flex gap-1.5 items-start" style={{ color: 'var(--tx-muted)' }}>
        <span className="shrink-0">ℹ️</span>
        Az itt feltüntetett információk általános iránymutató jellegűek.
        Projektenként eltérések lehetségesek — mindig egyezz egyedi kivitelezővel.
      </p>
    </div>
  )
}

// ── Single accordion item ──────────────────────────────────────────────────

interface ItemProps {
  key?: string | number
  row: PhaseRow
  color: string
  defaultOpen: boolean
}

function PhaseAccordionItem({ row, color, defaultOpen }: ItemProps) {
  const [open, setOpen] = useState(defaultOpen)
  const detail = PHASE_DETAILS[row.name]

  return (
    <div
      className="rounded-2xl border overflow-hidden transition-all duration-200"
      style={{
        borderColor: open ? `${color}40` : 'var(--border)',
        background:  open ? `${color}06` : 'var(--surface)',
      }}
    >
      {/* Trigger row */}
      <button
        type="button"
        onClick={() => setOpen((v: boolean) => !v)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left transition-colors"
        style={{ background: 'transparent' }}
        onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
          if (!open) (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-subtle)'
        }}
        onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
        }}
      >
        {/* Phase color dot + number */}
        <span
          className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 text-white"
          style={{ background: color }}
        >
          {row.num}
        </span>

        {/* Name + dates */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold leading-snug truncate" style={{ color: 'var(--tx-primary)' }}>
            {row.name}
          </p>
          <p className="text-[11px] mt-0.5" style={{ color: 'var(--tx-muted)' }}>
            {formatDate(row.start)} – {formatDate(row.end)}
            {' · '}
            <span className="font-medium" style={{ color }}>{row.days} nap</span>
          </p>
        </div>

        {/* Részletek label */}
        <span
          className="shrink-0 text-[11px] font-medium hidden sm:block mr-1"
          style={{ color: open ? color : 'var(--tx-muted)' }}
        >
          {open ? 'Bezárás' : 'Részletek'}
        </span>

        {/* Chevron */}
        <span
          className="shrink-0 transition-transform duration-200"
          style={{
            color: 'var(--tx-muted)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            display: 'inline-block',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {/* Expanded content */}
      {open && (
        <div
          className="px-5 pb-5 border-t"
          style={{ borderColor: `${color}20` }}
        >
          {detail ? (
            <DetailContent detail={detail} color={color} />
          ) : (
            <p className="pt-4 text-xs italic" style={{ color: 'var(--tx-muted)' }}>
              Ehhez a fázishoz nincs részletes leírás.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

// ── Detail content grid ────────────────────────────────────────────────────

function DetailContent({
  detail,
  color,
}: {
  detail: import('../data/phaseDetails').PhaseDetail
  color: string
}) {
  return (
    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">

      {/* Szükséges szakemberek */}
      <DetailBlock
        icon="👷"
        title="Szükséges szakemberek"
        color={color}
      >
        <div className="flex flex-wrap gap-1.5 mt-2">
          {detail.specialists.map(s => (
            <span
              key={s}
              className="text-[11px] font-medium rounded-lg px-2.5 py-1 border"
              style={{
                background: `${color}10`,
                borderColor: `${color}30`,
                color,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </DetailBlock>

      {/* Tipikus kockázatok */}
      <DetailBlock
        icon="⚠️"
        title="Tipikus kockázatok"
        color="#F59E0B"
      >
        <ul className="mt-2 flex flex-col gap-1.5">
          {detail.risks.map(r => (
            <li key={r} className="flex items-start gap-2 text-[11px] leading-relaxed" style={{ color: 'var(--tx-secondary)' }}>
              <span className="shrink-0 w-1 h-1 rounded-full mt-1.5 bg-amber-400" />
              {r}
            </li>
          ))}
        </ul>
      </DetailBlock>

      {/* Mire figyelj */}
      <DetailBlock
        icon="💡"
        title="Mire figyelj"
        color="#8B5CF6"
      >
        <p className="mt-2 text-[11px] leading-relaxed" style={{ color: 'var(--tx-secondary)' }}>
          {detail.watchOut}
        </p>
      </DetailBlock>

      {/* Következő lépés */}
      <DetailBlock
        icon="➡️"
        title="Következő lépés"
        color="#10B981"
      >
        <p className="mt-2 text-[11px] leading-relaxed" style={{ color: 'var(--tx-secondary)' }}>
          {detail.nextStep}
        </p>
      </DetailBlock>

    </div>
  )
}

// ── Small labelled block ───────────────────────────────────────────────────

function DetailBlock({
  icon,
  title,
  color,
  children,
}: {
  icon: string
  title: string
  color: string
  children: ReactNode
}) {
  return (
    <div
      className="rounded-2xl p-4 border"
      style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm leading-none">{icon}</span>
        <p
          className="text-[10px] font-semibold uppercase tracking-wider"
          style={{ color }}
        >
          {title}
        </p>
      </div>
      {children}
    </div>
  )
}
