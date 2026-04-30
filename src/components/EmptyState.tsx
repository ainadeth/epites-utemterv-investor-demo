export default function EmptyState() {
  const steps = [
    { n: '1', text: 'Válasszon projekt típust' },
    { n: '2', text: 'Adja meg a kezdési dátumot' },
    { n: '3', text: 'Kattintson a generálásra' },
  ]
  return (
    <div className="flex flex-col items-center justify-center py-14 px-8 text-center">
      <div className="relative mb-5">
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-3xl border-2 border-dashed"
          style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border-strong)' }}>🏗️</div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>✨</div>
      </div>
      <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--tx-primary)' }}>Készen áll az ütemterv</h3>
      <p className="text-sm leading-relaxed max-w-xs mb-7" style={{ color: 'var(--tx-muted)' }}>
        Adja meg a projekt adatait, majd generálja le az első ütemtervet.
      </p>
      <ol className="flex flex-col gap-2.5 w-full max-w-xs">
        {steps.map(s => (
          <li key={s.n} className="flex items-center gap-3 rounded-2xl px-4 py-3 border text-sm"
            style={{ background: 'var(--surface-subtle)', borderColor: 'var(--border)', color: 'var(--tx-secondary)' }}>
            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 shrink-0">{s.n}</span>
            {s.text}
          </li>
        ))}
      </ol>
    </div>
  )
}
