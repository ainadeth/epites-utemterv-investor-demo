/**
 * Budget estimation constants.
 * All values are heuristic ranges based on Hungarian market data (2026).
 * Source: internal estimation model / market ranges — updateable from database later.
 * Model version: 2026.04
 *
 * IMPORTANT: These are NOT exact prices, NOT offers, NOT guarantees.
 * For decision-support and order-of-magnitude planning only.
 */

import type { QualityKey } from '../types'
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

// ── Phase-level cost distribution (%) ─────────────────────────────────────
// These percentages sum to 100

export interface CostPhaseDistribution {
  label: string
  pct: number   // 0–100
  icon: string
}

export const COST_PHASE_DISTRIBUTION: CostPhaseDistribution[] = [
  { label: 'Tervezés / előkészítés',       pct:  3, icon: '📐' },
  { label: 'Földmunka / alapozás',          pct: 12, icon: '⛏️' },
  { label: 'Szerkezetépítés',               pct: 25, icon: '🏗️' },
  { label: 'Tető',                          pct: 12, icon: '🏠' },
  { label: 'Nyílászárók',                   pct:  8, icon: '🪟' },
  { label: 'Gépészet és villany',           pct: 18, icon: '⚡' },
  { label: 'Belső munkák',                  pct: 15, icon: '🖌️' },
  { label: 'Külső munkák / tartalék',       pct:  7, icon: '🌿' },
]

// ── Items needed for more accurate estimate ────────────────────────────────

export const ACCURACY_IMPROVEMENT_ITEMS: string[] = [
  'Pontos lokáció',
  'Tervdokumentáció',
  'Műszaki tartalom',
  'Szerkezet típusa',
  'Tetőforma',
  'Gépészeti igények',
  'Nyílászárók minősége',
  'Burkolatok és belső anyagok szintje',
  'Kivitelezői ajánlatok',
]
