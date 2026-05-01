import { useState } from 'react'
import type { BudgetEstimate } from '../utils/budgetUtils'
import { formatFt } from '../utils/budgetUtils'
import {
  REFINEMENT_QUESTIONS,
  getRiskLevel,
  getEstimationDirection,
  RISK_BUDGET_ADJUSTMENT,
  RISK_LEVEL_LABEL,
  DIRECTION_LABEL,
  DIRECTION_EXPLANATION,
} from '../data/refinementConstants'

interface Props {
  estimate: BudgetEstimate
  projectKey?: string
}

type Answers = Record<string, number>   // questionId → option score (0 | 1 | 2)

// Questions irrelevant for renovation (no roof, no telek for apartments)
const FELUJITAS_SKIP = new Set(['teto', 'telek'])

export default function BudgetRefinement({ estimate, projectKey }: Props) {
  const questions = projectKey === 'felujitas'
    ? REFINEMENT_QUESTIONS.filter(q => !FELUJITAS_SKIP.has(q.id))
    : REFINEMENT_QUESTIONS

  const [open, setOpen]       = useState(false)
  const [answers, setAnswers] = useState<Answers>({})

  const answeredCount = Object.keys(answers).length
  const allAnswered   = answeredCount === questions.length

  // ── Risk computation ────────────────────────────────────────────────────
  const totalScore = (Object.values(answers) as number[]).reduce((s: number, v: number) => s + v, 0)
  const riskLevel  = getRiskLevel(totalScore)
  const direction  = getEstimationDirection(riskLevel)
  const adjustment = RISK_BUDGET_ADJUSTMENT[riskLevel]
  const riskCfg    = RISK_LEVEL_LABEL[riskLevel]

  const refinedMin = Math.round(estimate.minTotal * adjustment.minFactor / 100_000) * 100_000
  const refinedMax = Math.round(estimate.maxTotal * adjustment.maxFactor / 100_000) * 100_000

  // ── High-risk factors (score > 0) ───────────────────────────────────────
  const riskFactors = questions
    .filter(q => (answers[q.id] ?? 0) > 0)
    .map(q => {
      const score  = answers[q.id] ?? 0
      const option = q.options.find(o => o.score === score)
      return option?.riskLabel ?? option?.label ?? q.label
    })

  function handleAnswer(questionId: string, score: number) {
    setAnswers((prev: Answers) => ({ ...prev, [questionId]: score }))
  }

  return (
    <div
      className="mt-5 rounded-2xl border overflow-hidden transition-all"
      style={{ borderColor: 'var(--border)', background: 'var(--surface-subtle)' }}
    >
      {/* ── Collapsed header / trigger ── */}
      <button
        type="button"
        onClick={() => setOpen((v: boolean) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors"
        style={{ background: 'transparent' }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-base shrink-0">🔍</span>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: 'var(--tx-primary)' }}>
              Pontosabb költségbecslést szeretnél?
            </p>
            {!open && (
              <p className="text-xs mt-0.5" style={{ color: 'var(--tx-muted)' }}>
                {answeredCount > 0
                  ? `${answeredCount} / ${questions.length} kérdés megválaszolva`
                  : 'Néhány extra kérdéssel finomítható a becslés'}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          {answeredCount > 0 && !open && (
            <span
              className="text-[10px] font-bold rounded-full px-2.5 py-1"
              style={{ background: riskCfg.bg, color: riskCfg.color, border: `1px solid ${riskCfg.border}` }}
            >
              {riskCfg.label}
            </span>
          )}
          {!open && (
            <span
              className="text-[11px] font-semibold rounded-xl px-3.5 py-2 border transition-all hover:scale-[1.02] active:scale-[.98]"
              style={{
                background: 'linear-gradient(135deg, #3D6B4A, #4A7C59)',
                borderColor: 'transparent',
                color: '#fff',
              }}
            >
              Becslés pontosítása
            </span>
          )}
          <ChevronIcon open={open} />
        </div>
      </button>

      {/* ── Expanded content ── */}
      {open && (
        <div className="px-5 pb-5 border-t" style={{ borderColor: 'var(--border)' }}>

          {/* Intro text */}
          <p className="text-xs leading-relaxed mt-4 mb-5" style={{ color: 'var(--tx-muted)' }}>
            A jelenlegi becslés gyors, sávos becslés kevés adat alapján. Néhány extra válasszal
            pontosabb kockázati képet és finomított költségsávot kaphatsz.
          </p>

          {/* Questions */}
          <div className="flex flex-col gap-4 mb-6">
            {questions.map(q => (
              <QuestionBlock
                key={q.id}
                question={q}
                selected={answers[q.id] ?? null}
                onSelect={(score: number) => handleAnswer(q.id, score)}
              />
            ))}
          </div>

          {/* Result — only once all answered */}
          {allAnswered && (
            <RefinedResult
              riskCfg={riskCfg}
              direction={direction}
              refinedMin={refinedMin}
              refinedMax={refinedMax}
              riskFactors={riskFactors}
              baseMin={estimate.minTotal}
              baseMax={estimate.maxTotal}
            />
          )}

          {/* Partial progress hint */}
          {!allAnswered && answeredCount > 0 && (
            <p className="text-xs text-center mt-2" style={{ color: 'var(--tx-muted)' }}>
              Még {questions.length - answeredCount} kérdés van hátra a finomított eredményhez
            </p>
          )}
        </div>
      )}
    </div>
  )
}

// ── Question block ─────────────────────────────────────────────────────────

function QuestionBlock({
  question,
  selected,
  onSelect,
}: {
  key?: string
  question: (typeof REFINEMENT_QUESTIONS)[0]
  selected: number | null
  onSelect: (score: number) => void
}) {
  return (
    <div>
      <p className="text-xs font-semibold mb-2" style={{ color: 'var(--tx-primary)' }}>
        {question.label}
      </p>
      <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap">
        {question.options.map(opt => {
          const isSelected = selected === opt.score
          return (
            <button
              key={opt.label}
              type="button"
              onClick={() => onSelect(opt.score)}
              className="text-left text-xs rounded-xl px-3.5 py-2.5 border transition-all duration-150 hover:scale-[1.01] active:scale-[.98]"
              style={{
                background:  isSelected ? (opt.score === 0 ? '#F0FDF4' : opt.score === 1 ? '#FFFBEB' : '#FEF2F2') : 'var(--surface)',
                borderColor: isSelected ? (opt.score === 0 ? '#86EFAC' : opt.score === 1 ? '#FCD34D' : '#FCA5A5') : 'var(--border)',
                color:       isSelected ? (opt.score === 0 ? '#15803D' : opt.score === 1 ? '#92400E' : '#991B1B') : 'var(--tx-secondary)',
                fontWeight:  isSelected ? 600 : 400,
              }}
            >
              {isSelected && <span className="mr-1.5">✓</span>}
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Refined result panel ───────────────────────────────────────────────────

function RefinedResult({
  riskCfg,
  direction,
  refinedMin,
  refinedMax,
  riskFactors,
  baseMin,
  baseMax,
}: {
  riskCfg:     typeof import('../data/refinementConstants').RISK_LEVEL_LABEL[keyof typeof import('../data/refinementConstants').RISK_LEVEL_LABEL]
  direction:   import('../data/refinementConstants').EstimationDirection
  refinedMin:  number
  refinedMax:  number
  riskFactors: string[]
  baseMin:     number
  baseMax:     number
}) {
  const dirLabel = DIRECTION_LABEL[direction]
  const dirExpl  = DIRECTION_EXPLANATION[direction]
  const unchanged = refinedMin === baseMin && refinedMax === baseMax

  return (
    <div
      className="rounded-2xl border p-5 animate-fade-up"
      style={{ background: 'var(--surface)', borderColor: riskCfg.border }}
    >
      {/* Title */}
      <p className="text-sm font-semibold mb-4" style={{ color: 'var(--tx-primary)' }}>
        Pontosított költségkép
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">

        {/* Risk level */}
        <ResultTile
          label="Kockázati szint"
          value={riskCfg.label}
          valueColor={riskCfg.color}
          bg={riskCfg.bg}
          border={riskCfg.border}
          icon="⚠️"
        />

        {/* Direction */}
        <ResultTile
          label="Becslési irány"
          value={dirLabel}
          valueColor={riskCfg.color}
          bg={riskCfg.bg}
          border={riskCfg.border}
          icon="📈"
        />

        {/* Refined range */}
        <div
          className="rounded-xl p-3.5 border sm:col-span-2"
          style={{ background: riskCfg.bg, borderColor: riskCfg.border }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: riskCfg.color }}>
            Finomított költségsáv
          </p>
          <p className="text-base font-bold tabular-nums" style={{ color: riskCfg.color }}>
            {formatFt(refinedMin)} – {formatFt(refinedMax)}
          </p>
          {unchanged && (
            <p className="text-[11px] mt-1" style={{ color: riskCfg.color, opacity: 0.75 }}>
              Az alap becslés nem módosult — a megadott tényezők alacsony kockázatot jeleznek.
            </p>
          )}
        </div>
      </div>

      {/* Risk factors */}
      {riskFactors.length > 0 && (
        <div className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--tx-muted)' }}>
            Fő eltérítő tényezők
          </p>
          <div className="flex flex-wrap gap-1.5">
            {riskFactors.map(f => (
              <span
                key={f}
                className="text-[11px] rounded-lg px-2.5 py-1 border"
                style={{ background: riskCfg.bg, borderColor: riskCfg.border, color: riskCfg.color }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Why might it change */}
      <div
        className="rounded-xl p-3.5 border mb-4"
        style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--tx-muted)' }}>
          Miért változhat?
        </p>
        <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-secondary)' }}>
          {dirExpl}
        </p>
      </div>

      {/* Footer note */}
      <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
        ℹ️ Ez nem pontos ajánlat, hanem kockázati pontosítás. A pontos költséghez terv, műszaki
        tartalom, helyszíni adottságok és kivitelezői ajánlat szükséges.
      </p>
    </div>
  )
}

function ResultTile({
  label, value, valueColor, bg, border, icon,
}: {
  key?: string
  label: string; value: string; valueColor: string; bg: string; border: string; icon: string
}) {
  return (
    <div className="rounded-xl p-3.5 border" style={{ background: bg, borderColor: border }}>
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-sm">{icon}</span>
        <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: valueColor, opacity: 0.7 }}>
          {label}
        </p>
      </div>
      <p className="text-sm font-bold" style={{ color: valueColor }}>{value}</p>
    </div>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <span
      className="transition-transform duration-200 shrink-0"
      style={{ display: 'inline-block', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', color: 'var(--tx-muted)' }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}
