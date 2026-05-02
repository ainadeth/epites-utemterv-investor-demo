import React, { useState, useEffect, useRef, type ReactNode } from 'react'
import { useTheme } from '../context/ThemeContext'
import type { FormState, TimelineResult } from '../types'
import {
  saveProject, loadSavedProjects, deleteSavedProject,
  formToShareUrl, formatSavedAt,
} from '../utils/storageUtils'
import { PROJECTS } from '../data/projects'
import BuildmapLogo from './ui/BuildmapLogo'
import PdfLeadModal from './PdfLeadModal'
import AccountModal from './AccountModal'

// ── Tabs ────────────────────────────────────────────────────────────────────

export type TabKey = 'calculator' | 'fazis' | 'cikkek' | 'szakemberek' | 'anyagok' | 'pro' | 'projektek' | 'vizió'

const PRIMARY_TABS: { key: TabKey; label: string }[] = [
  { key: 'calculator',  label: 'Kalkulátor'    },
  { key: 'fazis',       label: 'Fázisok'       },
  { key: 'anyagok',     label: 'Anyagok'       },
  { key: 'szakemberek', label: 'Szakemberek'   },
  { key: 'cikkek',      label: 'Cikkek'        },
  { key: 'projektek',   label: 'Projektjeim'   },
  { key: 'pro',         label: 'Pro terv'      },
]

const SECONDARY_TABS: { key: TabKey; label: string }[] = [
  { key: 'vizió', label: 'Befektetői vízió' },
]

const ALL_TABS = [...PRIMARY_TABS, ...SECONDARY_TABS]

const TAB_ICONS: Record<TabKey, string> = {
  calculator: '🏗️', fazis: '🔧', cikkek: '📖',
  szakemberek: '👷', anyagok: '🧱', pro: '✦', projektek: '📂', vizió: '🚀',
}

// ── Props ───────────────────────────────────────────────────────────────────

interface Props {
  form: FormState
  result?: TimelineResult | null
  onLoadProject: (form: FormState) => void
  activeTab: TabKey
  onTabChange: (tab: TabKey) => void
}

export default function StickyHeader({ form, result, onLoadProject, activeTab, onTabChange }: Props) {
  const { isDark, toggle } = useTheme()
  const [scrolled,       setScrolled]   = useState(false)
  const [menuOpen,       setMenu]       = useState(false)
  const [showSave,       setShowSave]   = useState(false)
  const [showProjects,   setShowProj]   = useState(false)
  const [saveName,       setSaveName]   = useState('')
  const [projects,       setProjects]   = useState(loadSavedProjects)
  const [copied,         setCopied]     = useState(false)
  const [toast,          setToast]      = useState('')
  const [pdfModalOpen,   setPdfModal]   = useState(false)
  const [accountOpen,    setAccount]    = useState(false)
  const [demoLoggedIn,   setDemoLogin]  = useState(false)
  const saveRef  = useRef<HTMLDivElement>(null)
  const projRef  = useRef<HTMLDivElement>(null)
  const menuRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const fn = (e: globalThis.MouseEvent) => {
      if (saveRef.current && !saveRef.current.contains(e.target as Node)) setShowSave(false)
      if (projRef.current && !projRef.current.contains(e.target as Node)) setShowProj(false)
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenu(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 2500) }

  function handleSave() {
    const name = saveName.trim() || PROJECTS[form.projectKey].label
    saveProject(name, form)
    setProjects(loadSavedProjects())
    setSaveName(''); setShowSave(false)
    showToast('Projekt elmentve!')
  }

  function handleDelete(id: string, e: globalThis.MouseEvent) {
    e.stopPropagation()
    deleteSavedProject(id)
    setProjects(loadSavedProjects())
  }

  function handleShare() {
    navigator.clipboard.writeText(formToShareUrl(form)).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000)
      showToast('Link másolva!')
    })
  }

  function switchTab(tab: TabKey) { onTabChange(tab); setMenu(false) }

  const D = isDark
  const scrolledCls = scrolled
    ? `border-b backdrop-blur-xl ${D ? 'bg-[#111113]/95 border-white/8' : 'bg-white/96 border-[#E4E1DA]'}`
    : 'border-b border-transparent bg-transparent'

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolledCls}`}
        style={scrolled ? { boxShadow: 'var(--shadow-header)' } : undefined}
      >
        {/* ── Row 1: brand + utilities ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-2">

          {/* Brand */}
          <button type="button" onClick={() => switchTab('calculator')}
            className="flex items-center group shrink-0">
            <BuildmapLogo size={24} />
          </button>

          {/* Utilities */}
          <div className="flex items-center gap-1">

            {/* Save */}
            <div className="relative" ref={saveRef}>
              <UtilBtn onClick={() => { setShowSave((v: boolean) => !v); setShowProj(false) }} title="Mentés">
                <IconSave /><span className="hidden xl:inline">Mentés</span>
              </UtilBtn>
              {showSave && (
                <Dropdown className="right-0" style={{ minWidth: '288px' }}>
                  <p className="section-label mb-3">Projekt mentése</p>
                  <input autoFocus className="field-input mb-3 text-sm w-full"
                    value={saveName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSaveName(e.target.value)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSave()}
                    placeholder={PROJECTS[form.projectKey].label} />
                  <button onClick={handleSave}
                    className="w-full text-white text-sm font-semibold rounded-xl py-2.5 transition-all hover:opacity-90"
                    style={{ background: 'var(--sage)' }}>Mentés</button>
                </Dropdown>
              )}
            </div>

            {/* Projects */}
            <div className="relative" ref={projRef}>
              <UtilBtn onClick={() => { setShowProj((v: boolean) => !v); setShowSave(false) }} title="Projektek" badge={projects.length || undefined}>
                <IconFolder /><span className="hidden xl:inline">Projektek</span>
              </UtilBtn>
              {showProjects && (
                <Dropdown className="w-76 right-0 overflow-hidden p-0">
                  <p className="section-label px-4 pt-4 pb-2">Mentett projektek</p>
                  {projects.length === 0
                    ? <p className="px-4 pb-4 text-xs" style={{ color: 'var(--tx-muted)' }}>Még nincs mentett projekt.</p>
                    : <ul className="max-h-56 overflow-y-auto divide-y" style={{ borderColor: 'var(--border)' }}>
                        {projects.map((p: (typeof projects)[0]) => (
                          <li key={p.id}
                            className="flex items-center gap-3 px-4 py-3 cursor-pointer group hover:bg-[#E8F5EC]/50 transition-colors"
                            onClick={() => { onLoadProject(p.form); setShowProj(false) }}>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium truncate" style={{ color: 'var(--tx-primary)' }}>{p.name}</p>
                              <p className="text-[10px]" style={{ color: 'var(--tx-muted)' }}>{formatSavedAt(p.savedAt)}</p>
                            </div>
                            <button
                              onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleDelete(p.id, e.nativeEvent)}
                              className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg transition-all"
                              style={{ color: 'var(--tx-muted)' }}>
                              <IconTrash />
                            </button>
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
              <span className="hidden xl:inline">{copied ? 'Másolva' : 'Megosztás'}</span>
            </UtilBtn>

            {/* PDF */}
            <UtilBtn onClick={() => setPdfModal(true)} title="PDF export">
              <IconPdf /><span className="hidden xl:inline">PDF</span>
            </UtilBtn>

            {/* Account */}
            <button
              type="button"
              onClick={() => setAccount(true)}
              className="flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-xs font-semibold border transition-all hover:scale-[1.02]"
              style={{
                borderColor: demoLoggedIn ? 'var(--sage-border)' : 'var(--border)',
                background:  demoLoggedIn ? 'var(--sage-light)' : 'var(--surface-subtle)',
                color:       demoLoggedIn ? 'var(--sage)' : 'var(--tx-secondary)',
              }}
            >
              {demoLoggedIn ? '👤 Demo fiók' : 'Belépés'}
            </button>

            <div className="h-4 w-px mx-0.5" style={{ background: 'var(--border-strong)' }} />

            {/* Theme */}
            <button onClick={toggle} title={isDark ? 'Világos mód' : 'Sötét mód'}
              className="w-7 h-7 rounded-lg flex items-center justify-center border transition-all hover:scale-105"
              style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: 'transparent' }}>
              {isDark ? <IconSun /> : <IconMoon />}
            </button>

            {/* Hamburger — mobile only */}
            <div className="relative lg:hidden ml-0.5" ref={menuRef}>
              <button type="button" onClick={() => setMenu((v: boolean) => !v)}
                className="w-7 h-7 rounded-lg flex items-center justify-center border transition-all"
                style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: menuOpen ? 'var(--surface-subtle)' : 'transparent' }}>
                {menuOpen ? <IconClose /> : <IconMenu />}
              </button>
              {menuOpen && (
                <div className="absolute top-full right-0 mt-2 w-52 rounded-2xl border shadow-xl z-50 overflow-hidden animate-slide-down"
                  style={{ background: D ? '#1C1C1E' : '#fff', borderColor: 'var(--border)' }}>
                  {ALL_TABS.map(tab => (
                    <button key={tab.key} type="button" onClick={() => switchTab(tab.key)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-xs transition-colors border-b last:border-0"
                      style={{
                        borderColor: 'var(--border)',
                        background:  activeTab === tab.key ? 'var(--sage-light)' : 'transparent',
                        color:       activeTab === tab.key ? 'var(--sage)' : 'var(--tx-primary)',
                        fontWeight:  activeTab === tab.key ? 600 : 400,
                      }}>
                      <span>{TAB_ICONS[tab.key]}</span>{tab.label}
                      {activeTab === tab.key && <span className="ml-auto" style={{ color: 'var(--sage)' }}>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Row 2: primary nav (lg+) ── */}
        <div className="hidden lg:block border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center gap-0.5 h-9">
            {PRIMARY_TABS.map(tab => (
              <button key={tab.key} type="button" onClick={() => switchTab(tab.key)}
                className="relative px-3 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap"
                style={{
                  color:      activeTab === tab.key ? 'var(--sage)' : 'var(--tx-secondary)',
                  background: activeTab === tab.key ? 'var(--sage-light)' : 'transparent',
                }}>
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 rounded-full"
                    style={{ background: 'var(--sage)' }} />
                )}
              </button>
            ))}
            {/* Secondary tab — visually separated */}
            <div className="ml-auto flex items-center">
              <div className="h-4 w-px mr-2" style={{ background: 'var(--border-strong)' }} />
              {SECONDARY_TABS.map(tab => (
                <button key={tab.key} type="button" onClick={() => switchTab(tab.key)}
                  className="px-3 py-1 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap"
                  style={{
                    color:      activeTab === tab.key ? 'var(--sage)' : 'var(--tx-muted)',
                    background: activeTab === tab.key ? 'var(--sage-light)' : 'transparent',
                  }}>
                  🚀 {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── Toast ── */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 pointer-events-none ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
        <div className="flex items-center gap-2 rounded-2xl px-5 py-3 text-xs font-medium text-white shadow-xl"
          style={{ background: D ? '#27272A' : '#1C1F1A' }}>
          <IconCheck />{toast}
        </div>
      </div>

      {pdfModalOpen && <PdfLeadModal onClose={() => setPdfModal(false)} result={result} form={form} />}
      {accountOpen  && <AccountModal onClose={() => setAccount(false)} onDemoLogin={() => setDemoLogin(true)} />}
    </>
  )
}

/* ── Helper components ──────────────────────────────────────────────────── */

function UtilBtn({ children, onClick, title, badge, disabled }: {
  children: ReactNode; onClick: () => void; title?: string; badge?: number; disabled?: boolean
}) {
  return (
    <button onClick={onClick} disabled={disabled} title={title}
      className={`relative flex items-center gap-1 h-7 px-2 rounded-lg text-xs font-medium border transition-all ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
      style={{ color: 'var(--tx-secondary)', borderColor: 'var(--border)', background: 'transparent', minWidth: '28px', justifyContent: 'center' }}
      onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { if (!disabled) e.currentTarget.style.background = 'var(--surface-subtle)' }}
      onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.background = 'transparent' }}>
      {children}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full text-white text-[8px] font-bold flex items-center justify-center"
          style={{ background: 'var(--sage)' }}>{badge}</span>
      )}
    </button>
  )
}

function Dropdown({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const { isDark } = useTheme()
  return (
    <div className={`absolute top-full mt-2 rounded-2xl border z-50 shadow-xl p-4 ${className}`}
      style={{ background: isDark ? '#1C1C1E' : '#ffffff', borderColor: 'var(--border)', ...style }}>
      {children}
    </div>
  )
}

/* ── Icons ──────────────────────────────────────────────────────────────── */
const ic = (d: string) => <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d={d} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
function IconSave()   { return ic("M11.5 12.5H2.5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1H9l3 3v7a1 1 0 0 1-1 1zM4 1.5v4h6v-4M4.5 12.5v-4h5v4") }
function IconFolder() { return ic("M1.5 4.5h11V11a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V4.5zM1.5 4.5V3.5a1 1 0 0 1 1-1H5l1.5 2H1.5z") }
function IconShare()  { return <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="10.5" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.3"/><circle cx="10.5" cy="11" r="1.5" stroke="currentColor" strokeWidth="1.3"/><circle cx="3.5" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M5 6.2 9 4.2M5 7.8l4 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> }
function IconPdf()    { return ic("M8.5 1.5H2.5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-7L8.5 1.5zM8.5 1.5V5.5h4M4 8.5h2a1 1 0 0 0 0-2H4V10") }
function IconMoon()   { return ic("M11.5 8A5 5 0 0 1 5.5 2 5 5 0 1 0 11.5 8z") }
function IconSun()    { return <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.3"/><path d="M7 1.5v1M7 11.5v1M12.5 7h-1M2.5 7h-1M10.7 3.3l-.7.7M4 10l-.7.7M10.7 10.7l-.7-.7M4 4l-.7-.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> }
function IconTrash()  { return ic("M2 3.5h10M5.5 3.5V2.5h3V3.5M4.5 3.5v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7") }
function IconCheck()  { return ic("M2.5 7 5.5 10 11.5 4") }
function IconMenu()   { return ic("M2 4h10M2 7h10M2 10h10") }
function IconClose()  { return ic("M3 3l8 8M11 3l-8 8") }
