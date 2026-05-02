import { useState, useEffect, type ChangeEvent } from 'react'
import { getMaterialCards, TIMING_STAGES, PARTNER_CARDS, type MaterialCard } from '../data/materialsData'
import { PROJECTS } from '../data/projects'
import type { ProjectKey } from '../types'
import { Modal, ModalCloseBtn } from './ui/Modal'

// ── Props ──────────────────────────────────────────────────────────────────

interface Props {
  projectKey: ProjectKey
}

// ── Price sensitivity badge colors ────────────────────────────────────────

const PRICE_COLORS: Record<string, { bg: string; border: string; color: string }> = {
  'Alacsony':       { bg: '#E8F5EC', border: '#A8C5B0', color: '#2D5C3A' },
  'Közepes':        { bg: '#E8F0F7', border: '#A8BDD4', color: '#2A4A6B' },
  'Közepes–magas':  { bg: '#F5F0E8', border: '#D4C4A8', color: '#5C4A2A' },
  'Magas':          { bg: '#FEF2F2', border: '#FCA5A5', color: '#991B1B' },
}

// ── Main section ───────────────────────────────────────────────────────────

export default function AnyagokSection({ projectKey }: Props) {
  const [activeCardId, setActiveCardId] = useState<string | null>(null)
  const [activeSource, setActiveSource] = useState<string | null>(null)
  const cards = getMaterialCards(projectKey)
  const projectLabel = PROJECTS[projectKey]?.label ?? projectKey

  // Reset active card when project changes
  useEffect(() => { setActiveCardId(null) }, [projectKey])

  return (
    <div className="animate-fade-up">

      {/* ── Hero ── */}
      <div className="page-top pb-8 text-center max-w-2xl mx-auto px-4">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase rounded-full px-3.5 py-1.5 mb-5 border"
          style={{ color: '#4A7C59', background: '#E8F5EC', borderColor: '#A8C5B0' }}>
          🧱 Anyagok és beszerzés
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-medium mb-3 leading-snug" style={{ color: 'var(--tx-primary)' }}>
          Anyagok és beszerzés
        </h2>
        <p className="text-sm leading-relaxed max-w-lg mx-auto mb-2" style={{ color: 'var(--tx-muted)' }}>
          Fázisokhoz kapcsolódó anyaglista, beszerzési időzítés és későbbi partnerajánlatok egy helyen.
        </p>
        <p className="text-xs leading-relaxed max-w-lg mx-auto mb-4" style={{ color: 'var(--tx-muted)' }}>
          A Buildmap később nemcsak azt mutatja meg, mikor mi következik, hanem azt is, milyen
          anyagokra lehet szükség, mikor érdemes beszerezni őket, és hol lehet ajánlatot kérni.
        </p>
        <div className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium border"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--tx-secondary)' }}>
          📂 Projekttípus: <span className="font-semibold ml-1" style={{ color: '#4A7C59' }}>{projectLabel}</span>
        </div>
      </div>

      {/* ── Material category cards ── */}
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--tx-muted)' }}>
          Anyagkategóriák — {projectLabel}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map(card => (
            <MaterialCardItem
              key={card.id}
              card={card}
              onCTA={() => setActiveCardId(card.id)}
            />
          ))}
        </div>
      </div>

      {/* ── Timing strip ── */}
      <div className="card p-6 mb-8">
        <p className="text-sm font-semibold mb-5" style={{ color: 'var(--tx-primary)' }}>
          Mikor érdemes beszerezni?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TIMING_STAGES.map((s, i) => (
            <div key={s.title} className="relative">
              {/* Connector arrow on desktop */}
              {i < TIMING_STAGES.length - 1 && (
                <div className="hidden lg:flex absolute -right-2 top-5 z-10 items-center justify-center w-4">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M0 4h9M6 1l3 3-3 3" stroke="var(--border-strong)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
              <div className="rounded-2xl p-4 border h-full" style={{ background: s.bg, borderColor: `${s.color}30` }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{s.icon}</span>
                  <p className="text-xs font-semibold leading-snug" style={{ color: s.color }}>{s.title}</p>
                </div>
                <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-secondary)' }}>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Beszerzési logika block ── */}
      <div className="card p-6 mb-6">
        <p className="text-sm font-semibold mb-1" style={{ color: 'var(--tx-primary)' }}>Beszerzési logika</p>
        <p className="text-xs leading-relaxed mb-5" style={{ color: 'var(--tx-muted)' }}>
          Az éles verzióban az anyagok nem terméklisták, hanem projekttípus, fázis és lokáció alapján
          releváns ajánlások — a vásárlási szándék pedig partneri leaddé alakítható.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: '📋', title: 'Anyagigény fázisonként', text: 'Minden fázishoz releváns anyagkategóriák és időzítési útmutató.' },
            { icon: '⏰', title: 'Mikor kell megrendelni?', text: 'Rendelési lead time-ok fázis alapján — mit kell 2–4 héttel előre beszerezni.' },
            { icon: '📍', title: 'Lokáció szerinti források', text: 'Lokáció alapján ajánlott tüzépek, boltok, gyártói képviseletek.' },
            { icon: '🤝', title: 'Partneri ajánlatok', text: 'Célzott partnerkapcsolat: tüzép, anyaggyártó, szakkereskedés.' },
          ].map(c => (
            <div key={c.title} className="rounded-2xl p-4 border" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">{c.icon}</span>
                <p className="text-xs font-semibold" style={{ color: 'var(--tx-primary)' }}>{c.title}</p>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>{c.text}</p>
            </div>
          ))}
        </div>
        <p className="text-[11px] mt-4" style={{ color: 'var(--tx-muted)' }}>
          ℹ️ Jelenleg demó tartalom. Valódi partnerajánlatok és lokációs forráskapcsolás a platform élesítésekor lesz elérhető.
        </p>
      </div>

      {/* ── Recommended sources block ── */}
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base shrink-0"
            style={{ background: 'var(--sage-light)' }}>🔍</div>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>
              Ajánlott beszerzési források
            </p>
            <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>
              Demo előnézet — éles verzióban lokáció és projektfázis alapján
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {SOURCE_TYPES.map(src => (
            <button key={src.label} type="button"
              onClick={() => setActiveSource(src.label)}
              className="flex items-center gap-2 text-xs font-semibold rounded-xl px-4 py-2.5 border transition-all hover:scale-[1.02]"
              style={{ borderColor: 'var(--border)', background: 'var(--surface-subtle)', color: 'var(--tx-secondary)' }}>
              <span>{src.icon}</span>{src.label}
            </button>
          ))}
        </div>
        <p className="text-[11px] mt-3" style={{ color: 'var(--tx-muted)' }}>
          ℹ️ A linkek jelenleg demó előnézetek. Az éles verzióban valódi forrásokhoz kapcsolódnak.
        </p>
      </div>

      {/* ── Partner logic block ── */}
      <div className="card p-7 mb-6">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-7 h-7 rounded-xl flex items-center justify-center text-sm shrink-0"
            style={{ background: 'linear-gradient(135deg,#3D6B4A,#4A7C59)', color: '#fff' }}>
            <span className="text-[11px] font-bold">→</span>
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>Későbbi partnerlogika</p>
            <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>Platform roadmap</p>
          </div>
        </div>
        <p className="text-xs leading-relaxed mb-5" style={{ color: 'var(--tx-secondary)' }}>
          A Buildmap a projektadatok alapján később releváns tüzépeket, márkákat, boltokat,
          akciókat és anyagbeszerzési partnereket ajánlhat. Ez a kalkulátorból induló
          projektadatot később beszerzési leaddé és partneri bevétellé alakíthatja.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {PARTNER_CARDS.map(c => (
            <div key={c.title} className="rounded-2xl p-4 border" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
              <div className="text-xl mb-2">{c.icon}</div>
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--tx-primary)' }}>{c.title}</p>
              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>{c.text}</p>
            </div>
          ))}
        </div>
        <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
          ℹ️ Az anyaglista jelenleg tájékoztató jellegű demó. Nem minősül tételes anyagkiírásnak
          vagy kereskedői ajánlatnak.
        </p>
      </div>

      {/* Modal */}
      {activeCardId && (
        <ProcurementModal
          card={cards.find(c => c.id === activeCardId)!}
          projectLabel={projectLabel}
          onClose={() => setActiveCardId(null)}
        />
      )}
      {activeSource && (
        <SourceModal
          sourceLabel={activeSource}
          projectLabel={projectLabel}
          category={cards[0]?.category ?? ''}
          onClose={() => setActiveSource(null)}
        />
      )}
    </div>
  )
}

// ── Material card ──────────────────────────────────────────────────────────

function MaterialCardItem({ card, onCTA }: { key?: string; card: MaterialCard; onCTA: () => void }) {
  const priceCfg = PRICE_COLORS[card.priceSensitivity] ?? PRICE_COLORS['Közepes']

  return (
    <div className="card p-5 flex flex-col gap-3 transition-all hover:scale-[1.005]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0"
            style={{ background: 'var(--surface-subtle)' }}>
            {card.icon}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--tx-primary)' }}>
              {card.category}
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: '#4A7C59' }}>
              Fázis: {card.phase}
            </p>
          </div>
        </div>
        <span className="shrink-0 text-[10px] font-semibold rounded-full px-2.5 py-1 border whitespace-nowrap"
          style={{ background: priceCfg.bg, borderColor: priceCfg.border, color: priceCfg.color }}>
          {card.priceSensitivity}
        </span>
      </div>

      <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
        {card.description}
      </p>

      <div className="rounded-xl px-3 py-2.5 border-l-2 text-[11px] leading-relaxed"
        style={{ background: 'var(--surface-subtle)', borderLeftColor: '#4A7C59', color: 'var(--tx-secondary)' }}>
        ⏱️ <span className="font-medium">Időzítés:</span> {card.timing}
      </div>

      <div className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
        💡 {card.tip}
      </div>

      <button
        type="button"
        onClick={onCTA}
        className="mt-auto self-start text-[11px] font-semibold rounded-xl px-4 py-2 border transition-all hover:scale-[1.02] active:scale-[.98]"
        style={{ borderColor: '#A8C5B0', background: '#E8F5EC', color: '#2D5C3A' }}
      >
        Beszerzési ajánlat előnézet
      </button>
    </div>
  )
}

// ── Procurement modal ──────────────────────────────────────────────────────

function ProcurementModal({
  card, projectLabel, onClose,
}: {
  card: MaterialCard
  projectLabel: string
  onClose: () => void
}) {
  const [lokacio, setLokacio] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <Modal isOpen={true} onClose={onClose} size="md">
      <div
        className="w-full max-w-md flex flex-col rounded-3xl overflow-hidden"
        style={{ background: 'var(--surface)', boxShadow: '0 24px 64px rgba(0,0,0,.25)', maxHeight: '90dvh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b shrink-0" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-lg"
              style={{ background: '#E8F5EC' }}>{card.icon}</div>
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>
                Beszerzési ajánlat előnézet
              </p>
              <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>{card.category}</p>
            </div>
          </div>
          <ModalCloseBtn onClose={onClose} />
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-6 gap-4">
              <div className="w-14 h-14 rounded-3xl flex items-center justify-center text-2xl border"
                style={{ background: '#E8F5EC', borderColor: '#A8C5B0' }}>✅</div>
              <div>
                <p className="text-base font-semibold mb-1.5" style={{ color: 'var(--tx-primary)' }}>Köszönjük!</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                  Az anyagbeszerzési ajánlások élesítésekor értesítünk.
                </p>
              </div>
              <div className="w-full rounded-2xl p-4 border text-left" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
                <p className="text-[11px]" style={{ color: 'var(--tx-muted)' }}>
                  ℹ️ Ez demó előnézet. A valódi ajánlatok és tüzép-kapcsolatok a platform élesítésekor lesznek elérhetők.
                </p>
              </div>
              <button onClick={onClose}
                className="text-sm font-medium rounded-xl px-5 py-2.5 border transition-all"
                style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: 'var(--surface-subtle)' }}>
                Bezárás
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-xs leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                Az éles verzióban itt a projektedhez és lokációdhoz illeszkedő tüzépek,
                boltok, márkák és ajánlatok jelenhetnek meg.
              </p>

              {/* Visual preview fields */}
              <div className="rounded-2xl p-4 border" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--tx-muted)' }}>
                  Ajánlat paraméterei
                </p>
                <div className="flex flex-col gap-2">
                  {[
                    { label: 'Anyagkategória', value: card.category },
                    { label: 'Projekt típusa', value: projectLabel },
                    { label: 'Javasolt fázis', value: card.phase },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between text-[11px]">
                      <span style={{ color: 'var(--tx-muted)' }}>{row.label}</span>
                      <span className="font-medium" style={{ color: 'var(--tx-primary)' }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--tx-muted)' }}>
                  Lokáció
                </label>
                <input
                  className="field-input"
                  value={lokacio}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setLokacio(e.target.value)}
                  placeholder="pl. Budapest, Győr, Pécs…"
                />
              </div>
            </div>
          )}
        </div>

        {!submitted && (
          <div className="px-6 py-4 border-t shrink-0 flex items-center justify-between gap-3"
            style={{ borderColor: 'var(--border)', background: 'var(--surface-subtle)' }}>
            <button onClick={onClose}
              className="text-xs font-medium rounded-xl px-4 py-2 border"
              style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: 'var(--surface)' }}>
              Mégse
            </button>
            <button
              onClick={() => setSubmitted(true)}
              className="text-sm font-semibold rounded-xl px-5 py-2.5 text-white transition-all hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg,#3D6B4A,#4A7C59)', boxShadow: '0 3px 10px rgba(74,124,89,.25)' }}
            >
              Értesítést kérek
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}

// ── Source types data ──────────────────────────────────────────────────────

const SOURCE_TYPES = [
  { icon: '🏗️', label: 'Tüzépek keresése' },
  { icon: '🏪', label: 'Barkácsáruházak' },
  { icon: '🏭', label: 'Gyártói oldalak' },
  { icon: '💹', label: 'Árak összehasonlítása' },
  { icon: '🔧', label: 'Szakkereskedések' },
]

// ── Source preview modal ───────────────────────────────────────────────────

function SourceModal({
  sourceLabel, projectLabel, category, onClose,
}: {
  sourceLabel: string; projectLabel: string; category: string; onClose: () => void
}) {
  const [lokacio, setLokacio] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <Modal isOpen={true} onClose={onClose} size="md">
      <div
        className="w-full max-w-md flex flex-col rounded-3xl overflow-hidden"
        style={{ background: 'var(--surface)', boxShadow: '0 24px 64px rgba(0,0,0,.22)', maxHeight: '90dvh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b shrink-0" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-lg"
              style={{ background: 'var(--sage-light)' }}>🔍</div>
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>Beszerzési forrás előnézet</p>
              <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>{sourceLabel}</p>
            </div>
          </div>
          <ModalCloseBtn onClose={onClose} />
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-6 gap-4">
              <div className="w-14 h-14 rounded-3xl flex items-center justify-center text-2xl border"
                style={{ background: 'var(--sage-light)', borderColor: 'var(--sage-border)' }}>✅</div>
              <div>
                <p className="text-base font-semibold mb-1.5" style={{ color: 'var(--tx-primary)' }}>Köszönjük!</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                  Az anyagbeszerzési ajánlások élesítésekor értesítünk.
                </p>
              </div>
              <button onClick={onClose}
                className="text-sm font-medium rounded-xl px-5 py-2.5 border transition-all"
                style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: 'var(--surface-subtle)' }}>
                Bezárás
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-xs leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                Az éles verzióban itt lokáció, projektfázis és anyagkategória alapján releváns
                tüzépek, boltok, gyártók és ajánlatok jelenhetnek meg.
              </p>

              {/* Demo parameter display */}
              <div className="rounded-2xl p-4 border" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--tx-muted)' }}>
                  Ajánlat paraméterei
                </p>
                <div className="flex flex-col gap-2">
                  {[
                    { label: 'Projekt típusa',     value: projectLabel },
                    { label: 'Anyagkategória',     value: category },
                    { label: 'Forrástípus',        value: sourceLabel },
                    { label: 'Beszerzés időzítése',value: 'Fázis előtt 2–4 héttel' },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between text-[11px]">
                      <span style={{ color: 'var(--tx-muted)' }}>{row.label}</span>
                      <span className="font-medium" style={{ color: 'var(--tx-primary)' }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-widest mb-1.5"
                  style={{ color: 'var(--tx-muted)' }}>Lokáció</label>
                <input className="field-input" value={lokacio} placeholder="pl. Budapest, Győr, Pécs…"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setLokacio(e.target.value)} />
              </div>
            </div>
          )}
        </div>

        {!submitted && (
          <div className="px-6 py-4 border-t shrink-0 flex items-center justify-between gap-3"
            style={{ borderColor: 'var(--border)', background: 'var(--surface-subtle)' }}>
            <button onClick={onClose}
              className="text-xs font-medium rounded-xl px-4 py-2 border"
              style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: 'var(--surface)' }}>
              Mégse
            </button>
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
