import { useState, useEffect, type ChangeEvent } from 'react'
import React from 'react'
import { loadSavedProjects, type SavedProject } from '../utils/storageUtils'
import { PROJECTS } from '../data/projects'
import { calcBudget, formatFt } from '../utils/budgetUtils'
import { Modal, ModalCloseBtn } from './ui/Modal'
import type { TabKey } from './StickyHeader'

// ── Demo project data ──────────────────────────────────────────────────────

interface DemoProject {
  id: string; name: string; type: string; location: string
  status: string; statusColor: 'green' | 'sand' | 'mist'
  progress: number; nextMilestone: string; budget: string; icon: string
  isDemo: true
}

const DEMO_PROJECTS: DemoProject[] = [
  { id: 'd1', name: 'Napliget Ház', type: 'Családi ház építés', location: 'Budapest környéke',
    status: 'Tervezés alatt', statusColor: 'mist', progress: 18,
    nextMilestone: 'Alapozás előkészítése', budget: '65–95 millió Ft', icon: '🏠', isDemo: true },
  { id: 'd2', name: 'Belvárosi lakásfelújítás', type: 'Lakásfelújítás', location: 'Budapest V. kerület',
    status: 'Kivitelezés előtt', statusColor: 'sand', progress: 32,
    nextMilestone: 'Bontás és sittkezelés', budget: '18–35 millió Ft', icon: '🏢', isDemo: true },
  { id: 'd3', name: 'Balatoni fürdőszoba', type: 'Fürdőszoba felújítás', location: 'Alsóörs',
    status: 'Anyagválasztás', statusColor: 'green', progress: 45,
    nextMilestone: 'Burkolat kiválasztása', budget: '2,5–5 millió Ft', icon: '🚿', isDemo: true },
]

// ── Unified card type ──────────────────────────────────────────────────────

interface CardData {
  id: string; name: string; type: string; location?: string
  status: string; statusColor: 'green' | 'sand' | 'mist'
  progress: number; nextMilestone?: string; budget?: string; icon: string
  isDemo: boolean; savedProject?: SavedProject
}

function savedToCard(sp: SavedProject): CardData {
  const label = PROJECTS[sp.form.projectKey]?.label ?? sp.form.projectKey
  const budget = calcBudget(sp.form.sizeM2, sp.form.qualityKey, sp.form.executionModeKey, sp.form.complexityKey, sp.form.projectKey)
  const icons: Record<string, string> = { hazepites: '🏠', felujitas: '🏢', bovites: '🏗️' }
  return {
    id: sp.id, name: sp.name, type: label, status: 'Mentett', statusColor: 'mist',
    progress: 0, budget: `${formatFt(budget.minTotal)} – ${formatFt(budget.maxTotal)}`,
    icon: icons[sp.form.projectKey] ?? '📁', isDemo: false, savedProject: sp,
  }
}

// ── Styles ─────────────────────────────────────────────────────────────────

const STATUS_STYLES = {
  green: { bg: '#E8F5EC', border: '#A8C5B0', color: '#2D5C3A' },
  sand:  { bg: '#F5F0E8', border: '#D4C4A8', color: '#5C4A2A' },
  mist:  { bg: '#E8F0F7', border: '#A8BDD4', color: '#2A4A6B' },
}

const ROLE_CARDS = [
  { icon: '🏠', role: 'Tulajdonos',       desc: 'Teljes projektáttekintés, költség, dokumentumok, döntési pontok.' },
  { icon: '📋', role: 'Projektmenedzser', desc: 'Fázisok kezelése, szakemberek koordinálása, státuszfrissítés.' },
  { icon: '🔧', role: 'Generálkivitelező',desc: 'Teljes kivitelezési ütemterv, határidők, szakági egyeztetés.' },
  { icon: '👷', role: 'Szakember',         desc: 'Csak a hozzá tartozó fázisok, előfeltételek és következő lépések.' },
]

// ── Props ──────────────────────────────────────────────────────────────────

interface Props {
  onNavigate?: (tab: TabKey) => void
}

// ── Main section ───────────────────────────────────────────────────────────

export default function ProjektekSection({ onNavigate }: Props) {
  const [savedProjects, setSaved] = useState<SavedProject[]>([])
  const [selectedCard,  setSelected] = useState<CardData | null>(null)
  const [createOpen,    setCreate]   = useState(false)

  useEffect(() => {
    const load = () => setSaved(loadSavedProjects())
    load()
    window.addEventListener('focus', load)
    return () => window.removeEventListener('focus', load)
  }, [])

  function refreshSaved() { setSaved(loadSavedProjects()) }

  const savedCards: CardData[] = savedProjects.map(savedToCard)
  const demoCards:  CardData[] = DEMO_PROJECTS.map(d => ({ ...d, savedProject: undefined }))
  const hasSaved = savedCards.length > 0

  return (
    <div className="animate-fade-up">
      <div className="page-top pb-8">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase rounded-full px-3.5 py-1.5 mb-4 border"
              style={{ color: 'var(--sage)', background: 'var(--sage-light)', borderColor: 'var(--sage-border)' }}>
              📂 Projektjeim
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-2" style={{ color: 'var(--tx-primary)' }}>
              Projektjeim
            </h2>
            <p className="text-sm leading-relaxed max-w-xl" style={{ color: 'var(--tx-muted)' }}>
              Mentett építkezések, felújítások és később szakember-hozzáférések egy helyen.
            </p>
          </div>
          <button type="button" onClick={() => setCreate(true)}
            className="flex items-center gap-2 text-sm font-semibold rounded-2xl px-5 py-2.5 text-white transition-all hover:scale-[1.02] shrink-0"
            style={{ background: 'linear-gradient(135deg,#3D6B4A,#4A7C59)', boxShadow: '0 3px 10px rgba(74,124,89,.22)' }}>
            + Új projekt
          </button>
        </div>
      </div>

      {hasSaved ? (
        <>
          <p className="section-label mb-4">Saját mentett projektek ({savedCards.length})</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {savedCards.map(card => (
              <ProjectCard key={card.id} card={card} onOpen={() => setSelected(card)} />
            ))}
          </div>
          <details className="mb-8 group">
            <summary className="cursor-pointer text-xs font-semibold select-none flex items-center gap-2 mb-3"
              style={{ color: 'var(--tx-muted)', listStyle: 'none' }}>
              <span className="transition-transform group-open:rotate-90">▶</span>
              Demó projektek (nem valós adatok)
            </summary>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {demoCards.map(card => (
                <ProjectCard key={card.id} card={card} onOpen={() => setSelected(card)} />
              ))}
            </div>
          </details>
        </>
      ) : (
        <>
          <div className="rounded-2xl px-5 py-4 mb-6 border flex items-start gap-3"
            style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
            <span className="text-lg mt-px">💡</span>
            <div>
              <p className="text-sm font-medium mb-0.5" style={{ color: 'var(--tx-primary)' }}>Még nincs mentett projekted</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                Töltsd ki a kalkulátort és kattints a „Mentés" gombra — a projekt azonnal megjelenik itt. Alul demó projekteket látsz példaként.
              </p>
            </div>
          </div>
          <p className="section-label mb-4">Demó projektek (nem valós adatok)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {demoCards.map(card => (
              <ProjectCard key={card.id} card={card} onOpen={() => setSelected(card)} />
            ))}
          </div>
        </>
      )}

      {selectedCard && (
        <ProjectDetailModal
          card={selectedCard}
          onClose={() => setSelected(null)}
          onNavigate={onNavigate}
          onSaved={refreshSaved}
        />
      )}
      {createOpen && <CreateProjectModal onClose={() => setCreate(false)} />}
    </div>
  )
}

// ── Project card ──────────────────────────────────────────────────────────

function ProjectCard({ card, onOpen }: { key?: string; card: CardData; onOpen: () => void }) {
  const sty = STATUS_STYLES[card.statusColor]
  return (
    <div className="card p-5 flex flex-col gap-3.5 transition-all hover:scale-[1.01]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-9 h-9 rounded-2xl flex items-center justify-center text-xl shrink-0"
            style={{ background: 'var(--surface-subtle)' }}>{card.icon}</div>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-snug truncate" style={{ color: 'var(--tx-primary)' }}>{card.name}</p>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--tx-muted)' }}>{card.type}</p>
          </div>
        </div>
        <span className="shrink-0 text-[10px] font-semibold rounded-full px-2.5 py-1 border whitespace-nowrap"
          style={{ background: sty.bg, borderColor: sty.border, color: sty.color }}>{card.status}</span>
      </div>
      {card.location && (
        <p className="text-[11px] flex items-center gap-1.5 -mt-1" style={{ color: 'var(--tx-muted)' }}>
          <span>📍</span>{card.location}
        </p>
      )}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--tx-muted)' }}>Haladás</p>
          <p className="text-[10px] font-bold" style={{ color: 'var(--sage)' }}>{card.progress}%</p>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--surface-subtle)' }}>
          <div className="h-full rounded-full" style={{ width: `${card.progress}%`, background: 'var(--sage)' }} />
        </div>
      </div>
      {card.nextMilestone && (
        <div className="rounded-xl px-3 py-2.5 border-l-2 text-[11px]"
          style={{ background: 'var(--surface-subtle)', borderLeftColor: 'var(--sage)', color: 'var(--tx-secondary)' }}>
          <span className="font-medium">Következő:</span> {card.nextMilestone}
        </div>
      )}
      <div className="flex items-center justify-between mt-auto pt-3 border-t gap-2"
        style={{ borderColor: 'var(--border)' }}>
        <div className="min-w-0">
          <p className="text-[10px]" style={{ color: 'var(--tx-muted)' }}>Becsült keret</p>
          <p className="text-xs font-semibold truncate" style={{ color: 'var(--tx-primary)' }}>{card.budget ?? '–'}</p>
        </div>
        <button type="button" onClick={onOpen}
          className="text-xs font-semibold rounded-xl px-3.5 py-2 border transition-all hover:scale-[1.02] shrink-0"
          style={{ borderColor: 'var(--sage-border)', background: 'var(--sage-light)', color: 'var(--sage)' }}>
          Megnyitás →
        </button>
      </div>
    </div>
  )
}

// ── Project detail modal ──────────────────────────────────────────────────

interface DetailProps {
  card: CardData
  onClose: () => void
  onNavigate?: (tab: TabKey) => void
  onSaved?: () => void
}

function ProjectDetailModal({ card, onClose, onNavigate, onSaved }: DetailProps) {
  const [editOpen,   setEditOpen]  = useState(false)
  const [docOpen,    setDocOpen]   = useState(false)
  const sty = STATUS_STYLES[card.statusColor]

  function nav(tab: TabKey) { onClose(); onNavigate?.(tab) }

  type BlockAction = { tab?: TabKey; doc?: true }
  const BLOCKS: { icon: string; title: string; text: string; action: BlockAction }[] = [
    { icon: '⏱️', title: 'Ütemterv',     text: 'A projekt fő fázisai és várható határidői.', action: { tab: 'calculator' } },
    { icon: '💰', title: 'Költségkeret', text: 'Becsült költségsáv és kockázati jelzések.',   action: { tab: 'calculator' } },
    { icon: '👷', title: 'Szakemberek',  text: 'A projekthez rendelt szakemberek.',            action: { tab: 'szakemberek' } },
    { icon: '🧱', title: 'Anyaglista',   text: 'Anyagkategóriák és beszerzési időzítés.',     action: { tab: 'anyagok' } },
    { icon: '📄', title: 'Dokumentumok', text: 'PDF exportok, checklisták, tervek.',          action: { doc: true } },
  ]

  return (
    <Modal isOpen={true} onClose={onClose} size="lg">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-6 py-5 border-b shrink-0" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-2xl">{card.icon}</span>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: 'var(--tx-primary)' }}>{card.name}</p>
              <p className="text-[11px]" style={{ color: 'var(--tx-muted)' }}>
                {card.type}{card.location ? ` · ${card.location}` : ''}
              </p>
            </div>
            <span className="text-[10px] font-semibold rounded-full px-2.5 py-1 border shrink-0"
              style={{ background: sty.bg, borderColor: sty.border, color: sty.color }}>{card.status}</span>
          </div>
          <ModalCloseBtn onClose={onClose} />
        </div>

        {/* Top actions */}
        <div className="px-6 pt-4 pb-2 flex flex-wrap gap-2 border-b shrink-0" style={{ borderColor: 'var(--border)' }}>
          <button type="button" onClick={() => { onClose(); onNavigate?.('calculator') }}
            className="flex items-center gap-1.5 text-xs font-semibold rounded-xl px-4 py-2 text-white transition-all hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg,#3D6B4A,#4A7C59)', boxShadow: '0 2px 8px rgba(74,124,89,.25)' }}>
            🔄 Folytatás a kalkulátorban
          </button>
          {!card.isDemo && (
            <button type="button" onClick={() => setEditOpen(true)}
              className="flex items-center gap-1.5 text-xs font-semibold rounded-xl px-4 py-2 border transition-all hover:scale-[1.02]"
              style={{ borderColor: 'var(--border)', background: 'var(--surface-subtle)', color: 'var(--tx-secondary)' }}>
              ✏️ Szerkesztés
            </button>
          )}
          <button type="button" onClick={() => { onClose(); onNavigate?.('fazis') }}
            className="flex items-center gap-1.5 text-xs font-medium rounded-xl px-4 py-2 border transition-all hover:scale-[1.02]"
            style={{ borderColor: 'var(--sage-border)', background: 'var(--sage-light)', color: 'var(--sage)' }}>
            📋 Fázisok
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 flex flex-col gap-5">
          {/* Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="section-label">Projekt haladás</p>
              <p className="text-sm font-bold" style={{ color: 'var(--sage)' }}>{card.progress}%</p>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface-subtle)' }}>
              <div className="h-full rounded-full" style={{ width: `${card.progress}%`, background: 'var(--sage)' }} />
            </div>
            {card.nextMilestone && (
              <p className="text-[11px] mt-1.5" style={{ color: 'var(--tx-muted)' }}>
                Következő mérföldkő: <span className="font-medium" style={{ color: 'var(--tx-primary)' }}>{card.nextMilestone}</span>
              </p>
            )}
          </div>

          {/* Clickable detail blocks */}
          <div>
            <p className="section-label mb-3">Projekt részletek</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BLOCKS.map(b => (
                <button key={b.title} type="button"
                  onClick={() => {
                    if (b.action.doc) setDocOpen(true)
                    else if (b.action.tab) nav(b.action.tab)
                  }}
                  className="rounded-2xl p-4 border text-left transition-all hover:scale-[1.01] hover:border-[var(--sage-border)] group"
                  style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)', cursor: 'pointer' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base">{b.icon}</span>
                    <p className="text-xs font-semibold" style={{ color: 'var(--tx-primary)' }}>{b.title}</p>
                    <span className="ml-auto text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: 'var(--sage)' }}>→</span>
                  </div>
                  <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>{b.text}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Roles */}
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--tx-primary)' }}>Hozzáférések előnézete</p>
            <p className="text-[11px] leading-relaxed mb-3" style={{ color: 'var(--tx-muted)' }}>
              Az éles verzióban minden szerepkör eltérő jogosultságokkal férhet hozzá a projekthez.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {ROLE_CARDS.map(r => (
                <div key={r.role} className="rounded-2xl p-3.5 border"
                  style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-base">{r.icon}</span>
                    <p className="text-xs font-semibold" style={{ color: 'var(--tx-primary)' }}>{r.role}</p>
                  </div>
                  <p className="text-[10px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t shrink-0 flex justify-end"
          style={{ borderColor: 'var(--border)', background: 'var(--surface-subtle)' }}>
          <button onClick={onClose}
            className="text-xs font-medium rounded-xl px-4 py-2 border"
            style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: 'var(--surface)' }}>
            Bezárás
          </button>
        </div>
      </div>

      {/* Sub-modals rendered inside the same portal slot */}
      {editOpen && card.savedProject && (
        <EditProjectModal
          savedProject={card.savedProject}
          onClose={() => setEditOpen(false)}
          onSaved={() => { setEditOpen(false); onSaved?.() }}
        />
      )}
      {docOpen && (
        <DocumentsModal onClose={() => setDocOpen(false)} />
      )}
    </Modal>
  )
}

// ── Edit project modal ────────────────────────────────────────────────────

function EditProjectModal({ savedProject, onClose, onSaved }: {
  savedProject: SavedProject; onClose: () => void; onSaved: () => void
}) {
  const [name,     setName]    = useState(savedProject.name)
  const [location, setLoc]     = useState('')
  const [saved,    setSaved]   = useState(false)

  function handleSave() {
    // Update in localStorage via saveProject (re-saves with same id logic isn't built in,
    // but we can update the name by saving and removing old)
    try {
      const all = JSON.parse(localStorage.getItem('epites_saved_projects') || '[]') as SavedProject[]
      const updated = all.map(p => p.id === savedProject.id ? { ...p, name: name.trim() || p.name } : p)
      localStorage.setItem('epites_saved_projects', JSON.stringify(updated))
    } catch {}
    setSaved(true)
    setTimeout(() => { onSaved() }, 800)
  }

  return (
    <Modal isOpen={true} onClose={onClose} size="sm">
      <div>
        <div className="flex items-center justify-between gap-3 px-6 py-5 border-b shrink-0" style={{ borderColor: 'var(--border)' }}>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>Projekt szerkesztése</p>
            <p className="text-[11px]" style={{ color: 'var(--tx-muted)' }}>Alap adatok módosítása</p>
          </div>
          <ModalCloseBtn onClose={onClose} />
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-5 flex flex-col gap-4">
          {saved ? (
            <div className="flex flex-col items-center py-6 gap-3 text-center">
              <span className="text-3xl">✅</span>
              <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>Módosítások mentve</p>
            </div>
          ) : (
            <>
              <F label="Projekt neve">
                <input className="field-input" value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
              </F>
              <F label="Helyszín (opcionális)">
                <input className="field-input" value={location} placeholder="pl. Budapest, Győr…"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setLoc(e.target.value)} />
              </F>
              <F label="Projekttípus">
                <p className="text-xs py-2.5 px-3 rounded-xl border"
                  style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)', color: 'var(--tx-muted)' }}>
                  {PROJECTS[savedProject.form.projectKey]?.label ?? savedProject.form.projectKey}
                  &nbsp;— <span className="italic">a típus a kalkulátorban módosítható</span>
                </p>
              </F>
              <div className="rounded-xl p-3 border" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
                <p className="text-[11px]" style={{ color: 'var(--tx-muted)' }}>
                  ℹ️ Az éles verzióban minden mezőt és fázist külön szerkeszteni lehet.
                </p>
              </div>
            </>
          )}
        </div>
        {!saved && (
          <div className="px-6 py-4 border-t shrink-0 flex items-center justify-between gap-3"
            style={{ borderColor: 'var(--border)', background: 'var(--surface-subtle)' }}>
            <button onClick={onClose}
              className="text-xs font-medium rounded-xl px-4 py-2 border"
              style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: 'var(--surface)' }}>
              Mégse
            </button>
            <button onClick={handleSave}
              className="text-sm font-semibold rounded-xl px-5 py-2.5 text-white transition-all hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg,#3D6B4A,#4A7C59)', boxShadow: '0 3px 10px rgba(74,124,89,.22)' }}>
              Mentés
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}

// ── Documents coming-soon modal ────────────────────────────────────────────

function DocumentsModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal isOpen={true} onClose={onClose} size="sm">
      <div>
        <div className="flex items-center justify-between gap-3 px-6 py-5 border-b shrink-0" style={{ borderColor: 'var(--border)' }}>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>Dokumentumok</p>
            <p className="text-[11px]" style={{ color: 'var(--tx-muted)' }}>Hamarosan elérhető</p>
          </div>
          <ModalCloseBtn onClose={onClose} />
        </div>
        <div className="px-6 py-8 text-center flex flex-col gap-4">
          <div className="w-16 h-16 rounded-3xl flex items-center justify-center text-3xl mx-auto"
            style={{ background: 'var(--surface-subtle)' }}>📄</div>
          <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: 'var(--tx-muted)' }}>
            Az éles verzióban itt PDF exportok, checklisták, tervek és feltöltött dokumentumok lesznek elérhetők.
          </p>
          <button onClick={onClose}
            className="self-center text-xs font-medium rounded-xl px-5 py-2.5 border"
            style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: 'var(--surface-subtle)' }}>
            Bezárás
          </button>
        </div>
      </div>
    </Modal>
  )
}

// ── Create project modal ───────────────────────────────────────────────────

function CreateProjectModal({ onClose }: { onClose: () => void }) {
  const [name, setName]           = useState('')
  const [type, setType]           = useState('')
  const [location, setLocation]   = useState('')
  const [startDate, setStartDate] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <Modal isOpen={true} onClose={onClose} size="md">
      <div>
        <div className="flex items-center justify-between gap-3 px-6 py-5 border-b shrink-0" style={{ borderColor: 'var(--border)' }}>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>Új projekt létrehozása</p>
            <p className="text-[11px]" style={{ color: 'var(--tx-muted)' }}>Frontend-only demó</p>
          </div>
          <ModalCloseBtn onClose={onClose} />
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-6 gap-4">
              <div className="w-14 h-14 rounded-3xl flex items-center justify-center text-2xl border"
                style={{ background: 'var(--sage-light)', borderColor: 'var(--sage-border)' }}>✅</div>
              <p className="text-base font-semibold" style={{ color: 'var(--tx-primary)' }}>Demo projekt létrehozva</p>
              <p className="text-sm" style={{ color: 'var(--tx-muted)' }}>Az éles verzióban ez a fiókodban mentésre kerül.</p>
              <div className="w-full rounded-2xl p-4 border text-left" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
                <p className="text-[11px]" style={{ color: 'var(--tx-muted)' }}>ℹ️ Ez frontend-only demó. Valódi mentés később backend bekötéssel működik.</p>
              </div>
              <button onClick={onClose} className="text-sm font-medium rounded-xl px-5 py-2.5 border"
                style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: 'var(--surface-subtle)' }}>Bezárás</button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-xs leading-relaxed" style={{ color: 'var(--tx-muted)' }}>Az éles verzióban itt menthető lesz az új projekt.</p>
              <F label="Projekt neve"><input className="field-input" value={name} placeholder="pl. Napliget Ház" onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} /></F>
              <F label="Projekt típusa">
                <div className="relative">
                  <select className="field-input pr-10 appearance-none" style={{ WebkitAppearance: 'none', fontFamily: 'inherit' }} value={type} onChange={(e: ChangeEvent<HTMLSelectElement>) => setType(e.target.value)}>
                    <option value="">Válasszon…</option>
                    <option>Lakásfelújítás</option><option>Családi ház építés</option><option>Fürdőszoba felújítás</option><option>Bővítés</option>
                  </select>
                  <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--tx-muted)' }}>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                </div>
              </F>
              <F label="Lokáció"><input className="field-input" value={location} placeholder="pl. Budapest…" onChange={(e: ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)} /></F>
              <F label="Kezdési dátum"><input type="date" className="field-input" value={startDate} onChange={(e: ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)} /></F>
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
              Demo projekt létrehozása
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}

// ── Tiny helper ────────────────────────────────────────────────────────────

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--tx-muted)' }}>{label}</label>
      {children}
    </div>
  )
}
