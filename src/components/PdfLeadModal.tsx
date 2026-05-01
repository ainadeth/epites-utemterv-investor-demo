import { useState, useEffect, type ChangeEvent } from 'react'
import type { TimelineResult, FormState } from '../types'
import { formatDate } from '../utils/dateUtils'
import { formatFt } from '../utils/budgetUtils'
import { calcBudget } from '../utils/budgetUtils'
import { PROJECTS } from '../data/projects'

interface Props {
  onClose: () => void
  result?: TimelineResult | null
  form?: FormState | null
}

interface LeadData {
  nev: string
  email: string
  telefon: string
  consent: boolean
}

const EMPTY: LeadData = { nev: '', email: '', telefon: '', consent: false }

export default function PdfLeadModal({ onClose, result, form }: Props) {
  const [data,      setData]      = useState<LeadData>(EMPTY)
  const [errors,    setErrors]    = useState<Partial<Record<keyof LeadData, string>>>({})
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

  function set<K extends keyof LeadData>(key: K, value: LeadData[K]) {
    setData((prev: LeadData) => ({ ...prev, [key]: value }))
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

  function openDemoPrint() {
    if (!result || !form) return
    const projectLabel = PROJECTS[form.projectKey]?.label ?? form.projectKey
    const phaseRows = result.rows.filter((r): r is Extract<typeof r, {kind:'phase'}> => r.kind === 'phase' && !r.hidden)
    const budget = calcBudget(form.sizeM2, form.qualityKey, form.executionModeKey, form.complexityKey, form.projectKey)
    const totalDays = result.totalDays || 1
    const today = formatDate(new Date())

    // Pastel bar colors cycling
    const barColors = ['#A8C5B0','#7FB3C8','#C8B89A','#B0C5A8','#C8A87F','#A0B8C8','#BFC8A0']

    // Build Gantt rows HTML
    const ganttRows = phaseRows.map((r, i) => {
      const offsetPct = Math.round((r.start.getTime() - result.projectStart.getTime()) / 86400000 / totalDays * 100)
      const widthPct  = Math.max(1, Math.round(r.days / totalDays * 100))
      const color = barColors[i % barColors.length]
      return `<tr>
        <td class="gantt-label">${r.num}. ${r.name}</td>
        <td class="gantt-bar-cell">
          <div class="gantt-track">
            <div class="gantt-bar" style="margin-left:${offsetPct}%;width:${widthPct}%;background:${color};">
              <span class="gantt-bar-label">${r.days}n</span>
            </div>
          </div>
        </td>
      </tr>`
    }).join('')

    // Budget breakdown rows
    const budgetRows = budget.phaseCosts.map(p =>
      `<tr><td>${p.label}</td><td>${p.pct}%</td><td>${formatFt(p.min)} – ${formatFt(p.max)}</td></tr>`
    ).join('')

    const html = `<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8"/>
  <title>Buildmap – ${projectLabel}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; color: #1C1F1A; background: #fff; padding: 36px 40px; max-width: 860px; margin: 0 auto; }

    /* Header */
    .doc-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 28px; padding-bottom: 16px; border-bottom: 2px solid #E4E1DA; }
    .brand { display: flex; align-items: center; gap: 10px; }
    .brand-mark { width: 32px; height: 32px; background: #4A7C59; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 16px; }
    .brand-name { font-size: 20px; font-weight: 700; color: #1C1F1A; letter-spacing: -.3px; }
    .brand-tag { font-size: 11px; color: #4A7C59; font-style: italic; margin-top: 1px; }
    .doc-meta { text-align: right; font-size: 11px; color: #9A9F94; line-height: 1.6; }
    .doc-title { font-size: 13px; font-weight: 600; color: #4A5240; }

    /* Demo banner */
    .demo-banner { background: #FEF9EE; border: 1px solid #F0D580; border-radius: 8px; padding: 8px 14px; font-size: 10.5px; color: #8A6A10; margin-bottom: 24px; }

    /* Summary cards */
    .cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 28px; }
    .card { background: #F6F5F1; border: 1px solid #E4E1DA; border-radius: 10px; padding: 12px 14px; }
    .card-label { font-size: 9px; text-transform: uppercase; letter-spacing: .12em; color: #9A9F94; margin-bottom: 5px; }
    .card-value { font-size: 14px; font-weight: 700; color: #1C1F1A; line-height: 1.2; }

    /* Section headings */
    h2 { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .12em; color: #4A7C59; margin: 24px 0 10px; padding-bottom: 4px; border-bottom: 1px solid #C8DFD0; }

    /* Gantt */
    .gantt-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .gantt-table td { padding: 5px 0; vertical-align: middle; }
    .gantt-label { width: 32%; font-size: 11px; color: #4A5240; padding-right: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .gantt-bar-cell { width: 68%; }
    .gantt-track { background: #F0EEE9; border-radius: 4px; height: 20px; position: relative; overflow: hidden; }
    .gantt-bar { height: 100%; border-radius: 4px; display: flex; align-items: center; position: absolute; top: 0; min-width: 3%; }
    .gantt-bar-label { font-size: 9px; font-weight: 600; color: #fff; padding: 0 6px; white-space: nowrap; overflow: hidden; }

    /* Phase table */
    .phase-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 11px; }
    .phase-table th { text-align: left; font-size: 9px; text-transform: uppercase; letter-spacing: .1em; color: #9A9F94; padding: 6px 8px; border-bottom: 1.5px solid #E4E1DA; }
    .phase-table td { padding: 7px 8px; border-bottom: 1px solid #F0EEE9; }
    .phase-table tr:last-child td { border-bottom: none; }
    .dur-badge { display: inline-block; background: #C8DFD0; color: #2D5C3A; border-radius: 4px; padding: 2px 7px; font-size: 10px; font-weight: 600; }

    /* Budget */
    .budget-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 16px; }
    .budget-table { width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 20px; }
    .budget-table th { text-align: left; font-size: 9px; text-transform: uppercase; letter-spacing: .1em; color: #9A9F94; padding: 6px 8px; border-bottom: 1.5px solid #E4E1DA; }
    .budget-table td { padding: 6px 8px; border-bottom: 1px solid #F0EEE9; }
    .budget-table tr:last-child td { border-bottom: none; }

    /* Disclaimer */
    .disclaimer { margin-top: 28px; padding: 12px 16px; background: #F6F5F1; border: 1px solid #E4E1DA; border-radius: 8px; font-size: 10.5px; color: #6A6F65; line-height: 1.6; }

    @media print {
      @page { margin: 1.2cm 1.5cm; size: A4; }
      body { padding: 0; }
      .demo-banner { display: none; }
    }
  </style>
</head>
<body>

  <!-- Header -->
  <div class="doc-header">
    <div class="brand">
      <div class="brand-mark">B</div>
      <div>
        <div class="brand-name">Buildmap</div>
        <div class="brand-tag">az építkezésed térképe.</div>
      </div>
    </div>
    <div class="doc-meta">
      <div class="doc-title">Építkezési ütemterv</div>
      <div>${projectLabel} · ${form.sizeM2} m²</div>
      <div>Generálva: ${today}</div>
    </div>
  </div>

  <div class="demo-banner">
    ⚠️ Ez ideiglenes demó export. Az éles verzióban valódi PDF-generálás és e-mail küldés működik majd.
  </div>

  <!-- Summary cards -->
  <div class="cards">
    <div class="card"><div class="card-label">Kezdés</div><div class="card-value">${formatDate(result.projectStart)}</div></div>
    <div class="card"><div class="card-label">Várható befejezés</div><div class="card-value">${formatDate(result.projectEnd)}</div></div>
    <div class="card"><div class="card-label">Teljes időtartam</div><div class="card-value">${result.totalDays} nap</div></div>
    <div class="card"><div class="card-label">Becsült keret</div><div class="card-value" style="font-size:11px;">${formatFt(budget.minTotal)}–${formatFt(budget.maxTotal)}</div></div>
  </div>

  <!-- Gantt timeline -->
  <h2>Fázis ütemterv — Gantt nézet</h2>
  <table class="gantt-table"><tbody>${ganttRows}</tbody></table>

  <!-- Phase table -->
  <h2>Fázistáblázat</h2>
  <table class="phase-table">
    <thead><tr><th>#</th><th>Fázis neve</th><th>Kezdés</th><th>Befejezés</th><th>Időtartam</th></tr></thead>
    <tbody>
      ${phaseRows.map(r => `<tr>
        <td>${r.num}</td><td>${r.name}</td>
        <td>${formatDate(r.start)}</td><td>${formatDate(r.end)}</td>
        <td><span class="dur-badge">${r.days} nap</span></td>
      </tr>`).join('')}
    </tbody>
  </table>

  <!-- Budget summary -->
  <h2>Becsült költségsáv</h2>
  <div class="budget-grid">
    <div class="card"><div class="card-label">Minimum</div><div class="card-value">${formatFt(budget.minTotal)}</div></div>
    <div class="card"><div class="card-label">Maximum</div><div class="card-value">${formatFt(budget.maxTotal)}</div></div>
    <div class="card"><div class="card-label">Becsült Ft/m²</div><div class="card-value" style="font-size:12px;">${Math.round(budget.minPerM2/1000)}–${Math.round(budget.maxPerM2/1000)} e. Ft</div></div>
  </div>
  <table class="budget-table">
    <thead><tr><th>Fázis</th><th>%</th><th>Becsült sáv</th></tr></thead>
    <tbody>${budgetRows}</tbody>
  </table>

  <!-- Disclaimer -->
  <div class="disclaimer">
    Az ütemterv és a költségsáv tájékoztató jellegű becslés. Nem garantált ár, nem ajánlat.
    A tényleges időtartam és költség függ a kivitelezéstől, anyagáraktól, engedélyezéstől
    és egyedi körülményektől.
  </div>

</body>
</html>`

    const win = window.open('', '_blank')
    if (!win) return
    win.document.write(html)
    win.document.close()
    win.onload = () => setTimeout(() => win.print(), 300)
  }

  const canExport = !!(result && form)

  return (
    <Modal isOpen={true} onClose={onClose} size="md">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b shrink-0" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600/10 flex items-center justify-center text-base">📄</div>
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>PDF ütemterv letöltése</p>
              <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>Ingyenes, hamarosan éles verzióban</p>
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
            <div className="flex flex-col items-center text-center py-6 gap-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 flex items-center justify-center text-3xl border border-emerald-100">✅</div>
              <div>
                <p className="text-base font-semibold mb-2" style={{ color: 'var(--tx-primary)' }}>Köszönjük!</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                  A demó export most megnyitható. Az éles verzióban a PDF-et e-mailben is elküldjük.
                </p>
              </div>
              {canExport && (
                <button
                  onClick={openDemoPrint}
                  className="w-full text-sm font-semibold rounded-2xl px-5 py-3 text-white transition-all hover:scale-[1.02] active:scale-[.98]"
                  style={{ background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)', boxShadow: '0 4px 14px rgba(37,99,235,.3)' }}
                >
                  📄 PDF előnézet megnyitása
                </button>
              )}
              <div className="w-full rounded-2xl p-4 border text-left" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
                <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                  ℹ️ A demóban az adatok még nem kerülnek mentésre. Éles verzióban a PDF-generálás,
                  e-mail küldés és adatmentés backend bekötéssel működik majd.
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
            <button onClick={() => { if (validate()) setSubmitted(true) }}
              className="text-sm font-semibold rounded-xl px-5 py-2.5 text-white transition-all hover:scale-[1.02] active:scale-[.98]"
              style={{ background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)', boxShadow: '0 3px 10px rgba(37,99,235,.3)' }}>
              PDF ütemterv kérése
            </button>
          </div>
        )}
      </div>
    </Modal>
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
import { Modal } from './ui/Modal'
