import type { ExecutionModeKey, ComplexityKey } from '../config/modifiers'

export type { ExecutionModeKey, ComplexityKey }

export type ProjectKey  = 'felujitas' | 'hazepites' | 'bovites'
export type StatusKey   = '0' | '1' | '2' | '3' | '4'
export type QualityKey  = 'alap' | 'normal' | 'premium'

export interface Phase {
  name: string
  days: number
  bufferDays?: number
  bufferLabel?: string
}

export interface Project {
  label: string
  phases: Phase[]
}

// ── Row types (discriminated union) ───────────────────────────────────────

export interface PhaseRow {
  kind: 'phase'
  num: number
  name: string
  baseDays: number
  days: number
  start: Date
  end: Date
  hidden: boolean
  phaseIndex: number
}

export interface BufferRow {
  kind: 'buffer'
  phaseNum: number
  name: string
  baseDays: number
  days: number
  start: Date
  end: Date
  hidden: boolean
}

export type TimelineRow = PhaseRow | BufferRow

export interface TimelineResult {
  rows: TimelineRow[]
  totalDays: number
  totalBufferDays: number
  projectStart: Date
  projectEnd: Date
  sizeMultiplier: number
  executionMultiplier: number
  complexityMultiplier: number
  finalMultiplier: number
  sizeM2: number
  executionModeKey: ExecutionModeKey
  complexityKey: ComplexityKey
}

export interface FormState {
  projectKey: ProjectKey
  startDate: string
  statusKey: StatusKey
  sizeM2: number
  executionModeKey: ExecutionModeKey
  complexityKey: ComplexityKey
  qualityKey: QualityKey   // ← new
}
