/**
 * Project modifier configuration.
 * All multiplier values are estimation heuristics — not verified industry data.
 * Edit this file to adjust any factor.
 */

// ── Execution mode ────────────────────────────────────────────────────────

export type ExecutionModeKey = 'sajat' | 'vegyes' | 'general'

export interface ExecutionModeOption {
  key: ExecutionModeKey
  label: string
  description: string
  multiplier: number
}

export const EXECUTION_MODES: ExecutionModeOption[] = [
  {
    key: 'sajat',
    label: 'Saját szervezés',
    description: 'Egyéni koordináció, több egyeztetés',
    multiplier: 1.15,
  },
  {
    key: 'vegyes',
    label: 'Vegyes kivitelezés',
    description: 'Részben saját, részben alvállalkozók',
    multiplier: 1.00,
  },
  {
    key: 'general',
    label: 'Generálkivitelező',
    description: 'Teljes körű kivitelezői koordináció',
    multiplier: 0.90,
  },
]

// ── Complexity ─────────────────────────────────────────────────────────────

export type ComplexityKey = 'egyszeru' | 'normal' | 'osszetett'

export interface ComplexityOption {
  key: ComplexityKey
  label: string
  description: string
  multiplier: number
}

export const COMPLEXITY_OPTIONS: ComplexityOption[] = [
  {
    key: 'egyszeru',
    label: 'Egyszerű',
    description: 'Kevés egyedi elem, standard megoldások',
    multiplier: 0.95,
  },
  {
    key: 'normal',
    label: 'Normál',
    description: 'Átlagos komplexitású projekt',
    multiplier: 1.00,
  },
  {
    key: 'osszetett',
    label: 'Összetett',
    description: 'Egyedi megoldások, magasabb koordináció',
    multiplier: 1.20,
  },
]

// ── Helpers ────────────────────────────────────────────────────────────────

export function getExecutionMode(key: ExecutionModeKey): ExecutionModeOption {
  return EXECUTION_MODES.find(m => m.key === key) ?? EXECUTION_MODES[1]
}

export function getComplexity(key: ComplexityKey): ComplexityOption {
  return COMPLEXITY_OPTIONS.find(c => c.key === key) ?? COMPLEXITY_OPTIONS[1]
}
