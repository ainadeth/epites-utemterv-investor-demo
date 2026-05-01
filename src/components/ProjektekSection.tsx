import { useState, useEffect, type ChangeEvent } from 'react'
import React from 'react'

// ── Demo project data ──────────────────────────────────────────────────────

interface DemoProject {
  id: string
  name: string
  type: string
  location: string
  status: string
  statusColor: 'green' | 'sand' | 'mist'
  progress: number
  nextMilestone: string
  budget: string
  icon: string
}

const DEMO_PROJECTS: DemoProject[] = [
  {
    id: 'p1',
    name: 'Napliget Ház',
    type: 'Családi ház építés',
    location: 'Budapest környéke',
    status: 'Tervezés alatt',
    statusColor: 'mist',
    progress: 18,
    nextMilestone: 'Alapozás előkészítése',
    budget: '65–95 millió Ft',
    icon: '🏠',
  },
  {
    id: 'p2',
    name: 'Belvárosi lakásfelújítás',
    type: 'Lakásfelújítás',
    location: 'Budapest V. kerület',
    status: 'Kivitelezés előtt',
    statusColor: 'sand',
    progress: 32,
    nextMilestone: 'Bontás és sittkezelés',
    budget: '18–35 millió Ft',
    icon: '🏢',
  },
  {
    id: 'p3',
    name: 'Balatoni fürdőszoba',
    type: 'Fürdőszoba felújítás',
    location: 'Alsóörs',
    status: 'Anyagválasztás',
    statusColor: 'green',
    progress: 45,
    nextMilestone: 'Burkolat kiválasztása',
    budget: '2,5–5 millió Ft',
    icon: '🚿',
  },
]

const STATUS_STYLES = {
  green: { bg: '#E8F5EC', border: '#A8C5B0', color: '#2D5C3A' },
  sand:  { bg: '#F5F0E8', border: '#D4C4A8', color: '#5C4A2A' },
  mist:  { bg: '#E8F0F7', border: '#A8BDD4', color: '#2A4A6B' },
}

// ── Role access cards ──────────────────────────────────────────────────────

const ROLE_CARDS = [
  { icon: '🏠', role: 'Tulajdonos',          desc: 'Teljes projektáttekintés, költség, dokumentumok, döntési pontok.' },
  { icon: '📋', role: 'Projektmenedzser',     desc: 'Fázisok kezelése, szakemberek koordinálása, státuszfrissítés.' },
  { icon: '🔧', role: 'Generálkivitelező',    desc: 'Teljes kivitelezési ütemterv, határidők, szakági egyeztetés.' },
  { icon: '👷', role: 'Szakember',            desc: 'Csak a hozzá tartozó fázisok, előfeltételek és következő lépések.' },
]

// ── Preview blocks ─────────────────────────────────────────────────────────

const DETAIL_BLOCKS = [
  { icon: '⏱️', title: 'Ütemterv',        text: 'A projekt fő fázisai és várható határidői egy helyen.' },
  { icon: '💰', title: 'Költségkeret',    text: 'Becsült költségsáv, rendelkezésre álló keret és kockázati jelzések.' },
  { icon: '👷', title: 'Szakemberek',     text: 'Később itt látszanak a projekthez rendelt szakemberek és jogosultságaik.' },
  { icon: '🧱', title: 'Anyaglista',      text: 'Fázisokhoz kapcsolódó anyagkategóriák, beszerzési időzítés és ajánlatok.' },
  { icon: '📄', title: 'Dokumentumok',    text: 'PDF exportok, checklisták, tervek és későbbi feltöltött fájlok.' },
]

// ── Main section ───────────────────────────────────────────────────────────

export default function ProjektekSection() {
  const [selectedProject, setSelectedProject] = useState<DemoProject | null>(null)
  const [createOpen,      setCreateOpen]      = useState(false)

  return (
    <div className="animate-fade-up">

      {/* Hero */}
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
              Mentett építkezések, felújítások és későbbi szakember-hozzáférések egy helyen.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="flex items-center gap-2 text-sm font-semibold rounded-2xl px-5 py-2.5 text-white transition-all hover:scale-[1.02] shrink-0"
            style={{ background: 'linear-gradient(135deg,#3D6B4A,#4A7C59)', boxShadow: '0 3px 10px rgba(74,124,89,.22)' }}
          >
            + Új projekt
          </button>
        </div>
      </div>

      {/* Demo notice */}
      <div className="rounded-2xl px-4 py-3 mb-6 border flex gap-2.5 items-start"
        style={{ background: '#F5F0E8', borderColor: '#D4C4A8' }}>
        <span className="shrink-0 text-sm mt-px">ℹ️</span>
        <p className="text-[11px] leading-relaxed" style={{ color: '#5C4A2A' }}>
          Ez egy demó projekt-dashboard. A megjelenített projektek fiktív adatok — az éles
          verzióban a saját mentett projektjeid jelennének meg itt.
        </p>
      </div>

      {/* Project cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {DEMO_PROJECTS.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Modals */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
      {createOpen && (
        <CreateProjectModal onClose={() => setCreateOpen(false)} />
      )}
    </div>
  )
}

// ── Project card ──────────────────────────────────────────────────────────

function ProjectCard({ project, onOpen }: { key?: string; project: DemoProject; onOpen: () => void }) {
  const sty = STATUS_STYLES[project.statusColor]
  return (
    <div className="card p-5 flex flex-col gap-4 transition-all hover:scale-[1.01]">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-9 h-9 rounded-2xl flex items-center justify-center text-xl shrink-0"
            style={{ background: 'var(--surface-subtle)' }}>
            {project.icon}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-snug truncate" style={{ color: 'var(--tx-primary)' }}>
              {project.name}
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--tx-muted)' }}>
              {project.type}
            </p>
          </div>
        </div>
        <span className="shrink-0 text-[10px] font-semibold rounded-full px-2.5 py-1 border whitespace-nowrap"
          style={{ background: sty.bg, borderColor: sty.border, color: sty.color }}>
          {project.status}
        </span>
      </div>

      {/* Location */}
      <p className="text-[11px] flex items-center gap-1.5" style={{ color: 'var(--tx-muted)' }}>
        <span>📍</span>{project.location}
      </p>

      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--tx-muted)' }}>
            Haladás
          </p>
          <p className="text-[10px] font-bold" style={{ color: 'var(--sage)' }}>{project.progress}%</p>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--surface-subtle)' }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${project.progress}%`, background: 'var(--sage)' }} />
        </div>
      </div>

      {/* Next milestone */}
      <div className="rounded-xl px-3 py-2.5 border-l-2 text-[11px]"
        style={{ background: 'var(--surface-subtle)', borderLeftColor: 'var(--sage)', color: 'var(--tx-secondary)' }}>
        <span className="font-medium">Következő:</span> {project.nextMilestone}
      </div>

      {/* Budget + CTA */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t gap-2"
        style={{ borderColor: 'var(--border)' }}>
        <div>
          <p className="text-[10px]" style={{ color: 'var(--tx-muted)' }}>Becsült keret</p>
          <p className="text-xs font-semibold tabular-nums" style={{ color: 'var(--tx-primary)' }}>
            {project.budget}
          </p>
        </div>
        <button
          type="button"
          onClick={onOpen}
          className="text-xs font-semibold rounded-xl px-3.5 py-2 border transition-all hover:scale-[1.02]"
          style={{ borderColor: 'var(--sage-border)', background: 'var(--sage-light)', color: 'var(--sage)' }}
        >
          Megnyitás →
        </button>
      </div>
    </div>
  )
}

// ── Project detail modal ───────────────────────────────────────────────────

function ProjectDetailModal({ project, onClose }: { project: DemoProject; onClose: () => void }) {
  const [ctaToast, setCtaToast] = useState('')
  const sty = STATUS_STYLES[project.statusColor]

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [onClose])

  function showCta(label: string) {
    setCtaToast(label)
    setTimeout(() => setCtaToast(''), 2500)
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,.45)', backdropFilter: 'blur(5px)' }}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full sm:max-w-2xl flex flex-col rounded-t-3xl sm:rounded-3xl overflow-hidden animate-fade-up"
        style={{ background: 'var(--surface)', boxShadow: '0 24px 64px rgba(0,0,0,.22)', maxHeight: '92dvh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b shrink-0"
          style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{project.icon}</span>
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>{project.name}</p>
              <p className="text-[11px]" style={{ color: 'var(--tx-muted)' }}>{project.type} · {project.location}</p>
            </div>
            <span className="text-[10px] font-semibold rounded-full px-2.5 py-1 border"
              style={{ background: sty.bg, borderColor: sty.border, color: sty.color }}>
              {project.status}
            </span>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center border transition-all hover:scale-105"
            style={{ borderColor: 'var(--border)', color: 'var(--tx-muted)', background: 'var(--surface-subtle)' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 flex flex-col gap-5">

          {/* Progress strip */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--tx-muted)' }}>
                Projekt haladás
              </p>
              <p className="text-sm font-bold" style={{ color: 'var(--sage)' }}>{project.progress}%</p>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface-subtle)' }}>
              <div className="h-full rounded-full" style={{ width: `${project.progress}%`, background: 'var(--sage)' }} />
            </div>
            <p className="text-[11px] mt-1.5" style={{ color: 'var(--tx-muted)' }}>
              Következő mérföldkő: <span className="font-medium" style={{ color: 'var(--tx-primary)' }}>{project.nextMilestone}</span>
            </p>
          </div>

          {/* Preview blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DETAIL_BLOCKS.map(b => (
              <div key={b.title} className="rounded-2xl p-4 border"
                style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">{b.icon}</span>
                  <p className="text-xs font-semibold" style={{ color: 'var(--tx-primary)' }}>{b.title}</p>
                </div>
                <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>{b.text}</p>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Ütemterv megtekintése', icon: '⏱️' },
              { label: 'Szakember hozzáadása', icon: '👷' },
              { label: 'Anyaglista előnézet', icon: '🧱' },
            ].map(cta => (
              <button key={cta.label} type="button" onClick={() => showCta(cta.label)}
                className="flex items-center gap-1.5 text-xs font-semibold rounded-xl px-4 py-2 border transition-all hover:scale-[1.02]"
                style={{ borderColor: 'var(--sage-border)', background: 'var(--sage-light)', color: 'var(--sage)' }}>
                {cta.icon} {cta.label}
              </button>
            ))}
          </div>

          {ctaToast && (
            <p className="text-[11px] text-center animate-fade-in rounded-xl py-2 border"
              style={{ color: 'var(--sage)', background: 'var(--sage-light)', borderColor: 'var(--sage-border)' }}>
              Az éles verzióban a „{ctaToast}" funkció elérhető lesz.
            </p>
          )}

          {/* Role access section */}
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--tx-primary)' }}>
              Hozzáférések előnézete
            </p>
            <p className="text-[11px] leading-relaxed mb-3" style={{ color: 'var(--tx-muted)' }}>
              Az éles verzióban a tulajdonos, projektmenedzser, generálkivitelező vagy
              szakági szakember eltérő jogosultságokkal férhet hozzá a projekthez.
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
            className="text-xs font-medium rounded-xl px-4 py-2 border transition-all"
            style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: 'var(--surface)' }}>
            Bezárás
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Create project modal ───────────────────────────────────────────────────

function CreateProjectModal({ onClose }: { onClose: () => void }) {
  const [name,      setName]      = useState('')
  const [type,      setType]      = useState('')
  const [location,  setLocation]  = useState('')
  const [startDate, setStartDate] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,.45)', backdropFilter: 'blur(5px)' }}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full sm:max-w-md flex flex-col rounded-t-3xl sm:rounded-3xl overflow-hidden animate-fade-up"
        style={{ background: 'var(--surface)', boxShadow: '0 24px 64px rgba(0,0,0,.22)', maxHeight: '90dvh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b shrink-0"
          style={{ borderColor: 'var(--border)' }}>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>Új projekt létrehozása</p>
            <p className="text-[11px]" style={{ color: 'var(--tx-muted)' }}>Frontend-only demó</p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center border transition-all hover:scale-105"
            style={{ borderColor: 'var(--border)', color: 'var(--tx-muted)', background: 'var(--surface-subtle)' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-6 gap-4">
              <div className="w-14 h-14 rounded-3xl flex items-center justify-center text-2xl border"
                style={{ background: 'var(--sage-light)', borderColor: 'var(--sage-border)' }}>✅</div>
              <div>
                <p className="text-base font-semibold mb-1.5" style={{ color: 'var(--tx-primary)' }}>
                  Demo projekt létrehozva
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                  Az éles verzióban ez a fiókodban mentésre kerül.
                </p>
              </div>
              <div className="w-full rounded-2xl p-4 border text-left"
                style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
                <p className="text-[11px]" style={{ color: 'var(--tx-muted)' }}>
                  ℹ️ Ez frontend-only demó. Valódi mentés később backend bekötéssel működik majd.
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
                Az éles verzióban itt menthető lesz az új építkezés vagy felújítás projektként.
              </p>

              <Field label="Projekt neve">
                <input className="field-input" value={name} placeholder="pl. Napliget Ház"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
              </Field>

              <Field label="Projekt típusa">
                <div className="relative">
                  <select className="field-input pr-10 appearance-none"
                    style={{ WebkitAppearance: 'none', fontFamily: 'inherit' }}
                    value={type} onChange={(e: ChangeEvent<HTMLSelectElement>) => setType(e.target.value)}>
                    <option value="">Válasszon…</option>
                    <option>Lakásfelújítás</option>
                    <option>Családi ház építés</option>
                    <option>Fürdőszoba felújítás</option>
                    <option>Bővítés</option>
                  </select>
                  <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--tx-muted)' }}>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              </Field>

              <Field label="Lokáció">
                <input className="field-input" value={location} placeholder="pl. Budapest, Győr…"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)} />
              </Field>

              <Field label="Kezdési dátum">
                <input type="date" className="field-input" value={startDate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)} />
              </Field>
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
              Demo projekt létrehozása
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Tiny helper ────────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-widest mb-1.5"
        style={{ color: 'var(--tx-muted)' }}>{label}</label>
      {children}
    </div>
  )
}
