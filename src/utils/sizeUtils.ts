/**
 * Returns the size multiplier for a given project area in m².
 *
 * Brackets:
 *   10–59   m²  → 0.90×
 *   60–119  m²  → 1.00×  (baseline)
 *  120–199  m²  → 1.15×
 *  200–349  m²  → 1.30×
 *  350+     m²  → 1.50×
 */
export function getSizeMultiplier(sizeM2: number): number {
  if (sizeM2 < 60)  return 0.90
  if (sizeM2 < 120) return 1.00
  if (sizeM2 < 200) return 1.15
  if (sizeM2 < 350) return 1.30
  return 1.50
}

/**
 * Apply the size multiplier to a base duration (days).
 * - Rounds to the nearest whole day
 * - Minimum 1 day
 */
export function applyMultiplier(baseDays: number, multiplier: number): number {
  return Math.max(1, Math.round(baseDays * multiplier))
}

/**
 * Human-readable label for the current multiplier bracket.
 */
export function multiplierLabel(sizeM2: number): string {
  const m = getSizeMultiplier(sizeM2)
  return `${m.toFixed(2).replace('.', ',')}×`
}
