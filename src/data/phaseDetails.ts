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

  // ── Lakásfelújítás (updated segmented phases) ─────────────────────────────
  // Fontos: egyes szakemberek nem folyamatosan dolgoznak a projekten.
  // Több szakág rövidebb ütemekben tér vissza — a lefoglalás és az előzetes
  // egyeztetés kritikus.

  'Felmérés és előkészítő tervezés': {
    specialists: ['Kivitelező / projektvezető', 'Műszaki ellenőr (opcionális)', 'Villanyszerelő (egyeztetés)'],
    risks: [
      'Rejtett hibák (pl. penész, nedves fal) csak bontás után derülnek ki',
      'Hiányos műszaki tartalom esetén az ajánlatok nem összehasonlíthatók',
    ],
    watchOut: 'Helyiségenkénti igényeket és konnektordóból/csapkiállásból meg kell állapodni a szakiparosokkal — módosítás bontás után drágul.',
    nextStep: 'Kérj írásos ajánlatot legalább 2-3 kivitelezőtől vagy szakipari mestertől.',
  },

  'Bontás és sittkezelés': {
    specialists: ['Bontó brigád', 'Sittszállító'],
    risks: [
      'Tartószerkezeti elemek, rejtett csövek vagy elektromos nyomvonalak bontás közben derülhetnek ki',
      'Azbesztes anyagok régebbi épületekben külön kezelést igényelnek',
    ],
    watchOut: 'Bontás előtt kapcsoltasd le a villany, víz és gáz megfelelő köreit. Takarj le mindent ami marad.',
    nextStep: 'Bontás után azonnal felmérjük a tényleges állapotot — ez az alapja a gépészeti és elektromos tervezésnek.',
  },

  'Villanyszerelés — első ütem': {
    specialists: ['Villanyszerelő'],
    risks: [
      'A konnektorok, kapcsolók és lámpatestek helyét bontás előtt kell dönteni — módosítás később drága',
      'Elosztódoboz, FI-relé és biztonsági elemek rendelési átfutása 1-3 hét lehet',
    ],
    watchOut: 'Ez az első villanyszerelői ütem: nyomvonalak, dobozok, kábelfektetés. A villanyszerelő szerelvényezésre (kapcsolók, konnektorok, lámpák) burkolás és festés után tér vissza.',
    nextStep: 'Egyeztesd a villanyszerelővel a visszatérési időpontot — ezt már most le kell foglalni.',
  },

  'Gépészet — első ütem': {
    specialists: ['Víz-gáz-fűtésszerelő', 'Gépész'],
    risks: [
      'Padlófűtés bekötése hosszabb fázist igényel — ezt a burkolás előtt kell lezárni',
      'Régi csövek és lefolyók állapota csak bontás után derül ki',
    ],
    watchOut: 'Ez az első gépészeti ütem: csőnyomvonalak, kiállások, vizes helyiségek alapkiépítése. A gépész szaniterekre, csaptelepekre és radiátor-elemekre burkolás és festés után tér vissza.',
    nextStep: 'Egyeztesd a gépésszel a visszatérési időpontot — lefolyó és víziállás próbát bontás után végezzetek.',
  },

  'Faljavítás és aljzat-előkészítés': {
    specialists: ['Kőműves', 'Glettelő / aljzatelőkészítő'],
    risks: [
      'Vésések nem megfelelő lezárása burkolási és festési hibákhoz vezet',
      'Nedves aljzat burkolás előtt repedezést, leválást okoz',
    ],
    watchOut: 'Az aljzat egyenletessége és szilárdsága a burkolás minőségét alapozza meg — ne siettessük a száradást.',
    nextStep: 'Aljzat mérésével ellenőrizd az egyenletességet burkolás előtt (maximálisan 3 mm / 2 m egyenetlenség).',
  },

  'Burkolás és vízszigetelés': {
    specialists: ['Burkoló'],
    risks: [
      'Vízszigetelés kihagyása vagy hibás alkalmazása nedves helyiségben hosszú távú kárt okoz',
      'Eltérő LOT számú lapok között árnyalatbeli különbség lehet',
    ],
    watchOut: 'Anyagot, ragasztót, fugát, élvédőt és vízszigetelést előre kell beszerezni — szállítási idő 1-2 hét lehet. Rendelj minimum 10% tartalékot.',
    nextStep: 'Fugázás után legalább 24-48 óráig ne terheld a felületet. Villany/gépészet szerelvényezése csak burkolás után jön.',
  },

  'Festés és felületképzés': {
    specialists: ['Festő-mázoló', 'Glettelő'],
    risks: [
      'Glett és alapozó száradási ideje nem tartható magas páratartalom esetén',
      'Burkolás közbeni sérülések és cementmaradványok ronthatják a festett felületet',
    ],
    watchOut: 'A festés nem csak aktív munkanapokból áll — száradási idők (glett 24-48h, festék rétegenként 4-6h) beleesnek az átfutásba.',
    nextStep: 'Festés után következik a villany és gépészet szerelvényezése — egyeztesd az időpontokat előre.',
  },

  'Villany és gépészet — szerelvényezés': {
    specialists: ['Villanyszerelő', 'Gépész / víz-gáz-fűtésszerelő'],
    risks: [
      'Szerelvényezés festés előtt elkezdve sérülésekkel, utólagos javítással jár',
      'Szaniterek, csaptelepek, termosztátok rendelési átfutása 1-3 hét lehet',
    ],
    watchOut: 'Ez a visszatérő szakági ütem. Csak burkolás és festés után érdemes elkezdeni, hogy sérülés nélkül lehessen dolgozni.',
    nextStep: 'Próbaüzem: tesztelj minden kapcsolót, konnektort, vízcsapot és fűtési elemet átadás előtt.',
  },

  'Belső beépítések és finomhangolás': {
    specialists: ['Asztalos / ajtós', 'Kivitelező', 'Szakági mesterek'],
    risks: [
      'Beltéri ajtók és tokok mérési hibája utólagos javítással jár',
      'Apró hibák összegyűlve komoly hibajegyzéket alkothatnak',
    ],
    watchOut: 'Konyhai és fürdőszobai bútor/beépítés végleges illesztése itt történik — ellenőrizd a szinteket és zárást minden elemnél.',
    nextStep: 'Készíts részletes hibajegyzéket (punch list) és egyezz meg a kivitelezővel a javítási határidőkről.',
  },

  'Átadás és hibajavítás': {
    specialists: ['Kivitelező', 'Tulajdonos', 'Műszaki ellenőr (opcionális)'],
    risks: [
      'Hiánypótlás elhúzódása késlelteti a beköltözést és a számla teljesítését',
      'Szóbeli megállapodások bizonyíthatatlansága vitát okozhat',
    ],
    watchOut: 'Minden javítást dokumentálj írásban és fényképekkel. Gyűjtsd össze a jótállási dokumentumokat, számlákat és szerelési útmutatókat.',
    nextStep: 'Kérd el a jótállási jegyeket és garanciális feltételeket minden szakágtól.',
  },

  // ── Legacy felújítás kulcsok (régebbi fázisnevekhez visszafelé kompatibilitás) ──

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

  // ── Családi ház építés ────────────────────────────────────────────────────

  'Tervezés és engedélyezési előkészítés': {
    specialists: ['Építész', 'Statikus', 'Gépész tervező'],
    risks: [
      'Hatósági hiánypótlás 4–8 hetes csúszást okozhat',
      'HÉSZ (helyi építési szabályzat) korlátozásai módosíthatják a tervet',
    ],
    watchOut: 'Ellenőrizd a HÉSZ előírásait és a telek beépíthetőségét tervezés előtt.',
    nextStep: 'Nyújtsd be az engedélykérelmet minél korábban — párhuzamosan tervezz.',
  },

  'Telek-előkészítés és kitűzés': {
    specialists: ['Geodéta', 'Gépkezelő', 'Földmunkás'],
    risks: [
      'Talajvizsgálat meglepő eredménye módosíthatja az alapozást',
      'Tereprendezési engedély hiánya késést okoz',
    ],
    watchOut: 'Talajmechanikai vizsgálatot minden esetben végeztesd el az alapozás előtt.',
    nextStep: 'Intézd el a tereprendezési és fakivágási engedélyeket idejében.',
  },

  'Földmunka és alapozás': {
    specialists: ['Zsaluzó', 'Vasbetonos', 'Betonozó'],
    risks: [
      'Fagyos vagy esős időjárás rontja a beton kötését',
      'Talajvíz szintje magasabb a tervezettnél',
    ],
    watchOut: 'Beton betonozás után legalább 10 napig ne terheld — a kötési idő kritikus.',
    nextStep: 'Rendeld meg a következő fázis acélanyagát még az alapozás közben.',
  },

  'Szerkezetépítés / falazás': {
    specialists: ['Zsaluzó', 'Vasbetonos', 'Állványozó'],
    risks: [
      'Téli szünet és fagyos időszak leállítja a munkát',
      'Acél és betonvas szállítási késés',
    ],
    watchOut: 'Minden szerkezeti elemet műszaki ellenőrrel fogadtass el betonozás előtt.',
    nextStep: 'Időzítsd a tetőszerkezet anyagrendelését a szerkezetépítés végéhez.',
  },

  'Födém / koszorú / szerkezeti lezárások': {
    specialists: ['Zsaluzó', 'Vasbetonos', 'Statikus'],
    risks: [
      'Betonozás után kötelező kötési várakozási idő — nem sietethető',
      'Zsaluzat korai eltávolítása szerkezeti hibát okozhat',
    ],
    watchOut: 'A koszorú és a födém betonozása után legalább 10-14 napig ne terheld a szerkezetet.',
    nextStep: 'Rendeld meg a tetőszerkezet faanyagát és fedőanyagát most.',
  },

  'Tetőszerkezet és fedés': {
    specialists: ['Ács', 'Tetőfedő', 'Bádogos'],
    risks: [
      'Időjárás miatti csúszás — eső és szél kizárja a munkavégzést',
      'Faanyag és tetőfedő anyag késedelmes szállítása',
    ],
    watchOut: 'A faanyagot és tetőfedő anyagot időben rendeld meg — egyedi méret esetén 3–6 hét átfutás.',
    nextStep: 'Egyeztesd a bádogos és tetőfedő munkák időzítését egymással.',
  },

  'Nyílászárók és épületzárás': {
    specialists: ['Nyílászáró szerelő', 'Ács'],
    risks: [
      'Mérethiba a nyílászárók gyártásánál 2-4 hetes késést okozhat',
      'Épületzárás nélkül a belső munkák nem kezdhetők meg',
    ],
    watchOut: 'Nyílászárókat egyedi gyártás esetén 4-6 héttel előre kell megrendelni.',
    nextStep: 'Épületzárás után azonnal megkezdhetők a gépészeti és elektromos munkák.',
  },

  'Gépészet és villany — első ütem': {
    specialists: ['Villanyszerelő', 'Vízvezetékes', 'Fűtésszerelő', 'Légkondis'],
    risks: [
      'Koordinációs problémák a különböző szakágak között',
      'Beépített gépészet módosítása falak zárása után nagyon drága',
    ],
    watchOut: 'Minden csatorna- és csővezeték-nyomást tesztelj a falak lezárása előtt.',
    nextStep: 'Készíts dokumentált as-built tervet a gépészeti nyomvonalakról.',
  },

  'Aljzatok, vakolás, belső előkészítés': {
    specialists: ['Kőműves', 'Glettelő', 'Aljzatelőkészítő'],
    risks: [
      'Vakolat és aljzat nem megfelelő száradása burkolási hibákat okoz',
      'Páratartalom ellenőrzése kritikus belső munkák előtt',
    ],
    watchOut: 'Vakolat száradása legalább 1-2 hét, aljzat legalább 3-4 hét — ne siettessük a burkolást.',
    nextStep: 'Burkolót és festőt már most foglalja le, mert keresett szakemberek hónapokra előre foglaltak.',
  },

  'Festés, szerelvényezés, belső befejezés': {
    specialists: ['Festő-mázoló', 'Villanyszerelő', 'Gépész'],
    risks: [
      'Párhuzamos munkák ütközése lassíthatja a befejezést',
      'Szerelvényezés festés előtt sérülésekkel jár',
    ],
    watchOut: 'Koordináld a festés és szerelvényezés sorrendjét — festés után következnek a végső szakági visszatérések.',
    nextStep: 'Ütemezd a hatósági használatbavételi engedély kérelmét már előre.',
  },

  'Külső munkák, próbaüzem, átadás': {
    specialists: ['Általános kivitelező', 'Műszaki ellenőr', 'Térkövező'],
    risks: [
      'Hatósági bejárás előtti hiánypótlás késleltetheti az átadást',
      'Kültéri munkák időjárástól függők',
    ],
    watchOut: 'Dokumentálj minden befejezett munkát fényképpel és szállítólevelekkel.',
    nextStep: 'Kérd el a jótállási jegyeket, közműátadási papírokat és a szerelési útmutatókat.',
  },

  // ── Bővítés / ráépítés ───────────────────────────────────────────────────

  'Felmérés, statikai és műszaki előkészítés': {
    specialists: ['Statikus', 'Építész', 'Műszaki ellenőr'],
    risks: [
      'Meglévő épület statikai állapota módosíthatja a bővítés megvalósíthatóságát',
      'Rejtett szerkezeti hibák csak felmérés után derülnek ki',
    ],
    watchOut: 'Bővítésnél kötelező statikai szakvélemény a meglévő szerkezetről — ne hagyd ki.',
    nextStep: 'Statikai vélemény alapján indítsd az engedélyezési folyamatot.',
  },

  'Tervezés és engedélyezési egyeztetés': {
    specialists: ['Építész', 'Statikus'],
    risks: [
      'Szomszédi egyeztetés késleltetheti az eljárást',
      'Hatósági hiánypótlás 4-8 hetes csúszást okozhat',
    ],
    watchOut: 'Indítsd az engedélyezést párhuzamosan a kivitelező keresésével.',
    nextStep: 'Engedély megérkezése után azonnal kezdhető a terület-előkészítés.',
  },

  'Terület-előkészítés és bontási kapcsolódások': {
    specialists: ['Bontó brigád', 'Kőműves'],
    risks: [
      'Meglévő épület falainak vágása, bontása váratlan szerkezeti elemekkel találkozhat',
      'Rejtett gépészeti nyomvonalak keresztezhetik a bővítés vonalát',
    ],
    watchOut: 'A meglévő falakba vágás előtt ellenőrizd a gépészeti és elektromos nyomvonalakat.',
    nextStep: 'Bontás után azonnal végezd el a szerkezeti kapcsolódási pontok statikai ellenőrzését.',
  },

  'Alapozási / szerkezeti kapcsolódások': {
    specialists: ['Zsaluzó', 'Vasbetonos', 'Statikus'],
    risks: [
      'Csatlakozás a meglévő alaphoz pontosságot igényel',
      'Beton kötési ideje alatt nem terhelhető a szerkezet',
    ],
    watchOut: 'A meglévő épület és az új alapozás kapcsolódási pontját statikussal ellenőriztesd.',
    nextStep: 'Beton kötése után (legalább 10 nap) következhet a felmenő szerkezet.',
  },

  'Szerkezetépítés / ráépítés': {
    specialists: ['Zsaluzó', 'Vasbetonos', 'Ács'],
    risks: [
      'Időjárás miatti leállás — télen különösen kritikus',
      'Csatlakozás a meglévő szerkezethez váratlan bontással járhat',
    ],
    watchOut: 'Minden szerkezeti elemet műszaki ellenőrrel fogadtass el betonozás előtt.',
    nextStep: 'Tervezd meg előre a gépészeti átvezetések nyomvonalát és a tetőcsatlakozást.',
  },

  'Tető / homlokzati kapcsolódások': {
    specialists: ['Ács', 'Tetőfedő', 'Bádogos'],
    risks: [
      'Tető és homlokzat illesztési hibája beázáshoz vezet',
      'Időjárás miatti csúszás',
    ],
    watchOut: 'A meglévő tető és a bővítés tetőcsatlakozása vízmentességét különösen ellenőrizd.',
    nextStep: 'Épületzárás után indulhatnak a belső gépészeti és elektromos munkák.',
  },

  'Belső előkészítés, vakolás / aljzat': {
    specialists: ['Kőműves', 'Glettelő'],
    risks: [
      'Vakolat és aljzat nem megfelelő száradása burkolási hibákat okoz',
    ],
    watchOut: 'Vakolat száradása legalább 1-2 hét, aljzat legalább 3-4 hét — ne siettessük.',
    nextStep: 'Burkolót és festőt már most foglalja le.',
  },

  'Burkolás, festés, belső befejezések': {
    specialists: ['Burkoló', 'Festő-mázoló', 'Gipszkartonos'],
    risks: [
      'Párhuzamos munkák ütközése lassíthatja a befejezést',
    ],
    watchOut: 'Koordináld a burkolás, festés és asztalos munkák sorrendjét pontosan.',
    nextStep: 'Szerelvényezés és külső rendezés csak befejező munkák után jöhet.',
  },

  'Szerelvényezés és külső rendezés': {
    specialists: ['Villanyszerelő', 'Gépész', 'Kertész / térkövező'],
    risks: [
      'Kültéri munkák időjárástól függők',
    ],
    watchOut: 'Próbaüzem: tesztelj minden kapcsolót, konnektort, vízcsapot és fűtési elemet.',
    nextStep: 'Dokumentálj mindent és szervezzük meg az átadási bejárást.',
  },

  // ── Legacy bővítés kulcsok ──────────────────────────────────────────────

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

  // ── Legacy házépítés kulcsok ────────────────────────────────────────────

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
}
