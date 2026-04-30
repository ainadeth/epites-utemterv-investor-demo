/**
 * Professional data constants.
 * All profiles are fictional demo data only.
 * Phase→professional mappings are based on typical Hungarian construction practice.
 */

// ── Professional categories ────────────────────────────────────────────────

export const PROF_CATEGORIES = [
  'Építész',
  'Statikus',
  'Műszaki ellenőr',
  'Kőműves',
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
  // Families ház phases
  'Telek-előkészítés':           ['Geodéta', 'Földmunkás / gépkezelő', 'Műszaki ellenőr'],
  'Tervezés és engedélyezés':    ['Építész', 'Statikus', 'Gépész tervező'],
  'Alapozás':                    ['Kőműves', 'Műszaki ellenőr', 'Statikus'],
  'Szerkezetépítés':             ['Kőműves', 'Statikus', 'Műszaki ellenőr'],
  'Tetőszerkezet':               ['Ács', 'Tetőfedő', 'Bádogos', 'Műszaki ellenőr'],
  'Gépészet':                    ['Víz-gáz-fűtésszerelő', 'Gépész tervező'],
  'Belső munkák és átadás':      ['Burkoló', 'Festő', 'Műszaki ellenőr'],
  // Felújítás phases
  'Felmérés és tervezés':        ['Építész', 'Statikus', 'Műszaki ellenőr'],
  'Bontás és előkészítés':       ['Kőműves', 'Műszaki ellenőr'],
  'Gépészeti és elektromos munkák': ['Villanyszerelő', 'Víz-gáz-fűtésszerelő'],
  'Burkolás és belső felületek': ['Burkoló', 'Festő'],
  'Festés és befejező munkák':   ['Festő'],
  'Átadás és hibajavítás':       ['Műszaki ellenőr'],
  // Bővítés phases
  'Engedélyezés':                ['Építész', 'Ügyvéd'],
  'Szerkezeti munkák':           ['Kőműves', 'Statikus', 'Műszaki ellenőr'],
  'Belső befejező munkák':       ['Burkoló', 'Festő'],
  'Átadás':                      ['Műszaki ellenőr'],
}

// ── Sample professional profiles (fictional demo data only) ───────────────

export interface SampleProfile {
  id: string
  name: string
  category: ProfCategory
  location: string
  badge: string
  badgeColor: 'green' | 'yellow' | 'blue' | 'gray'
  reference: string
  availability: string
}

export const SAMPLE_PROFILES: SampleProfile[] = [
  {
    id: 'p1',
    name: 'Példa Villany Kft.',
    category: 'Villanyszerelő',
    location: 'Budapest és Pest megye',
    badge: 'Előszűrésre vár',
    badgeColor: 'yellow',
    reference: 'Lakásfelújítások és családi házak elektromos hálózatának korszerűsítése.',
    availability: 'Demo profil',
  },
  {
    id: 'p2',
    name: 'TetőPont Ács Team',
    category: 'Ács',
    location: 'Fejér megye',
    badge: 'Referencia ellenőrzés alatt',
    badgeColor: 'yellow',
    reference: 'Tetőszerkezet, fedés és bádogos munkák családi házaknál.',
    availability: 'Demo profil',
  },
  {
    id: 'p3',
    name: 'TetőPont Fedés',
    category: 'Tetőfedő',
    location: 'Fejér és Veszprém megye',
    badge: 'Demo profil',
    badgeColor: 'gray',
    reference: 'Cserép, pala és lemezfedési munkák, garancia vállalással.',
    availability: 'Demo profil',
  },
  {
    id: 'p4',
    name: 'BurkolatMester Demo',
    category: 'Burkoló',
    location: 'Budapest',
    badge: 'Demo profil',
    badgeColor: 'gray',
    reference: 'Fürdőszoba, konyha és nappali burkolási munkák.',
    availability: 'Demo profil',
  },
  {
    id: 'p5',
    name: 'OtthonKontroll Kft.',
    category: 'Műszaki ellenőr',
    location: 'Országos / online egyeztetés',
    badge: 'Validációs koncepció',
    badgeColor: 'blue',
    reference: 'Fázisellenőrzés, hibák megelőzése, kivitelezői egyeztetések.',
    availability: 'Demo profil',
  },
  {
    id: 'p6',
    name: 'ÉpítésFinansz Partner',
    category: 'Finanszírozó',
    location: 'Országos',
    badge: 'Partner előnézet',
    badgeColor: 'blue',
    reference: 'Építési és felújítási finanszírozási lehetőségek előszűrése.',
    availability: 'Demo profil',
  },
  {
    id: 'p7',
    name: 'Alapos Statika Bt.',
    category: 'Statikus',
    location: 'Budapest és agglomeráció',
    badge: 'Demo profil',
    badgeColor: 'gray',
    reference: 'Szerkezeti tervek, felülvizsgálat és engedélyezési statika.',
    availability: 'Demo profil',
  },
  {
    id: 'p8',
    name: 'TervMűhely Építész Iroda',
    category: 'Építész',
    location: 'Budapest',
    badge: 'Referencia ellenőrzés alatt',
    badgeColor: 'yellow',
    reference: 'Engedélyezési és kiviteli tervek, energetikai számítások.',
    availability: 'Demo profil',
  },
  {
    id: 'p9',
    name: 'Kőműves Megoldások Demo',
    category: 'Kőműves',
    location: 'Győr-Moson-Sopron megye',
    badge: 'Demo profil',
    badgeColor: 'gray',
    reference: 'Falazás, vakolás, gipszkarton és aljzatbetonozás.',
    availability: 'Demo profil',
  },
  {
    id: 'p10',
    name: 'Gépész Profi Demo',
    category: 'Víz-gáz-fűtésszerelő',
    location: 'Budapest és környéke',
    badge: 'Demo profil',
    badgeColor: 'gray',
    reference: 'Fűtés, hűtés, hőszivattyú és vízvezeték rendszerek.',
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
