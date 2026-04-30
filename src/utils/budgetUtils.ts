import type { QualityKey } from '../types'
import type { ExecutionModeKey, ComplexityKey } from '../config/modifiers'
import {
  COST_PER_M2,
  BUDGET_EXECUTION_MULTIPLIER,
  BUDGET_COMPLEXITY_MULTIPLIER,
  COST_PHASE_DISTRIBUTION,
} from '../data/budgetConstants'

type BudgetPhaseDistributionItem = {
  label: string
  icon: string
  pct: number
}

const PROJECT_COST_PHASE_DISTRIBUTIONS: Record<string, BudgetPhaseDistributionItem[]> = {
  // Családi ház építés aliases
  'csaladi-haz-epites': COST_PHASE_DISTRIBUTION,
  hazepites: COST_PHASE_DISTRIBUTION,
  house: COST_PHASE_DISTRIBUTION,

  // Lakásfelújítás
  'lakasfelujitas': [
    { label: 'Tervezés / felmérés', icon: '📋', pct: 5 },
    { label: 'Bontás', icon: '🔨', pct: 10 },
    { label: 'Villanyszerelés', icon: '⚡', pct: 15 },
    { label: 'Víz / gépészet', icon: '🚿', pct: 15 },
    { label: 'Faljavítás / aljzat / előkészítés', icon: '🧱', pct: 10 },
    { label: 'Burkolás', icon: '⬜', pct: 15 },
    { label: 'Festés / befejező munkák', icon: '🎨', pct: 10 },
    { label: 'Konyha / fürdő / szaniterek', icon: '🚽', pct: 15 },
    { label: 'Tartalék', icon: '🛟', pct: 5 },
  ],
  'lakas-felujitas': [
    { label: 'Tervezés / felmérés', icon: '📋', pct: 5 },
    { label: 'Bontás', icon: '🔨', pct: 10 },
    { label: 'Villanyszerelés', icon: '⚡', pct: 15 },
    { label: 'Víz / gépészet', icon: '🚿', pct: 15 },
    { label: 'Faljavítás / aljzat / előkészítés', icon: '🧱', pct: 10 },
    { label: 'Burkolás', icon: '⬜', pct: 15 },
    { label: 'Festés / befejező munkák', icon: '🎨', pct: 10 },
    { label: 'Konyha / fürdő / szaniterek', icon: '🚽', pct: 15 },
    { label: 'Tartalék', icon: '🛟', pct: 5 },
  ],
  apartment: [
    { label: 'Tervezés / felmérés', icon: '📋', pct: 5 },
    { label: 'Bontás', icon: '🔨', pct: 10 },
    { label: 'Villanyszerelés', icon: '⚡', pct: 15 },
    { label: 'Víz / gépészet', icon: '🚿', pct: 15 },
    { label: 'Faljavítás / aljzat / előkészítés', icon: '🧱', pct: 10 },
    { label: 'Burkolás', icon: '⬜', pct: 15 },
    { label: 'Festés / befejező munkák', icon: '🎨', pct: 10 },
    { label: 'Konyha / fürdő / szaniterek', icon: '🚽', pct: 15 },
    { label: 'Tartalék', icon: '🛟', pct: 5 },
  ],

  // Tetőfelújítás
  'tetofelujitas': [
    { label: 'Állapotfelmérés / előkészítés', icon: '🔍', pct: 5 },
    { label: 'Bontás', icon: '🔨', pct: 15 },
    { label: 'Ácsszerkezet javítás', icon: '🪵', pct: 25 },
    { label: 'Tetőfólia / lécezés', icon: '🏗️', pct: 10 },
    { label: 'Tetőfedés', icon: '🏠', pct: 25 },
    { label: 'Bádogozás / ereszcsatorna', icon: '🌧️', pct: 15 },
    { label: 'Tartalék', icon: '🛟', pct: 5 },
  ],
  'teto-felujitas': [
    { label: 'Állapotfelmérés / előkészítés', icon: '🔍', pct: 5 },
    { label: 'Bontás', icon: '🔨', pct: 15 },
    { label: 'Ácsszerkezet javítás', icon: '🪵', pct: 25 },
    { label: 'Tetőfólia / lécezés', icon: '🏗️', pct: 10 },
    { label: 'Tetőfedés', icon: '🏠', pct: 25 },
    { label: 'Bádogozás / ereszcsatorna', icon: '🌧️', pct: 15 },
    { label: 'Tartalék', icon: '🛟', pct: 5 },
  ],

  // Fürdőszoba felújítás
  'furdoszoba-felujitas': [
    { label: 'Tervezés / felmérés', icon: '📋', pct: 5 },
    { label: 'Bontás', icon: '🔨', pct: 10 },
    { label: 'Víz- és lefolyó kiállások', icon: '🚿', pct: 20 },
    { label: 'Villanyszerelés', icon: '⚡', pct: 10 },
    { label: 'Vízszigetelés', icon: '💧', pct: 10 },
    { label: 'Burkolás', icon: '⬜', pct: 25 },
    { label: 'Szaniterek / szerelvények', icon: '🚽', pct: 15 },
    { label: 'Festés / javítás / takarítás', icon: '🎨', pct: 5 },
  ],
  furdoszoba: [
    { label: 'Tervezés / felmérés', icon: '📋', pct: 5 },
    { label: 'Bontás', icon: '🔨', pct: 10 },
    { label: 'Víz- és lefolyó kiállások', icon: '🚿', pct: 20 },
    { label: 'Villanyszerelés', icon: '⚡', pct: 10 },
    { label: 'Vízszigetelés', icon: '💧', pct: 10 },
    { label: 'Burkolás', icon: '⬜', pct: 25 },
    { label: 'Szaniterek / szerelvények', icon: '🚽', pct: 15 },
    { label: 'Festés / javítás / takarítás', icon: '🎨', pct: 5 },
  ],
}

export interface BudgetEstimate {
  minTotal: number
  maxTotal: number
  minPerM2: number
  maxPerM2: number
  sizeM2: number
  qualityKey: QualityKey
  reliabilityLevel: 'alacsony' | 'kozepes'
  phaseCosts: { label: string; icon: string; pct: number; min: number; max: number }[]
}

export type BudgetStatus = 'szukkos' | 'realis' | 'kenyelmesebb'

/**
 * Calculate budget estimate from form inputs.
 * COMPLETELY SEPARATE from schedule multipliers — does not touch calcTimeline.
 */
export function calcBudget(
  sizeM2: number,
  qualityKey: QualityKey,
  executionModeKey: ExecutionModeKey,
  complexityKey: ComplexityKey,
  projectKey?: string,
): BudgetEstimate {
  const isValid = sizeM2 >= 10 && sizeM2 <= 1000
  const reliability: BudgetEstimate['reliabilityLevel'] = isValid ? 'kozepes' : 'alacsony'

  const base = COST_PER_M2[qualityKey]
  const execM = BUDGET_EXECUTION_MULTIPLIER[executionModeKey]
  const complexM = BUDGET_COMPLEXITY_MULTIPLIER[complexityKey]

  const minPerM2 = Math.round((base.min * execM * complexM) / 1000) * 1000
  const maxPerM2 = Math.round((base.max * execM * complexM) / 1000) * 1000
  const minTotal = minPerM2 * sizeM2
  const maxTotal = maxPerM2 * sizeM2

  const distribution = projectKey
    ? PROJECT_COST_PHASE_DISTRIBUTIONS[projectKey] ?? COST_PHASE_DISTRIBUTION
    : COST_PHASE_DISTRIBUTION

  const phaseCosts = distribution.map((p: BudgetPhaseDistributionItem) => ({
    label: p.label,
    icon: p.icon,
    pct: p.pct,
    min: Math.round((minTotal * p.pct) / 100 / 100_000) * 100_000,
    max: Math.round((maxTotal * p.pct) / 100 / 100_000) * 100_000,
  }))

  return {
    minTotal,
    maxTotal,
    minPerM2,
    maxPerM2,
    sizeM2,
    qualityKey,
    reliabilityLevel: reliability,
    phaseCosts,
  }
}

/**
 * Evaluate budget status against the estimate.
 */
export function getBudgetStatus(available: number, estimate: BudgetEstimate): BudgetStatus {
  if (available < estimate.minTotal) return 'szukkos'
  if (available > estimate.maxTotal) return 'kenyelmesebb'
  return 'realis'
}

/**
 * Format Ft amount as "X millió Ft" or "X ezer Ft"
 */
export function formatFt(n: number): string {
  if (n >= 1_000_000) {
    const m = n / 1_000_000
    return `${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1).replace('.', ',')} millió Ft`
  }

  return `${Math.round(n / 1000).toLocaleString('hu-HU')} ezer Ft`
}

/**
 * Format Ft/m² compactly: "600 000 Ft/m²"
 */
export function formatPerM2(n: number): string {
  return `${Math.round(n).toLocaleString('hu-HU')} Ft/m²`
}