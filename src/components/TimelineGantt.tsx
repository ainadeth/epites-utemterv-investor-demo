import { useState, type ChangeEvent } from 'react'
import type { TimelineResult, StatusKey, TimelineRow } from '../types'
import { addDays, formatDate } from '../utils/dateUtils'
import { STATUS_SKIP_MAP } from '../data/projects'
import PhaseDetailModal from './PhaseDetailModal'

interface Props {
  result: TimelineResult
  statusKey: StatusKey
}

const PALETTE = [
  { bg: '#DBEAFE', border: '#93C5FD', text: '#1D4ED8', fill: '#3B82F6' },
  { bg: '#EDE9FE', border: '#C4B5FD', text: '#5B21B6', fill: '#8B5CF6' },
  { bg: '#D1FAE5', border: '#6EE7B7', text: '#065F46', fill: '#10B981' },
  { bg: '#FEF3C7', border: '#FCD34D', text: '#92400E', fill: '#F59E0B' },
  { bg: '#FCE7F3', border: '#F9A8D4', text: '#9D174D', fill: '#EC4899' },
  { bg: '#CFFAFE', border: '#67E8F9', text: '#155E75', fill: '#06B6D4' },
  { bg: '#E0E7FF', border: '#A5B4FC', text: '#3730A3', fill: '#6366F1' },
]
const DARK_PALETTE = [
  { bg: '#1e3a5f', border: '#3B82F6', text: '#93C5FD', fill: '#3B82F6' },
  { bg: '#2e1a5c', border: '#8B5CF6', text: '#C4B5FD', fill: '#8B5CF6' },
  { bg: '#064e3b', border: '#10B981', text: '#6EE7B7', fill: '#10B981' },
  { bg: '#451a03', border: '#F59E0B', text: '#FCD34D', fill: '#F59E0B' },
  { bg: '#500724', border: '#EC4899', text: '#F9A8D4', fill: '#EC4899' },
  { bg: '#083344', border: '#06B6D4', text: '#67E8F9', fill: '#06B6D4' },
  { bg: '#1e1b4b', border: '#6366F1', text: '#A5B4FC', fill: '#6366F1' },
]

function dayOffset(rowStart: Date, projectStart: Date): number {
  return Math.round((rowStart.getTime() - projectStart.getTime()) / 86400000)
}

function paletteIdx(row: TimelineRow): number {
  return row.kind === 'phase' ? (row.num - 1) : (row.phaseNum - 1)
}

export default function TimelineGantt({ result, statusKey }: Props) {
  const { rows, totalDays, projectStart } = result
  const [sliderDay,    setSliderDay]    = useState(0)
  const [hoveredKey,   setHoveredKey]   = useState<string | null>(null)
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null)

  const isDark = document.documentElement.classList.contains('dark')
  const pal    = isDark ? DARK_PALETTE : PALETTE

  // Progress marker — count days up to the skip boundary (phase rows only)
  const skipCount   = STATUS_SKIP_MAP[statusKey] ?? 0
  const phaseRows   = rows.filter(r => r.kind === 'phase')
  const progressDay = rows
    .filter(r => {
      const pidx = r.kind === 'phase' ? r.phaseIndex : (phaseRows.find(p => p.kind === 'phase' && p.num === r.phaseNum)?.phaseIndex ?? 999)
      return pidx < skipCount
    })
    .reduce((s, r) => s + r.days, 0)

  const progressPct = totalDays > 0 ? (progressDay / totalDays) * 100 : 0
  const sliderPct   = totalDays > 0 ? (sliderDay  / totalDays) * 100 : 0

  // Active row under slider (include buffer rows)
  const activeRowIdx = rows.findIndex(r => {
    const off = dayOffset(r.start, projectStart)
    return sliderDay >= off && sliderDay <= off + r.days - 1
  })

  const sliderDate = formatDate(addDays(projectStart, sliderDay))

  // First non-hidden phase row = "current" phase
  const currentPhaseNum = (rows.find(r => r.kind === 'phase' && !r.hidden) as Extract<(typeof rows)[number], {kind:'phase'}> | undefined)?.num ?? -1

  return (
    <>
    <div className="card p-7 mt-6 animate-fade-up">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600/10 flex items-center justify-center text-sm">📊</div>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>Gantt-ütemterv</p>
            <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>Fázisok és várakozási idők</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs flex-wrap" style={{ color: 'var(--tx-muted)' }}>
          {progressPct > 0 && (
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 rounded bg-blue-500 inline-block"/>Jelenlegi állapot
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-2 rounded border inline-block" style={{ borderStyle:'dashed', borderColor:'var(--tx-muted)', background:'transparent'}}/>Várakozás
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 bg-orange-400 inline-block"/>Csúszka
          </span>
          <span className="flex items-center gap-1.5">
            👆 Kattints a fázisra
          </span>
        </div>
      </div>

      {/* Time axis */}
      <div className="flex justify-between text-[10px] font-medium mb-2 px-8" style={{ color: 'var(--tx-muted)' }}>
        <span>{formatDate(result.projectStart)}</span>
        <span>{formatDate(result.projectEnd)}</span>
      </div>

      {/* Gantt area */}
      <div className="relative">
        {/* Grid lines */}
        {[0,25,50,75,100].map(p => (
          <div key={p} className="absolute top-0 bottom-0 w-px pointer-events-none"
            style={{ left:`calc(32px + (100% - 72px) * ${p/100})`, background:'var(--border)' }} />
        ))}

        {/* Progress marker */}
        {progressPct > 0 && (
          <div className="absolute top-0 bottom-0 z-20 pointer-events-none"
            style={{ left:`calc(32px + (100% - 72px) * ${progressPct/100})` }}>
            <div className="w-0.5 h-full bg-blue-500" style={{ opacity:0.9 }} />
            <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-500" />
          </div>
        )}

        {/* Slider marker */}
        {sliderDay > 0 && (
          <div className="absolute top-0 bottom-0 z-20 pointer-events-none"
            style={{ left:`calc(32px + (100% - 72px) * ${sliderPct/100})` }}>
            <div className="w-0.5 h-full bg-orange-400"
              style={{ opacity:0.85, backgroundImage:'repeating-linear-gradient(to bottom,#FB923C 0 6px,transparent 6px 10px)' }} />
          </div>
        )}

        {/* Rows */}
        <div className="flex flex-col gap-2 relative z-10 py-1">
          {rows.map((row, i) => {
            const off     = dayOffset(row.start, projectStart)
            const wPct    = (row.days / totalDays) * 100
            const lPct    = (off      / totalDays) * 100
            const pidx    = paletteIdx(row)
            const p       = pal[pidx % pal.length]
            const rowKey  = row.kind === 'phase' ? `p-${row.num}` : `b-${row.phaseNum}`
            const isHover = hoveredKey === rowKey
            const isActive = activeRowIdx === i

            const isBuffer   = row.kind === 'buffer'
            const isFaded    = row.hidden
            const isCurrent  = !isBuffer && row.kind === 'phase' && row.num === currentPhaseNum

            if (isBuffer) {
              // ── Buffer bar: dashed outline, no fill, lighter ────────────
              const bFill   = p.fill
              const hidden  = row.hidden

              return (
                <div key={rowKey}
                  className="flex items-center gap-2"
                  onMouseEnter={() => setHoveredKey(rowKey)}
                  onMouseLeave={() => setHoveredKey(null)}
                >
                  {/* Indent indicator */}
                  <div className="w-7 shrink-0 flex justify-end">
                    <span className="text-[9px] select-none" style={{ color: 'var(--tx-muted)', opacity: 0.5 }}>↳</span>
                  </div>

                  <div className="flex-1 relative" style={{ height: '26px' }}>
                    <div
                      className="absolute top-0 h-full rounded-lg flex items-center px-2.5 transition-all duration-200"
                      style={{
                        left:        `${lPct}%`,
                        width:       `${Math.max(wPct, 0.3)}%`,
                        background:  hidden ? 'transparent' : isActive ? `${bFill}22` : 'transparent',
                        border:      `1.5px dashed ${hidden ? 'var(--border)' : isHover ? bFill : `${bFill}60`}`,
                        opacity:     hidden ? 0.25 : 1,
                      }}
                    >
                      <span className="text-[10px] truncate italic leading-none" style={{ color: hidden ? 'var(--tx-muted)' : `${bFill}CC` }}>
                        {row.name}
                      </span>
                    </div>
                  </div>

                  <div className="w-10 text-[10px] text-right shrink-0 tabular-nums italic" style={{ color: 'var(--tx-muted)' }}>
                    {row.days}n
                  </div>
                </div>
              )
            }

            // ── Phase bar ─────────────────────────────────────────────────
            const barBg     = isFaded ? 'var(--surface-subtle)' : isActive ? p.fill : isCurrent ? p.fill : p.bg
            const barBorder = isFaded ? 'var(--border)'         : isActive ? p.fill : isCurrent ? p.fill : p.border
            const barText   = isFaded ? 'var(--tx-muted)'       : (isActive || isCurrent) ? '#fff' : p.text

            return (
              <div key={rowKey}
                className="flex items-center gap-2"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredKey(rowKey)}
                onMouseLeave={() => setHoveredKey(null)}
                onClick={() => setSelectedPhase(row.name)}
              >
                <div className="w-7 text-[11px] font-mono text-right shrink-0 select-none" style={{ color: 'var(--tx-muted)' }}>
                  {row.num}
                </div>

                <div className="flex-1 relative" style={{ height: '36px' }}>
                  <div
                    className="absolute top-0 h-full rounded-xl flex items-center px-3 transition-all duration-200"
                    style={{
                      left:       `${lPct}%`,
                      width:      `${Math.max(wPct, 0.5)}%`,
                      background: barBg,
                      border:     `1.5px solid ${barBorder}`,
                      opacity:    isFaded ? 0.35 : 1,
                      boxShadow:  (isCurrent || isActive) && !isFaded
                        ? `0 2px 14px ${p.fill}50, 0 0 0 1px ${p.fill}40`
                        : isHover && !isFaded ? `0 2px 8px ${p.fill}30` : 'none',
                      transform:  isCurrent && !isFaded ? 'scaleY(1.08)' : 'scaleY(1)',
                    }}
                  >
                    <span className="text-[11px] font-semibold truncate leading-none" style={{ color: barText }}>
                      {isCurrent && !isFaded && <span className="mr-1 opacity-70">▶</span>}
                      {row.name}
                    </span>
                  </div>
                </div>

                <div className="w-10 text-[11px] text-right shrink-0 tabular-nums" style={{ color: 'var(--tx-muted)' }}>
                  {row.days}n
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Status marker label */}
      {progressPct > 0 && (
        <p className="mt-3 text-xs flex items-center gap-1.5" style={{ color: '#3B82F6' }}>
          <span className="w-3 h-0.5 bg-blue-500 inline-block rounded" />
          Jelenlegi állapot határa – {progressDay}. nap
        </p>
      )}

      {/* Slider */}
      <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: 'var(--tx-muted)' }}>
            Idővonalon navigátor
          </p>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-xs font-mono" style={{ color: 'var(--tx-muted)' }}>{sliderDay}. nap</span>
            <span className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>{sliderDate}</span>
            {activeRowIdx >= 0 && (() => {
              const activeRow = rows[activeRowIdx]
              const pidx      = paletteIdx(activeRow)
              const ap        = pal[pidx % pal.length]
              const label     = activeRow.kind === 'phase' ? activeRow.name : activeRow.name
              const isBuffer  = activeRow.kind === 'buffer'
              return (
                <span className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold ${isBuffer ? 'italic' : ''}`}
                  style={{ background: isBuffer ? `${ap.fill}15` : ap.bg, color: isBuffer ? ap.fill : ap.text }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: ap.fill }} />
                  {label}
                </span>
              )
            })()}
          </div>
        </div>

        <input type="range" min={0} max={totalDays - 1} step={1} value={sliderDay}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSliderDay(Number(e.target.value))}
          style={{ background: `linear-gradient(to right, #3B82F6 ${sliderPct}%, var(--border) ${sliderPct}%)` }} />

        <div className="flex justify-between mt-1.5 text-[10px]" style={{ color: 'var(--tx-muted)' }}>
          <span>0. nap – {formatDate(result.projectStart)}</span>
          <span>{totalDays - 1}. nap – {formatDate(result.projectEnd)}</span>
        </div>
      </div>
    </div>

    {/* Phase detail modal */}
    {selectedPhase && (
      <PhaseDetailModal phaseName={selectedPhase} onClose={() => setSelectedPhase(null)} />
    )}
    </>
  )
}
