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
}

// ── Modal component ────────────────────────────────────────────────────────

interface Props {
  phaseName: string
  onClose: () => void
}

export default function PhaseDetailModal({ phaseName, onClose }: Props) {
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
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(4px)' }}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full sm:max-w-2xl flex flex-col rounded-t-3xl sm:rounded-3xl overflow-hidden animate-fade-up"
        style={{ background: 'var(--surface)', boxShadow: '0 24px 64px rgba(0,0,0,.3)', maxHeight: '92dvh' }}
      >
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
            <p className="text-sm py-4" style={{ color: 'var(--tx-muted)' }}>Ehhez a fázishoz nincs részletes leírás.</p>
          ) : (
            <div className="flex flex-col gap-5">
              {/* Description */}
              <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-secondary)' }}>{data.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Section title="Előfeltételek" icon="✅" color="#10B981">
                  <BulletList items={data.prerequisites} />
                </Section>
                <Section title="Szükséges szakemberek" icon="👷" color="#3B82F6">
                  <TagList items={data.professionals} color="#3B82F6" bg="#EFF6FF" border="#93C5FD" />
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
    </div>
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

function TagList({ items, color, bg, border }: { items: string[]; color: string; bg: string; border: string }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map(item => (
        <span key={item} className="text-[11px] font-medium rounded-lg px-2.5 py-1 border"
          style={{ background: bg, borderColor: border, color }}>{item}</span>
      ))}
    </div>
  )
}

import React from 'react'
