import { type ReactNode, type MouseEvent } from 'react'
import type { TimelineRow } from '../types'

const PHASE_COLORS = ['#4A7C59','#4A7090','#9A7A50','#4A8090','#7A7860','#5A6A80','#8A6A50']

// Format date into a compact but readable form: "máj. 12."
function fmtDate(d: Date): string {
  return d.toLocaleDateString('hu-HU', { month: 'short', day: 'numeric' })
}

export default function PhaseTable({ rows }: { rows: TimelineRow[] }) {
  return (
    <div className="rounded-2xl border overflow-hidden w-full" style={{ borderColor: 'var(--border)' }}>
      <table
        className="w-full text-xs border-collapse"
        style={{ tableLayout: 'fixed' }}
      >
        <colgroup>
          <col style={{ width: '32px' }} />      {/* # */}
          <col style={{ width: 'auto' }} />       {/* Fázis — flex */}
          <col style={{ width: '82px' }} />       {/* Kezdés */}
          <col style={{ width: '82px' }} />       {/* Befejezés */}
          <col style={{ width: '84px' }} />       {/* Időtartam */}
        </colgroup>
        <thead>
          <tr style={{ background: 'var(--surface-subtle)' }}>
            {['#', 'Fázis', 'Kezdés', 'Befejezés', 'Idő'].map(h => (
              <th key={h}
                className="text-left text-[9px] font-semibold uppercase tracking-widest px-2.5 py-2.5 border-b"
                style={{ color: 'var(--tx-muted)', borderColor: 'var(--border)' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) =>
            row.kind === 'phase'
              ? <PhaseRowItem
                  key={`p-${row.num}`}
                  row={row}
                  color={PHASE_COLORS[(row.num - 1) % PHASE_COLORS.length]}
                  isLast={i === rows.length - 1}
                />
              : <BufferRowItem
                  key={`b-${row.phaseNum}`}
                  row={row}
                  color={PHASE_COLORS[(row.phaseNum - 1) % PHASE_COLORS.length]}
                  isLast={i === rows.length - 1}
                />
          )}
        </tbody>
      </table>
    </div>
  )
}

// ── Phase row ──────────────────────────────────────────────────────────────

function PhaseRowItem({ row, color, isLast }: {
  key?: string | number
  row: Extract<TimelineRow, {kind:'phase'}>
  color: string
  isLast: boolean
}) {
  const isAdjusted  = row.days !== row.baseDays
  const borderStyle = isLast ? undefined : '1px solid var(--border)'

  if (row.hidden) {
    return (
      <tr className="opacity-30" style={{ background: 'var(--surface-subtle)' }}>
        <Td style={{ borderBottom: borderStyle }}>{row.num}</Td>
        <Td style={{ borderBottom: borderStyle }}><span className="italic line-through">{row.name}</span></Td>
        <Td style={{ borderBottom: borderStyle }}>–</Td>
        <Td style={{ borderBottom: borderStyle }}>–</Td>
        <Td style={{ borderBottom: borderStyle }}>–</Td>
      </tr>
    )
  }

  return (
    <tr
      className="transition-colors"
      onMouseEnter={(e: MouseEvent<HTMLTableRowElement>) => (e.currentTarget.style.background = 'var(--surface-subtle)')}
      onMouseLeave={(e: MouseEvent<HTMLTableRowElement>) => (e.currentTarget.style.background = 'transparent')}
    >
      <Td style={{ borderBottom: borderStyle, color: 'var(--tx-muted)', fontFamily: 'monospace' }}>
        {row.num}
      </Td>
      <Td style={{ borderBottom: borderStyle, color: 'var(--tx-primary)', fontWeight: 500 }}>
        <div className="flex items-start gap-1.5 min-w-0">
          <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1" style={{ background: color }} />
          <span className="break-words leading-snug">{row.name}</span>
        </div>
      </Td>
      <Td style={{ borderBottom: borderStyle, color: 'var(--tx-secondary)', whiteSpace: 'nowrap' }}>
        {fmtDate(row.start)}
      </Td>
      <Td style={{ borderBottom: borderStyle, color: 'var(--tx-secondary)', whiteSpace: 'nowrap' }}>
        {fmtDate(row.end)}
      </Td>
      <Td style={{ borderBottom: borderStyle }}>
        <span className="inline-block text-[10px] font-semibold rounded-md px-2 py-0.5 whitespace-nowrap"
          style={{ background: `${color}18`, color }}>
          {row.days}n
        </span>
        {isAdjusted && (
          <span className="ml-1 text-[9px] line-through"
            style={{ color: 'var(--tx-muted)' }}
            title={`Alap: ${row.baseDays} nap`}>
            {row.baseDays}
          </span>
        )}
      </Td>
    </tr>
  )
}

// ── Buffer row ─────────────────────────────────────────────────────────────

function BufferRowItem({ row, color, isLast }: {
  key?: string | number
  row: Extract<TimelineRow, {kind:'buffer'}>
  color: string
  isLast: boolean
}) {
  const borderStyle  = isLast ? undefined : '1px solid var(--border)'
  const isAdjusted   = row.days !== row.baseDays
  const mutedBg      = `${color}0A`
  const mutedBorder  = `${color}30`

  if (row.hidden) {
    return (
      <tr className="opacity-20" style={{ background: 'var(--surface-subtle)' }}>
        <Td style={{ borderBottom: borderStyle }} />
        <Td style={{ borderBottom: borderStyle }}><span className="italic line-through">{row.name}</span></Td>
        <Td style={{ borderBottom: borderStyle }}>–</Td>
        <Td style={{ borderBottom: borderStyle }}>–</Td>
        <Td style={{ borderBottom: borderStyle }}>–</Td>
      </tr>
    )
  }

  return (
    <tr
      className="transition-colors"
      style={{ background: mutedBg }}
      onMouseEnter={(e: MouseEvent<HTMLTableRowElement>) => (e.currentTarget.style.background = 'var(--surface-subtle)')}
      onMouseLeave={(e: MouseEvent<HTMLTableRowElement>) => (e.currentTarget.style.background = mutedBg)}
    >
      <Td style={{ borderBottom: borderStyle, color: 'var(--tx-muted)' }}>
        <span style={{ fontSize: '10px', opacity: .4 }}>↳</span>
      </Td>
      <Td style={{ borderBottom: borderStyle }}>
        <div className="flex items-start gap-1.5">
          <span className="w-1.5 h-1.5 rounded-sm shrink-0 mt-1 border"
            style={{ borderColor: mutedBorder, borderStyle: 'dashed', background: 'transparent' }} />
          <span className="text-[10px] italic leading-snug" style={{ color: 'var(--tx-muted)' }}>{row.name}</span>
        </div>
      </Td>
      <Td style={{ borderBottom: borderStyle, color: 'var(--tx-muted)', whiteSpace: 'nowrap' }}>
        {fmtDate(row.start)}
      </Td>
      <Td style={{ borderBottom: borderStyle, color: 'var(--tx-muted)', whiteSpace: 'nowrap' }}>
        {fmtDate(row.end)}
      </Td>
      <Td style={{ borderBottom: borderStyle }}>
        <span className="inline-block text-[10px] rounded-md px-2 py-0.5 italic border whitespace-nowrap"
          style={{ background: mutedBg, borderColor: mutedBorder, borderStyle: 'dashed', color: 'var(--tx-muted)' }}>
          {row.days}n
        </span>
        {isAdjusted && (
          <span className="ml-1 text-[9px] line-through" style={{ color: 'var(--tx-muted)' }}
            title={`Alap: ${row.baseDays} nap`}>{row.baseDays}</span>
        )}
      </Td>
    </tr>
  )
}

// ── Shared cell ────────────────────────────────────────────────────────────

function Td({ children, style }: { children?: ReactNode; style?: React.CSSProperties }) {
  return (
    <td className="px-2.5 py-2" style={{ fontSize: '11px', ...style }}>
      {children}
    </td>
  )
}

import React from 'react'
