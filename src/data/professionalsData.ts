/**
 * Professional data constants.
 * All profiles are FICTIONAL demo data only — not real people, not real companies.
 * Do NOT use as real professional recommendations.
 * Phase→professional mappings are based on typical Hungarian construction practice.
 */

// ── Professional categories ────────────────────────────────────────────────

export const PROF_CATEGORIES = [
  'Építész',
  'Statikus',
  'Műszaki ellenőr',
  'Kőműves',
  'Gipszkartonos',
  'Ács',
  'Tetőfedő',
  'Bádogos',
  'Villanyszerelő',
  'Víz-gáz-fűtésszerelő',
  'Burkoló',
  'Festő',
  'Térkövező',
  'Ügyvéd',
  'Finanszírozó',
  'Tüzép / anyagbeszállító',
  'Geodéta',
  'Gépész tervező',
  'Földmunkás / gépkezelő',
] as const

export type ProfCategory = (typeof PROF_CATEGORIES)[number]

// ── Phase → professional categories mapping ───────────────────────────────

export const PHASE_TO_PROFESSIONALS: Record<string, ProfCategory[]> = {
  'Telek-előkészítés':              ['Geodéta', 'Földmunkás / gépkezelő', 'Műszaki ellenőr'],
  'Tervezés és engedélyezés':       ['Építész', 'Statikus', 'Gépész tervező'],
  'Alapozás':                       ['Kőműves', 'Műszaki ellenőr', 'Statikus'],
  'Szerkezetépítés':                ['Kőműves', 'Statikus', 'Műszaki ellenőr'],
  'Tetőszerkezet':                  ['Ács', 'Tetőfedő', 'Bádogos', 'Műszaki ellenőr'],
  'Gépészet':                       ['Víz-gáz-fűtésszerelő', 'Gépész tervező'],
  'Belső munkák és átadás':         ['Burkoló', 'Festő', 'Gipszkartonos', 'Műszaki ellenőr'],
  'Felmérés és tervezés':           ['Építész', 'Statikus', 'Műszaki ellenőr'],
  'Bontás és előkészítés':          ['Kőműves', 'Műszaki ellenőr'],
  'Gépészeti és elektromos munkák': ['Villanyszerelő', 'Víz-gáz-fűtésszerelő'],
  'Burkolás és belső felületek':    ['Burkoló', 'Festő', 'Gipszkartonos'],
  'Festés és befejező munkák':      ['Festő'],
  'Átadás és hibajavítás':          ['Műszaki ellenőr'],
  'Engedélyezés':                   ['Építész', 'Ügyvéd'],
  'Szerkezeti munkák':              ['Kőműves', 'Statikus', 'Műszaki ellenőr'],
  'Belső befejező munkák':          ['Burkoló', 'Festő', 'Gipszkartonos'],
  'Átadás':                         ['Műszaki ellenőr'],
}

// ── Sample professional profiles (fictional demo data only) ───────────────

export interface SampleProfile {
  id: string
  name: string
  category: ProfCategory
  location: string
  intro: string
  badge: string
  badgeColor: 'green' | 'yellow' | 'blue' | 'gray'
  rating: number
  reviews: number
  specialties: string[]
  reference: string
  availability: string
}

export const SAMPLE_PROFILES: SampleProfile[] = [
  {
    id: 'p1',
    name: 'Gipsz Jakab',
    category: 'Gipszkartonos',
    location: 'Budapest és Pest megye',
    intro: 'Álmennyezetek, válaszfalak és előtétfalak kivitelezése lakásfelújításoknál és családi házaknál.',
    badge: 'Demo profil',
    badgeColor: 'gray',
    rating: 4.8,
    reviews: 23,
    specialties: ['gipszkarton válaszfal', 'álmennyezet', 'rejtett LED előkészítés'],
    reference: 'Demo referencia: 72 m²-es lakás teljes gipszkartonozása.',
    availability: 'Demo profil',
  },
  {
    id: 'p2',
    name: 'Példa Villany Kft.',
    category: 'Villanyszerelő',
    location: 'Budapest, Érd, Budaörs',
    intro: 'Lakásfelújítások és családi házak elektromos hálózatának korszerűsítése.',
    badge: 'Referencia ellenőrzött',
    badgeColor: 'green',
    rating: 4.9,
    reviews: 31,
    specialties: ['teljes hálózatcsere', 'villanyóra szabványosítás', 'FI-relé', 'okosotthon előkészítés'],
    reference: 'Demo referencia: 100 m²-es családi ház elektromos szerelése.',
    availability: 'Demo profil',
  },
  {
    id: 'p3',
    name: 'TetőPont Ács Team',
    category: 'Ács',
    location: 'Fejér megye, Veszprém megye',
    intro: 'Tetőszerkezetek építése, javítása és fedés előkészítése.',
    badge: 'Validáció alatt',
    badgeColor: 'yellow',
    rating: 4.7,
    reviews: 18,
    specialties: ['tetőszerkezet', 'faanyagvédelem', 'tetőfelújítás'],
    reference: 'Demo referencia: nyeregtetős családi ház tetőszerkezete.',
    availability: 'Demo profil',
  },
  {
    id: 'p4',
    name: 'Bádog Profi Demo',
    category: 'Bádogos',
    location: 'Budapest és agglomeráció',
    intro: 'Ereszcsatorna, szegélyek, lemezelések és vízelvezetési csomópontok kivitelezése.',
    badge: 'Demo profil',
    badgeColor: 'gray',
    rating: 4.6,
    reviews: 14,
    specialties: ['ereszcsatorna', 'szegélylemez', 'kéményszegély'],
    reference: 'Demo referencia: tetőfelújítás bádogos munkái.',
    availability: 'Demo profil',
  },
  {
    id: 'p5',
    name: 'BurkolatMester Demo',
    category: 'Burkoló',
    location: 'Budapest',
    intro: 'Fürdőszobák, konyhák, nappalik és teraszok burkolási munkái.',
    badge: 'Előszűrt partner',
    badgeColor: 'blue',
    rating: 4.8,
    reviews: 27,
    specialties: ['fürdőszoba burkolás', 'vízszigetelés előkészítés', 'nagylapos burkolat'],
    reference: 'Demo referencia: komplett fürdőszoba burkolás.',
    availability: 'Demo profil',
  },
  {
    id: 'p6',
    name: 'Színvonal Festő Team',
    category: 'Festő',
    location: 'Pest megye',
    intro: 'Tisztasági festés, glettelés, javítás és teljes lakásfestés.',
    badge: 'Demo profil',
    badgeColor: 'gray',
    rating: 4.5,
    reviews: 19,
    specialties: ['glettelés', 'tisztasági festés', 'penészgátló festés'],
    reference: 'Demo referencia: 120 m²-es családi ház beltéri festése.',
    availability: 'Demo profil',
  },
  {
    id: 'p7',
    name: 'OtthonKontroll Kft.',
    category: 'Műszaki ellenőr',
    location: 'Országos / online egyeztetés',
    intro: 'Fázisellenőrzés, kivitelezői egyeztetés és hibamegelőzés építkezőknek.',
    badge: 'Validációs koncepció',
    badgeColor: 'blue',
    rating: 4.9,
    reviews: 12,
    specialties: ['műszaki ellenőrzés', 'fázisátvétel', 'hibajegyzék'],
    reference: 'Demo referencia: családi ház szerkezetkész állapotának ellenőrzése.',
    availability: 'Demo profil',
  },
  {
    id: 'p8',
    name: 'Víz-Gépész Partner',
    category: 'Víz-gáz-fűtésszerelő',
    location: 'Budapest, Szentendre, Dunakeszi',
    intro: 'Vízkiállások, fűtési rendszer, fürdőszobai gépészet és felújítási munkák.',
    badge: 'Referencia ellenőrzött',
    badgeColor: 'green',
    rating: 4.7,
    reviews: 22,
    specialties: ['fürdőszoba gépészet', 'radiátoros rendszer', 'padlófűtés előkészítés'],
    reference: 'Demo referencia: fürdőszoba teljes gépészeti átalakítása.',
    availability: 'Demo profil',
  },
  {
    id: 'p9',
    name: 'Térkő Expressz Demo',
    category: 'Térkövező',
    location: 'Pest megye, Fejér megye',
    intro: 'Bejárók, járdák, teraszok és kerti térburkolatok kivitelezése.',
    badge: 'Demo profil',
    badgeColor: 'gray',
    rating: 4.6,
    reviews: 16,
    specialties: ['térkövezés', 'szegélyezés', 'alapréteg előkészítés'],
    reference: 'Demo referencia: 85 m² kocsibeálló térkövezése.',
    availability: 'Demo profil',
  },
  {
    id: 'p10',
    name: 'ÉpítésFinansz Partner',
    category: 'Finanszírozó',
    location: 'Országos',
    intro: 'Építési és felújítási finanszírozási lehetőségek előszűrése.',
    badge: 'Partner előnézet',
    badgeColor: 'blue',
    rating: 4.8,
    reviews: 9,
    specialties: ['építési hitel', 'felújítási hitel', 'támogatási lehetőségek'],
    reference: 'Demo referencia: finanszírozási előszűrés családi ház építéshez.',
    availability: 'Demo profil',
  },
]

// ── Badge color styles ─────────────────────────────────────────────────────

export const BADGE_STYLES: Record<SampleProfile['badgeColor'], { bg: string; border: string; color: string }> = {
  green:  { bg: '#F0FDF4', border: '#86EFAC', color: '#15803D' },
  yellow: { bg: '#FFFBEB', border: '#FCD34D', color: '#92400E' },
  blue:   { bg: '#EFF6FF', border: '#93C5FD', color: '#1D4ED8' },
  gray:   { bg: 'var(--surface-subtle)', border: 'var(--border)', color: 'var(--tx-muted)' },
}
