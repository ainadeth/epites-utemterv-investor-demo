import { useEffect } from 'react'

// ── Richer phase detail data ──────────────────────────────────────────────

export interface PhaseModalData {
  description: string
  prerequisites: string[]
  professionals: string[]
  whatFollows: string[]
  mistakes: string[]
  checklist: string[]
}

export const PHASE_MODAL_DATA: Record<string, PhaseModalData> = {
  'Telek-előkészítés': {
    description: 'A telek előkészítése magában foglalja a tereprendezést, a terület kitűzését és az építési feltételek megteremtését.',
    prerequisites: ['Adásvételi szerződés és tulajdoni lap rendben', 'Talajmechanikai vizsgálat elvégezve', 'Engedélyezési eljárás megkezdve'],
    professionals: ['Geodéta', 'Gépkezelő', 'Földmunkás'],
    whatFollows: ['Tervezés és engedélyezés', 'Alapozás előkészítése'],
    mistakes: ['Talajvizsgálat kihagyása', 'Tereprendezési engedély hiánya', 'Pontatlan kitűzés'],
    checklist: ['Tulajdoni lap és terhek ellenőrizve', 'Geodéta megbízva', 'Hulladékszállítás szervezve', 'Közműhelyzet felmérve'],
  },
  'Tervezés és engedélyezés': {
    description: 'Az engedélyezési terv elkészítése és a hatósági eljárások lebonyolítása. Ez a fázis meghatározza a projekt minden következő lépését.',
    prerequisites: ['Telek rendelkezésre áll', 'Helyi HÉSZ előírások megismerve', 'Finanszírozás tisztázva'],
    professionals: ['Építész', 'Statikus', 'Gépésztervező'],
    whatFollows: ['Alapozás', 'Közbeszerzési ajánlatkérés'],
    mistakes: ['Hiánypótlás miatti 4–8 hetes csúszás', 'Szomszédi egyeztetés kihagyása', 'Engedélyköteles módosítások tervbe nem vétele'],
    checklist: ['HÉSZ előírások ellenőrizve', 'Engedélykérelem benyújtva', 'Tervező és statikus megbízva', 'Szomszédi egyeztetés megtörtént'],
  },
  'Alapozás': {
    description: 'Az épület teherhordó alapszerkezetének elkészítése. A beton kötési ideje kritikus — nem terhelhetők el korán.',
    prerequisites: ['Telek előkészítve', 'Jogerős engedély megvan', 'Talajmechanikai alap ismert'],
    professionals: ['Zsaluzó', 'Vasbetonos', 'Betonozó'],
    whatFollows: ['Beton kötési idő (várakozás)', 'Szerkezetépítés'],
    mistakes: ['Fagyos időben betonozás', 'Kötési idő be nem tartása', 'Talajvíz szintjének figyelmen kívül hagyása'],
    checklist: ['Zsaluterv ellenőrizve', 'Acélanyag megrendelve', 'Betonozás dátuma a műszaki ellenőrrel egyeztetve', 'Vízszintes és szintezési pontok ellenőrizve'],
  },
  'Szerkezetépítés': {
    description: 'A falazat és teherhordó szerkezetek felépítése. Az épület "csontváza" — minden további munka erre épül.',
    prerequisites: ['Alapozás és kötési idő kész', 'Acélszerkezeti tervek rendelkezésre állnak', 'Szállítási útvonal biztosított'],
    professionals: ['Zsaluzó', 'Vasbetonos', 'Állványozó'],
    whatFollows: ['Koszorúbetonozás', 'Szerkezeti átvétel', 'Tetőszerkezet'],
    mistakes: ['Téli szünet be nem tervezése', 'Acél késedelmes szállítása', 'Betonozás előtti műszaki ellenőr hiánya'],
    checklist: ['Falazóanyag és acél megrendelve', 'Állványterv és biztonsági előírások ellenőrizve', 'Műszaki ellenőr időpontja egyeztetve', 'Szerkezeti terv kész'],
  },
  'Tetőszerkezet': {
    description: 'A tetőszerkezet a ház felső teherhordó szerkezete, amely előkészíti a tetőfedést és védi az épületet az időjárástól.',
    prerequisites: ['Falazás elkészült', 'Koszorú elkészült', 'Szükséges kötési idő letelt', 'Tetőtervek és méretek rendelkezésre állnak'],
    professionals: ['Ács', 'Tetőfedő', 'Bádogos', 'Műszaki ellenőr (ha szükséges)'],
    whatFollows: ['Tetőfólia', 'Lécezés', 'Tetőfedés', 'Bádogozás', 'Ereszcsatorna'],
    mistakes: ['Pontatlan méretezés', 'Rossz sorrend', 'Nem megfelelő faanyagvédelem', 'Elhamarkodott kezdés kötési idő előtt'],
    checklist: ['Terv ellenőrizve', 'Anyag megrendelve', 'Szakember időpontja egyeztetve', 'Koszorú állapota ellenőrizve', 'Időjárási kockázat átgondolva'],
  },
  'Gépészet': {
    description: 'A fűtési, vízvezetéki, szellőző és elektromos rendszerek kiépítése. A falak zárása előtt minden nyomástesztet el kell végezni.',
    prerequisites: ['Szerkezet kész és átvett', 'Gépészeti tervek véglegesítve', 'Szakági engedélyek megvannak'],
    professionals: ['Villanyszerelő', 'Vízvezetékes', 'Fűtésszerelő', 'Légkondicionálás-szerelő'],
    whatFollows: ['Falak lezárása', 'Gipszkartonozás', 'Burkolás'],
    mistakes: ['Koordináció hiánya a szakágak között', 'Nyomásteszt kihagyása', 'As-built terv nem készül'],
    checklist: ['Gépészeti terv végleges', 'Csőnyomás-teszt elvégezve', 'Elektromos elosztó bekötve', 'As-built terv megrendelve'],
  },
  'Belső munkák és átadás': {
    description: 'A befejező munkák: burkolás, festés, asztalos munkák és az épület átadása. Az összes szakág koordinációja kritikus.',
    prerequisites: ['Gépészet kész és átvett', 'Glettelés száraz', 'Ablak- és ajtókeretek beépítve'],
    professionals: ['Burkoló', 'Festő-mázoló', 'Műszaki ellenőr'],
    whatFollows: ['Hatósági átadás', 'Használatbavételi engedély', 'Beköltözés'],
    mistakes: ['Párhuzamos munkák ütközése', 'Glett száradási idő be nem tartása', 'Hiánylista kezelés elhalasztása'],
    checklist: ['Burkolási terv ellenőrizve', 'Festési és glettelési rend rögzítve', 'Műszaki ellenőr átadási időpontja egyeztetve', 'Punch list elkészítve'],
  },
  // Felújítás
  'Felmérés és tervezés': {
    description: 'A meglévő állapot felmérése, a munkák tervezése és az árajánlatok bekérése.',
    prerequisites: ['Tulajdonjog tisztázott', 'Finanszírozás megvan', 'Engedélyköteles munkák azonosítva'],
    professionals: ['Építész', 'Belsőépítész', 'Statikus'],
    whatFollows: ['Bontás', 'Kivitelező megbízása'],
    mistakes: ['Rejtett hibák figyelmen kívül hagyása', 'Írásos dokumentáció hiánya', 'Kevesebb mint 3 árajánlat bekérése'],
    checklist: ['Állapotfelmérés elkészítve', 'Engedélyek tisztázva', 'Legalább 3 árajánlat bekérve', 'Munkák sorrendje rögzítve'],
  },
  'Bontás és előkészítés': {
    description: 'A régi burkolatok, válaszfalak és berendezések eltávolítása, a munkaterület előkészítése.',
    prerequisites: ['Villany, víz, gáz lekapcsolva', 'Hulladékelszállítás szervezve', 'Lakók kiköltöztek / megoldott'],
    professionals: ['Bontós', 'Általános kivitelező'],
    whatFollows: ['Gépészeti munkák', 'Szerkezeti beavatkozások'],
    mistakes: ['Tartószerkezeti elemek téves eltávolítása', 'Porbetörés a lakókörnyezetbe', 'Hulladék kezelés tervezetlensége'],
    checklist: ['Közművek lekapcsolva', 'Bontási terv elkészítve', 'Konténer rendelt', 'Szomszédok értesítve'],
  },
  'Gépészeti és elektromos munkák': {
    description: 'A villamos, vízvezetéki és fűtési rendszerek kiépítése vagy felújítása.',
    prerequisites: ['Bontás kész', 'Gépészeti tervek véglegesek', 'Anyagok megrendelve'],
    professionals: ['Villanyszerelő', 'Vízvezetékes', 'Fűtésszerelő'],
    whatFollows: ['Falak lezárása', 'Burkolás'],
    mistakes: ['Szakágak nem koordinálnak', 'Régi hálózat terhelésének nem ellenőrzése', 'Engedélyek hiánya'],
    checklist: ['Gépészeti terv végleges', 'Anyag megrendelve', 'Próbaterhelés tervbe véve', 'Szakipari engedélyek rendben'],
  },
  'Burkolás és belső felületek': {
    description: 'A padló- és falburkolás, gipszkarton munkák elvégzése.',
    prerequisites: ['Gépészet kész és leellenőrizve', 'Aljzat száraz és sík', 'Anyagok megrendelve (+10% tartalék)'],
    professionals: ['Burkoló', 'Gipszkartonos', 'Ács'],
    whatFollows: ['Festés', 'Asztalos munkák', 'Szaniter beépítés'],
    mistakes: ['Száradási idő be nem tartása', 'Anyaghiány a munka közepén', 'Vízzárás kihagyása nedves helyiségekben'],
    checklist: ['Aljzat vízszintje ellenőrizve', 'Vízzárás nedves helyiségekben kész', 'Csempék darabszáma ellenőrizve', 'Fugaszín kiválasztva'],
  },
  'Festés és befejező munkák': {
    description: 'A végső festési és glettelési munkák elvégzése, apró hibák javítása.',
    prerequisites: ['Glett száraz (min. 48 óra)', 'Burkolás kész', 'Ablakkeretek beépítve'],
    professionals: ['Festő-mázoló', 'Glettelő'],
    whatFollows: ['Bútorozás', 'Átadás'],
    mistakes: ['Nedves glett festése', 'Alapozó kihagyása', 'Alacsony páratartalom figyelmen kívül hagyása'],
    checklist: ['Glett szárazságpróba elvégezve', 'Alapozó felhordva', 'Színminta jóváhagyva', 'Hibajegyzék elkészítve'],
  },
  'Átadás és hibajavítás': {
    description: 'Az elvégzett munkák átvétele, hibajegyzék összeállítása és a garanciális dokumentumok átvétele.',
    prerequisites: ['Minden munka elvégeztetve', 'Takarítás elvégezve', 'Dokumentumok összegyűjtve'],
    professionals: ['Általános kivitelező', 'Műszaki ellenőr'],
    whatFollows: ['Beköltözés', 'Jótállási időszak'],
    mistakes: ['Hibajegyzék nélkül átvett munka', 'Garanciális dokumentumok elkérésének elmulasztása', 'Fénykép-dokumentáció hiánya'],
    checklist: ['Hibajegyzék elkészítve', 'Javítási határidők rögzítve', 'Garanciális jegyek átvéve', 'Fényképes dokumentáció elkészítve'],
  },
  // Bővítés
  'Engedélyezés': {
    description: 'A bővítési tervek hatósági jóváhagyása és a szükséges engedélyek megszerzése.',
    prerequisites: ['Meglévő épület statikai vizsgálata kész', 'Szomszédok értesítve', 'Tervező megbízva'],
    professionals: ['Építész', 'Statikus'],
    whatFollows: ['Szerkezeti munkák', 'Kivitelező megbízása'],
    mistakes: ['Statikai vizsgálat kihagyása', 'Szomszédi egyeztetés elmulasztása', 'Hiánypótlás miatti késés'],
    checklist: ['Statikai szakvélemény megvan', 'Engedélykérelem benyújtva', 'Szomszédi hozzájárulás megvan'],
  },
  'Szerkezeti munkák': {
    description: 'Az új szerkezeti elemek kiépítése és csatlakoztatása a meglévő épülethez.',
    prerequisites: ['Engedély jogerős', 'Meglévő szerkezet átvilágítva', 'Anyagok megrendelve'],
    professionals: ['Zsaluzó', 'Vasbetonos', 'Ács'],
    whatFollows: ['Kötési várakozás', 'Gépészet', 'Belső munkák'],
    mistakes: ['Meglévő csomópontoknál rejtett meglepetések', 'Kötési idő be nem tartása', 'Gépészeti átvezetések tervezetlensége'],
    checklist: ['Statikus tervei véglegesek', 'Csatlakozási pontok ellenőrizve', 'Gépészeti nyomvonalak tervezve'],
  },
  'Belső befejező munkák': {
    description: 'A belső burkolás, festés és egyéb befejező munkák elvégzése a bővített területen.',
    prerequisites: ['Gépészet kész és átvett', 'Falak lezárva', 'Anyagok megrendelve'],
    professionals: ['Burkoló', 'Gipszkartonos', 'Festő-mázoló'],
    whatFollows: ['Átadás', 'Jótállási időszak'],
    mistakes: ['Párhuzamos munkák ütközése', 'Nedves glett festése', 'Hibajegyzék kezelésének halogatása'],
    checklist: ['Burkolási terv ellenőrizve', 'Glett szárazságpróba kész', 'Hibajegyzék elkészítve'],
  },
  'Átadás': {
    description: 'A bővítési munkák átvétele, hibajegyzék és garanciális dokumentumok rendezése.',
    prerequisites: ['Minden munka elvégeztetve', 'Hatósági bejárás megtörtént'],
    professionals: ['Általános kivitelező', 'Műszaki ellenőr'],
    whatFollows: ['Használatbavételi engedély', 'Beköltözés / berendezés'],
    mistakes: ['Hibajegyzék nélküli átvétel', 'Dokumentumok elkérésének elmulasztása'],
    checklist: ['Hibajegyzék kész', 'Garanciális jegyek átvéve', 'Hatósági engedély megvan', 'Fénykép-dokumentáció kész'],
  },

  // ── Lakásfelújítás — segmented new phases ─────────────────────────────────

  'Felmérés és előkészítő tervezés': {
    description: 'Pontos helyszíni felmérés, műszaki tartalom meghatározása és szakemberek előzetes egyeztetése. A jó előkészítés megakadályozza a drága módosításokat.',
    prerequisites: ['Ingatlan hozzáférhető', 'Tulajdoni viszonyok rendezve', 'Felújítási cél és keret nagyjából meghatározott'],
    professionals: ['Kivitelező / projektvezető', 'Műszaki ellenőr (opcionális)', 'Villanyszerelő (előzetes egyeztetés)'],
    whatFollows: ['Árajánlatok bekérése', 'Bontás és sittkezelés'],
    mistakes: ['Hiányos műszaki tartalom — összehasonlíthatatlan árajánlatok', 'Szakemberekkel való előzetes egyeztetés kihagyása'],
    checklist: ['Helyiségenkénti igények dokumentálva', 'Konnektorok, kapcsolók, csapkiállások helye döntött', 'Legalább 2-3 árajánlat bekérve', 'Anyagrendelési határidők ismert'],
  },

  'Bontás és sittkezelés': {
    description: 'Régi burkolatok, szerelvények és nem szükséges elemek eltávolítása. Bontás után derülnek ki a rejtett hibák — ez az igazi műszaki tartalom feltárása.',
    prerequisites: ['Villany, víz, gáz lekapcsolva az érintett körökben', 'Megmaradó elemek lehetőség szerint takarva', 'Sittszállítás szervezve'],
    professionals: ['Bontó brigád', 'Sittszállító'],
    whatFollows: ['Villanyszerelés első ütem', 'Gépészet első ütem', 'Rejtett hibák felmérése'],
    mistakes: ['Tartószerkezet sérülése gondatlan bontással', 'Azbesztes anyag kezeletlen eltávolítása', 'Sittszállítás megszervezésének kihagyása'],
    checklist: ['Lekapcsolási sorrend ellenőrizve', 'Takarás megoldva', 'Sittszállítás szervezve', 'Bontás utáni állapotfelmérés elvégezve'],
  },

  'Villanyszerelés — első ütem': {
    description: 'Elektromos nyomvonalak, kábelfektetés, dobozok és a fő hálózat kiépítése. Ez az első villanyszerelői ütem — a szerelvényezés (kapcsolók, konnektorok, lámpák) burkolás és festés után következik.',
    prerequisites: ['Bontás kész', 'Konnektorok, kapcsolók, lámpák helye döntött', 'Elosztótábla és FI-relé rendelve'],
    professionals: ['Villanyszerelő'],
    whatFollows: ['Gépészet első ütem', 'Faljavítás és aljzat', 'Villany szerelvényezés (visszatérő ütem)'],
    mistakes: ['Visszatérési időpont előzetes lefoglalásának kihagyása', 'Kábelelosztás változtatása falak lezárása után'],
    checklist: ['Minden kábel és kiállás pozíciója egyeztetve', 'FI-relé és biztonsági elemek megrendelve', 'Visszatérési időpont lefoglalva', 'Nyomvonal fotókkal dokumentálva'],
  },

  'Gépészet — első ütem': {
    description: 'Vízvezetékek, lefolyók, fűtési előkészítések és vizes helyiségek alapkiépítése. A gépész szaniterekre és csaptelepekre a burkolás után tér vissza.',
    prerequisites: ['Bontás kész', 'Lefolyó és vízkiállás tervezett pozíciói döntöttek', 'Padlófűtés igénye tisztázva'],
    professionals: ['Víz-gáz-fűtésszerelő', 'Gépész'],
    whatFollows: ['Faljavítás és aljzat', 'Burkolás', 'Gépészet szerelvényezés (visszatérő ütem)'],
    mistakes: ['Padlófűtés kimaradása — burkolás után nem pótolható', 'Gépész visszatérési időpont lefoglalásának kihagyása'],
    checklist: ['Csőnyomvonal fotókkal dokumentálva', 'Lefolyóállás próba elvégezve', 'Visszatérési időpont lefoglalva', 'Radiátor / padlófűtés döntés lezárva'],
  },

  'Faljavítás és aljzat-előkészítés': {
    description: 'Vésések, csatornák lezárása, falfelületek javítása és aljzat-kiegyenlítés. Ez az alapja a jó burkolásnak és festésnek.',
    prerequisites: ['Villany és gépészet első ütem kész', 'Minden csőnyomvonal fotózva', 'Aljzat állapota felmérve'],
    professionals: ['Kőműves', 'Glettelő / aljzatelőkészítő'],
    whatFollows: ['Burkolás és vízszigetelés', 'Festés'],
    mistakes: ['Nedves aljzatra burkolás — repedezés, leválás', 'Vésések nem megfelelő lezárása — festési hibák'],
    checklist: ['Összes vésés és csatorna lezárva', 'Aljzat szárazságmérés elvégezve', 'Aljzat egyenletessége ellenőrizve (max 3mm/2m)', 'Száradási idő bevárva'],
  },

  'Burkolás és vízszigetelés': {
    description: 'Fürdőszobai és konyhai vízszigetelés, majd csempézés, járólapozás és padlóburkolatok rakása. Anyagrendelés előre kritikus.',
    prerequisites: ['Aljzat és falfelületek előkészítve és száraz', 'Vízszigetelő anyag megvan', 'Burkolóanyag, ragasztó, fuga, élvédő megrendelve (LOT szám ellenőrizve)'],
    professionals: ['Burkoló'],
    whatFollows: ['Festés és felületképzés', 'Villany és gépészet szerelvényezés'],
    mistakes: ['Vízszigetelés kihagyása nedves helyiségben', 'Különböző LOT számú lapok keverése', 'Anyag rendelési veszteség alábecslése'],
    checklist: ['Vízszigetelés kész és próbált', 'LOT számok egységesek', 'Minimum 10% vágási tartalék rendelve', 'Száradás után terhelt'],
  },

  'Festés és felületképzés': {
    description: 'Glettelés, csiszolás, alapozás és festés rétegei. A száradási idők miatt az átfutás hosszabb az aktív munkanapok számánál.',
    prerequisites: ['Burkolás kész', 'Falfelületek szárazak és sérülésmentesek', 'Festék és glett anyag megrendelve'],
    professionals: ['Festő-mázoló', 'Glettelő'],
    whatFollows: ['Villany és gépészet szerelvényezés', 'Belső beépítések'],
    mistakes: ['Glett száradás be nem várása — repedezés', 'Festés burkolás közben — cementmaradványok'],
    checklist: ['Glett száraz (min 48h)', 'Alapozó felvive', 'Festékszín döntött és tesztelve', 'Száradási idők betartva'],
  },

  'Villany és gépészet — szerelvényezés': {
    description: 'Kapcsolók, konnektorok, lámpák, szaniterek, csaptelepek és radiátor elemek végső felszerelése. Ez a visszatérő szakági ütem — csak burkolás és festés után.',
    prerequisites: ['Burkolás kész', 'Festés kész', 'Szaniterek, csaptelepek, lámpák, kapcsolók megrendelve'],
    professionals: ['Villanyszerelő', 'Gépész / víz-gáz-fűtésszerelő'],
    whatFollows: ['Belső beépítések', 'Átadás és hibajavítás'],
    mistakes: ['Szerelvényezés festés előtt — burkolási sérülések', 'Megrendelt termékek késedelmes szállítása'],
    checklist: ['Összes kapcsoló és konnektor felszerelve és tesztelve', 'Vízcsapok és lefolyók próbálva', 'Fűtési elemek próbaüzemen', 'Elektromos hálózat végellenőrzése'],
  },

  'Belső beépítések és finomhangolás': {
    description: 'Beltéri ajtók, szegélyek, kisebb beépítések és apró javítások. Konyhai és fürdőszobai bútorok, beépítések végső illesztése.',
    prerequisites: ['Villany és gépészet szerelvényezés kész', 'Padlóburkolat kész', 'Ajtók és tokok megrendelve (méretre)'],
    professionals: ['Asztalos / ajtós', 'Kivitelező', 'Szakági mesterek'],
    whatFollows: ['Átadás és hibajavítás'],
    mistakes: ['Ajtótok mérési hiba — utólagos javítás drága', 'Apró hibák felhalmozása és halvány észlelése'],
    checklist: ['Összes ajtó és tok felszerelve és zár működik', 'Szegélyek és lécek rögzítve', 'Konyhai és fürdőbútor illesztése ellenőrizve', 'Hibajegyzék (punch list) elkészítve'],
  },

  // ── Családi ház — new phase names ─────────────────────────────────────────

  'Tervezés és engedélyezési előkészítés': {
    description: 'Építési engedélyezési terv elkészítése és a hatósági eljárások megindítása. Ez a fázis meghatározza a projekt minden következő lépését.',
    prerequisites: ['Telek rendelkezésre áll', 'HÉSZ előírások megismerve', 'Finanszírozás nagyjából tisztázva'],
    professionals: ['Építész', 'Statikus', 'Gépésztervező'],
    whatFollows: ['Telek-előkészítés', 'Kivitelező kiválasztás'],
    mistakes: ['Hiánypótlás miatti 4–8 hetes csúszás', 'Szomszédi egyeztetés kihagyása', 'Engedélyköteles módosítások figyelmen kívül hagyása'],
    checklist: ['HÉSZ előírások ellenőrizve', 'Engedélykérelem benyújtva', 'Tervező és statikus megbízva', 'Szomszédi egyeztetés megtörtént'],
  },

  'Telek-előkészítés és kitűzés': {
    description: 'Tereprendezés, terület kitűzése és az építési feltételek megteremtése. Talajmechanikai vizsgálat nélkül ne kezdj alapozásba.',
    prerequisites: ['Jogerős építési engedély megvan', 'Tulajdoni lap rendben', 'Geodéta megbízva'],
    professionals: ['Geodéta', 'Gépkezelő', 'Földmunkás'],
    whatFollows: ['Földmunka és alapozás'],
    mistakes: ['Talajvizsgálat kihagyása', 'Tereprendezési engedély hiánya', 'Pontatlan kitűzés'],
    checklist: ['Geodéta kitűzte a telket', 'Talajmechanikai vizsgálat kész', 'Közműhelyzet felmérve', 'Hulladékszállítás szervezve'],
  },

  'Földmunka és alapozás': {
    description: 'Az épület teherhordó alapszerkezetének elkészítése. A beton kötési ideje kritikus — a kötési idő letelte után nem sietethető a következő fázis.',
    prerequisites: ['Telek előkészítve és kitűzve', 'Jogerős engedély megvan', 'Talajmechanikai alap ismert'],
    professionals: ['Zsaluzó', 'Vasbetonos', 'Betonozó'],
    whatFollows: ['Kötési idő (várakozás)', 'Szerkezetépítés'],
    mistakes: ['Fagyos időben betonozás', 'Kötési idő be nem tartása', 'Talajvíz figyelmen kívül hagyása'],
    checklist: ['Zsaluterv ellenőrizve', 'Acélanyag megrendelve', 'Betonozás időpontja műszaki ellenőrrel egyeztetve', 'Szintezési pontok ellenőrizve'],
  },

  'Szerkezetépítés / falazás': {
    description: 'A falazat és teherhordó szerkezetek felépítése. Az épület "csontváza" — minden következő munka erre épül.',
    prerequisites: ['Alapozás és kötési idő kész', 'Falazóanyag és acél megrendelve', 'Szerkezeti tervek rendelkezésre állnak'],
    professionals: ['Zsaluzó', 'Vasbetonos', 'Kőműves', 'Állványozó'],
    whatFollows: ['Koszorú / szerkezeti lezárások', 'Tetőszerkezet előkészítés'],
    mistakes: ['Téli szünet figyelmen kívül hagyása', 'Acél késedelmes szállítása', 'Betonozás előtti műszaki ellenőr hiánya'],
    checklist: ['Falazóanyag és acél megrendelve', 'Állványterv és biztonsági előírások rendben', 'Műszaki ellenőr időpontja egyeztetve', 'Szerkezeti terv kész'],
  },

  'Födém / koszorú / szerkezeti lezárások': {
    description: 'Koszorúbetonozás, födémszerkezet és a falazat szerkezeti lezárásai. A betonozás után kötelező várakozási idő — nem sietethető.',
    prerequisites: ['Falazás kész', 'Vasalási terv ellenőrizve', 'Zsaluzat és anyag rendelkezésre áll'],
    professionals: ['Zsaluzó', 'Vasbetonos', 'Statikus'],
    whatFollows: ['Kötési idő (min. 10-14 nap)', 'Tetőszerkezet'],
    mistakes: ['Kötési idő be nem tartása — szerkezeti kockázat', 'Zsaluzat korai eltávolítása'],
    checklist: ['Vasalás és zsaluzat ellenőrizve', 'Betonozás időpontja rögzítve', 'Kötési idő tervbe véve', 'Tetőanyag megrendelési időpontja ismert'],
  },

  'Tetőszerkezet és fedés': {
    description: 'Tetőszerkezet ácsozás, tetőfedés és bádogos munkák. Időjárástól erősen függő fázis — esőben és szélben nem végezhető.',
    prerequisites: ['Koszorú és kötési idő kész', 'Faanyag és tetőfedő anyag megrendelve (3-6 hét átfutás!)', 'Bádogos és tetőfedő egyeztetve'],
    professionals: ['Ács', 'Tetőfedő', 'Bádogos'],
    whatFollows: ['Nyílászárók és épületzárás'],
    mistakes: ['Faanyag és fedőanyag késedelmes rendelése', 'Bádogos és tetőfedő koordináció kihagyása', 'Esős időszakban fedetlen tető'],
    checklist: ['Faanyag és tetőanyag megrendelve (LOT szám)', 'Ács és tetőfedő időpontja egyeztetve', 'Bádogosmunka ütemezve', 'Időjárási ablak tervbe véve'],
  },

  'Nyílászárók és épületzárás': {
    description: 'Ablakok, bejárati és belső ajtók beépítése. Épületzárás nélkül a belső munkák nem kezdhetők meg.',
    prerequisites: ['Tetőszerkezet és fedés kész', 'Nyílászárók megrendelve (egyedi méretnél 4-6 hét átfutás!)', 'Nyílások pontosan kimérve'],
    professionals: ['Nyílászáró szerelő', 'Ács'],
    whatFollows: ['Gépészet és villany első ütem', 'Belső munkák'],
    mistakes: ['Mérethiba a gyártásban — 2-4 hetes csúszás', 'Nyílászáró rendelés késedelme', 'Épületzárás nélkül megkezdett belső munkák'],
    checklist: ['Összes nyílás pontosan kimérve', 'Rendelés megerősítve és szállítási dátum ismert', 'Beépítés és tömítés ellenőrizve', 'Zárak és vasalatok próbálva'],
  },

  'Gépészet és villany — első ütem': {
    description: 'Gépészeti és elektromos nyomvonalak, csőfektetés, kábelfektetés a falak lezárása előtt. Falak zárása után a módosítás nagyon drága.',
    prerequisites: ['Épület zárt', 'Gépészeti és elektromos tervek rendelkezésre állnak', 'Anyagok megrendelve'],
    professionals: ['Villanyszerelő', 'Víz-gáz-fűtésszerelő', 'Fűtésszerelő'],
    whatFollows: ['Vakolás és aljzat', 'Szerelvényezés (visszatérő ütem)'],
    mistakes: ['Nyomvonalak dokumentálásának kihagyása', 'Csőnyomás-próba elvégezésének kihagyása falak lezárása előtt'],
    checklist: ['Összes nyomvonal fotókkal dokumentálva', 'Csőnyomás-próba elvégezve', 'Elosztótábla és FI-relé tervbe véve', 'Visszatérési időpont lefoglalva'],
  },

  'Aljzatok, vakolás, belső előkészítés': {
    description: 'Falvakolás, aljzat-kiegyenlítés és belső felületek előkészítése a burkoláshoz és festéshez. Száradási idők kritikusak — nem siethető.',
    prerequisites: ['Gépészet és villany első ütem kész és dokumentált', 'Vakoló- és aljzatanyag megrendelve', 'Nyílászárók beépítve'],
    professionals: ['Kőműves', 'Glettelő', 'Aljzatelőkészítő'],
    whatFollows: ['Burkolás', 'Festés'],
    mistakes: ['Nedves vakolatra burkolás', 'Aljzat száradási idő be nem tartása (min 3-4 hét)', 'Aljzat egyenetlenség ellenőrzésének kihagyása'],
    checklist: ['Vakolat száraz (min 1-2 hét)', 'Aljzat száraz (min 3-4 hét)', 'Egyenletesség ellenőrizve (max 3mm/2m)', 'Burkoló és festő időpontja lefoglalva'],
  },

  'Festés, szerelvényezés, belső befejezés': {
    description: 'Glettelés, festés, majd villany és gépészet szerelvényezése. Fontos: a szerelvényezés csak festés után végezhető sérülés nélkül.',
    prerequisites: ['Burkolás kész', 'Falak szárazak', 'Festék, glett anyag megrendelve', 'Szaniterek, kapcsolók, lámpák megrendelve'],
    professionals: ['Festő-mázoló', 'Villanyszerelő', 'Gépész'],
    whatFollows: ['Külső munkák', 'Átadás és próbaüzem'],
    mistakes: ['Szerelvényezés festés előtt — sérülések', 'Festék száradás be nem várása', 'Koordináció hiánya festő és szerelők között'],
    checklist: ['Festés kész és száraz', 'Összes kapcsoló és konnektor felszerelve', 'Szaniterek és csaptelepek próbálva', 'Elektromos végső ellenőrzés elvégezve'],
  },

  'Külső munkák, próbaüzem, átadás': {
    description: 'Kültéri munkák (járda, tereprendezés), rendszerek próbaüzeme és formális átadás. Hatósági bejárás előkészítése és dokumentumok összegyűjtése.',
    prerequisites: ['Belső munkák kész', 'Gépészeti rendszerek próbaüzemen', 'Hibajegyzék lezárva'],
    professionals: ['Általános kivitelező', 'Műszaki ellenőr', 'Térkövező / kertész'],
    whatFollows: ['Használatbavételi engedély kérelem', 'Beköltözés'],
    mistakes: ['Hatósági bejárás előtti hiánypótlás kihagyása', 'Jótállási dokumentumok be nem kérése', 'Kültéri munkák időjárástól függő csúszása'],
    checklist: ['Összes rendszer próbaüzemen', 'Hibajegyzék lezárva', 'Jótállási jegyek összegyűjtve', 'Hatósági átadáshoz szükséges dokumentumok rendben'],
  },

  // ── Bővítés — new phase names ──────────────────────────────────────────────

  'Felmérés, statikai és műszaki előkészítés': {
    description: 'Meglévő épület statikai vizsgálata és a bővítés megvalósíthatóságának felmérése. Kötelező lépés bővítés előtt.',
    prerequisites: ['Ingatlan hozzáférhető', 'Tulajdoni lap rendben', 'Bővítési elképzelés körvonalazva'],
    professionals: ['Statikus', 'Építész', 'Műszaki ellenőr'],
    whatFollows: ['Tervezés és engedélyezési egyeztetés'],
    mistakes: ['Statikai szakvélemény kihagyása — rejtett strukturális kockázat', 'Rejtett szerkezeti hibák figyelmen kívül hagyása'],
    checklist: ['Statikai szakvélemény elkészülve', 'Meglévő épület dokumentációja összegyűjtve', 'Bővítés megvalósíthatósága megerősítve'],
  },

  'Tervezés és engedélyezési egyeztetés': {
    description: 'Bővítési tervek elkészítése és engedélyezési eljárás megindítása. Szomszédi egyeztetés kötelező lehet.',
    prerequisites: ['Statikai szakvélemény kész', 'Bővítési elképzelés véglegesítve', 'Finanszírozás tisztázva'],
    professionals: ['Építész', 'Statikus'],
    whatFollows: ['Terület-előkészítés', 'Kivitelező kiválasztás'],
    mistakes: ['Szomszédi egyeztetés kihagyása', 'Engedélyköteles módosítások figyelmen kívül hagyása', 'Hatósági hiánypótlás miatti csúszás'],
    checklist: ['Engedélykérelem benyújtva', 'Szomszédi egyeztetés megtörtént', 'Tervező és statikus megbízva', 'Határozat kézhez véve'],
  },

  'Terület-előkészítés és bontási kapcsolódások': {
    description: 'Meglévő épület és az új bővítés csatlakozási pontjainak előkészítése. Rejtett gépészeti nyomvonalak keresztezhetik a munkát.',
    prerequisites: ['Jogerős engedély megvan', 'Gépészeti nyomvonalak ismert', 'Bontó brigád megbízva'],
    professionals: ['Bontó brigád', 'Kőműves'],
    whatFollows: ['Alapozási / szerkezeti kapcsolódások'],
    mistakes: ['Gépészeti és elektromos nyomvonalak nem ellenőrzése bontás előtt', 'Gondatlan bontás tartószerkezeti kárt okozhat'],
    checklist: ['Gépészeti és elektromos nyomvonalak feltérképezve', 'Bontási területek jelölve', 'Sittszállítás szervezve', 'Megmaradó elemek takarva'],
  },

  'Alapozási / szerkezeti kapcsolódások': {
    description: 'Bővítés alapozása és csatlakoztatása a meglévő épület alapjához. Beton kötési ideje után következhet csak a felmenő szerkezet.',
    prerequisites: ['Terület előkészítve', 'Statikai terv rendelkezésre áll', 'Zsaluzó és vasbetonos megbízva'],
    professionals: ['Zsaluzó', 'Vasbetonos', 'Statikus'],
    whatFollows: ['Kötési idő (min. 10 nap)', 'Szerkezetépítés / ráépítés'],
    mistakes: ['Meglévő alap és új alapozás csatlakozásának nem megfelelő kivitelezése', 'Kötési idő be nem tartása'],
    checklist: ['Csatlakozási pont statikussal ellenőrizve', 'Betonozás elvégezve', 'Kötési idő tervbe véve', 'Felmenő anyagok megrendelve'],
  },

  'Szerkezetépítés / ráépítés': {
    description: 'Bővítés felmenő szerkezeteinek megépítése. A meglévő épület és az új szerkezet csatlakozása különös figyelmet igényel.',
    prerequisites: ['Alapozás és kötési idő kész', 'Falazóanyag és acél megrendelve', 'Szerkezeti tervek rendelkezésre állnak'],
    professionals: ['Zsaluzó', 'Vasbetonos', 'Ács'],
    whatFollows: ['Tető / homlokzati kapcsolódások'],
    mistakes: ['Csatlakozási pont statikus ellenőrzése nélkül', 'Időjárási szünet be nem tervezése'],
    checklist: ['Összes szerkezeti elem műszaki ellenőrrel átvéve', 'Csatlakozási pontok fotókkal dokumentálva', 'Tetőanyag megrendelési időpont ismert'],
  },

  'Tető / homlokzati kapcsolódások': {
    description: 'Bővítés tetőcsatlakozása a meglévő épülethez és homlokzati illesztési munkák. Vízmentesség kritikus.',
    prerequisites: ['Bővítés szerkezete kész', 'Ács és tetőfedő megbízva', 'Tetőanyag és bádogos anyag megrendelve'],
    professionals: ['Ács', 'Tetőfedő', 'Bádogos'],
    whatFollows: ['Nyílászárók és épületzárás'],
    mistakes: ['Tető illesztési hiba — beázás', 'Bádogos és tetőfedő koordináció hiánya'],
    checklist: ['Tetőcsatlakozás vízmentessége ellenőrizve', 'Bádogosmunkák kész', 'Homlokzati illesztés kész', 'Épületzárás megtörtént'],
  },

  'Belső előkészítés, vakolás / aljzat': {
    description: 'Bővítés belső felületeinek vakolása és aljzat-előkészítése a burkoláshoz. Száradási idők kritikusak.',
    prerequisites: ['Épület zárt', 'Gépészet és villany első ütem kész', 'Vakoló és aljzatanyag megrendelve'],
    professionals: ['Kőműves', 'Glettelő'],
    whatFollows: ['Burkolás, festés, belső befejezések'],
    mistakes: ['Nedves vakolatra vagy aljzatra burkolás', 'Száradási idők be nem tartása'],
    checklist: ['Vakolat és aljzat száraz', 'Egyenletesség ellenőrizve', 'Burkoló és festő időpontja lefoglalva'],
  },

  'Burkolás, festés, belső befejezések': {
    description: 'Burkolók, festők és befejező munkák koordinálása. Festés és szerelvényezés sorrendje kritikus.',
    prerequisites: ['Vakolat és aljzat száraz', 'Burkolóanyag megrendelve', 'Festék és glett anyag megrendelve'],
    professionals: ['Burkoló', 'Festő-mázoló', 'Gipszkartonos'],
    whatFollows: ['Szerelvényezés és külső rendezés'],
    mistakes: ['Szerelvényezés festés előtt', 'Párhuzamos munkák ütközése'],
    checklist: ['Burkolás kész és száraz', 'Festés kész és száraz', 'Belső ajtók felszerelve', 'Hibajegyzék elkészítve'],
  },

  'Szerelvényezés és külső rendezés': {
    description: 'Villany és gépészet végső szerelvényezése, majd kültéri munkák (tereprendezés, járda). Próbaüzem elvégzése.',
    prerequisites: ['Burkolás és festés kész', 'Szaniterek, kapcsolók, lámpák megrendelve', 'Kültéri anyagok rendelkezésre állnak'],
    professionals: ['Villanyszerelő', 'Gépész', 'Térkövező / kertész'],
    whatFollows: ['Átadás és hibajavítás'],
    mistakes: ['Próbaüzem elvégzésének kihagyása', 'Kültéri munkák időjárási függése'],
    checklist: ['Összes kapcsoló, konnektor, vízcsap tesztelve', 'Fűtési rendszer próbaüzemen', 'Kültéri munkák kész', 'Dokumentáció összegyűjtve'],
  },
}

// ── Modal component ────────────────────────────────────────────────────────

interface Props {
  phaseName: string
  onClose: () => void
  onNavigateToProfessional?: (category: string) => void
}

export default function PhaseDetailModal({ phaseName, onClose, onNavigateToProfessional }: Props) {
  const data = PHASE_MODAL_DATA[phaseName]

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', fn)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <Modal isOpen={true} onClose={onClose} size="lg">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b shrink-0" style={{ borderColor: 'var(--border)' }}>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>{phaseName}</p>
            <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>Fázis részletek</p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center border transition-all hover:scale-105"
            style={{ borderColor: 'var(--border)', color: 'var(--tx-muted)', background: 'var(--surface-subtle)' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {!data ? (
            <div className="flex flex-col gap-4 py-2">
              <div className="rounded-2xl px-5 py-4 border" style={{ background: 'var(--sage-light)', borderColor: 'var(--sage-border)' }}>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--sage)' }}>
                  Ez a fázis a projekt ütemezésének része.
                </p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--sage)' }}>
                  Az éles verzióban itt a szükséges szakemberek, előfeltételek, kockázatok és következő lépések jelennek meg.
                </p>
              </div>
              <div className="rounded-2xl px-5 py-4 border" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
                <p className="text-xs font-semibold mb-1" style={{ color: 'var(--tx-primary)' }}>Javasolt teendő</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                  Egyeztesd előre a kapcsolódó szakemberek időpontját — a legtöbb szakág több héttel előre foglalt.
                </p>
              </div>
              <div className="rounded-2xl px-4 py-3 border" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
                <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                  ℹ️ Az ütemterv naptári átfutási becslés. Egyes szakemberek több rövidebb ütemben térhetnek vissza — a lefoglalás és az előzetes egyeztetés kritikus.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {/* Description */}
              <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-secondary)' }}>{data.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Section title="Előfeltételek" icon="✅" color="#10B981">
                  <BulletList items={data.prerequisites} />
                </Section>
                <Section title="Szükséges szakemberek" icon="👷" color="#3B82F6">
                  <TagList
                    items={data.professionals}
                    color="#3B82F6" bg="#EFF6FF" border="#93C5FD"
                    onClickItem={onNavigateToProfessional}
                  />
                  {onNavigateToProfessional && (
                    <p className="text-[10px] mt-2" style={{ color: '#93C5FD' }}>
                      👆 Kattints a kategóriára a szakemberekért
                    </p>
                  )}
                </Section>
                <Section title="Mi következik?" icon="➡️" color="#8B5CF6">
                  <BulletList items={data.whatFollows} />
                </Section>
                <Section title="Tipikus hibák" icon="⚠️" color="#F59E0B">
                  <BulletList items={data.mistakes} dot="#F59E0B" />
                </Section>
              </div>

              {/* Checklist */}
              <Section title="Ellenőrzőlista" icon="☑️" color="#06B6D4">
                <div className="flex flex-col gap-2 mt-2">
                  {data.checklist.map(item => (
                    <label key={item} className="flex items-start gap-3 cursor-default">
                      <div className="mt-0.5 w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0"
                        style={{ width: '18px', height: '18px', borderColor: '#93C5FD', background: '#EFF6FF' }}>
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#3B82F6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <span className="text-xs leading-relaxed" style={{ color: 'var(--tx-secondary)' }}>{item}</span>
                    </label>
                  ))}
                </div>
              </Section>

              {/* Pro upsell block */}
              <div className="rounded-2xl p-4 border" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                    style={{ background: 'linear-gradient(135deg,#1D4ED8,#7C3AED)' }}>✦ Pro részletes terv</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                  A Pro verzióban ehhez a fázishoz részletes anyaglista, szakember-időzítés,
                  ellenőrzőlista és exportálható projektterv is elérhető lehet.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t shrink-0 flex justify-end"
          style={{ borderColor: 'var(--border)', background: 'var(--surface-subtle)' }}>
          <button onClick={onClose}
            className="text-xs font-medium rounded-xl px-4 py-2 border transition-all hover:scale-[1.02]"
            style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: 'var(--surface)' }}>
            Bezárás
          </button>
        </div>
      </div>
    </Modal>
  )
}

// ── Helper sub-components ──────────────────────────────────────────────────

function Section({ title, icon, color, children }: {
  title: string; icon: string; color: string; children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl p-4 border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm">{icon}</span>
        <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color }}>{title}</p>
      </div>
      {children}
    </div>
  )
}

function BulletList({ items, dot = 'var(--tx-muted)' }: { items: string[]; dot?: string }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map(item => (
        <li key={item} className="flex items-start gap-2">
          <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: dot }} />
          <span className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-secondary)' }}>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function TagList({ items, color, bg, border, onClickItem }: {
  items: string[]; color: string; bg: string; border: string
  onClickItem?: (item: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map(item => (
        <span key={item}
          className="text-[11px] font-medium rounded-lg px-2.5 py-1 border transition-all"
          style={{
            background: bg, borderColor: border, color,
            cursor: onClickItem ? 'pointer' : 'default',
            boxShadow: onClickItem ? undefined : 'none',
          }}
          onClick={() => onClickItem?.(item)}
          onMouseEnter={(e: React.MouseEvent<HTMLSpanElement>) => { if (onClickItem) (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)' }}
          onMouseLeave={(e: React.MouseEvent<HTMLSpanElement>) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
        >
          {item}{onClickItem && ' →'}
        </span>
      ))}
    </div>
  )
}

import React from 'react'
import { Modal } from './ui/Modal'
