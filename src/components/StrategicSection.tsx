// ── Befektetői vízió — Buildmap platform story ─────────────────────────────

// ── Data ──────────────────────────────────────────────────────────────────

const MVP_CARDS = [
  { icon: '⏱️', title: 'Ütemterv generálás',    text: 'Fázisok, határidők és csúszási kockázatok projekttípusonként.' },
  { icon: '💰', title: 'Költségbecslés',          text: 'Projekttípus- és minőségi szint alapú sávos becslés.' },
  { icon: '📄', title: 'PDF export',              text: 'Branded Gantt-ütemterv és költségbontás letölthető demóként.' },
  { icon: '🧱', title: 'Anyaglogika',             text: 'Projekttípusonként releváns anyagkategóriák és időzítési útmutató.' },
  { icon: '👷', title: 'Szakember modul',         text: 'Kategóriaszűrő, demó profilok, kapcsolatfelvétel-előnézet.' },
  { icon: '📂', title: 'Projektjeim / fiókos irány', text: 'Mentett projektek, szerepkör-alapú hozzáférés prototípusa.' },
  { icon: '📖', title: 'Cikkek / SEO tartalom',   text: 'Kalkulátor-cikkek és termékajánló demó — organikus forgalmi alap.' },
]

const PLATFORM_CARDS = [
  { icon: '🗂️', title: 'Mentett projektek',           text: 'Fiókalapú projekttárhely tulajdonosnak, menedzsernek, kivitelezőnek.' },
  { icon: '🧱', title: 'Projekt-specifikus anyaglista', text: 'Fázishoz kötött anyagigény, rendelési időzítés, partnerkapcsolat.' },
  { icon: '👷', title: 'Szakember-hozzáférések',       text: 'Meghívható szereplők saját nézete: csak a saját fázisaik látszanak.' },
  { icon: '📋', title: 'Dokumentumok & checklisták',   text: 'PDF-ek, tervek, fázisátvételi listák egy projektfelületen.' },
  { icon: '✦',  title: 'Pro csomag',                   text: 'Részletes terv, naptár, emlékeztetők, exportok, projektmenedzsment.' },
  { icon: '🏪', title: 'Marketplace / partneri ajánlatok', text: 'Tüzépek, szakemberek, finanszírozók és anyaggyártók célzott megjelenése.' },
]

const REVENUE_CARDS = [
  { icon: '💳', title: 'Pro előfizetés',            text: 'Részletes tervek, checklisták, exportok, naptár és projektmenedzsment.' },
  { icon: '🔗', title: 'Szakember lead',             text: 'Validált szakembereknek érkező projektalapú megkeresések.' },
  { icon: '📦', title: 'Anyagbeszerzési partnerlead', text: 'Tüzépek, boltok, gyártók és anyagkategóriák felé továbbított vásárlási szándék.' },
  { icon: '📰', title: 'SEO / affiliate',            text: 'Cikkekből, kalkulátorokból és termékajánlókból érkező organikus forgalom.' },
  { icon: '🤝', title: 'B2B / partneri csomagok',    text: 'Kivitelezőknek, projektmenedzsereknek, gyártóknak és pénzügyi partnereknek.' },
]

const ROADMAP = [
  { label: '1–2. hét', text: 'Validáció szakmai szereplőkkel' },
  { label: '3–4. hét', text: 'Kalkulátor pontosításának javítása' },
  { label: '5–6. hét', text: 'Projekt-specifikus dashboard' },
  { label: '7–8. hét', text: 'Lead capture bekötése' },
  { label: '9–10. hét', text: 'Szakember és anyagpartner pilot' },
  { label: '11–12. hét', text: 'Pro csomag első fizetős ajánlata' },
]

const VALIDATION_CARDS = [
  { icon: '📊', title: 'Makroadatok',      text: 'KSH építési árak, lakásépítési költségmutatók és ÉVOSZ piaci visszajelzések.' },
  { icon: '📐', title: 'Szakmai normák',   text: 'TERC / ÖN logikához hasonló normarendszeri megközelítés fázisidőkre és anyagigényre.' },
  { icon: '🎙️', title: 'Primer validáció', text: 'Saját interjúk kivitelezőkkel, műszaki ellenőrökkel, szakemberekkel, tüzépekkel és építkezőkkel.' },
  { icon: '📉', title: 'Bizonytalansági sáv', text: 'Minden becslés optimista / realista / kockázati sávot tartalmaz, nem egyetlen pontszámot.' },
]

const FUNDING_CARDS = [
  { icon: '⚙️', title: 'Termékfejlesztés',      text: 'Backend, fiókok, projekt-specifikus logika.' },
  { icon: '🎨', title: 'UX/UI és arculat',        text: 'Végleges brand, design system, animációk.' },
  { icon: '🏗️', title: 'Szakmai validáció',       text: 'Tesztelés kivitelezőkkel, műszaki ellenőrökkel, építészekkel.' },
  { icon: '📖', title: 'Tartalom / SEO',          text: 'Cikk- és kalkulátortartalom, organikus növekedési alap.' },
  { icon: '📣', title: 'Partneri értékesítés',    text: 'Szakember-, tüzép- és finanszírozói partnerkapcsolatok.' },
  { icon: '🚀', title: 'Első pilotok',            text: 'Fizetős Pro és marketplace pilot valódi felhasználókkal.' },
]

// ── Sub-components ────────────────────────────────────────────────────────

function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-7">
      <p className="text-[10px] font-bold uppercase tracking-[.14em] mb-2" style={{ color: 'var(--sage)' }}>{label}</p>
      <h2 className="font-serif text-xl md:text-2xl font-medium mb-2 leading-snug" style={{ color: 'var(--tx-primary)' }}>{title}</h2>
      {subtitle && <p className="text-sm leading-relaxed max-w-xl" style={{ color: 'var(--tx-muted)' }}>{subtitle}</p>}
    </div>
  )
}

function Grid({ children, cols = 3 }: { children: React.ReactNode; cols?: 2 | 3 | 4 }) {
  const cls = cols === 2 ? 'grid-cols-1 sm:grid-cols-2'
    : cols === 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  return <div className={`grid ${cls} gap-4`}>{children}</div>
}

function Card({ icon, title, text }: { key?: string; icon: string; title: string; text: string }) {
  return (
    <div className="card p-5 flex flex-col gap-2.5">
      <div className="flex items-center gap-2.5">
        <span className="text-lg">{icon}</span>
        <p className="text-xs font-semibold" style={{ color: 'var(--tx-primary)' }}>{title}</p>
      </div>
      <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>{text}</p>
    </div>
  )
}

function Divider() {
  return (
    <div className="flex items-center gap-3 my-12">
      <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--sage)' }} />
      <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────

import React from 'react'

export default function StrategicSection() {
  return (
    <div className="animate-fade-up page-top pb-16">

      {/* ── Hero ── */}
      <div className="text-center max-w-2xl mx-auto mb-14 px-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase rounded-full px-3.5 py-1.5 mb-5 border"
          style={{ color: 'var(--sage)', background: 'var(--sage-light)', borderColor: 'var(--sage-border)' }}>
          🚀 Befektetői vízió
        </span>
        <h1 className="font-serif text-3xl md:text-4xl font-medium mb-4 leading-tight" style={{ color: 'var(--tx-primary)' }}>
          Buildmap befektetői vízió
        </h1>
        <p className="text-base leading-relaxed mb-3 font-medium" style={{ color: 'var(--tx-secondary)' }}>
          Nem csak építkezési kalkulátor, hanem fiókalapú projektplatform civil építkezőknek.
        </p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
          A Buildmap célja, hogy az építkezők és felújítók egy helyen lássák az időt, költséget,
          szakembereket, anyagokat és következő lépéseket.
        </p>
      </div>

      {/* ── Demo disclaimer ── */}
      <div className="rounded-2xl px-5 py-4 mb-12 border flex items-start gap-3 max-w-2xl mx-auto"
        style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
        <span className="text-base shrink-0 mt-px">ℹ️</span>
        <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
          Ez a felület jelenleg befektetői/MVP demó. A backend, valódi fiókkezelés, partneri
          ajánlatok és fizetés későbbi fejlesztési lépések.
        </p>
      </div>

      {/* ── 1. Mi működik már ── */}
      <section className="mb-4">
        <SectionHeader
          label="01 — Jelenlegi állapot"
          title="Mi működik már a demóban?"
          subtitle="Az MVP már tartalmaz minden kulcsfunkciót a befektetői prezentációhoz."
        />
        <Grid cols={3}>
          {MVP_CARDS.map(c => <Card key={c.title} {...c} />)}
        </Grid>
      </section>

      <Divider />

      {/* ── 2. Calculation methodology ── */}
      <section className="mb-4">
        <SectionHeader
          label="02 — Módszertan"
          title="Validálható számítási modell"
          subtitle="Az MVP jelenleg sávos becslést ad. A következő fejlesztési lépésben a fázisidők, költségsávok és szorzók szakmai interjúk, KSH/ÉVOSZ jellegű piaci adatok és TERC/ÖN logikához hasonló normarendszeri megközelítés alapján finomíthatók."
        />
        <div className="mb-5">
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--tx-muted)' }}>Jelenlegi bemeneti paraméterek</p>
          <div className="flex flex-wrap gap-2">
            {['Projekttípus','Méret (m²)','Minőségi szint','Kivitelezési mód','Komplexitás','Műszaki állapot','Lokáció / régió','Projekt-specifikus kockázatok'].map(tag => (
              <span key={tag} className="text-[11px] font-medium rounded-xl px-3 py-1.5 border"
                style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)', color: 'var(--tx-secondary)' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <Grid cols={4}>
          {VALIDATION_CARDS.map(c => <Card key={c.title} {...c} />)}
        </Grid>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'Időbecslés',    items: ['Optimista sáv','Realista sáv','Kockázati sáv'] },
            { label: 'Költségsáv',   items: ['Alsó határ','Realista sáv','Tartalék sávval'] },
            { label: 'Megbízhatóság',items: ['Bizonytalansági szint','Adatminőség jelzés','Javaslat szakértőre'] },
          ].map(col => (
            <div key={col.label} className="rounded-2xl p-4 border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <p className="text-[10px] font-bold uppercase tracking-wider mb-2.5" style={{ color: 'var(--sage)' }}>{col.label}</p>
              {col.items.map(item => (
                <div key={item} className="flex items-center gap-2 py-1">
                  <span className="w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--sage)' }} />
                  <span className="text-[11px]" style={{ color: 'var(--tx-secondary)' }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl px-5 py-3.5 border flex items-start gap-3"
          style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}>
          <span className="text-sm shrink-0 mt-px">ℹ️</span>
          <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
            A Buildmap célja döntéstámogató becslés, nem hivatalos költségvetés vagy kivitelezői ajánlat.
            Az elvégzett kalkuláció tájékoztató jellegű, és nem helyettesíti a tételes szakmai felmérést.
          </p>
        </div>
      </section>

      <Divider />

      {/* ── 3. Platform expansion ── */}
      <section className="mb-4">
        <SectionHeader
          label="03 — Skálázás"
          title="Hogyan lesz ebből platform?"
          subtitle="A projektdata az ingyenes kalkulátortól a fiókalapú projektmenedzsmentig vezet."
        />
        <Grid cols={3}>
          {PLATFORM_CARDS.map(c => <Card key={c.title} {...c} />)}
        </Grid>
      </section>

      <Divider />

      {/* ── 3. Revenue ── */}
      <section className="mb-4">
        <SectionHeader
          label="04 — Üzleti modell"
          title="Lehetséges bevételi lábak"
          subtitle="Több párhuzamos bevételi vonal, amelyek a projektalapú adatokra építenek."
        />
        <Grid cols={3}>
          {REVENUE_CARDS.map(c => <Card key={c.title} {...c} />)}
        </Grid>

        {/* Funnel */}
        <div className="mt-6 rounded-2xl p-5 border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-4 text-center" style={{ color: 'var(--tx-muted)' }}>
            Platform értéklánc
          </p>
          <div className="flex flex-wrap items-center justify-center gap-0">
            {['Forgalom', 'Kalkulátor', 'PDF lead', 'Projektadat', 'Ajánlatkérés', 'Partnerbevétel'].map((step, i, arr) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center px-2 py-1">
                  <span className="text-xs font-semibold" style={{ color: 'var(--sage)' }}>{step}</span>
                </div>
                {i < arr.length - 1 && (
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                    <path d="M1 5h12M10 1l4 4-4 4" stroke="var(--border-strong)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── 4. Roadmap ── */}
      <section className="mb-4">
        <SectionHeader
          label="05 — Roadmap"
          title="Következő 90 nap"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ROADMAP.map((item, i) => (
            <div key={item.label} className="card p-4 flex items-start gap-3">
              <div className="w-7 h-7 rounded-xl flex items-center justify-center text-[11px] font-bold shrink-0 text-white"
                style={{ background: 'var(--sage)', opacity: 0.7 + i * 0.05 }}>
                {i + 1}
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--tx-muted)' }}>{item.label}</p>
                <p className="text-xs font-medium" style={{ color: 'var(--tx-primary)' }}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── 5. Funding use ── */}
      <section>
        <SectionHeader
          label="06 — Következő forrás"
          title="Mire kell a következő forrás?"
          subtitle="Az első befektetés a termék és az első fizető felhasználók megszerzésére irányul."
        />
        <Grid cols={3}>
          {FUNDING_CARDS.map(c => <Card key={c.title} {...c} />)}
        </Grid>
      </section>

    </div>
  )
}
