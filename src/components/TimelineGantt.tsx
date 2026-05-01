import { useState, type ChangeEvent } from 'react'
import type { TimelineResult, StatusKey, TimelineRow } from '../types'
import { addDays, formatDate } from '../utils/dateUtils'
import { STATUS_SKIP_MAP } from '../data/projects'
import PhaseDetailModal from './PhaseDetailModal'

interface Props {
  result: TimelineResult
  statusKey: StatusKey
  onNavigateToProfessional?: (category: string) => void
}

const PALETTE = [
  { bg: '#E8F5EC', border: '#A8C5B0', text: '#2D5C3A', fill: '#4A7C59' },  // sage green
  { bg: '#E8F0F7', border: '#A8BDD4', text: '#2A4A6B', fill: '#4A7090' },  // mist blue
  { bg: '#F5F0E8', border: '#D4C4A8', text: '#5C4A2A', fill: '#9A7A50' },  // warm sand
  { bg: '#E8F2F5', border: '#A8CADA', text: '#2A5060', fill: '#4A8090' },  // slate teal
  { bg: '#F0EEE8', border: '#C8C4B0', text: '#4A4A38', fill: '#7A7860' },  // stone
  { bg: '#EEF0F5', border: '#B8C4D8', text: '#3A4A60', fill: '#5A6A80' },  // blue-grey
  { bg: '#F5EEE8', border: '#D8C4B0', text: '#604A38', fill: '#8A6A50' },  // terracotta
]
const DARK_PALETTE = [
  { bg: '#1a2e20', border: '#4A7C59', text: '#A8C5B0', fill: '#4A7C59' },
  { bg: '#1a2430', border: '#4A7090', text: '#A8BDD4', fill: '#4A7090' },
  { bg: '#2a2018', border: '#9A7A50', text: '#D4C4A8', fill: '#9A7A50' },
  { bg: '#182430', border: '#4A8090', text: '#A8CADA', fill: '#4A8090' },
  { bg: '#242420', border: '#7A7860', text: '#C8C4B0', fill: '#7A7860' },
  { bg: '#1a2030', border: '#5A6A80', text: '#B8C4D8', fill: '#5A6A80' },
  { bg: '#281e18', border: '#8A6A50', text: '#D8C4B0', fill: '#8A6A50' },
]

function dayOffset(rowStart: Date, projectStart: Date): number {
  return Math.round((rowStart.getTime() - projectStart.getTime()) / 86400000)
}

function paletteIdx(row: TimelineRow): number {
  return row.kind === 'phase' ? (row.num - 1) : (row.phaseNum - 1)
}

export default function TimelineGantt({ result, statusKey, onNavigateToProfessional }: Props) {
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
        <p className="mt-3 text-xs flex items-center gap-1.5" style={{ color: '#4A7C59' }}>
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
          style={{ background: `linear-gradient(to right, #4A7C59 ${sliderPct}%, var(--border) ${sliderPct}%)` }} />

        <div className="flex justify-between mt-1.5 text-[10px]" style={{ color: 'var(--tx-muted)' }}>
          <span>0. nap – {formatDate(result.projectStart)}</span>
          <span>{totalDays - 1}. nap – {formatDate(result.projectEnd)}</span>
        </div>
      </div>
    </div>

    {/* Phase detail modal */}
    {selectedPhase && (
      <PhaseDetailModal
        phaseName={selectedPhase}
        onClose={() => setSelectedPhase(null)}
        onNavigateToProfessional={onNavigateToProfessional ? (cat) => {
          setSelectedPhase(null)
          onNavigateToProfessional(cat)
        } : undefined}
      />
    )}
    </>
  )
}
