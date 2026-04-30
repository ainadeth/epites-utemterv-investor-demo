import type { TimelineResult } from '../types'

/**
 * Risk levels for the project timeline.
 * All thresholds here are heuristic — adjust freely.
 */
export type RiskLevel = 'realistic' | 'tight' | 'risky'

export interface RiskResult {
  level: RiskLevel
  label: string        // Hungarian display label
  emoji: string
  reason: string       // short explanation shown in UI
  color: string        // CSS color for text/border
  bgColor: string      // CSS background
  borderColor: string
}

/**
 * Scoring factors:
 *
 *  size:        large project (≥200 m²) = +2pts | medium (120–199) = +1pt | small = 0
 *  multiplier:  finalMultiplier > 1.30 = +2pts | > 1.10 = +1pt | < 0.95 = −1pt
 *  duration:    totalDays > 300 = +1pt | < 120 = +1pt (very short = suspicious)
 *  execution:   Saját szervezés = +1pt | Generálkivitelező = −1pt
 *  complexity:  Összetett = +1pt | Egyszerű = −1pt
 *
 *  0–1  → 🟢 Reális
 *  2–3  → 🟡 Feszített
 *  4+   → 🔴 Kockázatos
 */
export function evaluateRisk(result: TimelineResult): RiskResult {
  let score = 0
  const reasons: string[] = []

  // Size factor
  if (result.sizeM2 >= 200) {
    score += 2
    reasons.push('nagy alapterület')
  } else if (result.sizeM2 >= 120) {
    score += 1
    reasons.push('közepes-nagy alapterület')
  }

  // Final multiplier factor (captures execution + complexity + size together)
  if (result.finalMultiplier > 1.30) {
    score += 2
    reasons.push('magas kombinált szorzó')
  } else if (result.finalMultiplier > 1.10) {
    score += 1
    reasons.push('emelt szorzó')
  } else if (result.finalMultiplier < 0.95) {
    score -= 1  // very compressed plan, actually lower risk on duration
  }

  // Duration extremes
  if (result.totalDays > 300) {
    score += 1
    reasons.push('hosszú futamidő')
  } else if (result.totalDays < 120) {
    score += 1
    reasons.push('rövid tervezett futamidő')
  }

  // Execution mode
  if (result.executionModeKey === 'sajat') {
    score += 1
    reasons.push('saját szervezés')
  } else if (result.executionModeKey === 'general') {
    score -= 1
  }

  // Complexity
  if (result.complexityKey === 'osszetett') {
    score += 1
    reasons.push('összetett projekt')
  } else if (result.complexityKey === 'egyszeru') {
    score -= 1
  }

  // Clamp score to a minimum of 0
  score = Math.max(0, score)

  if (score <= 1) {
    return {
      level:       'realistic',
      label:       'Reális',
      emoji:       '🟢',
      reason:      reasons.length > 0 ? reasons[0] : 'A projekt jól tervezett',
      color:       '#15803D',
      bgColor:     '#F0FDF4',
      borderColor: '#86EFAC',
    }
  }

  if (score <= 3) {
    return {
      level:       'tight',
      label:       'Feszített',
      emoji:       '🟡',
      reason:      reasons.slice(0, 2).join(', ') || 'Ügyeljen a tartalékidőkre',
      color:       '#92400E',
      bgColor:     '#FFFBEB',
      borderColor: '#FCD34D',
    }
  }

  return {
    level:       'risky',
    label:       'Kockázatos',
    emoji:       '🔴',
    reason:      reasons.slice(0, 2).join(', ') || 'Több kockázati tényező azonosítva',
    color:       '#991B1B',
    bgColor:     '#FEF2F2',
    borderColor: '#FCA5A5',
  }
}
