export default function Cikkek() {
  return (
    <div className="animate-fade-up">
      <div className="pt-10 pb-8 text-center max-w-2xl mx-auto px-4">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-100 dark:border-blue-900/60 rounded-full px-3.5 py-1.5 mb-4">
          📖 Tudástár
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-medium mb-3" style={{ color: 'var(--tx-primary)' }}>
          Cikkek és tudástár
        </h2>
        <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: 'var(--tx-muted)' }}>
          Építkezési útmutatók, árak, fázisok, kivitelezési tippek és döntéstámogató tartalmak hamarosan.
        </p>
      </div>

      {/* Preview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        {PREVIEW_ARTICLES.map(article => (
          <div
            key={article.title}
            className="card p-5 opacity-60"
          >
            <div className="text-2xl mb-3">{article.icon}</div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--tx-muted)' }}>
              {article.category}
            </p>
            <p className="text-sm font-semibold leading-snug mb-2" style={{ color: 'var(--tx-primary)' }}>
              {article.title}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--tx-muted)' }}>
              {article.desc}
            </p>
            <span
              className="inline-block mt-3 text-[10px] font-bold uppercase tracking-wider rounded-full px-2.5 py-1 border"
              style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)', color: 'var(--tx-muted)' }}
            >
              Hamarosan
            </span>
          </div>
        ))}
      </div>

      <div
        className="mt-10 rounded-3xl p-8 text-center border"
        style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)' }}
      >
        <p className="text-sm font-medium mb-1" style={{ color: 'var(--tx-primary)' }}>
          Értesítést kérek, amikor elérhetők a cikkek
        </p>
        <p className="text-xs mb-4" style={{ color: 'var(--tx-muted)' }}>
          Hamarosan elindítjuk az építkezési tudástárat.
        </p>
        <span
          className="inline-flex items-center gap-2 text-xs font-semibold rounded-xl px-5 py-2.5 border"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--border)',
            color: 'var(--tx-muted)',
          }}
        >
          📧 Hamarosan elérhető
        </span>
      </div>
    </div>
  )
}

const PREVIEW_ARTICLES = [
  {
    icon: '💰',
    category: 'Árak',
    title: 'Mennyibe kerül egy családi ház építése 2026-ban?',
    desc: 'Átfogó áttekintés a jelenlegi piaci árakról, fázisonként lebontva.',
  },
  {
    icon: '📋',
    category: 'Tervezés',
    title: 'Mikor kell engedély és mennyi ideig tart?',
    desc: 'Engedélyezési típusok, határidők és a leggyakoribb csúszások okai.',
  },
  {
    icon: '🔧',
    category: 'Kivitelezés',
    title: 'Hogyan válassz megbízható kivitelezőt?',
    desc: 'Praktikus szempontok az ajánlatkéréstől a szerződéskötésig.',
  },
]
