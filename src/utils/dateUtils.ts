import type { ProjectKey, StatusKey, TimelineResult, TimelineRow, PhaseRow, BufferRow } from '../types'
import type { ExecutionModeKey, ComplexityKey } from '../config/modifiers'
import { PROJECTS, STATUS_SKIP_MAP } from '../data/projects'
import { getSizeMultiplier, applyMultiplier } from './sizeUtils'
import { getExecutionMode, getComplexity } from '../config/modifiers'

/** Add `n` calendar days to a date (returns new Date, does not mutate). */
export function addDays(date: Date, n: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d
}

/** Format a Date as "YYYY. MM. DD." (Hungarian convention). */
export function formatDate(d: Date): string {
  const y   = d.getFullYear()
  const m   = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}. ${m}. ${day}.`
}

/**
 * Calculate the full phase timeline, including optional buffer rows.
 *
 * Final multiplier = sizeMultiplier × executionMultiplier × complexityMultiplier
 *
 * For each phase:
 *   1. Emit a PhaseRow  (adjustedDays = round(baseDays × finalMultiplier), min 1)
 *   2. If the phase has bufferDays, emit a BufferRow immediately after
 *      (adjustedBufferDays = round(bufferDays × finalMultiplier), min 1)
 *
 * Status skipping:
 *   - A PhaseRow is hidden when phaseIndex < skipCount
 *   - Its BufferRow (if any) inherits the same hidden flag
 *
 * Base durations in projects.ts are NEVER modified.
 */
export function calcTimeline(
  projectKey: ProjectKey,
  startDateStr: string,
  statusKey: StatusKey,
  sizeM2: number = 100,
  executionModeKey: ExecutionModeKey = 'vegyes',
  complexityKey: ComplexityKey = 'normal',
): TimelineResult {
  const project    = PROJECTS[projectKey]
  const skipCount  = STATUS_SKIP_MAP[statusKey] ?? 0

  const sizeMultiplier       = getSizeMultiplier(sizeM2)
  const executionMultiplier  = getExecutionMode(executionModeKey).multiplier
  const complexityMultiplier = getComplexity(complexityKey).multiplier
  const finalMultiplier      = sizeMultiplier * executionMultiplier * complexityMultiplier

  let cursor = new Date(startDateStr)
  const rows: TimelineRow[] = []
  let phaseCounter = 1  // visual phase number (only increments for PhaseRows)

  for (let i = 0; i < project.phases.length; i++) {
    const phase       = project.phases[i]
    const isHidden    = i < skipCount
    const adjDays     = applyMultiplier(phase.days, finalMultiplier)
    const phaseStart  = new Date(cursor)
    const phaseEnd    = addDays(cursor, adjDays - 1)

    const phaseRow: PhaseRow = {
      kind:       'phase',
      num:        phaseCounter++,
      name:       phase.name,
      baseDays:   phase.days,
      days:       adjDays,
      start:      phaseStart,
      end:        phaseEnd,
      hidden:     isHidden,
      phaseIndex: i,
    }
    rows.push(phaseRow)
    cursor = addDays(phaseEnd, 1)

    // ── Buffer row (if defined for this phase) ──────────────────────────
    if (phase.bufferDays && phase.bufferDays > 0) {
      const adjBuffer      = applyMultiplier(phase.bufferDays, finalMultiplier)
      const bufferStart    = new Date(cursor)
      const bufferEnd      = addDays(cursor, adjBuffer - 1)

      const bufferRow: BufferRow = {
        kind:      'buffer',
        phaseNum:  phaseRow.num,
        name:      phase.bufferLabel ?? 'Várakozási idő (kötés/száradás)',
        baseDays:  phase.bufferDays,
        days:      adjBuffer,
        start:     bufferStart,
        end:       bufferEnd,
        hidden:    isHidden,   // inherits from parent phase
      }
      rows.push(bufferRow)
      cursor = addDays(bufferEnd, 1)
    }
  }

  const totalDays       = rows.reduce((s, r) => s + r.days, 0)
  const totalBufferDays = rows
    .filter((r): r is BufferRow => r.kind === 'buffer')
    .reduce((s, r) => s + r.days, 0)

  return {
    rows,
    totalDays,
    totalBufferDays,
    projectStart:         new Date(startDateStr),
    projectEnd:           rows[rows.length - 1].end,
    sizeMultiplier,
    executionMultiplier,
    complexityMultiplier,
    finalMultiplier,
    sizeM2,
    executionModeKey,
    complexityKey,
  }
}
