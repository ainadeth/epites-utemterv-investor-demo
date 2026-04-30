/**
 * Free-tier phase detail content.
 * Keyed by the exact phase name string from projects.ts.
 * Keep concise — this is a teaser, not a professional knowledge base.
 */

export interface PhaseDetail {
  specialists: string[]        // 2–4 short tags
  risks: string[]              // 1–2 bullets
  watchOut: string             // 1 practical note
  nextStep: string             // 1 short action
}

export const PHASE_DETAILS: Record<string, PhaseDetail> = {

  // ── Lakásfelújítás ────────────────────────────────────────────────────────

  'Felmérés és tervezés': {
    specialists: ['Építész', 'Belsőépítész', 'Statikus'],
    risks: [
      'Rejtett hibák felfedezése növelheti a költségeket',
      'Engedélyköteles munkák azonosítása késést okozhat',
    ],
    watchOut: 'Minden tervezett munkát dokumentálj írásban, mielőtt ajánlatot kérsz.',
    nextStep: 'Kérj legalább 3 összehasonlítható árajánlatot kivitelezőktől.',
  },

  'Bontás és előkészítés': {
    specialists: ['Bontós', 'Általános kivitelező'],
    risks: [
      'Tartószerkezeti meglepetések (pl. rejtett gerendák, csövek)',
      'Porterhelés és zajszint a lakókörnyezetben',
    ],
    watchOut: 'Ellenőrizd a villany, víz, gáz lekapcsolási sorrendjét bontás előtt.',
    nextStep: 'Szervezd meg az építési hulladék elszállítását előre.',
  },

  'Gépészeti és elektromos munkák': {
    specialists: ['Villanyszerelő', 'Vízvezetékes', 'Fűtésszerelő'],
    risks: [
      'Meglévő hálózat nem felel meg az új terheknek',
      'Anyaghiány hosszabb átfutással (pl. elosztótábla)',
    ],
    watchOut: 'A gépészeti munkák előtt szereztessél be minden szükséges engedélyt.',
    nextStep: 'Egyeztesd a különböző szakiparosok munkáinak sorrendjét előre.',
  },

  'Burkolás és belső felületek': {
    specialists: ['Burkoló', 'Gipszkartonos', 'Ács'],
    risks: [
      'Száradási idő nem tartása repedezéshez vezet',
      'Mértéktévesztés anyagrendelésnél (hulladék)',
    ],
    watchOut: 'Rendelj minimum 10% többlet anyagot vágási veszteségre.',
    nextStep: 'Ellenőrizd a padló vízzárósítást nedves helyiségekben burkolás előtt.',
  },

  'Festés és befejező munkák': {
    specialists: ['Festő-mázoló', 'Glettelő'],
    risks: [
      'Páradús körülmények akadályozhatják a száradást',
    ],
    watchOut: 'Festés előtt a glett teljesen száraz legyen — minimálisan 48 óra.',
    nextStep: 'Készíts punch list-et az összes apró befejezetlen részletről.',
  },

  'Átadás és hibajavítás': {
    specialists: ['Általános kivitelező', 'Műszaki ellenőr'],
    risks: [
      'Hiánypótlás elhúzódása késleltetheti a beköltözést',
    ],
    watchOut: 'Minden javítást dokumentálj írásban és fényképekkel.',
    nextStep: 'Kérd el a jótállási dokumentumokat és a szerelési útmutatókat.',
  },

  // ── Családi ház építés ────────────────────────────────────────────────────

  'Telek-előkészítés': {
    specialists: ['Geodéta', 'Gépkezelő', 'Földmunkás'],
    risks: [
      'Talajvizsgálat meglepő eredménye módosíthatja az alapozást',
      'Tereprendezési engedély hiánya késést okoz',
    ],
    watchOut: 'Talajmechanikai vizsgálatot minden esetben végeztesd el az alapozás előtt.',
    nextStep: 'Intézd el a tereprendezési és fakivágási engedélyeket idejében.',
  },

  'Tervezés és engedélyezés': {
    specialists: ['Építész', 'Statikus', 'Gépész tervező'],
    risks: [
      'Hatósági hiánypótlás 4–8 hetes csúszást okozhat',
      'Szomszédi beleegyezés bonyolíthatja a folyamatot',
    ],
    watchOut: 'Ellenőrizd a HÉSZ (helyi építési szabályzat) előírásait tervezés előtt.',
    nextStep: 'Nyújtsd be az engedélykérelmet minél korábban — párhuzamosan tervezz.',
  },

  'Alapozás': {
    specialists: ['Zsaluzó', 'Vasbetonos', 'Betonozó'],
    risks: [
      'Fagyos vagy esős időjárás rontja a beton kötését',
      'Talajvíz szintje magasabb a tervezettnél',
    ],
    watchOut: 'Beton betonozás után legalább 10 napig ne terheld — a kötési idő kritikus.',
    nextStep: 'Rendeld meg a következő fázis acélanyagát még az alapozás közben.',
  },

  'Szerkezetépítés': {
    specialists: ['Zsaluzó', 'Vasbetonos', 'Állványozó'],
    risks: [
      'Téli szünet és fagyos időszak leállítja a munkát',
      'Acél és betonvas szállítási késés',
    ],
    watchOut: 'Minden szerkezeti elemet műszaki ellenőrrel fogadtass el betonozás előtt.',
    nextStep: 'Időzítsd a tetőszerkezet anyagrendelését a szerkezetépítés végéhez.',
  },

  'Tetőszerkezet': {
    specialists: ['Ács', 'Tetőfedő', 'Bádogos'],
    risks: [
      'Időjárás miatti csúszás — eső és szél kizárja a munkavégzést',
      'Faanyag és tetőfedő anyag késedelmes szállítása',
    ],
    watchOut: 'A faanyagot és tetőfedő anyagot időben rendeld meg — egyedi méret esetén 3–6 hét átfutás.',
    nextStep: 'Egyeztesd a bádogos és tetőfedő munkák időzítését egymással.',
  },

  'Gépészet': {
    specialists: ['Villanyszerelő', 'Vízvezetékes', 'Fűtésszerelő', 'Légkondis'],
    risks: [
      'Koordinációs problémák a különböző szakágak között',
      'Beépített gépészet módosítása falak zárása után nagyon drága',
    ],
    watchOut: 'Minden csatorna- és csővezeték-nyomást tesztelj a falak lezárása előtt.',
    nextStep: 'Készíts dokumentált as-built tervet a gépészeti nyomvonalakról.',
  },

  'Belső munkák és átadás': {
    specialists: ['Burkoló', 'Festő-mázoló', 'Műszaki ellenőr'],
    risks: [
      'Párhuzamos munkák ütközése lassíthatja a befejezést',
    ],
    watchOut: 'Koordináld a burkolás, festés és asztalos munkák sorrendjét pontosan.',
    nextStep: 'Ütemezd a hatósági használatbavételi engedély kérelmét már előre.',
  },

  // ── Bővítés / ráépítés ───────────────────────────────────────────────────

  'Engedélyezés': {
    specialists: ['Építész', 'Statikus'],
    risks: [
      'Szomszédi egyeztetés késleltetheti az eljárást',
      'Meglévő épület statikai vizsgálata módosítást igényelhet',
    ],
    watchOut: 'Bővítésnél kötelező statikai szakvélemény a meglévő szerkezetről.',
    nextStep: 'Indítsd az engedélyezést párhuzamosan a kivitelező keresésével.',
  },

  'Szerkezeti munkák': {
    specialists: ['Zsaluzó', 'Vasbetonos', 'Ács'],
    risks: [
      'Csatlakozás a meglévő szerkezethez váratlan bontással járhat',
      'Időjárás miatti leállás',
    ],
    watchOut: 'A meglévő épület és az új szerkezet csatlakozási pontját statikussal ellenőriztesd.',
    nextStep: 'Tervezd meg előre a gépészeti átvezetések nyomvonalát.',
  },

  'Belső befejező munkák': {
    specialists: ['Burkoló', 'Gipszkartonos', 'Festő-mázoló'],
    risks: [
      'Párhuzamos munkák ütközése lassít',
    ],
    watchOut: 'Ellenőrizd, hogy az összes gépészeti munka lezárt és átvett állapotban van befejezés előtt.',
    nextStep: 'Készíts hibajegyzéket és egyezz meg a garanciális javítások ütemezéséről.',
  },

  'Átadás': {
    specialists: ['Általános kivitelező', 'Műszaki ellenőr'],
    risks: [
      'Hatósági bejárás előtti hiánypótlás késleltetheti az átadást',
    ],
    watchOut: 'Dokumentálj minden befejezett munkát fényképpel és szállítólevelekkel.',
    nextStep: 'Kérd el a jótállási jegyeket, közműátadási papírokat és a szerelési útmutatókat.',
  },
}
