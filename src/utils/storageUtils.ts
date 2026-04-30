import type { FormState } from '../types'

const STORAGE_KEY = 'epites_saved_projects'

export interface SavedProject {
  id: string
  name: string
  savedAt: string
  form: FormState
}

// ── LocalStorage ───────────────────────────────────────────────────────────

export function loadSavedProjects(): SavedProject[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as SavedProject[]) : []
  } catch { return [] }
}

export function saveProject(name: string, form: FormState): SavedProject {
  const project: SavedProject = { id: Date.now().toString(), name, savedAt: new Date().toISOString(), form }
  const updated = [project, ...loadSavedProjects()].slice(0, 10)
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)) } catch {}
  return project
}

export function deleteSavedProject(id: string): void {
  const updated = loadSavedProjects().filter(p => p.id !== id)
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)) } catch {}
}

// ── URL share params ───────────────────────────────────────────────────────

export function formToShareUrl(form: FormState): string {
  const params = new URLSearchParams({
    type:    form.projectKey,
    start:   form.startDate,
    status:  form.statusKey,
    size:    String(form.sizeM2 ?? 100),
    exec:    form.executionModeKey ?? 'vegyes',
    complex: form.complexityKey    ?? 'normal',
    quality: form.qualityKey       ?? 'normal',
  })
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`
}

export function parseShareUrl(): Partial<FormState> | null {
  try {
    const p = new URLSearchParams(window.location.search)
    const type = p.get('type'), start = p.get('start'), status = p.get('status')
    if (!type || !start || !status) return null
    return {
      projectKey:       type   as FormState['projectKey'],
      startDate:        start,
      statusKey:        status as FormState['statusKey'],
      sizeM2:           p.get('size')    ? Math.min(1000, Math.max(10, Number(p.get('size')))) : 100,
      executionModeKey: (p.get('exec')    ?? 'vegyes')  as FormState['executionModeKey'],
      complexityKey:    (p.get('complex') ?? 'normal')  as FormState['complexityKey'],
      qualityKey:       (p.get('quality') ?? 'normal')  as FormState['qualityKey'],
    }
  } catch { return null }
}

// ── Helpers ────────────────────────────────────────────────────────────────

export function formatSavedAt(iso: string): string {
  try {
    const d = new Date(iso)
    return d.getFullYear() + '. ' + String(d.getMonth()+1).padStart(2,'0') + '. ' + String(d.getDate()).padStart(2,'0') + '.'
  } catch { return '–' }
}
