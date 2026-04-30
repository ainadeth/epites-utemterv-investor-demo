import type { Project, ProjectKey } from '../types'

export const PROJECTS: Record<ProjectKey, Project> = {
  felujitas: {
    label: 'Lakásfelújítás',
    phases: [
      { name: 'Felmérés és tervezés',            days: 14 },
      { name: 'Bontás és előkészítés',            days: 21 },
      { name: 'Gépészeti és elektromos munkák',   days: 28 },
      { name: 'Burkolás és belső felületek',       days: 21 },
      { name: 'Festés és befejező munkák',         days: 14 },
      { name: 'Átadás és hibajavítás',             days: 7  },
    ],
  },

  hazepites: {
    label: 'Családi ház építés',
    phases: [
      { name: 'Telek-előkészítés',       days: 14 },
      { name: 'Tervezés és engedélyezés', days: 30 },
      {
        name: 'Alapozás',                days: 21,
        bufferDays: 10,   // midpoint of 7–14 day curing range
        bufferLabel: 'Várakozási idő (beton kötés)',
      },
      {
        name: 'Szerkezetépítés',         days: 45,
        bufferDays: 5,    // midpoint of 3–7 day buffer
        bufferLabel: 'Várakozási idő (szerkezet átvétel)',
      },
      {
        name: 'Tetőszerkezet',           days: 21,
        bufferDays: 3,    // midpoint of 2–5 day buffer
        bufferLabel: 'Várakozási idő (tető száradás)',
      },
      { name: 'Gépészet',                days: 28 },
      { name: 'Belső munkák és átadás',  days: 44 },
    ],
  },

  bovites: {
    label: 'Bővítés / ráépítés',
    phases: [
      { name: 'Felmérés és tervezés',    days: 14 },
      { name: 'Engedélyezés',            days: 21 },
      {
        name: 'Szerkezeti munkák',       days: 30,
        bufferDays: 5,    // structural curing buffer
        bufferLabel: 'Várakozási idő (szerkezet kötés)',
      },
      { name: 'Gépészet',                days: 21 },
      { name: 'Belső befejező munkák',   days: 21 },
      { name: 'Átadás',                  days: 7  },
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
