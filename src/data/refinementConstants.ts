/**
 * Budget refinement question data and risk scoring constants.
 * All scores are heuristic — edit here to adjust without touching UI.
 */

export interface RefinementOption {
  label: string
  score: 0 | 1 | 2   // 0 = low risk, 1 = medium, 2 = high
  /** Short label shown in "Fő eltérítő tényezők" when score > 0 */
  riskLabel?: string
}

export interface RefinementQuestion {
  id: string
  label: string
  options: RefinementOption[]
}

export const REFINEMENT_QUESTIONS: RefinementQuestion[] = [
  {
    id: 'telek',
    label: 'Telek és helyszín',
    options: [
      { label: 'Egyszerű, jól megközelíthető',          score: 0 },
      { label: 'Átlagos adottságú',                      score: 1, riskLabel: 'Átlagos telekadottság' },
      { label: 'Nehéz terep / szűk bejutás / lejtős telek', score: 2, riskLabel: 'Nehéz terepviszonyok' },
    ],
  },
  {
    id: 'terv',
    label: 'Terv állapota',
    options: [
      { label: 'Még nincs terv',                         score: 2, riskLabel: 'Hiányzó tervdokumentáció' },
      { label: 'Vázlat / koncepció van',                 score: 1, riskLabel: 'Csak vázlatos terv' },
      { label: 'Kész terv / engedélyezés alatt',         score: 0 },
    ],
  },
  {
    id: 'forma',
    label: 'Épület formai egyszerűsége',
    options: [
      { label: 'Egyszerű tömeg, kevés töréssel',         score: 0 },
      { label: 'Átlagos családi ház',                    score: 1, riskLabel: 'Átlagos épülettömeg' },
      { label: 'Összetett forma / sok törés / nagy üvegfelületek', score: 2, riskLabel: 'Összetett épületforma' },
    ],
  },
  {
    id: 'teto',
    label: 'Tető kialakítása',
    options: [
      { label: 'Egyszerű tető',                          score: 0 },
      { label: 'Átlagos tető',                           score: 1, riskLabel: 'Átlagos tetőkialakítás' },
      { label: 'Összetett vagy egyedi tető',             score: 2, riskLabel: 'Összetett/egyedi tető' },
    ],
  },
  {
    id: 'gepeszet',
    label: 'Gépészet és komfortszint',
    options: [
      { label: 'Alap rendszer',                          score: 0 },
      { label: 'Korszerű, de átlagos rendszer',          score: 1, riskLabel: 'Korszerű gépészet' },
      { label: 'Magasabb igény / hőszivattyú / okosotthon / extra komfort', score: 2, riskLabel: 'Prémium gépészet / okosotthon' },
    ],
  },
  {
    id: 'kulso',
    label: 'Külső munkák',
    options: [
      { label: 'Minimális külső munka',                  score: 0 },
      { label: 'Terasz / térkő / kerítés is várható',    score: 1, riskLabel: 'Közepes külső munkák' },
      { label: 'Jelentős külső munka / támfal / medence / nagy kertépítés', score: 2, riskLabel: 'Jelentős külső munkák' },
    ],
  },
]

// ── Risk level thresholds ──────────────────────────────────────────────────
// Total score range: 0–12 (6 questions × max 2 points each)

export type RiskLevel = 'alacsony' | 'kozepes' | 'magas'

export function getRiskLevel(totalScore: number): RiskLevel {
  if (totalScore <= 3)  return 'alacsony'
  if (totalScore <= 7)  return 'kozepes'
  return 'magas'
}

export type EstimationDirection = 'stabil' | 'enyheFelfel' | 'jelentosenFelfel'

export function getEstimationDirection(level: RiskLevel): EstimationDirection {
  if (level === 'alacsony') return 'stabil'
  if (level === 'kozepes')  return 'enyheFelfel'
  return 'jelentosenFelfel'
}

// ── Budget adjustment factors per risk level ──────────────────────────────

export const RISK_BUDGET_ADJUSTMENT: Record<RiskLevel, { minFactor: number; maxFactor: number }> = {
  alacsony: { minFactor: 1.00, maxFactor: 1.00 },
  kozepes:  { minFactor: 1.05, maxFactor: 1.05 },
  magas:    { minFactor: 1.10, maxFactor: 1.20 },
}

// ── Display labels ─────────────────────────────────────────────────────────

export const RISK_LEVEL_LABEL: Record<RiskLevel, { label: string; color: string; bg: string; border: string }> = {
  alacsony: { label: 'Alacsony',  color: '#15803D', bg: '#F0FDF4', border: '#86EFAC' },
  kozepes:  { label: 'Közepes',   color: '#92400E', bg: '#FFFBEB', border: '#FCD34D' },
  magas:    { label: 'Magas',     color: '#991B1B', bg: '#FEF2F2', border: '#FCA5A5' },
}

export const DIRECTION_LABEL: Record<EstimationDirection, string> = {
  stabil:            'Inkább stabil',
  enyheFelfel:       'Enyhén felfelé módosulhat',
  jelentosenFelfel:  'Jelentősen felfelé kockázatos',
}

export const DIRECTION_EXPLANATION: Record<EstimationDirection, string> = {
  stabil:
    'A megadott tényezők nem utalnak jelentős kockázatra. A becsült sáv valószínűleg tartható, ha az anyagárak stabilan maradnak.',
  enyheFelfel:
    'Néhány tényező növelheti a tényleges költséget a becsültnél. Érdemes 5–10%-os tartalékot tervezni.',
  jelentosenFelfel:
    'Több kockázati tényező is jelen van. A tényleges költség az előzetesen becsültnél érdemben magasabb lehet. Javasolt 15–25%-os tartalék és részletes tervezés mielőtt kivitelezőket keresünk.',
}
