/**
 * Budget estimation constants.
 * All values are heuristic ranges based on Hungarian market data (2026).
 * Source: internal estimation model / market ranges — updateable from database later.
 * Model version: 2026.04
 *
 * IMPORTANT: These are NOT exact prices, NOT offers, NOT guarantees.
 * For decision-support and order-of-magnitude planning only.
 */

import type { QualityKey, ProjectKey } from '../types'
import type { ExecutionModeKey, ComplexityKey } from '../config/modifiers'

// ── Cost per m² by quality level (Ft/m²) ─────────────────────────────────

export interface CostRange {
  min: number   // Ft/m²
  max: number
}

export const COST_PER_M2: Record<QualityKey, CostRange> = {
  alap:    { min: 450_000, max: 600_000 },
  normal:  { min: 600_000, max: 850_000 },
  premium: { min: 850_000, max: 1_200_000 },
}

// ── Budget multipliers (separate from schedule multipliers) ───────────────

export const BUDGET_EXECUTION_MULTIPLIER: Record<ExecutionModeKey, number> = {
  sajat:   0.95,   // self-managed — lower overhead
  vegyes:  1.00,   // baseline
  general: 1.10,   // general contractor premium
}

export const BUDGET_COMPLEXITY_MULTIPLIER: Record<ComplexityKey, number> = {
  egyszeru: 0.95,
  normal:   1.00,
  osszetett: 1.15,
}

// ── Quality level display labels ──────────────────────────────────────────

export const QUALITY_OPTIONS: { key: QualityKey; label: string; desc: string }[] = [
  { key: 'alap',    label: 'Alap',    desc: 'Funkcionális, standard anyagok' },
  { key: 'normal',  label: 'Normál',  desc: 'Átlagos piaci minőség' },
  { key: 'premium', label: 'Prémium', desc: 'Magasabb minőségű anyagok és kivitelezés' },
]

// ── Phase-level cost distribution by project type (%) ─────────────────────
// All distributions must sum to exactly 100.

export interface CostPhaseDistribution {
  label: string
  pct: number   // 0–100
  icon: string
}

const DIST_HAZEPITES: CostPhaseDistribution[] = [
  { label: 'Tervezés / előkészítés',        pct:  3, icon: '📐' },
  { label: 'Földmunka / alapozás',           pct: 12, icon: '⛏️' },
  { label: 'Szerkezetépítés',                pct: 25, icon: '🏗️' },
  { label: 'Tető',                           pct: 12, icon: '🏠' },
  { label: 'Nyílászárók',                    pct:  8, icon: '🪟' },
  { label: 'Gépészet és villany',            pct: 18, icon: '⚡' },
  { label: 'Belső munkák',                   pct: 15, icon: '🖌️' },
  { label: 'Külső munkák / tartalék',        pct:  7, icon: '🌿' },
]  // sum = 100 ✓

const DIST_FELUJITAS: CostPhaseDistribution[] = [
  { label: 'Tervezés / felmérés',                          pct:  5, icon: '📐' },
  { label: 'Bontás és sittkezelés',                        pct: 10, icon: '🔨' },
  { label: 'Villanyhálózat / elektromos korszerűsítés',    pct: 15, icon: '⚡' },
  { label: 'Víz / gépészet',                               pct: 15, icon: '🚿' },
  { label: 'Faljavítás / aljzat előkészítés',              pct: 10, icon: '🧱' },
  { label: 'Burkolás',                                     pct: 15, icon: '🔲' },
  { label: 'Festés és befejező munkák',                    pct: 10, icon: '🖌️' },
  { label: 'Nyílászárók / beltéri elemek',                 pct:  8, icon: '🪟' },
  { label: 'Konyha / fürdő / beépítés',                    pct:  7, icon: '🛁' },
  { label: 'Tartalék / váratlan költségek',                pct:  5, icon: '🛡️' },
]  // sum = 100 ✓  (5+10+15+15+10+15+10+8+7+5)

const DIST_BOVITES: CostPhaseDistribution[] = [
  { label: 'Tervezés / engedélyezés',       pct:  8, icon: '📐' },
  { label: 'Alapozás / csatlakozás',         pct: 12, icon: '⛏️' },
  { label: 'Szerkezeti munkák',              pct: 25, icon: '🏗️' },
  { label: 'Tető / zárófödém',              pct: 12, icon: '🏠' },
  { label: 'Nyílászárók',                    pct:  8, icon: '🪟' },
  { label: 'Gépészet és villany',            pct: 18, icon: '⚡' },
  { label: 'Belső befejező munkák',          pct: 10, icon: '🖌️' },
  { label: 'Tartalék',                       pct:  7, icon: '🛡️' },
]  // sum = 100 ✓

/**
 * Normalize any project key variant → canonical ProjectKey.
 * Guards against key mismatches between different parts of the app.
 */
export function normalizeProjectKey(key: string | undefined | null): ProjectKey {
  if (!key) return 'hazepites'
  const k = key.toLowerCase().replace(/[_\-\s]/g, '')
  if (k.includes('felujit') || k.includes('lakas') || k.includes('renov') || k.includes('apartment')) {
    return 'felujitas'
  }
  if (k.includes('bov') || k.includes('extend') || k.includes('extension')) {
    return 'bovites'
  }
  return 'hazepites'
}

/** Get phase cost distribution for a given project type. Falls back to new-build. */
export function getPhaseDistribution(projectKey: ProjectKey): CostPhaseDistribution[] {
  const normalized = normalizeProjectKey(projectKey)
  if (normalized === 'felujitas') return DIST_FELUJITAS
  if (normalized === 'bovites')   return DIST_BOVITES
  return DIST_HAZEPITES
}

// Keep the old export as an alias for backward compat
export const COST_PHASE_DISTRIBUTION = DIST_HAZEPITES

// ── Items needed for more accurate estimate (project-type-aware) ──────────

const ACCURACY_BASE = [
  'Pontos lokáció',
  'Tervdokumentáció',
  'Műszaki tartalom',
  'Gépészeti igények',
  'Nyílászárók minősége',
  'Burkolatok és belső anyagok szintje',
  'Kivitelezői ajánlatok',
]

const ACCURACY_HAZEPITES_EXTRA = [
  'Szerkezet típusa',
  'Tetőforma',
]

const ACCURACY_FELUJITAS_EXTRA = [
  'Meglévő hálózat állapota',
  'Bontás mértéke',
]

export function getAccuracyItems(projectKey?: string): string[] {
  const normalized = normalizeProjectKey(projectKey)
  if (normalized === 'felujitas') return [...ACCURACY_BASE, ...ACCURACY_FELUJITAS_EXTRA]
  if (normalized === 'bovites')   return [...ACCURACY_BASE, 'Szerkezet típusa', 'Csatlakozási pontok']
  return [...ACCURACY_BASE, ...ACCURACY_HAZEPITES_EXTRA]
}

// Backward compat alias
export const ACCURACY_IMPROVEMENT_ITEMS = [...ACCURACY_BASE, ...ACCURACY_HAZEPITES_EXTRA]
