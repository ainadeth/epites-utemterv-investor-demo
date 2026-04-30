import { type FormEvent, useState, useEffect, type ReactNode, type ChangeEvent } from 'react'
import type { FormState, ProjectKey, StatusKey, ExecutionModeKey, ComplexityKey, QualityKey } from '../types'
import { PROJECTS } from '../data/projects'
import { getSizeMultiplier } from '../utils/sizeUtils'
import { EXECUTION_MODES, COMPLEXITY_OPTIONS } from '../config/modifiers'
import { QUALITY_OPTIONS } from '../data/budgetConstants'

interface Props {
  form: FormState
  onChange: (u: Partial<FormState>) => void
  onGenerate: () => void
}

const STATUS_OPTIONS: { value: StatusKey; label: string; desc: string }[] = [
  { value: '0', label: 'Tervezés alatt',        desc: 'Minden fázis megjelenik' },
  { value: '1', label: 'Engedélyezés alatt',     desc: 'Tervezési fázis kész' },
  { value: '2', label: 'Kivitelezés indul',       desc: 'Tervezés + engedély kész' },
  { value: '3', label: 'Szerkezetkész',           desc: '4 fázis teljesült' },
  { value: '4', label: 'Befejező munkák előtt',  desc: '5 fázis teljesült' },
]

function clamp(n: number): number {
  return Math.min(1000, Math.max(10, n))
}

function sizeBracketHint(sizeM2: number): string {
  const m = getSizeMultiplier(sizeM2)
  if (m < 1)   return 'Kis projekt'
  if (m === 1) return 'Közepes projekt'
  if (m < 1.2) return 'Nagy projekt'
  if (m < 1.4) return 'Nagyon nagy projekt'
  return 'Kiemelt méretű projekt'
}

export default function InputCard({ form, onChange, onGenerate }: Props) {
  const selectedStatus  = STATUS_OPTIONS.find(s => s.value === form.statusKey)
  const sizeMultiplier  = getSizeMultiplier(form.sizeM2)
  const isBaseline      = sizeMultiplier === 1.00

  // Draft state for size input — allows free typing, clamps only on blur/submit
  const [sizeDraft, setSizeDraft] = useState<string>(String(form.sizeM2))

  useEffect(() => {
    setSizeDraft(String(form.sizeM2))
  }, [form.sizeM2])

  function commitSize() {
    const parsed  = parseInt(sizeDraft, 10)
    const clamped = isNaN(parsed) ? 100 : clamp(parsed)
    setSizeDraft(String(clamped))
    onChange({ sizeM2: clamped })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const parsed  = parseInt(sizeDraft, 10)
    const clamped = isNaN(parsed) ? 100 : clamp(parsed)
    setSizeDraft(String(clamped))
    onChange({ sizeM2: clamped })
    onGenerate()
  }

  return (
    <div className="card p-7 h-fit animate-fade-up">
      {/* Header */}
      <div className="flex items-center gap-3 mb-7 pb-5 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="w-9 h-9 rounded-2xl bg-blue-600/10 flex items-center justify-center text-lg">🏗️</div>
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>Projekt adatai</p>
          <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>Töltse ki az alábbi mezőket</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Projekt típusa */}
        <Field label="Projekt típusa">
          <SelectWrap>
            <select
              value={form.projectKey}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange({ projectKey: e.target.value as ProjectKey })}
              className="field-input pr-10 appearance-none"
              style={{ WebkitAppearance: 'none' }}
            >
              {Object.entries(PROJECTS).map(([k, p]) => (
                <option key={k} value={k}>{p.label}</option>
              ))}
            </select>
          </SelectWrap>
        </Field>

        {/* Minőségi szint */}
        <Field label="Minőségi szint">
          <SelectWrap>
            <select
              value={form.qualityKey}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange({ qualityKey: e.target.value as QualityKey })}
              className="field-input pr-10 appearance-none"
              style={{ WebkitAppearance: 'none' }}
            >
              {QUALITY_OPTIONS.map(q => (
                <option key={q.key} value={q.key}>{q.label}</option>
              ))}
            </select>
          </SelectWrap>
          {(() => {
            const q = QUALITY_OPTIONS.find(q => q.key === form.qualityKey)
            return q ? (
              <p className="mt-1.5 text-xs px-1" style={{ color: 'var(--tx-muted)' }}>{q.desc}</p>
            ) : null
          })()}
        </Field>

        {/* Projekt mérete */}
        <Field label="Projekt mérete">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={sizeDraft}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSizeDraft(e.target.value)}
                onBlur={commitSize}
                placeholder="100"
                className="field-input pr-12 tabular-nums"
              />
              <span
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold pointer-events-none"
                style={{ color: 'var(--tx-muted)' }}
              >m²</span>
            </div>
            {/* Size multiplier badge */}
            <div
              className="shrink-0 rounded-xl px-3 py-2 text-center border transition-all"
              style={{
                background:  isBaseline ? 'var(--surface-subtle)' : sizeMultiplier < 1 ? '#F0FDF4' : '#EFF6FF',
                borderColor: isBaseline ? 'var(--border)'         : sizeMultiplier < 1 ? '#86EFAC' : '#93C5FD',
                minWidth: '62px',
              }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: isBaseline ? 'var(--tx-muted)' : sizeMultiplier < 1 ? '#15803D' : '#1D4ED8' }}>
                Szorzó
              </p>
              <p className="text-sm font-bold tabular-nums"
                style={{ color: isBaseline ? 'var(--tx-secondary)' : sizeMultiplier < 1 ? '#15803D' : '#1D4ED8' }}>
                {sizeMultiplier.toFixed(2).replace('.', ',')}×
              </p>
            </div>
          </div>
          <p className="mt-1.5 text-xs px-1 flex items-center gap-1.5" style={{ color: 'var(--tx-muted)' }}>
            <span className="w-1 h-1 rounded-full inline-block" style={{ background: 'var(--tx-muted)' }} />
            {sizeBracketHint(form.sizeM2)}
            {' · '}
            {form.sizeM2} m² →{' '}
            {sizeMultiplier < 1 ? '−' : sizeMultiplier > 1 ? '+' : ''}
            {sizeMultiplier !== 1
              ? `${Math.abs(Math.round((sizeMultiplier - 1) * 100))}% időtartam`
              : 'alap időtartam'}
          </p>
        </Field>

        {/* Kivitelezés módja */}
        <Field label="Kivitelezés módja">
          <SelectWrap>
            <select
              value={form.executionModeKey}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange({ executionModeKey: e.target.value as ExecutionModeKey })}
              className="field-input pr-10 appearance-none"
              style={{ WebkitAppearance: 'none' }}
            >
              {EXECUTION_MODES.map(m => (
                <option key={m.key} value={m.key}>{m.label}</option>
              ))}
            </select>
          </SelectWrap>
          {(() => {
            const mode = EXECUTION_MODES.find(m => m.key === form.executionModeKey)
            return mode ? (
              <p className="mt-1.5 text-xs px-1" style={{ color: 'var(--tx-muted)' }}>
                {mode.description}
                {' · '}
                <span className={mode.multiplier < 1 ? 'text-emerald-600' : mode.multiplier > 1 ? 'text-blue-600' : ''}>
                  {mode.multiplier < 1 ? '−' : mode.multiplier > 1 ? '+' : ''}
                  {mode.multiplier !== 1
                    ? `${Math.abs(Math.round((mode.multiplier - 1) * 100))}%`
                    : 'alap'}
                </span>
              </p>
            ) : null
          })()}
        </Field>

        {/* Projekt komplexitása */}
        <Field label="Projekt komplexitása">
          <SelectWrap>
            <select
              value={form.complexityKey}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange({ complexityKey: e.target.value as ComplexityKey })}
              className="field-input pr-10 appearance-none"
              style={{ WebkitAppearance: 'none' }}
            >
              {COMPLEXITY_OPTIONS.map(c => (
                <option key={c.key} value={c.key}>{c.label}</option>
              ))}
            </select>
          </SelectWrap>
          {(() => {
            const cx = COMPLEXITY_OPTIONS.find(c => c.key === form.complexityKey)
            return cx ? (
              <p className="mt-1.5 text-xs px-1" style={{ color: 'var(--tx-muted)' }}>
                {cx.description}
                {' · '}
                <span className={cx.multiplier < 1 ? 'text-emerald-600' : cx.multiplier > 1 ? 'text-blue-600' : ''}>
                  {cx.multiplier < 1 ? '−' : cx.multiplier > 1 ? '+' : ''}
                  {cx.multiplier !== 1
                    ? `${Math.abs(Math.round((cx.multiplier - 1) * 100))}%`
                    : 'alap'}
                </span>
              </p>
            ) : null
          })()}
        </Field>

        {/* Kezdési dátum */}
        <Field label="Kezdési dátum">
          <input
            type="date"
            required
            className="field-input"
            value={form.startDate}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange({ startDate: e.target.value })}
          />
        </Field>

        {/* Jelenlegi állapot */}
        <Field label="Jelenlegi állapot">
          <SelectWrap>
            <select
              value={form.statusKey}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange({ statusKey: e.target.value as StatusKey })}
              className="field-input pr-10 appearance-none"
              style={{ WebkitAppearance: 'none' }}
            >
              {STATUS_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </SelectWrap>
          {selectedStatus && (
            <p className="mt-1.5 text-xs px-1" style={{ color: 'var(--tx-muted)' }}>
              {selectedStatus.desc}
            </p>
          )}
        </Field>

        <button
          type="submit"
          className="mt-1 w-full text-white font-semibold text-sm rounded-2xl py-3.5 transition-all duration-200 hover:scale-[1.01] active:scale-[.98]"
          style={{ background: 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)', boxShadow: '0 4px 16px rgba(37,99,235,.35)' }}
        >
          Ütemterv generálása →
        </button>
      </form>
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--tx-muted)' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

function SelectWrap({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--tx-muted)' }}>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  )
}
