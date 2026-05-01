import { useState, type ChangeEvent } from 'react'
import type { FormState } from '../types'
import { calcBudget, getBudgetStatus, formatFt, formatPerM2, type BudgetEstimate } from '../utils/budgetUtils'
import { ACCURACY_IMPROVEMENT_ITEMS } from '../data/budgetConstants'
import BudgetRefinement from './BudgetRefinement'

interface Props {
  form: FormState
}

// ── Status config ──────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  szukkos: {
    emoji: '🔴',
    label: 'Valószínűleg szűkös',
    desc: 'A megadott keret a becsült minimum alatt van. Érdemes újratervezni a projekthatókört vagy többletforrást bevonni.',
    bg: '#FEF2F2', border: '#FCA5A5', color: '#991B1B',
  },
  realis: {
    emoji: '🟡',
    label: 'Reális lehet',
    desc: 'A megadott keret a becsült sávon belül esik. A projekt megvalósítható, de fontos a tartalékidő és az anyagválasztás.',
    bg: '#FFFBEB', border: '#FCD34D', color: '#92400E',
  },
  kenyelmesebb: {
    emoji: '🟢',
    label: 'Kényelmesebb mozgástér',
    desc: 'A megadott keret meghaladja a becsült maximumot. Van mozgástér minőségi fejlesztésekre vagy váratlan költségekre.',
    bg: '#F0FDF4', border: '#86EFAC', color: '#15803D',
  },
}

const RELIABILITY_CONFIG = {
  kozepes: { label: 'Közepes', color: '#92400E', bg: '#FFFBEB', border: '#FCD34D', bar: 2 },
  alacsony: { label: 'Alacsony', color: '#991B1B', bg: '#FEF2F2', border: '#FCA5A5', bar: 1 },
}

// ── Main component ─────────────────────────────────────────────────────────

export default function BudgetSection({ form }: Props) {
  const [budgetInput, setBudgetInput] = useState('')

  const estimate = calcBudget(form.sizeM2, form.qualityKey, form.executionModeKey, form.complexityKey, form.projectKey)

  const availableParsed = parseInt(budgetInput.replace(/\s/g, ''), 10)
  const hasAvailable    = !isNaN(availableParsed) && availableParsed > 0
  const status          = hasAvailable ? getBudgetStatus(availableParsed, estimate) : null
  const statusCfg       = status ? STATUS_CONFIG[status] : null
  const reliabilityCfg  = RELIABILITY_CONFIG[estimate.reliabilityLevel]

  return (
    <section className="card p-7 mt-6 animate-fade-up">

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-sm shrink-0">
            💰
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>Költségbecslés</p>
            <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>
              Tájékoztató jellegű sávos becslés a megadott projektadatok alapján.
            </p>
          </div>
        </div>
        <ReliabilityBadge cfg={reliabilityCfg} />
      </div>

      {/* ── Top 3 metric cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <MetricCard
          label="Becsült teljes költség"
          value={`${formatFt(estimate.minTotal)} – ${formatFt(estimate.maxTotal)}`}
          icon="🏷️"
          highlight
        />
        <MetricCard
          label="Becsült Ft/m²"
          value={`${formatPerM2(estimate.minPerM2)} – ${formatPerM2(estimate.maxPerM2)}`}
          icon="📐"
        />
        <AvailableBudgetCard
          value={budgetInput}
          onChange={(v: string) => setBudgetInput(v)}
        />
      </div>

      {/* ── Budget status (only if available budget entered) ── */}
      {statusCfg && (
        <div
          className="rounded-2xl p-4 border mb-6 flex gap-3 items-start animate-fade-in"
          style={{ background: statusCfg.bg, borderColor: statusCfg.border }}
        >
          <span className="text-lg shrink-0 mt-0.5">{statusCfg.emoji}</span>
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: statusCfg.color }}>{statusCfg.label}</p>
            <p className="text-xs leading-relaxed" style={{ color: statusCfg.color, opacity: 0.85 }}>{statusCfg.desc}</p>
          </div>
        </div>
      )}

      {/* ── Phase cost distribution ── */}
      <div className="mb-6">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: 'var(--tx-muted)' }}>
              Fázisonkénti megoszlás (becsült)
            </p>
            <p className="text-[10px]" style={{ color: 'var(--tx-muted)' }}>
              A költségbontás a kiválasztott projekttípushoz igazodik.
            </p>
          </div>
        <PhaseDistributionTable estimate={estimate} />
      </div>

      {/* ── Accuracy section ── */}
      <AccuracyBlock reliability={estimate.reliabilityLevel} />

      {/* ── Optional refinement block ── */}
      <BudgetRefinement estimate={estimate} projectKey={form.projectKey} />

      {/* ── Disclaimer ── */}
      <div
        className="mt-5 rounded-2xl p-4 border"
        style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}
      >
        <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
          ⚠️ Az itt látható költségsáv nem garantált ár, nem ajánlat és nem helyettesíti a tételes
          költségvetést. Célja a nagyságrendi tervezés és döntéstámogatás.
        </p>
        <div className="flex flex-wrap gap-4 mt-3">
          <p className="text-[10px]" style={{ color: 'var(--tx-muted)' }}>
            Adatforrás: belső becslési modell / piaci sávok, később frissíthető adatbázisból
          </p>
          <p className="text-[10px]" style={{ color: 'var(--tx-muted)' }}>
            Becslési modell verziója: 2026.04
          </p>
        </div>
      </div>

    </section>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────

function MetricCard({ label, value, icon, highlight = false }: {
  label: string; value: string; icon: string; highlight?: boolean
}) {
  return (
    <div
      className="rounded-2xl p-4 border transition-all hover:scale-[1.01]"
      style={{ background: 'var(--surface-subtle)', borderColor: highlight ? '#93C5FD' : 'var(--border)' }}
    >
      <div className="text-lg mb-2">{icon}</div>
      <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--tx-muted)' }}>
        {label}
      </p>
      <p className="text-sm font-bold leading-snug" style={{ color: 'var(--tx-primary)' }}>
        {value}
      </p>
    </div>
  )
}

function AvailableBudgetCard({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div
      className="rounded-2xl p-4 border"
      style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}
    >
      <div className="text-lg mb-2">🎯</div>
      <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--tx-muted)' }}>
        Rendelkezésre álló keret
      </p>
      <div className="relative">
        <input
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          placeholder="pl. 60000000"
          className="field-input pr-8 text-sm tabular-nums"
          style={{ paddingTop: '8px', paddingBottom: '8px' }}
        />
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold pointer-events-none"
          style={{ color: 'var(--tx-muted)' }}
        >
          Ft
        </span>
      </div>
    </div>
  )
}

function PhaseDistributionTable({ estimate }: { estimate: BudgetEstimate }) {
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr style={{ background: 'var(--surface-subtle)' }}>
            {['Fázis', '%', 'Becsült sáv'].map(h => (
              <th
                key={h}
                className="text-left text-[10px] font-semibold uppercase tracking-widest px-4 py-2.5 border-b"
                style={{ color: 'var(--tx-muted)', borderColor: 'var(--border)' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {estimate.phaseCosts.map((row, i) => (
            <tr
              key={row.label}
              style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--surface-subtle)' }}
            >
              <td className="px-4 py-2.5 border-b" style={{ color: 'var(--tx-primary)', borderColor: 'var(--border)' }}>
                <span className="mr-2">{row.icon}</span>{row.label}
              </td>
              <td className="px-4 py-2.5 border-b tabular-nums font-medium" style={{ color: 'var(--tx-muted)', borderColor: 'var(--border)' }}>
                {row.pct}%
              </td>
              <td className="px-4 py-2.5 border-b tabular-nums" style={{ color: 'var(--tx-secondary)', borderColor: 'var(--border)' }}>
                {formatFt(row.min)} – {formatFt(row.max)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ReliabilityBadge({ cfg }: { cfg: typeof RELIABILITY_CONFIG[keyof typeof RELIABILITY_CONFIG] }) {
  return (
    <div
      className="flex items-center gap-2.5 rounded-xl px-3.5 py-2 border shrink-0"
      style={{ background: cfg.bg, borderColor: cfg.border }}
    >
      <div className="flex gap-0.5">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="w-1.5 h-3.5 rounded-sm"
            style={{ background: i <= cfg.bar ? cfg.color : 'var(--border-strong)' }}
          />
        ))}
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider leading-none" style={{ color: cfg.color }}>
          Megbízhatóság
        </p>
        <p className="text-xs font-bold mt-0.5 leading-none" style={{ color: cfg.color }}>
          {cfg.label}
        </p>
      </div>
    </div>
  )
}

function AccuracyBlock({ reliability }: { reliability: BudgetEstimate['reliabilityLevel'] }) {
  return (
    <div
      className="rounded-2xl p-5 border"
      style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}
    >
      <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--tx-muted)' }}>
        Pontosabb becsléshez még ezek kellenének
      </p>
      <div className="flex flex-wrap gap-2 mb-3">
        {ACCURACY_IMPROVEMENT_ITEMS.map(item => (
          <span
            key={item}
            className="text-[11px] rounded-lg px-2.5 py-1 border"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--border)',
              color: 'var(--tx-muted)',
            }}
          >
            {item}
          </span>
        ))}
      </div>
      {reliability === 'alacsony' && (
        <p className="text-[11px] text-amber-600 dark:text-amber-400">
          ⚠️ Érvényes projektméret megadásával a becslés megbízhatósága javítható.
        </p>
      )}
    </div>
  )
}
