import { useState, useEffect } from 'react'
import { Modal, ModalCloseBtn } from './ui/Modal'

// ── Pro feature card data ─────────────────────────────────────────────────

interface ProCard {
  icon: string
  title: string
  description: string
}

const PRO_CARDS: ProCard[] = [
  {
    icon: '📚',
    title: 'Részletes fázis tudástár',
    description:
      'Megmutatja, egy-egy fázis előtt mire van szükség, mi mire épül, és mire kell figyelni.',
  },
  {
    icon: '📄',
    title: 'PDF ütemterv export',
    description:
      'Letölthető, megosztható építkezési ütemterv családnak, kivitelezőknek vagy szakembereknek.',
  },
  {
    icon: '📅',
    title: 'Naptár export',
    description:
      'Fázisok és határidők naptárba rendezve, hogy könnyebb legyen szervezni a munkákat.',
  },
  {
    icon: '🧱',
    title: 'Anyaglista és beszerzési előkészítés',
    description:
      'Segít előre látni, milyen anyagokra lehet szükség, és mikor érdemes beszerezni őket.',
  },
]

// ── Sample Pro modal content — project-type-aware ─────────────────────────

type SampleKind = 'tags' | 'bullets' | 'warnings' | 'checklist'

interface SampleSection {
  title: string
  icon: string
  items: string[]
  kind: SampleKind
}

interface ProSampleData {
  phase: string
  sections: SampleSection[]
}

const PRO_SAMPLE_HAZEPITES: ProSampleData = {
  phase: 'Tetőszerkezet',
  sections: [
    {
      title: 'Szükséges szakemberek',
      icon: '👷',
      kind: 'tags',
      items: ['Ács', 'Tetőfedő', 'Bádogos', 'Statikus / műszaki ellenőr (ha szükséges)'],
    },
    {
      title: 'Előfeltételek',
      icon: '✅',
      kind: 'bullets',
      items: [
        'Teherhordó falak elkészültek',
        'Koszorú elkészült',
        'Beton/koszorú megfelelően kötött',
        'Tervrajz és méretek rendelkezésre állnak',
        'Faanyag előkészítve',
      ],
    },
    {
      title: 'Mire épül?',
      icon: '🏗️',
      kind: 'bullets',
      items: ['Falazás', 'Koszorú', 'Födém', 'Statikai és építészeti tervek'],
    },
    {
      title: 'Mi követi?',
      icon: '➡️',
      kind: 'bullets',
      items: ['Tetőfólia', 'Lécezés', 'Tetőfedés', 'Bádogozás', 'Ereszcsatorna'],
    },
    {
      title: 'Tipikus hibák',
      icon: '⚠️',
      kind: 'warnings',
      items: ['Pontatlan méretezés', 'Nem megfelelő faanyagvédelem', 'Elhamarkodott munkakezdés', 'Rossz vízelvezetési kialakítás'],
    },
    {
      title: 'Ellenőrzőlista',
      icon: '☑️',
      kind: 'checklist',
      items: ['Tervrajz ellenőrizve', 'Anyag megrendelve', 'Szakember egyeztetve', 'Koszorú ellenőrizve', 'Időjárási kockázat átgondolva'],
    },
  ],
}

const PRO_SAMPLE_FELUJITAS: ProSampleData = {
  phase: 'Burkolás',
  sections: [
    {
      title: 'Szükséges szakemberek',
      icon: '👷',
      kind: 'tags',
      items: ['Burkoló', 'Vízszigetelés szakember', 'Festő (szükség esetén)'],
    },
    {
      title: 'Előfeltételek',
      icon: '✅',
      kind: 'bullets',
      items: [
        'Bontás elkészült',
        'Gépészeti és villanyos kiállások kész',
        'Aljzat vízszintes és száraz',
        'Vízszigetelés nedves helyiségben kész',
        'Anyag megrendelve (+10% tartalékkal)',
      ],
    },
    {
      title: 'Mire épül?',
      icon: '🏗️',
      kind: 'bullets',
      items: ['Bontás', 'Gépészet és villanyszerelés', 'Aljzat előkészítés', 'Vízszigetelés'],
    },
    {
      title: 'Mi követi?',
      icon: '➡️',
      kind: 'bullets',
      items: ['Festés és glettelés', 'Szaniterek és berendezések beépítése', 'Takarítás', 'Átadás'],
    },
    {
      title: 'Tipikus hibák',
      icon: '⚠️',
      kind: 'warnings',
      items: [
        'Vízszigetelés kihagyása nedves helyiségekben',
        'Anyaghiány a munka közepén',
        'Száradási idő be nem tartása',
        'Aljzat egyenetlenségének figyelmen kívül hagyása',
      ],
    },
    {
      title: 'Ellenőrzőlista',
      icon: '☑️',
      kind: 'checklist',
      items: ['Vízszigetelés kész és ellenőrzött', 'Csempe darabszám ellenőrizve', 'Ragasztó és fugázó megrendelve', 'Burkoló időpontja egyeztetve', 'Fugaszín kiválasztva'],
    },
  ],
}

function getProSample(projectKey?: string): ProSampleData {
  if (projectKey === 'felujitas') return PRO_SAMPLE_FELUJITAS
  return PRO_SAMPLE_HAZEPITES
}

// ── Main component ─────────────────────────────────────────────────────────

export default function ProPreviewSection({ projectKey }: { projectKey?: string }) {
  const [modalOpen, setModalOpen] = useState(false)
  const PRO_SAMPLE = getProSample(projectKey)

  return (
    <>
      <section className="mt-8 mb-2 animate-fade-up">
        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full px-3 py-1 border"
                style={{
                  background: 'linear-gradient(135deg, #3D6B4A 0%, #4A7C59 100%)',
                  borderColor: 'transparent',
                  color: '#fff',
                }}
              >
                ✦ Pro
              </span>
              <div className="h-px flex-1 min-w-[40px]" style={{ background: 'var(--border)' }} />
            </div>
            <h2
              className="font-serif text-xl md:text-2xl font-medium leading-snug"
              style={{ color: 'var(--tx-primary)' }}
            >
              Pro építkezési terv
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--tx-muted)' }}>
              Részletesebb, döntéstámogató építkezési terv civil építkezőknek.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PRO_CARDS.map((card) => (
            <ProFeatureCard
              key={card.title}
              card={card}
              onPreview={() => setModalOpen(true)}
            />
          ))}
        </div>
      </section>

      {modalOpen && <ProModal onClose={() => setModalOpen(false)} sample={PRO_SAMPLE} />}
    </>
  )
}

// ── Single locked Pro card ─────────────────────────────────────────────────

function ProFeatureCard({
  card,
  onPreview,
}: {
  card: ProCard
  onPreview: () => void
}) {
  return (
    <div
      className="relative rounded-3xl border p-6 flex flex-col gap-4 transition-all duration-200 hover:scale-[1.01]"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <span
        className="absolute top-4 right-4 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider rounded-full px-2.5 py-1 border"
        style={{
          background: 'var(--surface-subtle)',
          borderColor: 'var(--border-strong)',
          color: 'var(--tx-muted)',
        }}
      >
        <LockIcon size={10} /> Pro
      </span>

      <div className="flex items-start gap-3 pr-16">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0"
          style={{ background: 'var(--surface-subtle)' }}
        >
          {card.icon}
        </div>
        <div>
          <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--tx-primary)' }}>
            {card.title}
          </p>
        </div>
      </div>

      <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--tx-muted)' }}>
        {card.description}
      </p>

      <button
        type="button"
        onClick={onPreview}
        className="self-start inline-flex items-center gap-2 text-xs font-semibold rounded-xl px-4 py-2.5 border transition-all duration-150 hover:scale-[1.02] active:scale-[.98]"
        style={{
          background: 'linear-gradient(135deg, #3D6B4A 0%, #4A7C59 100%)',
          borderColor: 'transparent',
          color: '#fff',
          boxShadow: '0 2px 10px rgba(74,124,89,.25)',
        }}
      >
        <LockIcon size={11} />
        Pro előnézet
      </button>
    </div>
  )
}

// ── Modal ──────────────────────────────────────────────────────────────────

function ProModal({ onClose, sample }: { onClose: () => void; sample: ProSampleData }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', fn)

    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <Modal isOpen={true} onClose={onClose} size="lg">
      <div>
        <div
          className="flex items-center justify-between px-6 py-5 border-b shrink-0"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0"
              style={{ background: 'linear-gradient(135deg, #1D4ED8, #7C3AED)' }}
            >
              <span className="text-white text-xs font-bold">✦</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>
                  {sample.phase}
                </p>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 text-white"
                  style={{ background: 'linear-gradient(135deg, #1D4ED8, #7C3AED)' }}
                >
                  Pro minta
                </span>
              </div>
              <p className="text-xs mt-0.5" style={{ color: 'var(--tx-muted)' }}>
                Fázis részletes áttekintése
              </p>
            </div>
          </div>

          <ModalCloseBtn onClose={onClose} />
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sample.sections.map((section) => (
              <ModalSection key={section.title} section={section} />
            ))}
          </div>

          <div
            className="mt-5 rounded-2xl px-4 py-3 flex gap-2.5 items-start border"
            style={{
              background: 'var(--surface-subtle)',
              borderColor: 'var(--border)',
            }}
          >
            <span className="text-sm shrink-0 mt-px">ℹ️</span>
            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
              Ez minta Pro tartalom, tájékoztató jelleggel. A tényleges műszaki követelmények
              projektfüggők.
            </p>
          </div>
        </div>

        <div
          className="px-6 py-4 border-t shrink-0 flex items-center justify-between gap-3 flex-wrap"
          style={{ borderColor: 'var(--border)', background: 'var(--surface-subtle)' }}
        >
          <p className="text-xs" style={{ color: 'var(--tx-muted)' }}>
            A Pro verzió minden fázishoz tartalmaz ilyen részletezést.
          </p>
          <button
            onClick={onClose}
            className="text-xs font-medium rounded-xl px-4 py-2 border transition-all hover:scale-[1.02] active:scale-[.98]"
            style={{
              borderColor: 'var(--border)',
              color: 'var(--tx-secondary)',
              background: 'var(--surface)',
            }}
          >
            Bezárás
          </button>
        </div>
      </div>
    </Modal>
  )
}

// ── Modal section block ────────────────────────────────────────────────────

type SectionKind = 'tags' | 'bullets' | 'warnings' | 'checklist'

interface Section {
  title: string
  icon: string
  items: string[]
  kind: SectionKind
}

function ModalSection({ section }: { section: Section }) {
  return (
    <div
      className="rounded-2xl p-4 border"
      style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm leading-none">{section.icon}</span>
        <p
          className="text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: 'var(--tx-muted)' }}
        >
          {section.title}
        </p>
      </div>
      <SectionContent kind={section.kind} items={section.items} />
    </div>
  )
}

function SectionContent({ kind, items }: { kind: SectionKind; items: string[] }) {
  if (kind === 'tags') {
    return (
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="text-[11px] font-medium rounded-lg px-2.5 py-1 border"
            style={{
              background: '#EFF6FF',
              borderColor: '#93C5FD',
              color: '#1D4ED8',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    )
  }

  if (kind === 'checklist') {
    return (
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <CheckboxIcon />
            <span className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-secondary)' }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    )
  }

  if (kind === 'warnings') {
    return (
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
            <span className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-secondary)' }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <span
            className="w-1 h-1 rounded-full shrink-0 mt-1.5"
            style={{ background: 'var(--tx-muted)' }}
          />
          <span className="text-[11px] leading-relaxed" style={{ color: 'var(--tx-secondary)' }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}

// ── Tiny inline icons ──────────────────────────────────────────────────────

function LockIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <rect x="2" y="5.5" width="8" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 5.5V3.5a2 2 0 1 1 4 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function CheckboxIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
      <rect
        x="1.5"
        y="1.5"
        width="11"
        height="11"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.2"
        style={{ stroke: '#93C5FD' }}
      />
      <path d="M4 7l2.5 2.5L10 4.5" stroke="#3B82F6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}