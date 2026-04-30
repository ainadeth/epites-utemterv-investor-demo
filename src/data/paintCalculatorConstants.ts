/**
 * Phase calculator constants.
 * Keep all default values and unit prices here — easy to update later.
 */

// ── Festés kalkulátor defaults ─────────────────────────────────────────────

export const PAINT_DEFAULTS = {
  surfaceArea:  100,   // m²
  layers:       2,     // rétegek száma
  laborPrice:   2500,  // Ft/m²
  paintPrice:   3500,  // Ft/liter
  coverage:     10,    // m²/liter/réteg (festék kiadóssága)
  needsPrimer:  true,
  needsPlaster: false,
  extraCost:    0,     // Ft
}

// ── Unit prices used in calculation ───────────────────────────────────────

export const PRIMER_COST_PER_M2  = 300    // Ft/m²
export const PLASTER_COST_PER_M2 = 2000   // Ft/m²
export const PAINT_RESERVE_PCT   = 0.10   // 10% tartalék

// ── Coming-soon phase calculators ─────────────────────────────────────────

export interface PhaseCalcCard {
  id: string
  icon: string
  title: string
  desc: string
  comingSoon: boolean
}

export const PHASE_CALCULATORS: PhaseCalcCard[] = [
  {
    id: 'festes',
    icon: '🖌️',
    title: 'Festés kalkulátor',
    desc: 'Számold ki a festéshez szükséges anyagmennyiséget és a várható költségeket.',
    comingSoon: false,
  },
  {
    id: 'burkolas',
    icon: '🪟',
    title: 'Burkolás kalkulátor',
    desc: 'Padló- és falburkoláshoz szükséges csempe, ragasztó és fugázó mennyiség.',
    comingSoon: true,
  },
  {
    id: 'szigeteles',
    icon: '🧱',
    title: 'Szigetelés kalkulátor',
    desc: 'Homlokzati vagy tető szigeteléshez szükséges anyagmennyiség becslése.',
    comingSoon: true,
  },
  {
    id: 'terkovezes',
    icon: '🌿',
    title: 'Térkövezés kalkulátor',
    desc: 'Térkő, ágyazóhomok és szegélykő szükséglet a megadott terület alapján.',
    comingSoon: true,
  },
]
