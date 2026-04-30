import { useState, useEffect, type ChangeEvent } from 'react'
import {
  PROF_CATEGORIES, SAMPLE_PROFILES, BADGE_STYLES,
} from '../data/professionalsData'

// ── Registration types ─────────────────────────────────────────────────────
type RegistrationRole = 'epitkezo' | 'kivitelező' | 'szakagi' | 'muszaki' | 'ugyved' | 'finanszirozo' | 'anyag' | 'egyeb'
export type { RegistrationRole }

interface RegFormData {
  nev: string; email: string; telefon: string
  szerep: RegistrationRole | ''; szakterulet: string; lokacio: string; referencia: string; consent: boolean
}
const EMPTY_FORM: RegFormData = { nev:'', email:'', telefon:'', szerep:'', szakterulet:'', lokacio:'', referencia:'', consent: false }
const ROLE_OPTIONS: { value: RegistrationRole; label: string }[] = [
  { value: 'epitkezo', label: 'Építkező' },
  { value: 'kivitelező', label: 'Kivitelező' },
  { value: 'szakagi', label: 'Szakági szakember' },
  { value: 'muszaki', label: 'Műszaki ellenőr' },
  { value: 'ugyved', label: 'Ügyvéd' },
  { value: 'finanszirozo', label: 'Finanszírozó' },
  { value: 'anyag', label: 'Tüzép / anyagbeszállító' },
  { value: 'egyeb', label: 'Egyéb' },
]

// ── Props ──────────────────────────────────────────────────────────────────
interface Props {
  initialCategory?: string | null
  onCategoryConsumed?: () => void
}

// ── Main component ─────────────────────────────────────────────────────────
export default function Szakemberek({ initialCategory, onCategoryConsumed }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [locationFilter, setLocationFilter] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [initRole, setInitRole] = useState<RegistrationRole | ''>('')
  const [fromPhase, setFromPhase] = useState(false)

  // Consume incoming category from Gantt navigation
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory)
      setFromPhase(true)
      onCategoryConsumed?.()
    }
  }, [initialCategory, onCategoryConsumed])

  function openAs(role: RegistrationRole | '') {
    setInitRole(role)
    setModalOpen(true)
  }

  const filtered = SAMPLE_PROFILES.filter(p => {
    const catMatch = !selectedCategory || p.category === selectedCategory
    const locMatch = !locationFilter || p.location.toLowerCase().includes(locationFilter.toLowerCase())
    return catMatch && locMatch
  })

  return (
    <div className="animate-fade-up">
      {/* Hero */}
      <div className="pt-12 pb-6 text-center max-w-2xl mx-auto px-4">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-100 dark:border-blue-900/60 rounded-full px-3.5 py-1.5 mb-5">
          👷 Szakemberkereső — hamarosan
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-medium mb-3 leading-snug" style={{ color: 'var(--tx-primary)' }}>
          Validált szakemberek építkezéshez
        </h2>
        <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: 'var(--tx-muted)' }}>
          Hamarosan olyan szakembereket, kivitelezőket és szolgáltatókat találhatsz itt, akik előzetes ellenőrzés után kerülnek fel a felületre.
        </p>
      </div>

      {/* ── Filter section ── */}
      <div className="card p-6 mb-6">
        <p className="text-sm font-semibold mb-4" style={{ color: 'var(--tx-primary)' }}>
          Milyen szakemberre van szükséged?
        </p>

        {/* From-phase note */}
        {fromPhase && selectedCategory && (
          <div className="rounded-2xl px-4 py-3 mb-4 border-l-4 text-xs" style={{ background: '#EFF6FF', borderLeftColor: '#3B82F6', color: '#1D4ED8' }}>
            Az ütemterv alapján ehhez a fázishoz a <strong>{selectedCategory}</strong> kategória lehet releváns.
          </div>
        )}

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-5">
          <button
            type="button"
            onClick={() => { setSelectedCategory(''); setFromPhase(false) }}
            className="text-xs font-medium rounded-xl px-3.5 py-2 border transition-all hover:scale-[1.02]"
            style={{
              background: !selectedCategory ? '#2563EB' : 'var(--surface-subtle)',
              borderColor: !selectedCategory ? '#2563EB' : 'var(--border)',
              color:       !selectedCategory ? '#fff'    : 'var(--tx-secondary)',
            }}
          >
            Összes
          </button>
          {PROF_CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => { setSelectedCategory(selectedCategory === cat ? '' : cat); setFromPhase(false) }}
              className="text-xs font-medium rounded-xl px-3.5 py-2 border transition-all hover:scale-[1.02]"
              style={{
                background: selectedCategory === cat ? '#2563EB' : 'var(--surface-subtle)',
                borderColor: selectedCategory === cat ? '#2563EB' : 'var(--border)',
                color:       selectedCategory === cat ? '#fff'    : 'var(--tx-secondary)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Location filter */}
        <div className="max-w-sm">
          <label className="block text-[11px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--tx-muted)' }}>Lokáció</label>
          <input
            type="text"
            className="field-input"
            value={locationFilter}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setLocationFilter(e.target.value)}
            placeholder="pl. Budapest, Érd, Székesfehérvár"
          />
        </div>
      </div>

      {/* ── Sample profiles ── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {filtered.map(profile => {
            const bStyle = BADGE_STYLES[profile.badgeColor]
            return (
              <div key={profile.id} className="card p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>{profile.name}</p>
                    <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>{profile.category} · {profile.location}</p>
                  </div>
                  <span className="shrink-0 text-[10px] font-semibold rounded-full px-2.5 py-1 border whitespace-nowrap"
                    style={{ background: bStyle.bg, borderColor: bStyle.border, color: bStyle.color }}>
                    {profile.badge}
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--tx-secondary)' }}>{profile.reference}</p>
                <div className="flex items-center justify-between mt-auto pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                  <span className="text-[10px] font-medium rounded-full px-2 py-0.5"
                    style={{ background: 'var(--surface-subtle)', color: 'var(--tx-muted)' }}>
                    {profile.availability}
                  </span>
                  <button type="button"
                    onClick={() => openAs('szakagi')}
                    className="text-xs font-semibold rounded-xl px-3 py-1.5 border transition-all hover:scale-[1.02]"
                    style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: 'var(--surface-subtle)' }}>
                    Kapcsolatfelvétel előnézet
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="card p-8 text-center mb-6">
          <p className="text-sm" style={{ color: 'var(--tx-muted)' }}>
            Ehhez a kategóriához és lokációhoz még nincs minta profil.
          </p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="rounded-2xl p-4 border mb-8" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
        <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
          ℹ️ A szakemberprofilok jelenleg demó adatok. A későbbi cél az előszűrt, validált szakemberek listázása referenciák, jogosultságok és működési terület alapján.
        </p>
      </div>

      {/* Two user-path cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="card p-6 flex flex-col gap-4">
          <div className="text-3xl">🏠</div>
          <div>
            <p className="text-base font-semibold mb-2" style={{ color: 'var(--tx-primary)' }}>Építkező vagyok</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-muted)' }}>Értesítést kérek, amikor elérhető lesz a szakemberkereső.</p>
          </div>
          <button type="button" onClick={() => openAs('epitkezo')}
            className="self-start text-sm font-semibold rounded-2xl px-5 py-2.5 text-white transition-all hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)', boxShadow: '0 3px 12px rgba(37,99,235,.3)' }}>
            Értesítést kérek
          </button>
        </div>
        <div className="card p-6 flex flex-col gap-4">
          <div className="text-3xl">👷</div>
          <div>
            <p className="text-base font-semibold mb-2" style={{ color: 'var(--tx-primary)' }}>Szakember vagyok</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-muted)' }}>Jelentkezem validált szakemberként a felületre.</p>
          </div>
          <button type="button" onClick={() => openAs('kivitelező')}
            className="self-start text-sm font-semibold rounded-2xl px-5 py-2.5 border transition-all hover:scale-[1.02]"
            style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border-strong)', color: 'var(--tx-primary)' }}>
            Jelentkezem szakemberként
          </button>
        </div>
      </div>

      {modalOpen && <EarlyAccessModal initialRole={initRole} onClose={() => setModalOpen(false)} />}
    </div>
  )
}

// ── EarlyAccessModal (unchanged) ───────────────────────────────────────────
export { EarlyAccessModal }

function EarlyAccessModal({ initialRole, onClose }: { initialRole: RegistrationRole | ''; onClose: () => void }) {
  const [data, setData] = useState<RegFormData>({ ...EMPTY_FORM, szerep: initialRole })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof RegFormData, string>>>({})

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [onClose])

  function set<K extends keyof RegFormData>(key: K, value: RegFormData[K]) {
    setData((prev: RegFormData) => ({ ...prev, [key]: value }))
    setErrors((prev: typeof errors) => ({ ...prev, [key]: undefined }))
  }

  function validate() {
    const e: typeof errors = {}
    if (!data.nev.trim()) e.nev = 'Kötelező mező'
    if (!data.email.trim()) e.email = 'Kötelező mező'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Érvénytelen email cím'
    if (!data.szerep) e.szerep = 'Kérjük válasszon szerepet'
    if (!data.consent) e.consent = 'Az elfogadás kötelező'
    setErrors(e); return Object.keys(e).length === 0
  }

  const isPro = data.szerep !== '' && data.szerep !== 'epitkezo'

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(4px)' }}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="relative w-full sm:max-w-lg flex flex-col rounded-t-3xl sm:rounded-3xl overflow-hidden animate-fade-up"
        style={{ background: 'var(--surface)', boxShadow: '0 24px 64px rgba(0,0,0,.3)', maxHeight: '92dvh' }}>
        <div className="flex items-center justify-between px-6 py-5 border-b shrink-0" style={{ borderColor: 'var(--border)' }}>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>Előregisztráció</p>
            <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>Szakemberkereső – korai hozzáférés</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center border transition-all hover:scale-105"
            style={{ borderColor: 'var(--border)', color: 'var(--tx-muted)', background: 'var(--surface-subtle)' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-8 gap-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 flex items-center justify-center text-3xl border border-emerald-100">✅</div>
              <div>
                <p className="text-base font-semibold mb-2" style={{ color: 'var(--tx-primary)' }}>Köszönjük!</p>
                <p className="text-sm" style={{ color: 'var(--tx-muted)' }}>A funkció élesítésekor értesítünk.</p>
              </div>
              <div className="w-full rounded-2xl p-4 border text-left" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
                <p className="text-[11px]" style={{ color: 'var(--tx-muted)' }}>ℹ️ Ez jelenleg előregisztrációs felület. Az adatok mentése később backend bekötéssel történik.</p>
              </div>
              <button onClick={onClose} className="text-sm font-medium rounded-xl px-5 py-2.5 border transition-all"
                style={{ borderColor: 'var(--border)', color: 'var(--tx-secondary)', background: 'var(--surface-subtle)' }}>Bezárás</button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <F label="Név *" error={errors.nev}><input className={`field-input ${errors.nev?'border-red-400':''}`} value={data.nev} placeholder="Teljes neve" onChange={(e: ChangeEvent<HTMLInputElement>) => set('nev', e.target.value)} /></F>
              <F label="Email cím *" error={errors.email}><input type="email" className={`field-input ${errors.email?'border-red-400':''}`} value={data.email} placeholder="pelda@email.hu" onChange={(e: ChangeEvent<HTMLInputElement>) => set('email', e.target.value)} /></F>
              <F label="Telefonszám (opcionális)"><input type="tel" className="field-input" value={data.telefon} placeholder="+36 30 000 0000" onChange={(e: ChangeEvent<HTMLInputElement>) => set('telefon', e.target.value)} /></F>
              <F label="Szerep *" error={errors.szerep}>
                <div className="relative">
                  <select className={`field-input pr-10 appearance-none ${errors.szerep?'border-red-400':''}`} style={{ WebkitAppearance:'none', fontFamily:'inherit' }} value={data.szerep} onChange={(e: ChangeEvent<HTMLSelectElement>) => set('szerep', e.target.value as RegistrationRole)}>
                    <option value="">Válasszon szerepet…</option>
                    {ROLE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color:'var(--tx-muted)' }}><svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                </div>
              </F>
              {isPro && (
                <>
                  <div className="rounded-xl px-4 py-2 border-l-2 border-blue-400" style={{ background:'var(--surface-subtle)' }}><p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color:'#3B82F6' }}>Szakember adatok (opcionális)</p></div>
                  <F label="Szakterület"><input className="field-input" value={data.szakterulet} placeholder="pl. tetőfedés, gépészet" onChange={(e: ChangeEvent<HTMLInputElement>) => set('szakterulet', e.target.value)} /></F>
                  <F label="Működési terület / lokáció"><input className="field-input" value={data.lokacio} placeholder="pl. Budapest és 50 km-es körzete" onChange={(e: ChangeEvent<HTMLInputElement>) => set('lokacio', e.target.value)} /></F>
                  <F label="Referencia röviden"><textarea className="field-input resize-none" rows={3} value={data.referencia} placeholder="Pár mondat tapasztalatáról" onChange={(e: ChangeEvent<HTMLTextAreaElement>) => set('referencia', e.target.value)} /></F>
                </>
              )}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all"
                    style={{ borderColor: errors.consent?'#EF4444': data.consent?'#3B82F6':'var(--border-strong)', background: data.consent?'#3B82F6':'transparent' }}
                    onClick={() => set('consent', !data.consent)}>
                    {data.consent && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <span className="text-xs leading-relaxed" style={{ color:'var(--tx-secondary)' }}>Elfogadom, hogy az adataimat a későbbi értesítés és kapcsolatfelvétel céljából kezeljék.</span>
                </label>
                {errors.consent && <p className="text-[11px] text-red-500 mt-1 ml-8">{errors.consent}</p>}
              </div>
              <div className="rounded-xl p-3 border" style={{ background:'var(--surface-subtle)', borderColor:'var(--border)' }}>
                <p className="text-[11px]" style={{ color:'var(--tx-muted)' }}>ℹ️ Ez jelenleg előregisztrációs felület. Az adatok mentése később backend bekötéssel történik.</p>
              </div>
            </div>
          )}
        </div>
        {!submitted && (
          <div className="px-6 py-4 border-t shrink-0 flex items-center justify-between gap-3" style={{ borderColor:'var(--border)', background:'var(--surface-subtle)' }}>
            <button onClick={onClose} className="text-xs font-medium rounded-xl px-4 py-2 border transition-all" style={{ borderColor:'var(--border)', color:'var(--tx-secondary)', background:'var(--surface)' }}>Mégse</button>
            <button onClick={() => { if(validate()) setSubmitted(true) }} className="text-sm font-semibold rounded-xl px-6 py-2.5 text-white transition-all hover:scale-[1.02]" style={{ background:'linear-gradient(135deg,#1D4ED8,#3B82F6)', boxShadow:'0 3px 10px rgba(37,99,235,.3)' }}>Előregisztráció elküldése</button>
          </div>
        )}
      </div>
    </div>
  )
}

function F({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-widest mb-1.5" style={{ color:'var(--tx-muted)' }}>{label}</label>
      {children}
      {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
    </div>
  )
}

import React from 'react'
