import { useState, type ChangeEvent } from 'react'
import {
  PAINT_DEFAULTS,
  PRIMER_COST_PER_M2,
  PLASTER_COST_PER_M2,
  PAINT_RESERVE_PCT,
  PHASE_CALCULATORS,
} from '../data/paintCalculatorConstants'

// ── Main section ───────────────────────────────────────────────────────────

export default function FazisKalkulatorok() {
  const [activeCalc, setActiveCalc] = useState<string>('festes')

  return (
    <div className="animate-fade-up">
      {/* Section header */}
      <div className="pt-10 pb-8 text-center max-w-2xl mx-auto px-4">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-100 dark:border-blue-900/60 rounded-full px-3.5 py-1.5 mb-4">
          🔧 Fázis kalkulátorok
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-medium mb-3" style={{ color: 'var(--tx-primary)' }}>
          Részletes munkadíj- és anyagkalkulátorok
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
          Számolj külön építési és felújítási munkákat, például festést, burkolást, szigetelést
          vagy térkövezést.
        </p>
      </div>

      {/* Calculator selector cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {PHASE_CALCULATORS.map(card => (
          <SelectorCard
            key={card.id}
            card={card}
            active={activeCalc === card.id}
            onSelect={() => { if (!card.comingSoon) setActiveCalc(card.id) }}
          />
        ))}
      </div>

      {/* Active calculator */}
      {activeCalc === 'festes' && <PaintCalculator />}
    </div>
  )
}

// ── Selector card ──────────────────────────────────────────────────────────

function SelectorCard({
  card, active, onSelect,
}: {
  key?: string
  card: (typeof PHASE_CALCULATORS)[0]
  active: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={card.comingSoon}
      className="relative rounded-2xl p-4 text-left border transition-all duration-150"
      style={{
        background:  active ? 'var(--surface)' : 'var(--surface-subtle)',
        borderColor: active ? '#3B82F6' : 'var(--border)',
        boxShadow:   active ? '0 2px 12px rgba(37,99,235,.15)' : 'none',
        cursor:      card.comingSoon ? 'default' : 'pointer',
        opacity:     card.comingSoon ? 0.6 : 1,
      }}
    >
      {card.comingSoon && (
        <span
          className="absolute top-2.5 right-2.5 text-[9px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 border"
          style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)', color: 'var(--tx-muted)' }}
        >
          Hamarosan
        </span>
      )}
      <div className="text-xl mb-2">{card.icon}</div>
      <p className="text-xs font-semibold leading-snug" style={{ color: active ? '#2563EB' : 'var(--tx-primary)' }}>
        {card.title}
      </p>
    </button>
  )
}

// ── Festés kalkulátor ──────────────────────────────────────────────────────

interface PaintInputs {
  surfaceArea: number
  layers: number
  laborPrice: number
  paintPrice: number
  coverage: number
  needsPrimer: boolean
  needsPlaster: boolean
  extraCost: number
}

interface PaintResult {
  paintLiters: number
  paintLitersWithReserve: number
  paintCost: number
  laborCost: number
  primerCost: number
  plasteringCost: number
  extraCost: number
  totalCost: number
  materialCost: number
}

function calcPaint(inputs: PaintInputs): PaintResult {
  const paintLiters            = (inputs.surfaceArea * inputs.layers) / inputs.coverage
  const paintLitersWithReserve = paintLiters * (1 + PAINT_RESERVE_PCT)
  const paintCost              = paintLiters * inputs.paintPrice
  const laborCost              = inputs.surfaceArea * inputs.laborPrice
  const primerCost             = inputs.needsPrimer  ? inputs.surfaceArea * PRIMER_COST_PER_M2  : 0
  const plasteringCost         = inputs.needsPlaster ? inputs.surfaceArea * PLASTER_COST_PER_M2 : 0
  const extraCost              = inputs.extraCost

  const materialCost = paintCost + primerCost + plasteringCost
  const totalCost    = materialCost + laborCost + extraCost

  return {
    paintLiters: Math.round(paintLiters * 10) / 10,
    paintLitersWithReserve: Math.ceil(paintLitersWithReserve),
    paintCost:       Math.round(paintCost),
    laborCost:       Math.round(laborCost),
    primerCost:      Math.round(primerCost),
    plasteringCost:  Math.round(plasteringCost),
    extraCost:       Math.round(extraCost),
    materialCost:    Math.round(materialCost),
    totalCost:       Math.round(totalCost),
  }
}

function formatHuf(n: number): string {
  return n.toLocaleString('hu-HU') + ' Ft'
}

function PaintCalculator() {
  const [inputs, setInputs] = useState<PaintInputs>({
    surfaceArea:  PAINT_DEFAULTS.surfaceArea,
    layers:       PAINT_DEFAULTS.layers,
    laborPrice:   PAINT_DEFAULTS.laborPrice,
    paintPrice:   PAINT_DEFAULTS.paintPrice,
    coverage:     PAINT_DEFAULTS.coverage,
    needsPrimer:  PAINT_DEFAULTS.needsPrimer,
    needsPlaster: PAINT_DEFAULTS.needsPlaster,
    extraCost:    PAINT_DEFAULTS.extraCost,
  })

  function set<K extends keyof PaintInputs>(key: K, value: PaintInputs[K]) {
    setInputs((prev: PaintInputs) => ({ ...prev, [key]: value }))
  }

  const result = calcPaint(inputs)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

      {/* ── Inputs card ── */}
      <div className="card p-7">
        <div className="flex items-center gap-3 mb-6 pb-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="w-9 h-9 rounded-2xl bg-blue-600/10 flex items-center justify-center text-lg">🖌️</div>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>Festés kalkulátor</p>
            <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>Anyagmennyiség és költségbecslés</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">

          <PaintField label="Festendő felület" unit="m²">
            <NumInput
              value={inputs.surfaceArea}
              onChange={v => set('surfaceArea', Math.max(1, v))}
            />
          </PaintField>

          <PaintField label="Rétegek száma" unit="réteg">
            <div className="flex gap-2">
              {[1, 2, 3].map(n => (
                <button
                  key={n}
                  type="button"
                  onClick={() => set('layers', n)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all"
                  style={{
                    background:  inputs.layers === n ? '#2563EB' : 'var(--surface-subtle)',
                    borderColor: inputs.layers === n ? '#2563EB' : 'var(--border)',
                    color:       inputs.layers === n ? '#fff'    : 'var(--tx-secondary)',
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </PaintField>

          <PaintField label="Munkadíj" unit="Ft/m²">
            <NumInput value={inputs.laborPrice} onChange={v => set('laborPrice', Math.max(0, v))} />
          </PaintField>

          <PaintField label="Festék ára" unit="Ft/liter">
            <NumInput value={inputs.paintPrice} onChange={v => set('paintPrice', Math.max(0, v))} />
          </PaintField>

          <PaintField label="Festék kiadóssága" unit="m²/liter/réteg">
            <NumInput value={inputs.coverage} onChange={v => set('coverage', Math.max(1, v))} />
          </PaintField>

          <div className="grid grid-cols-2 gap-3">
            <ToggleField
              label="Alapozó szükséges?"
              value={inputs.needsPrimer}
              onChange={v => set('needsPrimer', v)}
              subLabel={inputs.needsPrimer ? `+${PRIMER_COST_PER_M2} Ft/m²` : ''}
            />
            <ToggleField
              label="Glettelés szükséges?"
              value={inputs.needsPlaster}
              onChange={v => set('needsPlaster', v)}
              subLabel={inputs.needsPlaster ? `+${PLASTER_COST_PER_M2.toLocaleString('hu-HU')} Ft/m²` : ''}
            />
          </div>

          <PaintField label="Egyéb költség" unit="Ft">
            <NumInput value={inputs.extraCost} onChange={v => set('extraCost', Math.max(0, v))} />
          </PaintField>

        </div>
      </div>

      {/* ── Results card ── */}
      <div className="card p-7">
        <div className="flex items-center gap-3 mb-6 pb-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="w-9 h-9 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-lg">📊</div>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>Kalkuláció eredménye</p>
            <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>Azonnal frissül</p>
          </div>
        </div>

        {/* Hero total */}
        <div
          className="rounded-2xl p-5 mb-5 border text-center"
          style={{ background: 'linear-gradient(135deg, #EFF6FF, #F5F3FF)', borderColor: '#93C5FD' }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#3B82F6' }}>
            Becsült teljes költség
          </p>
          <p className="text-2xl font-bold tabular-nums" style={{ color: '#1D4ED8' }}>
            {formatHuf(result.totalCost)}
          </p>
          <p className="text-xs mt-1" style={{ color: '#6B7280' }}>
            {inputs.surfaceArea} m² · {inputs.layers} réteg
          </p>
        </div>

        {/* Breakdown */}
        <div className="flex flex-col gap-2 mb-5">
          <ResultRow label="Anyagköltség"     value={formatHuf(result.materialCost)} icon="🧴" />
          <ResultRow label="Munkadíj"         value={formatHuf(result.laborCost)}    icon="👷" />
          {result.primerCost > 0 && (
            <ResultRow label="Alapozó"        value={formatHuf(result.primerCost)}   icon="🪣" sub />
          )}
          {result.plasteringCost > 0 && (
            <ResultRow label="Glettelés"      value={formatHuf(result.plasteringCost)} icon="🔧" sub />
          )}
          {result.extraCost > 0 && (
            <ResultRow label="Egyéb"          value={formatHuf(result.extraCost)}    icon="➕" sub />
          )}
        </div>

        {/* Paint quantity */}
        <div
          className="rounded-2xl p-4 border mb-5"
          style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--tx-muted)' }}>
            Szükséges festék
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] text-gray-400 mb-0.5">Számított mennyiség</p>
              <p className="text-sm font-bold tabular-nums" style={{ color: 'var(--tx-primary)' }}>
                {result.paintLiters} liter
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mb-0.5">Ajánlott (+10% tartalék)</p>
              <p className="text-sm font-bold tabular-nums text-blue-600">
                {result.paintLitersWithReserve} liter
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
          ℹ️ Ez tájékoztató jellegű becslés. A tényleges ár függ a felület állapotától,
          a választott anyagoktól, a munkadíjtól és az egyedi körülményektől.
        </p>
      </div>
    </div>
  )
}

// ── Small helper components ────────────────────────────────────────────────

function PaintField({ label, unit, children }: { label: string; unit: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: 'var(--tx-muted)' }}>
          {label}
        </label>
        <span className="text-[11px]" style={{ color: 'var(--tx-muted)' }}>{unit}</span>
      </div>
      {children}
    </div>
  )
}

function NumInput({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <input
      type="text"
      inputMode="numeric"
      className="field-input tabular-nums"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        const n = parseInt(e.target.value, 10)
        if (!isNaN(n)) onChange(n)
      }}
    />
  )
}

function ToggleField({
  label, value, onChange, subLabel,
}: {
  label: string; value: boolean; onChange: (v: boolean) => void; subLabel?: string
}) {
  return (
    <div
      className="rounded-2xl p-3.5 border cursor-pointer transition-all"
      style={{
        background:  value ? '#EFF6FF' : 'var(--surface-subtle)',
        borderColor: value ? '#93C5FD' : 'var(--border)',
      }}
      onClick={() => onChange(!value)}
    >
      <div className="flex items-center justify-between mb-1">
        <p className="text-[11px] font-medium leading-snug pr-2" style={{ color: 'var(--tx-secondary)' }}>{label}</p>
        <div
          className="w-8 h-4.5 rounded-full flex items-center transition-all shrink-0"
          style={{
            background: value ? '#3B82F6' : 'var(--border-strong)',
            padding: '2px',
            height: '18px',
            width: '32px',
          }}
        >
          <div
            className="w-3.5 h-3.5 rounded-full bg-white transition-transform duration-200"
            style={{ transform: value ? 'translateX(14px)' : 'translateX(0)' }}
          />
        </div>
      </div>
      {subLabel && (
        <p className="text-[10px]" style={{ color: '#3B82F6' }}>{subLabel}</p>
      )}
    </div>
  )
}

function ResultRow({
  label, value, icon, sub = false,
}: {
  key?: string
  label: string; value: string; icon: string; sub?: boolean
}) {
  return (
    <div
      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl"
      style={{
        background:  sub ? 'transparent' : 'var(--surface-subtle)',
        paddingLeft: sub ? '32px' : undefined,
      }}
    >
      <span className="flex items-center gap-2 text-xs" style={{ color: 'var(--tx-secondary)' }}>
        <span>{icon}</span>{label}
      </span>
      <span className="text-xs font-semibold tabular-nums" style={{ color: 'var(--tx-primary)' }}>{value}</span>
    </div>
  )
}

// Need React for JSX in helper components
import React from 'react'
