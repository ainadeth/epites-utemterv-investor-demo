import type { TimelineResult, TimelineRow } from '../types'
import { formatDate } from '../utils/dateUtils'

const PHASE_COLORS = ['#3B82F6','#8B5CF6','#10B981','#F59E0B','#EC4899','#06B6D4','#6366F1']

export default function InsightsPanel({ result }: { result: TimelineResult }) {
  const phaseRows  = result.rows.filter((r): r is Extract<TimelineRow,{kind:'phase'}> => r.kind === 'phase')
  const visible    = phaseRows.filter(r => !r.hidden)
  const longest    = visible.length > 0 ? visible.reduce((a, b) => a.days >= b.days ? a : b) : null
  const next       = visible[0] ?? null

  const baseTotalDays = phaseRows.reduce((s, r) => s + r.baseDays, 0)
  const isAdjusted    = Math.abs(result.finalMultiplier - 1) > 0.01

  const stats = [
    {
      label: 'Teljes időtartam',
      value: `${result.totalDays} nap`,
      sub:   isAdjusted ? `alap: ${baseTotalDays} nap` : undefined,
      icon:  '⏱️',
    },
    {
      label: 'Teljes várakozási idő',
      value: `${result.totalBufferDays} nap`,
      sub:   result.totalBufferDays > 0 ? 'kötés / száradás / átvétel' : 'nincs várakozási idő',
      icon:  '⏳',
    },
    {
      label: 'Leghosszabb fázis',
      value: longest ? longest.name : '–',
      sub:   longest ? `${longest.days} nap` : undefined,
      icon:  '📏',
    },
    {
      label: 'Következő aktív fázis',
      value: next ? next.name : 'Minden fázis teljesítve',
      sub:   next ? `${next.days} napig tart` : undefined,
      icon:  '▶️',
    },
    {
      label: 'Becsült projektzárás',
      value: formatDate(result.projectEnd),
      sub:   `${result.sizeM2} m² · ${result.finalMultiplier.toFixed(2).replace('.', ',')}× szorzó`,
      icon:  '🏁',
    },
  ]

  return (
    <div className="card p-7 mt-6 animate-fade-up">
      <div className="flex items-center gap-2.5 mb-6">
        <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-sm">💡</div>
        <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>Projekt összefoglaló</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        {stats.map(s => (
          <div key={s.label}
            className="rounded-2xl p-4 border transition-all hover:scale-[1.01]"
            style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
            <div className="text-lg mb-2">{s.icon}</div>
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--tx-muted)' }}>{s.label}</p>
            <p className="text-xs font-semibold leading-snug" style={{ color: 'var(--tx-primary)' }}>{s.value}</p>
            {s.sub && <p className="text-[10px] mt-1" style={{ color: 'var(--tx-muted)' }}>{s.sub}</p>}
          </div>
        ))}
      </div>

      {/* Phase tags — phase rows only */}
      <div className="pt-5 border-t" style={{ borderColor: 'var(--border)' }}>
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--tx-muted)' }}>Fázisok</p>
        <div className="flex flex-wrap gap-2">
          {phaseRows.map(row => {
            const c = PHASE_COLORS[(row.num - 1) % PHASE_COLORS.length]
            return (
              <span key={row.num}
                className={`inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1 border transition-all ${row.hidden ? 'opacity-30 line-through' : 'hover:scale-[1.03]'}`}
                style={{
                  background:  row.hidden ? 'var(--surface-subtle)' : `${c}15`,
                  borderColor: row.hidden ? 'var(--border)'          : `${c}40`,
                  color:       row.hidden ? 'var(--tx-muted)'        : c,
                }}>
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: row.hidden ? 'var(--tx-muted)' : c }} />
                {row.num}. {row.name}
                {!row.hidden && <span className="opacity-60">· {row.days}n</span>}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
