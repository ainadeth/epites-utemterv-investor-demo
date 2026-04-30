import { useState, useEffect, type ChangeEvent } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────

type RegistrationRole = 'epitkezo' | 'kivitelező' | 'szakagi' | 'muszaki' | 'ugyved' | 'finanszirozo' | 'anyag' | 'egyeb'

interface FormData {
  nev: string
  email: string
  telefon: string
  szerep: RegistrationRole | ''
  szakterulet: string
  lokacio: string
  referencia: string
  consent: boolean
}

const EMPTY_FORM: FormData = {
  nev: '', email: '', telefon: '', szerep: '',
  szakterulet: '', lokacio: '', referencia: '', consent: false,
}

const ROLE_OPTIONS: { value: RegistrationRole; label: string }[] = [
  { value: 'epitkezo',    label: 'Építkező' },
  { value: 'kivitelező',  label: 'Kivitelező' },
  { value: 'szakagi',     label: 'Szakági szakember' },
  { value: 'muszaki',     label: 'Műszaki ellenőr' },
  { value: 'ugyved',      label: 'Ügyvéd' },
  { value: 'finanszirozo',label: 'Finanszírozó' },
  { value: 'anyag',       label: 'Tüzép / anyagbeszállító' },
  { value: 'egyeb',       label: 'Egyéb' },
]

const IS_PRO_ROLE = (r: RegistrationRole | '') =>
  r !== '' && r !== 'epitkezo'

// ── Content cards ──────────────────────────────────────────────────────────

const CONTENT_CARDS = [
  {
    icon: '✅',
    title: 'Előzetes validáció',
    text: 'A szakemberek nem automatikusan kerülnek fel. Referenciák, jogosultságok és releváns tapasztalat alapján szűrhető a lista.',
  },
  {
    icon: '🔍',
    title: 'Fázis alapú keresés',
    text: 'Később fázis alapján is kereshetsz: alapozás, tető, gépészet, villanyszerelés, burkolás, festés.',
  },
  {
    icon: '📩',
    title: 'Ajánlatkérés és kapcsolatfelvétel',
    text: 'A cél, hogy egy építkező könnyen tudjon ajánlatot kérni és kapcsolatba lépni a megfelelő szereplőkkel.',
  },
  {
    icon: '👥',
    title: 'Későbbi szereplők',
    text: 'Kivitelezők, szakági szakemberek, műszaki ellenőrök, ügyvédek, finanszírozók, tüzépek és anyagbeszállítók.',
  },
]

// ── Main component ─────────────────────────────────────────────────────────

export default function Szakemberek() {
  const [modalOpen,  setModalOpen]  = useState(false)
  const [initRole,   setInitRole]   = useState<RegistrationRole | ''>('')

  function openAs(role: RegistrationRole | '') {
    setInitRole(role)
    setModalOpen(true)
  }

  return (
    <div className="animate-fade-up">

      {/* Hero */}
      <div className="pt-12 pb-8 text-center max-w-2xl mx-auto px-4">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-100 dark:border-blue-900/60 rounded-full px-3.5 py-1.5 mb-5">
          👷 Szakemberkereső — hamarosan
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-medium mb-4 leading-snug" style={{ color: 'var(--tx-primary)' }}>
          Validált szakemberek építkezéshez
        </h2>
        <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: 'var(--tx-muted)' }}>
          Hamarosan olyan szakembereket, kivitelezőket és szolgáltatókat találhatsz itt, akik
          előzetes ellenőrzés után kerülnek fel a felületre.
        </p>
      </div>

      {/* Two user-path cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {/* Builder path */}
        <div className="card p-7 flex flex-col gap-4">
          <div className="text-3xl">🏠</div>
          <div>
            <p className="text-base font-semibold mb-2" style={{ color: 'var(--tx-primary)' }}>
              Építkező vagyok
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
              Értesítést kérek, amikor elérhető lesz a szakemberkereső és ajánlatkérési lehetőség.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openAs('epitkezo')}
            className="self-start text-sm font-semibold rounded-2xl px-5 py-2.5 text-white transition-all hover:scale-[1.02] active:scale-[.98]"
            style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)', boxShadow: '0 3px 12px rgba(37,99,235,.3)' }}
          >
            Értesítést kérek
          </button>
        </div>

        {/* Pro path */}
        <div className="card p-7 flex flex-col gap-4" style={{ borderColor: 'var(--border)' }}>
          <div className="text-3xl">👷</div>
          <div>
            <p className="text-base font-semibold mb-2" style={{ color: 'var(--tx-primary)' }}>
              Szakember vagyok
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
              Jelentkezem, hogy később validált szakemberként vagy szolgáltatóként megjelenhessek
              a felületen.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openAs('kivitelező')}
            className="self-start text-sm font-semibold rounded-2xl px-5 py-2.5 border transition-all hover:scale-[1.02] active:scale-[.98]"
            style={{
              background: 'var(--surface-subtle)',
              borderColor: 'var(--border-strong)',
              color: 'var(--tx-primary)',
            }}
          >
            Jelentkezem szakemberként
          </button>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {CONTENT_CARDS.map(card => (
          <div key={card.title} className="card p-5">
            <div className="text-2xl mb-3">{card.icon}</div>
            <p className="text-sm font-semibold mb-1.5" style={{ color: 'var(--tx-primary)' }}>{card.title}</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--tx-muted)' }}>{card.text}</p>
          </div>
        ))}
      </div>

      {/* Trust strip */}
      <div
        className="rounded-3xl p-6 mb-10 text-center border"
        style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}
      >
        <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--tx-muted)' }}>
          Miért validáció?
        </p>
        <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: 'var(--tx-secondary)' }}>
          Az építőiparban az egyik legnagyobb kihívás a megbízható szakemberek megtalálása.
          Az előzetes szűrés célja, hogy az építkezők olyan szakembereket találjanak, akiknek
          referenciái ellenőrzöttek és tapasztalatuk releváns.
        </p>
      </div>

      {/* Modal */}
      {modalOpen && (
        <EarlyAccessModal
          initialRole={initRole}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}

// ── Early access modal ─────────────────────────────────────────────────────

export type { RegistrationRole }
export { EarlyAccessModal }

function EarlyAccessModal({
  initialRole,
  onClose,
}: {
  initialRole: RegistrationRole | ''
  onClose: () => void
}) {
  const [data,        setData]       = useState<FormData>({ ...EMPTY_FORM, szerep: initialRole })
  const [submitted,   setSubmitted]  = useState(false)
  const [errors,      setErrors]     = useState<Partial<Record<keyof FormData, string>>>({})

  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((prev: FormData) => ({ ...prev, [key]: value }))
    setErrors((prev: typeof errors) => ({ ...prev, [key]: undefined }))
  }

  function validate(): boolean {
    const e: typeof errors = {}
    if (!data.nev.trim())   e.nev   = 'Kötelező mező'
    if (!data.email.trim()) e.email = 'Kötelező mező'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Érvénytelen email cím'
    if (!data.szerep)       e.szerep = 'Kérjük válasszon szerepet'
    if (!data.consent)      e.consent = 'Az elfogadás kötelező'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit() {
    if (!validate()) return
    // No backend — just show success state
    setSubmitted(true)
  }

  const isPro = IS_PRO_ROLE(data.szerep)

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(4px)' }}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full sm:max-w-lg max-h-[92dvh] sm:max-h-[88vh] flex flex-col rounded-t-3xl sm:rounded-3xl overflow-hidden animate-fade-up"
        style={{ background: 'var(--surface)', boxShadow: '0 24px 64px rgba(0,0,0,.3)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b shrink-0" style={{ borderColor: 'var(--border)' }}>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>Előregisztráció</p>
            <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>Szakemberkereső – korai hozzáférés</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center border transition-all hover:scale-105"
            style={{ borderColor: 'var(--border)', color: 'var(--tx-muted)', background: 'var(--surface-subtle)' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {submitted ? (
            /* ── Success state ── */
            <div className="flex flex-col items-center justify-center text-center py-8 gap-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 flex items-center justify-center text-3xl border border-emerald-100">
                ✅
              </div>
              <div>
                <p className="text-base font-semibold mb-2" style={{ color: 'var(--tx-primary)' }}>
                  Köszönjük!
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                  A funkció élesítésekor értesítünk.
                </p>
              </div>
              <div
                className="w-full rounded-2xl p-4 border text-left"
                style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}
              >
                <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                  ℹ️ Ez jelenleg előregisztrációs felület. Az adatok mentése később backend bekötéssel történik.
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-sm font-medium rounded-xl px-5 py-2.5 border transition-all hover:scale-[1.02]"
                style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: 'var(--surface-subtle)' }}
              >
                Bezárás
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <div className="flex flex-col gap-4">
              <FormField label="Név *" error={errors.nev}>
                <input
                  className={`field-input ${errors.nev ? 'border-red-400' : ''}`}
                  value={data.nev}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => set('nev', e.target.value)}
                  placeholder="Teljes neve"
                />
              </FormField>

              <FormField label="Email cím *" error={errors.email}>
                <input
                  type="email"
                  className={`field-input ${errors.email ? 'border-red-400' : ''}`}
                  value={data.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => set('email', e.target.value)}
                  placeholder="pelda@email.hu"
                />
              </FormField>

              <FormField label="Telefonszám (opcionális)">
                <input
                  type="tel"
                  className="field-input"
                  value={data.telefon}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => set('telefon', e.target.value)}
                  placeholder="+36 30 000 0000"
                />
              </FormField>

              <FormField label="Szerep *" error={errors.szerep}>
                <div className="relative">
                  <select
                    className={`field-input pr-10 appearance-none ${errors.szerep ? 'border-red-400' : ''}`}
                    style={{ WebkitAppearance: 'none', fontFamily: 'inherit' }}
                    value={data.szerep}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => set('szerep', e.target.value as RegistrationRole)}
                  >
                    <option value="">Válasszon szerepet…</option>
                    {ROLE_OPTIONS.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--tx-muted)' }}>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </FormField>

              {/* Pro-only fields */}
              {isPro && (
                <>
                  <div className="rounded-xl px-4 py-2 border-l-2 border-blue-400" style={{ background: 'var(--surface-subtle)' }}>
                    <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: '#3B82F6' }}>
                      Szakember adatok (opcionális)
                    </p>
                  </div>

                  <FormField label="Szakterület">
                    <input
                      className="field-input"
                      value={data.szakterulet}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => set('szakterulet', e.target.value)}
                      placeholder="pl. tetőfedés, gépészet, villanyszerelés"
                    />
                  </FormField>

                  <FormField label="Működési terület / lokáció">
                    <input
                      className="field-input"
                      value={data.lokacio}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => set('lokacio', e.target.value)}
                      placeholder="pl. Budapest és 50 km-es körzete"
                    />
                  </FormField>

                  <FormField label="Referencia röviden">
                    <textarea
                      className="field-input resize-none"
                      rows={3}
                      value={data.referencia}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => set('referencia', e.target.value)}
                      placeholder="Pár mondat a tapasztalatáról, fontosabb referenciáiról"
                    />
                  </FormField>
                </>
              )}

              {/* Consent */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <div
                    className="mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all"
                    style={{
                      borderColor: errors.consent ? '#EF4444' : data.consent ? '#3B82F6' : 'var(--border-strong)',
                      background:  data.consent ? '#3B82F6' : 'transparent',
                    }}
                    onClick={() => set('consent', !data.consent)}
                  >
                    {data.consent && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <span className="text-xs leading-relaxed" style={{ color: 'var(--tx-secondary)' }}>
                    Elfogadom, hogy az adataimat a későbbi értesítés és kapcsolatfelvétel céljából kezeljék.
                  </span>
                </label>
                {errors.consent && <p className="text-[11px] text-red-500 mt-1 ml-8">{errors.consent}</p>}
              </div>

              <div
                className="rounded-xl p-3 border"
                style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}
              >
                <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                  ℹ️ Ez jelenleg előregisztrációs felület. Az adatok mentése később backend bekötéssel történik.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!submitted && (
          <div className="px-6 py-4 border-t shrink-0 flex items-center justify-between gap-3"
            style={{ borderColor: 'var(--border)', background: 'var(--surface-subtle)' }}>
            <button onClick={onClose} className="text-xs font-medium rounded-xl px-4 py-2 border transition-all"
              style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: 'var(--surface)' }}>
              Mégse
            </button>
            <button
              onClick={handleSubmit}
              className="text-sm font-semibold rounded-xl px-6 py-2.5 text-white transition-all hover:scale-[1.02] active:scale-[.98]"
              style={{ background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)', boxShadow: '0 3px 10px rgba(37,99,235,.3)' }}
            >
              Előregisztráció elküldése
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Form field helper ──────────────────────────────────────────────────────

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--tx-muted)' }}>
        {label}
      </label>
      {children}
      {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
    </div>
  )
}

import React from 'react'
