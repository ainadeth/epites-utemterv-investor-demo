import type { TimelineResult, FormState } from '../types'
import { formatDate } from './dateUtils'
import { PROJECTS } from '../data/projects'

export function exportToPDF(result: TimelineResult, form: FormState): void {
  const project = PROJECTS[form.projectKey]
  const visibleRows = result.rows.filter((r) => r.kind === 'phase' && !r.hidden)
  const phaseRowsAll = result.rows.filter((r) => r.kind === 'phase')

  const html = `<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8"/>
  <title>Építkezési ütemterv – ${project.label}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 13px;
      color: #1a1a1a;
      background: white;
      padding: 40px;
    }
    .header {
      border-bottom: 3px solid #2563EB;
      padding-bottom: 20px;
      margin-bottom: 28px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .brand { font-size: 11px; color: #6B7280; letter-spacing: 0.1em; text-transform: uppercase; }
    h1 { font-size: 22px; font-weight: 700; color: #111827; margin-bottom: 4px; }
    .subtitle { color: #6B7280; font-size: 13px; }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 28px;
    }
    .summary-card {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      padding: 14px 16px;
    }
    .summary-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #94A3B8; margin-bottom: 4px; }
    .summary-value { font-size: 15px; font-weight: 700; color: #1E293B; }
    h2 { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748B; margin-bottom: 12px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 28px; }
    thead tr { background: #F1F5F9; }
    th {
      text-align: left;
      padding: 10px 12px;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #94A3B8;
      font-weight: 600;
    }
    td { padding: 11px 12px; border-bottom: 1px solid #F1F5F9; font-size: 12.5px; }
    tr:last-child td { border-bottom: none; }
    .badge {
      display: inline-block;
      background: #DBEAFE;
      color: #1D4ED8;
      border-radius: 6px;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 600;
    }
    .hidden-row { opacity: 0.4; }
    .buffer-row td { background: #FAFAFA; }
    .hidden-row td { text-decoration: line-through; font-style: italic; color: #9CA3AF; }
    .footer {
      margin-top: 32px;
      padding-top: 16px;
      border-top: 1px solid #E2E8F0;
      font-size: 10px;
      color: #9CA3AF;
      display: flex;
      justify-content: space-between;
    }
    /* Gantt */
    .gantt-section { margin-bottom: 28px; }
    .gantt-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
    .gantt-label { width: 160px; font-size: 11px; color: #374151; text-align: right; flex-shrink: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .gantt-track { flex: 1; height: 20px; position: relative; background: #F8FAFC; border-radius: 4px; }
    .gantt-bar { position: absolute; top: 0; height: 100%; border-radius: 4px; }
    .gantt-dur { width: 40px; font-size: 10px; color: #9CA3AF; text-align: right; flex-shrink: 0; }
    @media print {
      body { padding: 20px; }
      @page { margin: 1cm; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">Építkezési ütemtervkészítő</div>
      <h1>${project.label}</h1>
      <div class="subtitle">Generálva: ${formatDate(new Date())} · ${result.sizeM2} m² · Méret szorzó: ${result.finalMultiplier.toFixed(2)}×</div>
    </div>
    <div style="text-align:right">
      <div class="brand">Teljes időtartam</div>
      <div style="font-size:22px;font-weight:700;color:#2563EB">${result.totalDays} nap</div>
    </div>
  </div>

  <div class="summary-grid">
    <div class="summary-card">
      <div class="summary-label">Kezdés</div>
      <div class="summary-value">${formatDate(result.projectStart)}</div>
    </div>
    <div class="summary-card">
      <div class="summary-label">Várható befejezés</div>
      <div class="summary-value">${formatDate(result.projectEnd)}</div>
    </div>
    <div class="summary-card">
      <div class="summary-label">Aktív fázisok</div>
      <div class="summary-value">${visibleRows.length} / ${phaseRowsAll.length}</div>
    </div>
    <div class="summary-card">
      <div class="summary-label">Várakozási idő</div>
      <div class="summary-value">${result.totalBufferDays} nap</div>
    </div>
  </div>

  <h2>Fázisok ütemezése</h2>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Fázis neve</th>
        <th>Kezdés</th>
        <th>Befejezés</th>
        <th>Időtartam</th>
      </tr>
    </thead>
    <tbody>
      ${result.rows.map((row) => {
        const isBuffer = row.kind === 'buffer'
        const numCell = isBuffer ? '↳' : row.num
        const nameCell = isBuffer ? `<em style="color:#6B7280;font-size:11px">${row.name}</em>` : row.name
        const rowClass = row.hidden ? 'hidden-row' : isBuffer ? 'buffer-row' : ''
        return `
        <tr class="${rowClass}">
          <td style="${isBuffer ? 'color:#9CA3AF;font-size:11px' : ''}">${numCell}</td>
          <td>${nameCell}</td>
          <td>${row.hidden ? '–' : formatDate(row.start)}</td>
          <td>${row.hidden ? '–' : formatDate(row.end)}</td>
          <td>${row.hidden ? '–' : `<span class="badge" style="${isBuffer ? 'background:#F3F4F6;color:#6B7280;border:1px dashed #D1D5DB' : ''}">${row.days} nap</span>`}</td>
        </tr>`
      }).join('')}
    </tbody>
  </table>

  ${visibleRows.length > 0 ? `
  <h2>Gantt-áttekintés</h2>
  <div class="gantt-section">
    ${result.rows.map((row) => {
      const colors = ['#3B82F6','#8B5CF6','#10B981','#F59E0B','#EC4899','#06B6D4','#6366F1']
      const isBuffer = row.kind === 'buffer'
      const pidx = isBuffer ? row.phaseNum - 1 : row.num - 1
      const offset = Math.round((row.start.getTime() - result.projectStart.getTime()) / 86400000)
      const leftPct = (offset / result.totalDays) * 100
      const widthPct = (row.days / result.totalDays) * 100
      const baseColor = colors[pidx % colors.length]
      const color = row.hidden ? '#E5E7EB' : baseColor
      const label = isBuffer ? `↳ ${row.name}` : `${row.num}. ${row.name}`
      const barStyle = isBuffer
        ? `left:${leftPct}%;width:${widthPct}%;background:transparent;border:1.5px dashed ${color};opacity:${row.hidden ? 0.2 : 0.7}`
        : `left:${leftPct}%;width:${widthPct}%;background:${color};opacity:${row.hidden ? 0.3 : 0.85}`
      return `
      <div class="gantt-row" style="${isBuffer ? 'margin-bottom:2px' : ''}">
        <div class="gantt-label" style="${isBuffer ? 'font-style:italic;color:#9CA3AF;font-size:10px' : ''}">${label}</div>
        <div class="gantt-track" style="${isBuffer ? 'height:14px' : ''}">
          <div class="gantt-bar" style="${barStyle}"></div>
        </div>
        <div class="gantt-dur" style="${isBuffer ? 'color:#9CA3AF;font-style:italic' : ''}">${row.days}n</div>
      </div>`
    }).join('')}
  </div>
  ` : ''}

  <div class="footer">
    <span>Épülő ütemterv – automatikusan generált dokumentum</span>
    <span>${formatDate(new Date())}</span>
  </div>
</body>
</html>`

  const win = window.open('', '_blank')
  if (!win) return
  win.document.write(html)
  win.document.close()
  win.onload = () => {
    setTimeout(() => {
      win.print()
    }, 300)
  }
}
