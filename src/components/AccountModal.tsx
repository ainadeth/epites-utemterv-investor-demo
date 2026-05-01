import { useState, useEffect, type ChangeEvent } from 'react'
import React from 'react'

type ModalState = 'login' | 'demo-success'

interface Props {
  onClose: () => void
  onDemoLogin: () => void   // fires when user "logs in" — parent updates badge
}

const PREVIEW_CARDS = [
  {
    icon: '📂',
    title: 'Mentett projektek',
    text: 'Családi ház, lakásfelújítás és bővítés külön projektként kezelhető.',
  },
  {
    icon: '📄',
    title: 'Dokumentumok és PDF-ek',
    text: 'Ütemtervek, exportok, checklisták és későbbi fájlok egy helyen.',
  },
  {
    icon: '👷',
    title: 'Szakember hozzáférések',
    text: 'Később egy adott szakember csak a hozzá tartozó fázisokat láthatja.',
  },
  {
    icon: '✦',
    title: 'Pro funkciók',
    text: 'Naptár, emlékeztetők, részletes terv és anyagbeszerzési ajánlások.',
  },
]

export default function AccountModal({ onClose, onDemoLogin }: Props) {
  const [view,     setView]     = useState<ModalState>('login')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')

  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [onClose])

  function handleSubmit() {
    // No real auth — just show demo state
    setView('demo-success')
    onDemoLogin()
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,.45)', backdropFilter: 'blur(5px)' }}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full sm:max-w-md flex flex-col rounded-t-3xl sm:rounded-3xl overflow-hidden animate-fade-up"
        style={{ background: 'var(--surface)', boxShadow: '0 24px 64px rgba(0,0,0,.22)', maxHeight: '92dvh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b shrink-0"
          style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm"
              style={{ background: 'var(--sage)' }}>B</div>
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>
                {view === 'login' ? 'Buildmap fiók' : 'Demo fiók előnézet'}
              </p>
              <p className="text-[11px]" style={{ color: 'var(--tx-muted)' }}>
                {view === 'login' ? 'Frontend-only demó' : 'Bejelentkezett demó állapot'}
              </p>
            </div>
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
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {view === 'login' ? (
            <LoginView
              email={email} setEmail={setEmail}
              password={password} setPassword={setPassword}
              onSubmit={handleSubmit}
              onDemo={handleSubmit}
            />
          ) : (
            <DemoSuccessView onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  )
}

// ── Login view ─────────────────────────────────────────────────────────────

function LoginView({ email, setEmail, password, setPassword, onSubmit, onDemo }: {
  email: string; setEmail: (v: string) => void
  password: string; setPassword: (v: string) => void
  onSubmit: () => void; onDemo: () => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
        Mentsd el projektjeidet, exportjaidat és később vond be a szakembereket is.
      </p>

      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-widest mb-1.5"
          style={{ color: 'var(--tx-muted)' }}>Email cím</label>
        <input type="email" className="field-input" value={email} placeholder="pelda@email.hu"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
      </div>

      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-widest mb-1.5"
          style={{ color: 'var(--tx-muted)' }}>Jelszó</label>
        <input type="password" className="field-input" value={password} placeholder="••••••••"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
      </div>

      <button onClick={onSubmit}
        className="w-full text-sm font-semibold text-white rounded-xl py-3 transition-all hover:scale-[1.01] active:scale-[.98]"
        style={{ background: 'linear-gradient(135deg,#3D6B4A,#4A7C59)', boxShadow: '0 3px 10px rgba(74,124,89,.25)' }}>
        Belépés
      </button>

      <button onClick={onSubmit}
        className="w-full text-sm font-semibold rounded-xl py-2.5 border transition-all hover:scale-[1.01]"
        style={{ borderColor: 'var(--sage-border)', background: 'var(--sage-light)', color: 'var(--sage)' }}>
        Fiók létrehozása
      </button>

      {/* Separator */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        <span className="text-[11px]" style={{ color: 'var(--tx-muted)' }}>vagy</span>
        <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
      </div>

      <button onClick={onDemo}
        className="w-full text-sm font-medium rounded-xl py-2.5 border transition-all hover:scale-[1.01]"
        style={{ borderColor: 'var(--border)', background: 'var(--surface-subtle)', color: 'var(--tx-secondary)' }}>
        🚀 Demo fiók megnyitása
      </button>

      <p className="text-[11px] text-center" style={{ color: 'var(--tx-muted)' }}>
        Ez frontend-only demó — valódi adatok nem kerülnek mentésre.
      </p>
    </div>
  )
}

// ── Demo success view ──────────────────────────────────────────────────────

function DemoSuccessView({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 p-4 rounded-2xl border"
        style={{ background: 'var(--sage-light)', borderColor: 'var(--sage-border)' }}>
        <span className="text-2xl">✅</span>
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--sage)' }}>Demo fiók aktív</p>
          <p className="text-[11px]" style={{ color: 'var(--sage)' }}>
            Éles verzióban itt a valódi fiókod lenne.
          </p>
        </div>
      </div>

      <p className="text-xs leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
        Az éles verzióban itt a mentett projektek, PDF exportok, szakember-hozzáférések
        és anyaglisták lesznek elérhetők.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PREVIEW_CARDS.map(card => (
          <div key={card.title} className="rounded-2xl p-4 border"
            style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
            <div className="text-xl mb-2">{card.icon}</div>
            <p className="text-xs font-semibold mb-1" style={{ color: 'var(--tx-primary)' }}>{card.title}</p>
            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>{card.text}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl p-4 border" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
        <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
          ℹ️ Ez jelenleg frontend-only demó. Valódi fiókkezelés később kerül bekötésre.
        </p>
      </div>

      <button onClick={onClose}
        className="self-center text-xs font-medium rounded-xl px-5 py-2.5 border transition-all"
        style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: 'var(--surface)' }}>
        Bezárás
      </button>
    </div>
  )
}
