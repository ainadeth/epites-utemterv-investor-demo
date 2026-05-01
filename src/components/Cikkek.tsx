import { useEffect } from 'react'
import React from 'react'
import { Modal, ModalCloseBtn } from './ui/Modal'

// ── Burkolás article affiliate modal ──────────────────────────────────────

const PRODUCT_CARDS = [
  { id: 'pc1', name: 'Csemperagasztó', icon: '🪣', desc: 'Alapragasztó padló- és falburkolatokhoz, normál és vizes helyiségekbe.' },
  { id: 'pc2', name: 'Fugázó',         icon: '🔲', desc: 'Csempe- és padlólapok közötti hézagok kitöltésére, víz- és piszkálló.' },
  { id: 'pc3', name: 'Alapozó',        icon: '🧴', desc: 'Aljzat előkészítéséhez, tapadás javítására, nedves és száraz helyiségben.' },
  { id: 'pc4', name: 'Vízszigetelés',  icon: '💧', desc: 'Nedves helyiségekben kötelező réteg a csempézés előtt.' },
  { id: 'pc5', name: 'Szintező',       icon: '📐', desc: 'Egyenetlen aljzatok kiegyenlítéséhez, burkolás előtti előkészítés.' },
]

function AffiliateModal({ productName, onClose }: { productName: string; onClose: () => void }) {
  const [submitted, setSubmitted] = React.useState(false)
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn); document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <Modal isOpen={true} onClose={onClose} size="md">
      <div className="w-full max-w-md flex flex-col rounded-3xl overflow-hidden"
        style={{ background: 'var(--surface)', boxShadow: '0 24px 64px rgba(0,0,0,.22)', maxHeight: '90dvh' }}>
        <div className="flex items-center justify-between px-6 py-5 border-b shrink-0" style={{ borderColor: 'var(--border)' }}>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>Termékajánló előnézet</p>
            <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>{productName} — demó</p>
          </div>
          <ModalCloseBtn onClose={onClose} />
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-6 gap-4">
              <div className="w-14 h-14 rounded-3xl flex items-center justify-center text-2xl border" style={{ background: 'var(--sage-light)', borderColor: 'var(--sage-border)' }}>✅</div>
              <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>Köszönjük!</p>
              <p className="text-sm" style={{ color: 'var(--tx-muted)' }}>Az anyagbeszerzési ajánlások élesítésekor értesítünk.</p>
              <button onClick={onClose} className="text-sm font-medium rounded-xl px-5 py-2.5 border" style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: 'var(--surface-subtle)' }}>Bezárás</button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-xs leading-relaxed" style={{ color: 'var(--tx-muted)' }}>Az éles verzióban itt partneri termékajánlók, bolti ajánlatok vagy affiliate linkek jelenhetnek meg. Ez jelenleg demó, nem valós ajánlat.</p>
              <div className="rounded-2xl p-4 border" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--tx-muted)' }}>Ajánlat paraméterei</p>
                {[['Kategória', productName],['Projekt típusa','Lakásfelújítás (demo)'],['Becsült anyagigény','~2–4 zsák / 20–30 m²'],['Lehetséges partnerlink','[Partnerlink helye]']].map(([k,v]) => (
                  <div key={k} className="flex justify-between text-[11px] py-1 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                    <span style={{ color: 'var(--tx-muted)' }}>{k}</span><span className="font-medium" style={{ color: 'var(--tx-primary)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {!submitted && (
          <div className="px-6 py-4 border-t shrink-0 flex items-center justify-between gap-3" style={{ borderColor: 'var(--border)', background: 'var(--surface-subtle)' }}>
            <button onClick={onClose} className="text-xs font-medium rounded-xl px-4 py-2 border" style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: 'var(--surface)' }}>Mégse</button>
            <button onClick={() => setSubmitted(true)} className="text-sm font-semibold rounded-xl px-5 py-2.5 text-white transition-all hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg,#3D6B4A,#4A7C59)', boxShadow: '0 3px 10px rgba(74,124,89,.22)' }}>Értesítést kérek</button>
          </div>
        )}
      </div>
    </Modal>
  )
}

function BukolasArticle() {
  const [activeProduct, setActiveProduct] = React.useState<string | null>(null)
  const SECTIONS = [
    { title: 'Milyen adatok kellenek a becsléshez?', body: 'A pontos anyagigény kiszámításához a burkolandó terület négyzetmétere, a választott lap mérete, az aljzat állapota és a vágási veszteség tervezett aránya szükséges. Vizes helyiségeknél a vízszigetelés és a fugaköz szélességét is érdemes ismerni.' },
    { title: 'Burkolat mennyiség + vágási veszteség', body: 'Alap képlet: Szükséges burkolat = (Terület m² × 1,10) + tartalék. A 10%-os ráhagyás vágási veszteségre és törésre szolgál. Nagyobb lapoknál (60×60 cm felett) akár 12–15% ráhagyás is ajánlott.' },
    { title: 'Ragasztó és fuga becslés', body: '1 zsák (25 kg) csemperagasztó kb. 4–5 m²-t fed. Fugázóból 1 kg kb. 3–8 m²-t fed, a fugaszélességtől és lapmérettől függően. Mindig rendelje meg a számított mennyiség 15–20%-ával többet.' },
    { title: 'Mikor érdemes beszerezni?', body: 'A burkolati anyagokat legalább 2–3 héttel a munka előtt érdemes kiválasztani. A lapok egy gyártási tételből kerüljenek ki (LOT szám), hogy ne legyen színeltérés. Ragasztó és fuga 1–2 héttel a munka előtt.' },
    { title: 'Gyakori hibák', body: 'Nem megfelelő aljzatelőkészítés, vízszigetelés hiánya nedves helyiségnél, rossz ragasztó vastagság, különböző LOT számú lapok keverése. Ezeket a hibákat utólag nagyon költséges javítani.' },
  ]
  return (
    <article className="card p-6 mb-8">
      <div className="mb-6 pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase rounded-full px-3 py-1 mb-3 border" style={{ color: 'var(--sage)', background: 'var(--sage-light)', borderColor: 'var(--sage-border)' }}>📐 Kalkulátor & útmutató</span>
        <h2 className="font-serif text-xl md:text-2xl font-medium mb-2 leading-snug" style={{ color: 'var(--tx-primary)' }}>Burkolás kalkulátor: mennyi burkolatra, ragasztóra és fugára lehet szükség?</h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-muted)' }}>Burkolásnál nem csak a négyzetméter számít. A vágási veszteség, a lapméret, az aljzat állapota és a választott ragasztó is befolyásolja az anyagigényt.</p>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-[11px]" style={{ color: 'var(--tx-muted)' }}>~5 perces olvasás</span>
          <span style={{ color: 'var(--border-strong)' }}>·</span>
          <span className="text-[11px]" style={{ color: 'var(--tx-muted)' }}>Lakásfelújítás · Burkolás</span>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {SECTIONS.map(s => (
          <div key={s.title}>
            <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--tx-primary)' }}>{s.title}</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--tx-secondary)' }}>{s.body}</p>
          </div>
        ))}
        <div className="rounded-2xl p-4 border-l-4" style={{ background: 'var(--surface-subtle)', borderLeftColor: 'var(--sage)' }}>
          <p className="text-xs font-semibold mb-2" style={{ color: 'var(--tx-primary)' }}>📊 Példa — 18 m² fürdőszoba</p>
          {[['Burkolófelület','18 m²'],['Vágási veszteség (+10%)','1,8 m²'],['Megrendelendő','≈ 20 m²'],['Ragasztó (5 m²/zsák)','≈ 4 zsák'],['Fugázó (5 m²/kg)','≈ 4 kg']].map(([k,v]) => (
            <div key={k} className="flex justify-between text-[11px]"><span style={{ color: 'var(--tx-muted)' }}>{k}</span><span className="font-semibold" style={{ color: 'var(--tx-primary)' }}>{v}</span></div>
          ))}
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--tx-primary)' }}>Ajánlott termékkategóriák</h3>
          <p className="text-xs mb-4" style={{ color: 'var(--tx-muted)' }}>Demo termékajánló — az éles verzióban partneri ajánlatokkal, bolti árakkal és affiliate linkekkel.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRODUCT_CARDS.map(pc => (
              <div key={pc.id} className="rounded-2xl p-4 border flex flex-col gap-2" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-2"><span className="text-lg">{pc.icon}</span><p className="text-xs font-semibold" style={{ color: 'var(--tx-primary)' }}>{pc.name}</p></div>
                <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>{pc.desc}</p>
                <button type="button" onClick={() => setActiveProduct(pc.name)}
                  className="self-start text-[11px] font-semibold rounded-xl px-3 py-1.5 border transition-all hover:scale-[1.02]"
                  style={{ borderColor: 'var(--sage-border)', background: 'var(--sage-light)', color: 'var(--sage)' }}>
                  Termékajánló előnézet
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {activeProduct && <AffiliateModal productName={activeProduct} onClose={() => setActiveProduct(null)} />}
    </article>
  )
}

export default function Cikkek() {
  return (
    <div className="animate-fade-up">
      <div className="page-top pb-8 text-center max-w-2xl mx-auto px-4">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-100 dark:border-blue-900/60 rounded-full px-3.5 py-1.5 mb-4">
          📖 Tudástár
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-medium mb-3" style={{ color: 'var(--tx-primary)' }}>
          Cikkek és tudástár
        </h2>
        <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: 'var(--tx-muted)' }}>
          Építkezési útmutatók, árak, fázisok, kivitelezési tippek és döntéstámogató tartalmak hamarosan.
        </p>
      </div>

      {/* ── Featured article ── */}
      <BukolasArticle />

      {/* Preview cards (other articles) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 mb-10">
        {PREVIEW_ARTICLES.map(article => (
          <div key={article.title} className="card p-5 opacity-60">
            <div className="text-2xl mb-3">{article.icon}</div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--tx-muted)' }}>{article.category}</p>
            <p className="text-sm font-semibold leading-snug mb-2" style={{ color: 'var(--tx-primary)' }}>{article.title}</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--tx-muted)' }}>{article.desc}</p>
            <span className="inline-block mt-3 text-[10px] font-bold uppercase tracking-wider rounded-full px-2.5 py-1 border"
              style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)', color: 'var(--tx-muted)' }}>Hamarosan</span>
          </div>
        ))}
      </div>

      {/* ── Utility / admin knowledge section ── */}
      <div className="mb-10">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-sm">⚡</div>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>Közművek és ügyintézési idők</p>
            <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>
              Az építkezés időtartamát nem csak a kivitelezés, hanem a közművek, szolgáltatók és hatósági ügyintézések is befolyásolhatják.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {UTILITY_CARDS.map(card => (
            <div key={card.title} className="card p-5">
              <div className="text-xl mb-3">{card.icon}</div>
              <p className="text-sm font-semibold mb-2" style={{ color: 'var(--tx-primary)' }}>{card.title}</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--tx-muted)' }}>{card.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-4 border" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
          <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
            ℹ️ Az ügyintézési idők tájékoztató jellegűek. A pontos folyamatot és határidőt mindig az illetékes szolgáltató, hatóság vagy szakember tudja megerősíteni.
          </p>
        </div>
      </div>

      {/* Newsletter signup */}
      <div className="rounded-3xl p-8 text-center border" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-medium mb-1" style={{ color: 'var(--tx-primary)' }}>Értesítést kérek, amikor elérhetők a cikkek</p>
        <p className="text-xs mb-4" style={{ color: 'var(--tx-muted)' }}>Hamarosan elindítjuk az építkezési tudástárat.</p>
        <span className="inline-flex items-center gap-2 text-xs font-semibold rounded-xl px-5 py-2.5 border"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--tx-muted)' }}>
          📧 Hamarosan elérhető
        </span>
      </div>
    </div>
  )
}

const UTILITY_CARDS = [
  {
    icon: '⚡',
    title: 'Áram bekötés / E.ON ügyintézés',
    text: 'Új bekötés, teljesítménybővítés vagy mérőhely-szabványosítás esetén az ügyintézés több hetet vagy akár hónapokat is igénybe vehet. A pontos idő a szolgáltatói folyamattól, dokumentumoktól és helyszíni feltételektől függ.',
  },
  {
    icon: '💧',
    title: 'Víz és csatorna',
    text: 'Új bekötésnél vagy átalakításnál előzetes egyeztetés, terv, szolgáltatói jóváhagyás és kivitelezési idő is szükséges lehet.',
  },
  {
    icon: '🔥',
    title: 'Gáz / fűtési rendszer',
    text: 'Gázos rendszereknél a tervezés, engedélyezés, kivitelezés és szolgáltatói átvétel külön időt vehet igénybe. Alternatív gépészetnél, például hőszivattyúnál más előkészítés szükséges.',
  },
  {
    icon: '🏢',
    title: 'Társasházi / lakásfelújítási egyeztetések',
    text: 'Lakásfelújításnál számíthat a házirend, közös képviselet, zajos munkák ideje, strangok állapota és a társasházi szabályozás.',
  },
  {
    icon: '🔌',
    title: 'Elektromos hálózat állapota felújításnál',
    text: 'Régi épületeknél fontos kérdés, hogy milyen a meglévő hálózat, van-e rézvezeték, gégecsövezés, földelés, FI-relé és elegendő kapacitás.',
  },
]

const PREVIEW_ARTICLES = [
  {
    icon: '💰',
    category: 'Árak',
    title: 'Mennyibe kerül egy családi ház építése 2026-ban?',
    desc: 'Átfogó áttekintés a jelenlegi piaci árakról, fázisonként lebontva.',
  },
  {
    icon: '📋',
    category: 'Tervezés',
    title: 'Mikor kell engedély és mennyi ideig tart?',
    desc: 'Engedélyezési típusok, határidők és a leggyakoribb csúszások okai.',
  },
  {
    icon: '🔧',
    category: 'Kivitelezés',
    title: 'Hogyan válassz megbízható kivitelezőt?',
    desc: 'Praktikus szempontok az ajánlatkéréstől a szerződéskötésig.',
  },
]
