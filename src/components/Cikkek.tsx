import { useState } from 'react'
import React from 'react'
import { Modal, ModalCloseBtn } from './ui/Modal'

// ── Article data ──────────────────────────────────────────────────────────

interface Article {
  id: string
  title: string
  category: string
  excerpt: string
  readTime: string
  featured?: boolean
  icon: string
}

const ARTICLES: Article[] = [
  {
    id: 'burkolas',
    title: 'Burkolás kalkulátor: mennyi burkolatra, ragasztóra és fugára lehet szükség?',
    category: 'Kalkulátor & útmutató',
    excerpt: 'Burkolásnál nem csak a négyzetméter számít. A vágási veszteség, a lapméret, az aljzat állapota és a választott ragasztó is befolyásolja az anyagigényt.',
    readTime: '~5 perc',
    featured: true,
    icon: '🔲',
  },
  {
    id: 'koltsegtervezes',
    title: 'Hogyan tervezd meg a felújítás költségvetését?',
    category: 'Pénzügyek & tervezés',
    excerpt: 'A legtöbb felújítás 20–40%-kal többe kerül az eredeti tervnél. Hogyan kerüld el a leggyakoribb hibákat?',
    readTime: '~4 perc',
    icon: '💰',
  },
  {
    id: 'szakember',
    title: 'Hogyan válassz megbízható szakembert?',
    category: 'Szakemberek',
    excerpt: 'Referenciák, ajánlatok, szerződés és kifizetési ütemezés — minden amit tudni kell.',
    readTime: '~6 perc',
    icon: '👷',
  },
  {
    id: 'engedelyek',
    title: 'Mikor kell építési engedély és mikor elég bejelentés?',
    category: 'Hatósági ügyintézés',
    excerpt: 'Sokan nem tudják: nem minden átalakításhoz kell engedély, de az engedélyköteles munkák kihagyása komoly következményekkel járhat.',
    readTime: '~5 perc',
    icon: '📋',
  },
]

// ── Product cards (inside burkolás article) ────────────────────────────────

const PRODUCT_CARDS = [
  { id: 'pc1', name: 'Csemperagasztó', icon: '🪣', desc: 'Alapragasztó padló- és falburkolatokhoz.' },
  { id: 'pc2', name: 'Fugázó',         icon: '🔲', desc: 'Hézagok kitöltésére, víz- és piszkálló.' },
  { id: 'pc3', name: 'Alapozó',        icon: '🧴', desc: 'Aljzat előkészítésére, tapadás javítására.' },
  { id: 'pc4', name: 'Vízszigetelés',  icon: '💧', desc: 'Nedves helyiségekben kötelező réteg.' },
  { id: 'pc5', name: 'Szintező',       icon: '📐', desc: 'Egyenetlen aljzatok kiegyenlítésére.' },
]

// ── Affiliate modal ────────────────────────────────────────────────────────

function AffiliateModal({ productName, onClose }: { productName: string; onClose: () => void }) {
  const [submitted, setSubmitted] = React.useState(false)
  return (
    <Modal isOpen={true} onClose={onClose} size="sm">
      <div>
        <div className="flex items-center justify-between gap-3 px-6 py-5 border-b shrink-0" style={{ borderColor: 'var(--border)' }}>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>Termékajánló előnézet</p>
            <p className="text-[11px]" style={{ color: 'var(--tx-muted)' }}>{productName} — demó</p>
          </div>
          <ModalCloseBtn onClose={onClose} />
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-6 gap-4">
              <div className="w-14 h-14 rounded-3xl flex items-center justify-center text-2xl border"
                style={{ background: 'var(--sage-light)', borderColor: 'var(--sage-border)' }}>✅</div>
              <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>Köszönjük!</p>
              <p className="text-sm" style={{ color: 'var(--tx-muted)' }}>Az anyagbeszerzési ajánlások élesítésekor értesítünk.</p>
              <button onClick={onClose} className="text-sm font-medium rounded-xl px-5 py-2.5 border"
                style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: 'var(--surface-subtle)' }}>Bezárás</button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-xs leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                Az éles verzióban itt partneri termékajánlók, bolti ajánlatok vagy affiliate linkek jelenhetnek meg. Ez jelenleg demó, nem valós ajánlat.
              </p>
              <div className="rounded-2xl p-4 border" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
                {[['Kategória', productName], ['Projekt típusa', 'Lakásfelújítás (demo)'], ['Becsült anyagigény', '~2–4 zsák / 20–30 m²'], ['Lehetséges partnerlink', '[Partnerlink helye]']].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-[11px] py-1 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                    <span style={{ color: 'var(--tx-muted)' }}>{k}</span>
                    <span className="font-medium" style={{ color: 'var(--tx-primary)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {!submitted && (
          <div className="px-6 py-4 border-t shrink-0 flex items-center justify-between gap-3"
            style={{ borderColor: 'var(--border)', background: 'var(--surface-subtle)' }}>
            <button onClick={onClose} className="text-xs font-medium rounded-xl px-4 py-2 border"
              style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: 'var(--surface)' }}>Mégse</button>
            <button onClick={() => setSubmitted(true)}
              className="text-sm font-semibold rounded-xl px-5 py-2.5 text-white transition-all hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg,#3D6B4A,#4A7C59)', boxShadow: '0 3px 10px rgba(74,124,89,.22)' }}>
              Értesítést kérek
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}

// ── Burkolás article full content ─────────────────────────────────────────

function BukolasArticleContent({ onClose }: { onClose: () => void }) {
  const [activeProduct, setActiveProduct] = useState<string | null>(null)
  const SECTIONS = [
    { title: 'Milyen adatok kellenek a becsléshez?', body: 'A pontos anyagigény kiszámításához a burkolandó terület négyzetmétere, a választott lap mérete, az aljzat állapota és a vágási veszteség tervezett aránya szükséges. Vizes helyiségeknél a vízszigetelés és a fugaköz szélességét is érdemes ismerni.' },
    { title: 'Burkolat mennyiség + vágási veszteség', body: 'Alap képlet: Szükséges burkolat = (Terület m² × 1,10) + tartalék. A 10%-os ráhagyás vágási veszteségre és törésre szolgál. Nagyobb lapoknál (60×60 cm felett) akár 12–15% is ajánlott.' },
    { title: 'Ragasztó és fuga becslés', body: '1 zsák (25 kg) csemperagasztó kb. 4–5 m²-t fed. Fugázóból 1 kg kb. 3–8 m²-t fed, a fugaszélességtől és lapmérettől függően. Mindig rendelje meg a számított mennyiség 15–20%-ával többet.' },
    { title: 'Mikor érdemes beszerezni?', body: 'A burkolati anyagokat legalább 2–3 héttel a munka előtt érdemes kiválasztani. A lapok egy gyártási tételből kerüljenek ki (LOT szám), hogy ne legyen színeltérés.' },
    { title: 'Gyakori hibák', body: 'Nem megfelelő aljzatelőkészítés, vízszigetelés hiánya nedves helyiségnél, rossz ragasztó vastagság, különböző LOT számú lapok keverése. Ezeket utólag nagyon költséges javítani.' },
  ]
  return (
    <>
      <div className="flex items-center justify-between gap-3 px-6 py-5 border-b shrink-0" style={{ borderColor: 'var(--border)' }}>
        <div className="min-w-0">
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--sage)' }}>Kalkulátor & útmutató</span>
          <p className="text-sm font-semibold mt-0.5 leading-snug" style={{ color: 'var(--tx-primary)' }}>Burkolás kalkulátor</p>
        </div>
        <ModalCloseBtn onClose={onClose} />
      </div>
      <div className="overflow-y-auto flex-1 px-6 py-5 flex flex-col gap-5">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-secondary)' }}>
          Burkolásnál nem csak a négyzetméter számít. A vágási veszteség, a lapméret, az aljzat állapota és a választott ragasztó is befolyásolja az anyagigényt.
        </p>
        {SECTIONS.map(s => (
          <div key={s.title}>
            <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--tx-primary)' }}>{s.title}</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--tx-secondary)' }}>{s.body}</p>
          </div>
        ))}
        <div className="rounded-2xl p-4 border-l-4" style={{ background: 'var(--surface-subtle)', borderLeftColor: 'var(--sage)' }}>
          <p className="text-xs font-semibold mb-2" style={{ color: 'var(--tx-primary)' }}>📊 Példa — 18 m² fürdőszoba</p>
          {[['Burkolófelület', '18 m²'], ['Vágási veszteség (+10%)', '1,8 m²'], ['Megrendelendő', '≈ 20 m²'], ['Ragasztó', '≈ 4 zsák (25 kg)'], ['Fugázó', '≈ 4 kg']].map(([k, v]) => (
            <div key={k} className="flex justify-between text-[11px]">
              <span style={{ color: 'var(--tx-muted)' }}>{k}</span>
              <span className="font-semibold" style={{ color: 'var(--tx-primary)' }}>{v}</span>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--tx-primary)' }}>Ajánlott termékkategóriák</h3>
          <p className="text-xs mb-4" style={{ color: 'var(--tx-muted)' }}>Demo termékajánló — az éles verzióban partneri ajánlatokkal és affiliate linkekkel.</p>
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
      <div className="px-6 py-4 border-t shrink-0" style={{ borderColor: 'var(--border)', background: 'var(--surface-subtle)' }}>
        <button onClick={onClose} className="text-xs font-medium rounded-xl px-4 py-2 border"
          style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: 'var(--surface)' }}>
          ← Vissza a cikkekhez
        </button>
      </div>
      {activeProduct && <AffiliateModal productName={activeProduct} onClose={() => setActiveProduct(null)} />}
    </>
  )
}

// ── Utility knowledge cards ────────────────────────────────────────────────

const UTILITY_CARDS = [
  { icon: '⚡', title: 'Áram bekötés / E.ON ügyintézés', text: 'Új bekötés, teljesítménybővítés vagy mérőhely-szabványosítás esetén az ügyintézés több hetet vagy akár hónapokat is igénybe vehet.' },
  { icon: '💧', title: 'Víz és csatorna', text: 'Új bekötésnél vagy átalakításnál előzetes egyeztetés, terv, szolgáltatói jóváhagyás és kivitelezési idő is szükséges lehet.' },
  { icon: '🔥', title: 'Gáz / fűtési rendszer', text: 'Gázos rendszereknél a tervezés, engedélyezés, kivitelezés és szolgáltatói átvétel külön időt vehet igénybe.' },
  { icon: '🏢', title: 'Társasházi egyeztetések', text: 'Lakásfelújításnál számíthat a házirend, közös képviselet, zajos munkák ideje és a társasházi szabályozás.' },
  { icon: '🔌', title: 'Elektromos hálózat állapota', text: 'Régi épületeknél fontos kérdés: van-e rézvezeték, gégecsövezés, földelés, FI-relé és elegendő kapacitás.' },
]

// ── Main Cikkek section ────────────────────────────────────────────────────

export default function Cikkek() {
  const [openArticle, setOpenArticle] = useState<string | null>(null)

  return (
    <div className="animate-fade-up">
      <div className="page-top pb-8 text-center max-w-2xl mx-auto px-4">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase rounded-full px-3.5 py-1.5 mb-4 border"
          style={{ color: 'var(--sage)', background: 'var(--sage-light)', borderColor: 'var(--sage-border)' }}>
          📖 Tudástár
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-medium mb-3" style={{ color: 'var(--tx-primary)' }}>
          Cikkek és tudástár
        </h2>
        <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: 'var(--tx-muted)' }}>
          Építkezési útmutatók, kalkulátorok, szakmai tippek és döntéstámogató tartalmak.
        </p>
      </div>

      {/* Article list */}
      <div className="flex flex-col gap-4 mb-10">
        {ARTICLES.map(art => (
          <div key={art.id}
            className="card p-5 flex items-start gap-4 cursor-pointer transition-all hover:scale-[1.005] group"
            onClick={() => setOpenArticle(art.id)}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
              style={{ background: 'var(--surface-subtle)' }}>{art.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--sage)' }}>{art.category}</span>
                {art.featured && (
                  <span className="text-[10px] font-bold rounded-full px-2 py-0.5 border"
                    style={{ background: 'var(--sage-light)', borderColor: 'var(--sage-border)', color: 'var(--sage)' }}>
                    ✦ Kiemelt
                  </span>
                )}
                {!art.featured && (
                  <span className="text-[10px] rounded-full px-2 py-0.5 border"
                    style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)', color: 'var(--tx-muted)' }}>
                    Hamarosan
                  </span>
                )}
              </div>
              <h3 className="text-sm font-semibold leading-snug mb-1.5" style={{ color: 'var(--tx-primary)' }}>{art.title}</h3>
              <p className="text-xs leading-relaxed mb-2" style={{ color: 'var(--tx-muted)' }}>{art.excerpt}</p>
              <div className="flex items-center gap-3">
                <span className="text-[10px]" style={{ color: 'var(--tx-muted)' }}>🕐 {art.readTime}</span>
                {art.featured && (
                  <span className="text-[10px] font-semibold group-hover:underline" style={{ color: 'var(--sage)' }}>
                    Elolvasom →
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Utility knowledge section */}
      <div className="mb-10">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-sm">⚡</div>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>Közművek és ügyintézési idők</p>
            <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>Az építkezés időtartamát nemcsak a kivitelezés, hanem a közművek és hatósági ügyintézések is befolyásolhatják.</p>
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
            ℹ️ Az ügyintézési idők tájékoztató jellegűek. A pontos folyamatot mindig az illetékes szolgáltató, hatóság vagy szakember tudja megerősíteni.
          </p>
        </div>
      </div>

      {/* Article detail modal */}
      {openArticle === 'burkolas' && (
        <Modal isOpen={true} onClose={() => setOpenArticle(null)} size="lg">
          <BukolasArticleContent onClose={() => setOpenArticle(null)} />
        </Modal>
      )}
      {openArticle && openArticle !== 'burkolas' && (
        <Modal isOpen={true} onClose={() => setOpenArticle(null)} size="md">
          <div>
            <div className="flex items-center justify-between gap-3 px-6 py-5 border-b shrink-0" style={{ borderColor: 'var(--border)' }}>
              <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>
                {ARTICLES.find(a => a.id === openArticle)?.title}
              </p>
              <ModalCloseBtn onClose={() => setOpenArticle(null)} />
            </div>
            <div className="px-6 py-10 text-center flex flex-col gap-4">
              <span className="text-4xl">📖</span>
              <p className="text-sm font-medium" style={{ color: 'var(--tx-primary)' }}>Ez a cikk hamarosan elérhető</p>
              <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>Az építkezési tudástár folyamatosan bővül.</p>
              <button onClick={() => setOpenArticle(null)} className="self-center text-xs font-medium rounded-xl px-5 py-2.5 border"
                style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: 'var(--surface-subtle)' }}>
                ← Vissza a cikkekhez
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
