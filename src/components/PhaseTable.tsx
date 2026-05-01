import { type ReactNode, type MouseEvent } from 'react'
import type { TimelineRow } from '../types'
import { formatDate } from '../utils/dateUtils'

const PHASE_COLORS = ['#4A7C59','#4A7090','#9A7A50','#4A8090','#7A7860','#5A6A80','#8A6A50']

export default function PhaseTable({ rows }: { rows: TimelineRow[] }) {
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
      <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse" style={{ minWidth: '480px' }}>
        <thead>
          <tr style={{ background: 'var(--surface-subtle)' }}>
            {['#', 'Fázis', 'Kezdés', 'Befejezés', 'Időtartam'].map((h, i) => (
              <th key={h}
                className="text-left text-[10px] font-semibold uppercase tracking-widest px-3 py-3 border-b"
                style={{ color: 'var(--tx-muted)', borderColor: 'var(--border)', width: i===0?'36px': i===1?'auto': i>=2&&i<4?'100px':'90px' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) =>
            row.kind === 'phase'
              ? <PhaseRowItem key={`p-${row.num}`}  row={row} color={PHASE_COLORS[(row.num - 1) % PHASE_COLORS.length]} isLast={i === rows.length - 1} />
              : <BufferRowItem key={`b-${row.phaseNum}`} row={row} color={PHASE_COLORS[(row.phaseNum - 1) % PHASE_COLORS.length]} isLast={i === rows.length - 1} />
          )}
        </tbody>
      </table>
      </div>
    </div>
  )
}

// ── Phase row ──────────────────────────────────────────────────────────────

function PhaseRowItem({ row, color, isLast }: { key?: string | number; row: Extract<TimelineRow, {kind:'phase'}>; color: string; isLast: boolean }) {
  const isAdjusted = row.days !== row.baseDays
  const borderStyle = isLast ? undefined : '1px solid var(--border)'

  if (row.hidden) {
    return (
      <tr className="opacity-30" style={{ background: 'var(--surface-subtle)' }}>
        <TdHidden>{row.num}</TdHidden>
        <TdHidden><span className="italic line-through">{row.name}</span></TdHidden>
        <TdHidden>–</TdHidden>
        <TdHidden>–</TdHidden>
        <TdHidden>–</TdHidden>
      </tr>
    )
  }

  return (
    <tr
      className="transition-colors"
      onMouseEnter={(e: MouseEvent<HTMLTableRowElement>) => (e.currentTarget.style.background = 'var(--surface-subtle)')}
      onMouseLeave={(e: MouseEvent<HTMLTableRowElement>) => (e.currentTarget.style.background = 'transparent')}
    >
      <td className="px-3 py-3 text-xs font-mono" style={{ color: 'var(--tx-muted)', borderBottom: borderStyle }}>{row.num}</td>
      <td className="px-3 py-3 text-xs font-medium" style={{ color: 'var(--tx-primary)', borderBottom: borderStyle }}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
          {row.name}
        </div>
      </td>
      <td className="px-3 py-3 text-xs" style={{ color: 'var(--tx-secondary)', borderBottom: borderStyle }}>{formatDate(row.start)}</td>
      <td className="px-3 py-3 text-xs" style={{ color: 'var(--tx-secondary)', borderBottom: borderStyle }}>{formatDate(row.end)}</td>
      <td className="px-4 py-3" style={{ borderBottom: borderStyle }}>
        <div className="flex items-center gap-1.5">
          <span className="inline-block text-xs font-semibold rounded-lg px-2.5 py-1"
            style={{ background: `${color}18`, color }}>
            {row.days} nap
          </span>
          {isAdjusted && (
            <span className="inline-block text-[10px] line-through rounded px-1.5 py-0.5"
              style={{ color: 'var(--tx-muted)', background: 'var(--surface-subtle)' }}
              title={`Alap időtartam: ${row.baseDays} nap`}>
              {row.baseDays}
            </span>
          )}
        </div>
      </td>
    </tr>
  )
}

// ── Buffer row ─────────────────────────────────────────────────────────────

function BufferRowItem({ row, color, isLast }: { key?: string | number; row: Extract<TimelineRow, {kind:'buffer'}>; color: string; isLast: boolean }) {
  const borderStyle = isLast ? undefined : '1px solid var(--border)'
  const isAdjusted  = row.days !== row.baseDays

  if (row.hidden) {
    return (
      <tr className="opacity-20" style={{ background: 'var(--surface-subtle)' }}>
        <TdHidden></TdHidden>
        <TdHidden><span className="italic line-through text-[11px]">{row.name}</span></TdHidden>
        <TdHidden>–</TdHidden>
        <TdHidden>–</TdHidden>
        <TdHidden>–</TdHidden>
      </tr>
    )
  }

  // Derive a muted version of the parent phase color
  const mutedBg    = `${color}0A`   // 4% fill
  const mutedBorder = `${color}30`  // 19% border

  return (
    <tr
      className="transition-colors"
      onMouseEnter={(e: MouseEvent<HTMLTableRowElement>) => (e.currentTarget.style.background = 'var(--surface-subtle)')}
      onMouseLeave={(e: MouseEvent<HTMLTableRowElement>) => (e.currentTarget.style.background = mutedBg)}
      style={{ background: mutedBg }}
    >
      {/* Empty # cell — visually grouped under parent */}
      <td className="px-4 py-2.5 text-xs" style={{ color: 'var(--tx-muted)', borderBottom: borderStyle }}>
        <span className="text-[10px] opacity-40">↳</span>
      </td>
      <td className="px-3 py-2.5" style={{ borderBottom: borderStyle }}>
        <div className="flex items-center gap-2">
          {/* Dashed indicator */}
          <span className="w-2 h-2 rounded-sm shrink-0 border"
            style={{ borderColor: mutedBorder, borderStyle: 'dashed', background: 'transparent' }} />
          <span className="text-xs italic" style={{ color: 'var(--tx-muted)' }}>{row.name}</span>
        </div>
      </td>
      <td className="px-4 py-2.5 whitespace-nowrap text-xs" style={{ color: 'var(--tx-muted)', borderBottom: borderStyle }}>{formatDate(row.start)}</td>
      <td className="px-4 py-2.5 whitespace-nowrap text-xs" style={{ color: 'var(--tx-muted)', borderBottom: borderStyle }}>{formatDate(row.end)}</td>
      <td className="px-3 py-2.5" style={{ borderBottom: borderStyle }}>
        <div className="flex items-center gap-1.5">
          <span className="inline-block text-[11px] font-medium rounded-lg px-2.5 py-1 border italic"
            style={{ background: mutedBg, borderColor: mutedBorder, color: 'var(--tx-muted)', borderStyle: 'dashed' }}>
            {row.days} nap
          </span>
          {isAdjusted && (
            <span className="inline-block text-[10px] line-through rounded px-1.5 py-0.5"
              style={{ color: 'var(--tx-muted)', background: 'var(--surface-subtle)' }}
              title={`Alap: ${row.baseDays} nap`}>
              {row.baseDays}
            </span>
          )}
        </div>
      </td>
    </tr>
  )
}

// ── Shared hidden cell ─────────────────────────────────────────────────────

function TdHidden({ children }: { children?: ReactNode }) {
  return (
    <td className="px-4 py-3 border-b text-xs" style={{ color: 'var(--tx-muted)', borderColor: 'var(--border)' }}>
      {children}
    </td>
  )
}
