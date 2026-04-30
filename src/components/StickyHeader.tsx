import React, { useState, useEffect, useRef, type ReactNode } from 'react'
import { useTheme } from '../context/ThemeContext'
import type { FormState, TimelineResult } from '../types'
import {
  saveProject, loadSavedProjects, deleteSavedProject,
  formToShareUrl, formatSavedAt,
} from '../utils/storageUtils'
import { PROJECTS } from '../data/projects'
import PdfLeadModal from './PdfLeadModal'

// ── Tab definitions ────────────────────────────────────────────────────────

export type TabKey = 'calculator' | 'fazis' | 'cikkek' | 'szakemberek' | 'pro' | 'vizió'

const NAV_TABS: { key: TabKey; label: string; icon: string; short: string }[] = [
  { key: 'calculator',  label: 'Fő kalkulátor',      icon: '🏗️', short: 'Kalkulátor'  },
  { key: 'fazis',       label: 'Fázis kalkulátorok', icon: '🔧', short: 'Fázisok'      },
  { key: 'cikkek',      label: 'Cikkek',              icon: '📖', short: 'Cikkek'       },
  { key: 'szakemberek', label: 'Szakemberek',         icon: '👷', short: 'Szakemberek'  },
  { key: 'pro',         label: 'Pro terv',            icon: '✦',  short: 'Pro'          },
  { key: 'vizió',       label: 'Befektetői vízió',   icon: '🚀', short: 'Vízió'        },
]

// ── Props ──────────────────────────────────────────────────────────────────

interface Props {
  form: FormState
  result?: TimelineResult | null
  onLoadProject: (form: FormState) => void
  activeTab: TabKey
  onTabChange: (tab: TabKey) => void
}

export default function StickyHeader({ form, result, onLoadProject, activeTab, onTabChange }: Props) {
  const { isDark, toggle } = useTheme()
  const [scrolled,      setScrolled]      = useState(false)
  const [mobileMenuOpen, setMobileMenu]   = useState(false)
  const [showSave,       setShowSave]     = useState(false)
  const [showProjects,   setShowProjects] = useState(false)
  const [saveName,       setSaveName]     = useState('')
  const [projects,       setProjects]     = useState(loadSavedProjects)
  const [copied,         setCopied]       = useState(false)
  const [toast,          setToast]        = useState('')
  const [pdfModalOpen,   setPdfModal]     = useState(false)
  const saveRef    = useRef<HTMLDivElement>(null)
  const projRef    = useRef<HTMLDivElement>(null)
  const menuRef    = useRef<HTMLDivElement>(null)

  // Scroll listener
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Outside click — close dropdowns
  useEffect(() => {
    const fn = (e: globalThis.MouseEvent) => {
      if (saveRef.current   && !saveRef.current.contains(e.target as Node))   setShowSave(false)
      if (projRef.current   && !projRef.current.contains(e.target as Node))   setShowProjects(false)
      if (menuRef.current   && !menuRef.current.contains(e.target as Node))   setMobileMenu(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  function handleSave() {
    const name = saveName.trim() || PROJECTS[form.projectKey].label
    saveProject(name, form)
    setProjects(loadSavedProjects())
    setSaveName('')
    setShowSave(false)
    showToast('Projekt elmentve!')
  }

  function handleDelete(id: string, e: globalThis.MouseEvent) {
    e.stopPropagation()
    deleteSavedProject(id)
    setProjects(loadSavedProjects())
  }

  function handleShare() {
    navigator.clipboard.writeText(formToShareUrl(form)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      showToast('Link másolva a vágólapra!')
    })
  }

  function handlePDF() {
    // Open lead-capture modal (PDF export coming soon)
    setPdfModal(true)
  }

  function switchTab(tab: TabKey) {
    onTabChange(tab)
    setMobileMenu(false)
  }

  const D = isDark
  const headerBg = scrolled
    ? D ? 'bg-[#111113]/95 border-white/8 backdrop-blur-xl' : 'bg-white/95 border-[#E8E6E1] backdrop-blur-xl'
    : 'border-transparent bg-transparent'

  return (
    <>
      {/* ════════════════ HEADER ════════════════ */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b ${headerBg}`}
        style={scrolled ? { boxShadow: 'var(--shadow-header)' } : undefined}
      >
        {/* ── Single-row layout ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">

          {/* Brand — always visible */}
          <button
            type="button"
            onClick={() => switchTab('calculator')}
            className="flex items-center gap-2 group shrink-0"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-105 transition-transform duration-200">É</div>
            <span className="font-semibold text-sm hidden lg:block" style={{ color: 'var(--tx-primary)' }}>Építkezés</span>
          </button>

          {/* Divider */}
          <div className="h-5 w-px shrink-0 hidden lg:block" style={{ background: 'var(--border-strong)' }} />

          {/* Primary nav — visible on large screens */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1">
            {NAV_TABS.map(tab => (
              <button
                key={tab.key}
                type="button"
                onClick={() => switchTab(tab.key)}
                className="relative px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 whitespace-nowrap"
                style={{
                  color:      activeTab === tab.key ? '#2563EB' : 'var(--tx-secondary)',
                  background: activeTab === tab.key ? (D ? 'rgba(37,99,235,.15)' : '#EFF6FF') : 'transparent',
                }}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-blue-500" />
                )}
              </button>
            ))}
          </nav>

          {/* Spacer on medium screens so actions stay right */}
          <div className="flex-1 lg:hidden" />

          {/* ── Utility actions (icon-only below xl, icon+label at xl) ── */}
          <div className="flex items-center gap-1 shrink-0">

            {/* Save */}
            <div className="relative" ref={saveRef}>
              <UtilBtn onClick={() => { setShowSave((v: boolean) => !v); setShowProjects(false) }} title="Mentés">
                <IconSave />
                <span className="hidden xl:inline text-xs">Mentés</span>
              </UtilBtn>
              {showSave && (
                <Dropdown className="w-72 right-0 animate-slide-down">
                  <p className={`text-[11px] font-semibold uppercase tracking-widest mb-3 ${D ? 'text-zinc-500' : 'text-gray-400'}`}>Projekt mentése</p>
                  <input
                    autoFocus
                    className="field-input mb-3"
                    value={saveName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSaveName(e.target.value)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSave()}
                    placeholder={PROJECTS[form.projectKey].label}
                  />
                  <button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[.98] text-white text-sm font-semibold rounded-xl py-2.5 transition-all">Mentés</button>
                </Dropdown>
              )}
            </div>

            {/* Projects */}
            <div className="relative" ref={projRef}>
              <UtilBtn onClick={() => { setShowProjects((v: boolean) => !v); setShowSave(false) }} title="Projektek" badge={projects.length || undefined}>
                <IconFolder />
                <span className="hidden xl:inline text-xs">Projektek</span>
              </UtilBtn>
              {showProjects && (
                <Dropdown className="w-80 right-0 animate-slide-down overflow-hidden">
                  <p className={`text-[11px] font-semibold uppercase tracking-widest px-4 pt-4 pb-2 ${D ? 'text-zinc-500' : 'text-gray-400'}`}>Mentett projektek</p>
                  {projects.length === 0
                    ? <p className="px-4 pb-4 text-sm" style={{ color: 'var(--tx-muted)' }}>Még nincs mentett projekt.</p>
                    : <ul className="max-h-60 overflow-y-auto divide-y" style={{ borderColor: 'var(--border)' }}>
                        {projects.map((p: (typeof projects)[0]) => (
                          <li key={p.id}
                            className="flex items-center gap-3 px-4 py-3 cursor-pointer group hover:bg-blue-500/5 transition-colors"
                            onClick={() => { onLoadProject(p.form); setShowProjects(false) }}
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate" style={{ color: 'var(--tx-primary)' }}>{p.name}</p>
                              <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>{formatSavedAt(p.savedAt)}</p>
                            </div>
                            <button
                              onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleDelete(p.id, e.nativeEvent)}
                              className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all"
                            ><IconTrash /></button>
                          </li>
                        ))}
                      </ul>
                  }
                </Dropdown>
              )}
            </div>

            {/* Share */}
            <UtilBtn onClick={handleShare} title={copied ? 'Másolva!' : 'Megosztás'}>
              {copied ? <IconCheck /> : <IconShare />}
              <span className="hidden xl:inline text-xs">{copied ? 'Másolva' : 'Megosztás'}</span>
            </UtilBtn>

            {/* PDF */}
            <UtilBtn onClick={handlePDF} title="PDF export">
              <IconPdf />
              <span className="hidden xl:inline text-xs">PDF</span>
            </UtilBtn>

            {/* Divider */}
            <div className="h-5 w-px mx-0.5 shrink-0" style={{ background: 'var(--border-strong)' }} />

            {/* Dark mode toggle */}
            <button
              onClick={toggle}
              title={isDark ? 'Világos mód' : 'Sötét mód'}
              className="w-8 h-8 rounded-xl flex items-center justify-center border transition-all hover:scale-105 active:scale-95"
              style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: 'transparent' }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.background = 'var(--surface-subtle)')}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.background = 'transparent')}
            >
              {isDark ? <IconSun /> : <IconMoon />}
            </button>

            {/* Hamburger — mobile/tablet only */}
            <div className="relative lg:hidden ml-0.5" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMobileMenu((v: boolean) => !v)}
                className="w-8 h-8 rounded-xl flex items-center justify-center border transition-all hover:scale-105"
                style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: mobileMenuOpen ? 'var(--surface-subtle)' : 'transparent' }}
                title="Navigáció"
              >
                {mobileMenuOpen ? <IconClose /> : <IconMenu />}
              </button>

              {/* Mobile menu dropdown */}
              {mobileMenuOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-56 rounded-2xl border shadow-xl z-50 overflow-hidden animate-slide-down"
                  style={{ background: D ? '#1C1C1E' : '#fff', borderColor: 'var(--border)' }}
                >
                  {NAV_TABS.map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => switchTab(tab.key)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors border-b last:border-0"
                      style={{
                        borderColor: 'var(--border)',
                        background:  activeTab === tab.key ? (D ? 'rgba(37,99,235,.12)' : '#EFF6FF') : 'transparent',
                        color:       activeTab === tab.key ? '#2563EB' : 'var(--tx-primary)',
                        fontWeight:  activeTab === tab.key ? 600 : 400,
                      }}
                    >
                      <span className="text-base w-5 text-center leading-none">{tab.icon}</span>
                      {tab.label}
                      {activeTab === tab.key && <span className="ml-auto text-blue-500">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Toast ── */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 pointer-events-none ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
        <div className="flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium text-white shadow-xl"
          style={{ background: D ? '#27272A' : '#18181B' }}>
          <IconCheck />{toast}
        </div>
      </div>

      {/* ── PDF lead capture modal ── */}
      {pdfModalOpen && <PdfLeadModal onClose={() => setPdfModal(false)} result={result} form={form} />}
    </>
  )
}

/* ── Helper components ──────────────────────────────────────────────────── */

function UtilBtn({ children, onClick, title, badge, disabled }: {
  children: ReactNode; onClick: () => void; title?: string; badge?: number; disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`relative flex items-center gap-1.5 h-8 px-2 rounded-xl font-medium border transition-all duration-150 ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[.97]'}`}
      style={{ color: 'var(--tx-secondary)', borderColor: 'var(--border)', background: 'transparent', minWidth: '32px', justifyContent: 'center' }}
      onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { if (!disabled) e.currentTarget.style.background = 'var(--surface-subtle)' }}
      onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.background = 'transparent' }}
    >
      {children}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">{badge}</span>
      )}
    </button>
  )
}

function Dropdown({ children, className = '' }: { children: ReactNode; className?: string }) {
  const { isDark } = useTheme()
  return (
    <div className={`absolute top-full mt-2 rounded-2xl border z-50 shadow-xl p-4 ${className}`}
      style={{ background: isDark ? '#1C1C1E' : '#ffffff', borderColor: 'var(--border)' }}>
      {children}
    </div>
  )
}

/* ── Icons ──────────────────────────────────────────────────────────────── */
const ic = (d: string) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d={d} stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>

function IconSave()   { return ic("M11.5 12.5H2.5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1H9l3 3v7a1 1 0 0 1-1 1zM4 1.5v4h6v-4M4.5 12.5v-4h5v4") }
function IconFolder() { return ic("M1.5 4.5h11V11a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V4.5zM1.5 4.5V3.5a1 1 0 0 1 1-1H5l1.5 2H1.5z") }
function IconShare()  { return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="10.5" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.25"/><circle cx="10.5" cy="11" r="1.5" stroke="currentColor" strokeWidth="1.25"/><circle cx="3.5" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.25"/><path d="M5 6.2 9 4.2M5 7.8l4 2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/></svg> }
function IconPdf()    { return ic("M8.5 1.5H2.5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-7L8.5 1.5zM8.5 1.5V5.5h4M4 8.5h2a1 1 0 0 0 0-2H4V10") }
function IconMoon()   { return ic("M11.5 8A5 5 0 0 1 5.5 2 5 5 0 1 0 11.5 8z") }
function IconSun()    { return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.25"/><path d="M7 1.5v1M7 11.5v1M12.5 7h-1M2.5 7h-1M10.7 3.3l-.7.7M4 10l-.7.7M10.7 10.7l-.7-.7M4 4l-.7-.7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/></svg> }
function IconTrash()  { return ic("M2 3.5h10M5.5 3.5V2.5h3V3.5M4.5 3.5v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7") }
function IconCheck()  { return ic("M2.5 7 5.5 10 11.5 4") }
function IconMenu()   { return ic("M2 4h10M2 7h10M2 10h10") }
function IconClose()  { return ic("M3 3l8 8M11 3l-8 8") }
