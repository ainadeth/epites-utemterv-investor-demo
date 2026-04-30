import { useState, useEffect, type ChangeEvent } from 'react'

interface Props {
  onClose: () => void
}

interface FormData {
  nev: string
  email: string
  telefon: string
  consent: boolean
}

const EMPTY: FormData = { nev: '', email: '', telefon: '', consent: false }

export default function PdfLeadModal({ onClose }: Props) {
  const [data,      setData]      = useState<FormData>(EMPTY)
  const [errors,    setErrors]    = useState<Partial<Record<keyof FormData, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', fn)
      document.body.style.overflow = ''
    }
  }, [onClose])

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((prev: FormData) => ({ ...prev, [key]: value }))
    setErrors((prev: typeof errors) => ({ ...prev, [key]: undefined }))
  }

  function validate() {
    const e: typeof errors = {}
    if (!data.nev.trim())   e.nev   = 'Kötelező mező'
    if (!data.email.trim()) e.email = 'Kötelező mező'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Érvénytelen email cím'
    if (!data.consent) e.consent = 'Az elfogadás kötelező'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit() {
    if (validate()) setSubmitted(true)
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(4px)' }}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full sm:max-w-md flex flex-col rounded-t-3xl sm:rounded-3xl overflow-hidden animate-fade-up"
        style={{ background: 'var(--surface)', boxShadow: '0 24px 64px rgba(0,0,0,.3)', maxHeight: '90dvh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b shrink-0" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600/10 flex items-center justify-center text-base">📄</div>
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>PDF ütemterv letöltése</p>
              <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>Ingyenes, hamarosan elérhető</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center border transition-all hover:scale-105"
            style={{ borderColor: 'var(--border)', color: 'var(--tx-muted)', background: 'var(--surface-subtle)' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-8 gap-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 flex items-center justify-center text-3xl border border-emerald-100">✅</div>
              <div>
                <p className="text-base font-semibold mb-2" style={{ color: 'var(--tx-primary)' }}>Köszönjük!</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                  A PDF export élesítésekor elküldjük az ütemtervet.
                </p>
              </div>
              <div className="w-full rounded-2xl p-4 border text-left" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
                <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                  ℹ️ A demóban az adatok még nem kerülnek mentésre. Éles verzióban a PDF-generálás, e-mail küldés és adatmentés backend bekötéssel működik majd.
                </p>
              </div>
              <button onClick={onClose}
                className="text-sm font-medium rounded-xl px-5 py-2.5 border transition-all hover:scale-[1.02]"
                style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: 'var(--surface-subtle)' }}>
                Bezárás
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-xs leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                Kérd e-mailben a saját építkezési ütemtervedet. A PDF export a következő verzióban lesz elérhető.
              </p>

              <Field label="Név *" error={errors.nev}>
                <input className={`field-input ${errors.nev ? 'border-red-400' : ''}`}
                  value={data.nev} placeholder="Teljes neve"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => set('nev', e.target.value)} />
              </Field>

              <Field label="Email cím *" error={errors.email}>
                <input type="email" className={`field-input ${errors.email ? 'border-red-400' : ''}`}
                  value={data.email} placeholder="pelda@email.hu"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => set('email', e.target.value)} />
              </Field>

              <Field label="Telefonszám (opcionális)">
                <input type="tel" className="field-input"
                  value={data.telefon} placeholder="+36 30 000 0000"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => set('telefon', e.target.value)} />
              </Field>

              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all"
                    style={{ borderColor: errors.consent ? '#EF4444' : data.consent ? '#3B82F6' : 'var(--border-strong)', background: data.consent ? '#3B82F6' : 'transparent' }}
                    onClick={() => set('consent', !data.consent)}>
                    {data.consent && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <span className="text-xs leading-relaxed" style={{ color: 'var(--tx-secondary)' }}>
                    Elfogadom, hogy az adataimat a PDF exporttal és későbbi értesítéssel kapcsolatban kezeljék.
                  </span>
                </label>
                {errors.consent && <p className="text-[11px] text-red-500 mt-1 ml-8">{errors.consent}</p>}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!submitted && (
          <div className="px-6 py-4 border-t shrink-0 flex items-center justify-between gap-3"
            style={{ borderColor: 'var(--border)', background: 'var(--surface-subtle)' }}>
            <button onClick={onClose}
              className="text-xs font-medium rounded-xl px-4 py-2 border transition-all"
              style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: 'var(--surface)' }}>
              Mégse
            </button>
            <button onClick={handleSubmit}
              className="text-sm font-semibold rounded-xl px-5 py-2.5 text-white transition-all hover:scale-[1.02] active:scale-[.98]"
              style={{ background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)', boxShadow: '0 3px 10px rgba(37,99,235,.3)' }}>
              PDF ütemterv kérése
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--tx-muted)' }}>{label}</label>
      {children}
      {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
    </div>
  )
}

import React from 'react'
