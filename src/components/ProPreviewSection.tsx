import React, { useState, useEffect } from 'react'

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

// ── Sample Pro modal content (Tetőszerkezet) ─────────────────────────────

const PRO_SAMPLE = {
  phase: 'Tetőszerkezet',
  sections: [
    {
      title: 'Szükséges szakemberek',
      icon: '👷',
      items: [
        'Ács',
        'Tetőfedő',
        'Bádogos',
        'Statikus / műszaki ellenőr (ha szükséges)',
      ],
      kind: 'tags' as const,
    },
    {
      title: 'Előfeltételek',
      icon: '✅',
      items: [
        'Teherhordó falak elkészültek',
        'Koszorú elkészült',
        'Beton/koszorú megfelelően kötött',
        'Tervrajz és tetőszerkezeti méretek rendelkezésre állnak',
        'Faanyag vagy tetőszerkezeti anyag előkészítve',
      ],
      kind: 'bullets' as const,
    },
    {
      title: 'Mire épül?',
      icon: '🏗️',
      items: [
        'Falazás',
        'Koszorú',
        'Födém vagy felső teherhordó szerkezet',
        'Statikai és építészeti tervek',
      ],
      kind: 'bullets' as const,
    },
    {
      title: 'Mi követi?',
      icon: '➡️',
      items: [
        'Tetőfólia',
        'Lécezés',
        'Tetőfedés',
        'Bádogozás',
        'Ereszcsatorna',
        'Később: nyílászárók és homlokzati munkák',
      ],
      kind: 'bullets' as const,
    },
    {
      title: 'Tipikus hibák',
      icon: '⚠️',
      items: [
        'Pontatlan méretezés',
        'Nem megfelelő faanyagvédelem',
        'Elhamarkodott munkakezdés nem megfelelő kötési idő után',
        'Rossz vízelvezetési kialakítás',
        'Szakágak rossz sorrendje',
      ],
      kind: 'warnings' as const,
    },
    {
      title: 'Ellenőrzőlista',
      icon: '☑️',
      items: [
        'Tervrajz ellenőrizve',
        'Anyag megrendelve',
        'Szakember időpontja egyeztetve',
        'Koszorú állapota ellenőrizve',
        'Rögzítési pontok ellenőrizve',
        'Időjárási kockázat átgondolva',
      ],
      kind: 'checklist' as const,
    },
  ],
}

// ── Main component ─────────────────────────────────────────────────────────

export default function ProPreviewSection() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      {/* ── Section wrapper ── */}
      <section className="mt-8 mb-2 animate-fade-up">

        {/* Section header */}
        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              {/* Pro badge */}
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full px-3 py-1 border"
                style={{
                  background: 'linear-gradient(135deg, #1D4ED8 0%, #7C3AED 100%)',
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

        {/* 4 Pro cards — 2-col on md+, 1-col on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PRO_CARDS.map((card) => (
            <ProCard
              key={card.title}
              card={card}
              onPreview={() => setModalOpen(true)}
            />
          ))}
        </div>

      </section>

      {/* ── Modal ── */}
      {modalOpen && (
        <ProModal onClose={() => setModalOpen(false)} />
      )}
    </>
  )
}

// ── Single locked Pro card ─────────────────────────────────────────────────

function ProCard({
  card,
  onPreview,
}: {
  key?: string
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
      {/* Lock badge */}
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

      {/* Icon + title */}
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

      {/* Description */}
      <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--tx-muted)' }}>
        {card.description}
      </p>

      {/* CTA button */}
      <button
        type="button"
        onClick={onPreview}
        className="self-start inline-flex items-center gap-2 text-xs font-semibold rounded-xl px-4 py-2.5 border transition-all duration-150 hover:scale-[1.02] active:scale-[.98]"
        style={{
          background: 'linear-gradient(135deg, #1D4ED8 0%, #4F46E5 100%)',
          borderColor: 'transparent',
          color: '#fff',
          boxShadow: '0 2px 10px rgba(37,99,235,.3)',
        }}
      >
        <LockIcon size={11} />
        Pro előnézet
      </button>
    </div>
  )
}

// ── Modal ──────────────────────────────────────────────────────────────────

function ProModal({ onClose }: { onClose: () => void }) {
  // Close on Escape key
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Sheet */}
      <div
        className="relative w-full sm:max-w-2xl max-h-[92dvh] sm:max-h-[85vh] flex flex-col rounded-t-3xl sm:rounded-3xl overflow-hidden animate-fade-up"
        style={{
          background: 'var(--surface)',
          boxShadow: '0 24px 64px rgba(0,0,0,.3)',
        }}
      >
        {/* Header */}
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
                  {PRO_SAMPLE.phase}
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

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 border shrink-0"
            style={{
              borderColor: 'var(--border)',
              color: 'var(--tx-muted)',
              background: 'var(--surface-subtle)',
            }}
            aria-label="Bezárás"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRO_SAMPLE.sections.map((section) => (
              <ModalSection key={section.title} section={section} />
            ))}
          </div>

          {/* Disclaimer */}
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

        {/* Footer */}
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
    </div>
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

function ModalSection({ section }: { key?: string; section: Section }) {
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

  // bullets (default)
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

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CheckboxIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
      <rect x="1.5" y="1.5" width="11" height="11" rx="3" stroke="currentColor" strokeWidth="1.2"
        style={{ stroke: '#93C5FD' }} />
      <path d="M4 7l2.5 2.5L10 4.5" stroke="#3B82F6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}


