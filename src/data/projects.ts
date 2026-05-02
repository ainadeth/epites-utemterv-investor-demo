import type { Project, ProjectKey } from '../types'

export const PROJECTS: Record<ProjectKey, Project> = {

  // ── Lakásfelújítás ──────────────────────────────────────────────────────
  // Baseline: ~50 naptári nap (normál, 100 m²) szorzók előtt.
  // Egyes szakemberek (villanyszerelő, gépész) több rövidebb ütemben térnek
  // vissza — az ütemterv ezt tükrözi, nem egyetlen monolitikus fázissal.
  felujitas: {
    label: 'Lakásfelújítás',
    phases: [
      { name: 'Felmérés és előkészítő tervezés',  days: 5  },
      { name: 'Bontás és sittkezelés',             days: 4  },
      { name: 'Villanyszerelés — első ütem',       days: 4  },
      { name: 'Gépészet — első ütem',              days: 4  },
      { name: 'Faljavítás és aljzat-előkészítés',  days: 6  },
      { name: 'Burkolás és vízszigetelés',         days: 10 },
      { name: 'Festés és felületképzés',           days: 7  },
      { name: 'Villany és gépészet — szerelvényezés', days: 3 },
      { name: 'Belső beépítések és finomhangolás', days: 4  },
      { name: 'Átadás és hibajavítás',             days: 3  },
    ],
  },

  // ── Családi ház építés ───────────────────────────────────────────────────
  // Baseline: ~210 naptári nap (normál körülmények) szorzók előtt.
  // Egyes fázisok párhuzamosan is futhatnak; ez egy egyszerűsített,
  // tulajdonos-szempontú sorrend.
  hazepites: {
    label: 'Családi ház építés',
    phases: [
      { name: 'Tervezés és engedélyezési előkészítés', days: 30 },
      { name: 'Telek-előkészítés és kitűzés',          days: 7  },
      {
        name: 'Földmunka és alapozás',                 days: 14,
        bufferDays: 10,
        bufferLabel: 'Várakozási idő (beton kötés)',
      },
      {
        name: 'Szerkezetépítés / falazás',             days: 28,
        bufferDays: 5,
        bufferLabel: 'Várakozási idő (szerkezet átvétel)',
      },
      { name: 'Födém / koszorú / szerkezeti lezárások', days: 14 },
      {
        name: 'Tetőszerkezet és fedés',                days: 18,
        bufferDays: 3,
        bufferLabel: 'Várakozási idő (tető száradás)',
      },
      { name: 'Nyílászárók és épületzárás',            days: 7  },
      { name: 'Gépészet és villany — első ütem',       days: 18 },
      { name: 'Aljzatok, vakolás, belső előkészítés',  days: 21 },
      { name: 'Burkolás és belső felületek',           days: 21 },
      { name: 'Festés, szerelvényezés, belső befejezés', days: 14 },
      { name: 'Külső munkák, próbaüzem, átadás',       days: 14 },
    ],
  },

  // ── Bővítés / ráépítés ───────────────────────────────────────────────────
  // Baseline: ~130 naptári nap (normál bővítés) szorzók előtt.
  bovites: {
    label: 'Bővítés / ráépítés',
    phases: [
      { name: 'Felmérés, statikai és műszaki előkészítés', days: 10 },
      { name: 'Tervezés és engedélyezési egyeztetés',      days: 20 },
      { name: 'Terület-előkészítés és bontási kapcsolódások', days: 7 },
      {
        name: 'Alapozási / szerkezeti kapcsolódások',      days: 14,
        bufferDays: 7,
        bufferLabel: 'Várakozási idő (beton / kapcsolódás kötés)',
      },
      {
        name: 'Szerkezetépítés / ráépítés',               days: 21,
        bufferDays: 4,
        bufferLabel: 'Várakozási idő (szerkezet átvétel)',
      },
      { name: 'Tető / homlokzati kapcsolódások',           days: 14 },
      { name: 'Nyílászárók és épületzárás',                days: 7  },
      { name: 'Gépészet és villany — első ütem',           days: 10 },
      { name: 'Belső előkészítés, vakolás / aljzat',       days: 12 },
      { name: 'Burkolás, festés, belső befejezések',       days: 16 },
      { name: 'Szerelvényezés és külső rendezés',          days: 7  },
      { name: 'Átadás és hibajavítás',                     days: 4  },
    ],
  },
}

// How many phases to hide from the top based on current status.
// Buffer rows inherit their parent phase's hidden flag — no extra entry needed here.
export const STATUS_SKIP_MAP: Record<string, number> = {
  '0': 0,  // Tervezés alatt        → show all
  '1': 1,  // Engedélyezés alatt    → hide 1 phase
  '2': 2,  // Kivitelezés indul     → hide 2 phases
  '3': 4,  // Szerkezetkész         → hide 4 phases
  '4': 5,  // Befejező munkák előtt → hide 5 phases
}
