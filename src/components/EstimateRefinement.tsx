import { useState } from 'react'

type FieldKey = 'ingatlanAllapot' | 'villany' | 'gepeszet' | 'bontas' | 'lakott' | 'lokacio'
type Answers  = Partial<Record<FieldKey, string>>

const MULTIPLIERS: Record<FieldKey, Record<string, { time: number; cost: number }>> = {
  ingatlanAllapot: {
    'Jó / újabb állapot':        { time: 0,  cost: 0  },
    'Átlagos állapot':           { time: 5,  cost: 5  },
    'Régi / bizonytalan állapot':{ time: 15, cost: 15 },
  },
  villany: {
    'Nem kell hozzányúlni':           { time: 0,  cost: 0  },
    'Részleges korszerűsítés':         { time: 5,  cost: 7  },
    'Teljes újrahúzás / bizonytalan':  { time: 12, cost: 12 },
  },
  gepeszet: {
    'Nem kell hozzányúlni':       { time: 0,  cost: 0  },
    'Részleges átalakítás':       { time: 5,  cost: 7  },
    'Teljes csere / bizonytalan': { time: 12, cost: 12 },
  },
  bontas: {
    'Minimális':       { time: 0,  cost: 0 },
    'Átlagos':         { time: 5,  cost: 3 },
    'Jelentős bontás': { time: 10, cost: 8 },
  },
  lakott: {
    'Nem':    { time: 0,  cost: 0 },
    'Részben':{ time: 5,  cost: 2 },
    'Igen':   { time: 10, cost: 3 },
  },
  lokacio: {
    'Budapest':                 { time: 0, cost: 8 },
    'Agglomeráció / nagyváros': { time: 3, cost: 5 },
    'Vidék':                    { time: 5, cost: 0 },
  },
}

const FIELDS = [
  { key: 'ingatlanAllapot' as FieldKey, label: 'Ingatlan műszaki állapota',      options: ['Jó / újabb állapot', 'Átlagos állapot', 'Régi / bizonytalan állapot'] },
  { key: 'villany'         as FieldKey, label: 'Villanyhálózat állapota',        options: ['Nem kell hozzányúlni', 'Részleges korszerűsítés', 'Teljes újrahúzás / bizonytalan'] },
  { key: 'gepeszet'        as FieldKey, label: 'Gépészet / víz állapota',        options: ['Nem kell hozzányúlni', 'Részleges átalakítás', 'Teljes csere / bizonytalan'] },
  { key: 'bontas'          as FieldKey, label: 'Bontás mértéke',                 options: ['Minimális', 'Átlagos', 'Jelentős bontás'] },
  { key: 'lakott'          as FieldKey, label: 'Lakott-e az ingatlan munka közben?', options: ['Nem', 'Részben', 'Igen'] },
  { key: 'lokacio'         as FieldKey, label: 'Lokáció',                        options: ['Budapest', 'Agglomeráció / nagyváros', 'Vidék'] },
]

function calcImpact(a: Answers) {
  let time = 0, cost = 0
  for (const key of Object.keys(a) as FieldKey[]) {
    const m = a[key] ? MULTIPLIERS[key]?.[a[key]!] : undefined
    if (m) { time += m.time; cost += m.cost }
  }
  return { time: Math.min(Math.round(time), 35), cost: Math.min(Math.round(cost), 35) }
}

function risk(impact: { time: number; cost: number }) {
  const s = impact.time + impact.cost
  if (s <= 10) return { label: 'Alacsony', color: '#2D5C3A', bg: '#E8F5EC', border: '#A8C5B0' }
  if (s <= 30) return { label: 'Közepes',  color: '#92400E', bg: '#FEF9EE', border: '#D4C4A8' }
  return             { label: 'Magas',    color: '#7F1D1D', bg: '#FEF2F2', border: '#FECACA' }
}

export default function EstimateRefinement() {
  const [open,    setOpen]    = useState(false)
  const [answers, setAnswers] = useState<Answers>({})
  const [applied, setApplied] = useState(false)

  const count  = Object.keys(answers).length
  const impact = calcImpact(answers)
  const r      = risk(impact)

  return (
    <div className="mb-8">
      {/* Confidence badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--tx-muted)' }}>Megbízhatóság:</span>
        {applied
          ? <span className="text-[10px] font-bold rounded-full px-2.5 py-1 border" style={{ background: '#E8F5EC', borderColor: '#A8C5B0', color: '#2D5C3A' }}>✦ Pontosított becslés</span>
          : <span className="text-[10px] font-medium rounded-full px-2.5 py-1 border" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)', color: 'var(--tx-muted)' }}>Alap becslés</span>
        }
      </div>

      <div className="card p-5 md:p-6">

        {/* ── APPLIED ── */}
        {applied && (
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg shrink-0" style={{ background: '#E8F5EC' }}>✦</div>
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--tx-primary)' }}>Pontosított becslés aktív</p>
                <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>A kiválasztott paraméterek alapján számított kockázati hatás:</p>
              </div>
            </div>

            {/* Impact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'Időbecslés hatása',  val: impact.time, unit: '%' },
                { label: 'Költségsáv hatása',  val: impact.cost, unit: '%' },
              ].map(item => (
                <div key={item.label} className="rounded-2xl p-4 border" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--tx-muted)' }}>{item.label}</p>
                  <p className="text-2xl font-bold" style={{ color: item.val > 0 ? '#92400E' : '#2D5C3A' }}>
                    {item.val > 0 ? `+${item.val}${item.unit}` : '0%'}
                  </p>
                  <p className="text-[10px] mt-1" style={{ color: 'var(--tx-muted)' }}>
                    {item.val === 0 ? 'Nincs extra kockázat' : 'Várható ráhagyás'}
                  </p>
                </div>
              ))}
              <div className="rounded-2xl p-4 border" style={{ background: r.bg, borderColor: r.border }}>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: r.color }}>Kockázati szint</p>
                <p className="text-2xl font-bold" style={{ color: r.color }}>{r.label}</p>
                <p className="text-[10px] mt-1" style={{ color: r.color, opacity: 0.75 }}>Összesített jelzés</p>
              </div>
            </div>

            {/* Answer chips */}
            <div className="flex flex-wrap gap-2">
              {FIELDS.map(f => answers[f.key]
                ? <span key={f.key} className="text-[10px] rounded-lg px-2.5 py-1 border" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)', color: 'var(--tx-secondary)' }}>
                    {f.label.split(' ')[0]}: <strong>{answers[f.key]}</strong>
                  </span>
                : null
              )}
            </div>

            <div className="rounded-2xl px-4 py-3 border" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                ℹ️ A pontosítás nem végleges árajánlat, hanem a kockázatok és műszaki körülmények alapján korrigált becslési jelzés. A végleges ár és időtartam szakmai felméréstől, műszaki tartalomtól és kivitelezői ajánlattól függ.
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <button type="button" onClick={() => { setApplied(false); setOpen(true) }}
                className="text-xs font-semibold rounded-xl px-4 py-2 border transition-all hover:scale-[1.01]"
                style={{ borderColor: 'var(--sage-border)', background: 'var(--sage-light)', color: 'var(--sage)' }}>
                Módosítás
              </button>
              <button type="button" onClick={() => { setApplied(false); setAnswers({}); setOpen(false) }}
                className="text-xs font-medium rounded-xl px-4 py-2 border transition-all hover:scale-[1.01]"
                style={{ borderColor: 'var(--border)', color: 'var(--tx-muted)', background: 'var(--surface)' }}>
                Visszaállítás
              </button>
            </div>
          </div>
        )}

        {/* ── COLLAPSED / FORM ── */}
        {!applied && (
          <>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--tx-primary)' }}>Pontosabb becslést szeretnél?</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                  Az első becslés kevés adatból készül. Ha megadsz néhány extra információt az ingatlan állapotáról és a kivitelezés körülményeiről, pontosabb és reálisabb sávot tudunk adni.
                </p>
              </div>
              {!open && (
                <button type="button" onClick={() => setOpen(true)}
                  className="shrink-0 text-xs font-semibold rounded-xl px-4 py-2.5 border transition-all hover:scale-[1.02]"
                  style={{ borderColor: 'var(--sage-border)', background: 'var(--sage-light)', color: 'var(--sage)' }}>
                  Becslés pontosítása
                </button>
              )}
            </div>

            {open && (
              <div className="mt-5 flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FIELDS.map(field => (
                    <div key={field.key}>
                      <p className="text-[11px] font-semibold mb-2" style={{ color: 'var(--tx-secondary)' }}>{field.label}</p>
                      <div className="flex flex-col gap-1.5">
                        {field.options.map(opt => (
                          <button key={opt} type="button"
                            onClick={() => setAnswers((a: Answers) => ({ ...a, [field.key]: opt }))}
                            className="text-left text-[11px] rounded-xl px-3 py-2 border transition-all"
                            style={{
                              borderColor: answers[field.key] === opt ? 'var(--sage-border)' : 'var(--border)',
                              background:  answers[field.key] === opt ? 'var(--sage-light)' : 'var(--surface-subtle)',
                              color:       answers[field.key] === opt ? 'var(--sage)' : 'var(--tx-secondary)',
                              fontWeight:  answers[field.key] === opt ? 600 : 400,
                            }}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Live preview */}
                {count > 0 && (
                  <div className="rounded-2xl p-4 border" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
                    <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--tx-muted)' }}>
                      Várható hatás ({count}/{FIELDS.length} kérdés)
                    </p>
                    <div className="flex gap-5 flex-wrap">
                      <span className="text-xs font-semibold" style={{ color: impact.time > 0 ? '#92400E' : 'var(--tx-muted)' }}>
                        Idő: {impact.time > 0 ? `+${impact.time}%` : '0%'}
                      </span>
                      <span className="text-xs font-semibold" style={{ color: impact.cost > 0 ? '#92400E' : 'var(--tx-muted)' }}>
                        Költség: {impact.cost > 0 ? `+${impact.cost}%` : '0%'}
                      </span>
                      <span className="text-xs font-semibold" style={{ color: r.color }}>
                        Kockázat: {r.label}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 flex-wrap">
                  <button type="button" onClick={() => { setApplied(true); setOpen(false) }}
                    disabled={count === 0}
                    className="text-sm font-semibold rounded-2xl px-5 py-2.5 text-white transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(135deg,#3D6B4A,#4A7C59)', boxShadow: count > 0 ? '0 3px 10px rgba(74,124,89,.25)' : 'none' }}>
                    Pontosított becslés alkalmazása
                  </button>
                  <button type="button" onClick={() => setOpen(false)}
                    className="text-xs font-medium rounded-xl px-4 py-2 border"
                    style={{ borderColor: 'var(--border)', color: 'var(--tx-muted)', background: 'transparent' }}>
                    Mégse
                  </button>
                </div>

                <div className="rounded-2xl px-4 py-3 border" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
                  <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
                    ℹ️ A pontosítás tájékoztató jellegű becslés. A végleges ár és időtartam szakmai felméréstől, műszaki tartalomtól és kivitelezői ajánlattól függ.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
