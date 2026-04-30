import { useState, useEffect } from 'react'
import type { FormState, TimelineResult } from './types'
import { calcTimeline } from './utils/dateUtils'
import { parseShareUrl } from './utils/storageUtils'
import StickyHeader, { type TabKey } from './components/StickyHeader'
import HeroSection from './components/HeroSection'
import InputCard from './components/InputCard'
import OutputCard from './components/OutputCard'
import TimelineGantt from './components/TimelineGantt'
import MultiplierPanel from './components/MultiplierPanel'
import InsightsPanel from './components/InsightsPanel'
import RealityCheckPanel from './components/RealityCheckPanel'
import PhaseDetailCards from './components/PhaseDetailCards'
import BudgetSection from './components/BudgetSection'
import ProPreviewSection from './components/ProPreviewSection'
import FazisKalkulatorok from './components/FazisKalkulatorok'
import Cikkek from './components/Cikkek'
import Szakemberek from './components/Szakemberek'
import CTASection from './components/CTASection'
import StrategicSection from './components/StrategicSection'
import ScalabilitySection from './components/ScalabilitySection'

const DEFAULT_FORM: FormState = {
  projectKey:       'felujitas',
  startDate:        '',
  statusKey:        '0',
  sizeM2:           100,
  executionModeKey: 'vegyes',
  complexityKey:    'normal',
  qualityKey:       'normal',
}

function ProTabRedirect({ onGo }: { onGo: () => void }) {
  useEffect(() => { onGo() }, [onGo])
  return null
}

function ProEmptyState({ onGoToCalc }: { onGoToCalc: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 animate-fade-up">
      <div className="w-20 h-20 rounded-3xl border-2 border-dashed flex items-center justify-center text-3xl mb-6"
        style={{ borderColor: 'var(--border-strong)', background: 'var(--surface-subtle)' }}>
        📋
      </div>
      <h2 className="font-serif text-xl md:text-2xl font-medium mb-3" style={{ color: 'var(--tx-primary)' }}>
        Először készíts egy ütemtervet
      </h2>
      <p className="text-sm leading-relaxed max-w-md mb-8" style={{ color: 'var(--tx-muted)' }}>
        A Pro terv a megadott projektadatokra épül. Töltsd ki a fő kalkulátort, generálj
        ütemtervet, és utána megmutatjuk a részletes tervet, PDF exportot, checklistet
        és következő lépéseket.
      </p>
      <button
        type="button"
        onClick={onGoToCalc}
        className="text-sm font-semibold rounded-2xl px-6 py-3 text-white transition-all hover:scale-[1.02] active:scale-[.98]"
        style={{ background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)', boxShadow: '0 4px 14px rgba(37,99,235,.3)' }}
      >
        Vissza a fő kalkulátorhoz →
      </button>
    </div>
  )
}

export default function App() {
  const [form, setForm] = useState<FormState>(() => {
    const shared = parseShareUrl()
    return shared ? { ...DEFAULT_FORM, ...shared } : DEFAULT_FORM
  })
  const [result, setResult] = useState<TimelineResult | null>(null)
  const [activeTab, setActiveTab] = useState<TabKey>('calculator')
  const [selectedProfCategory, setSelectedProfCategory] = useState<string | null>(null)

  useEffect(() => {
    const shared = parseShareUrl()
    if (shared?.startDate) {
      const merged = { ...DEFAULT_FORM, ...shared }
      setResult(calcTimeline(
        merged.projectKey, merged.startDate, merged.statusKey,
        merged.sizeM2, merged.executionModeKey, merged.complexityKey,
      ))
    }
  }, [])

  function handleChange(updated: Partial<FormState>) {
    setForm((prev: FormState) => ({ ...prev, ...updated }))
  }

  function handleGenerate() {
    if (!form.startDate) return
    setResult(calcTimeline(
      form.projectKey, form.startDate, form.statusKey,
      form.sizeM2, form.executionModeKey, form.complexityKey,
    ))
    if (window.innerWidth < 768) {
      setTimeout(() => document.getElementById('output')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    }
  }

  function handleLoadProject(loaded: FormState) {
    setForm(loaded)
    if (loaded.startDate) {
      setResult(calcTimeline(
        loaded.projectKey, loaded.startDate, loaded.statusKey,
        loaded.sizeM2 ?? 100,
        loaded.executionModeKey ?? 'vegyes',
        loaded.complexityKey    ?? 'normal',
      ))
    }
  }

  function handleTabChange(tab: TabKey) {
    setActiveTab(tab)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleNavigateToProfessional(category: string) {
    setSelectedProfCategory(category)
    setActiveTab('szakemberek')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--page-bg)' }}>
      <StickyHeader
        form={form}
        result={result}
        onLoadProject={handleLoadProject}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* ── Fő kalkulátor ── */}
        {activeTab === 'calculator' && (
          <>
            <HeroSection />

            <section id="calculator" className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <InputCard form={form} onChange={handleChange} onGenerate={handleGenerate} />
                <div id="output">
                  <OutputCard result={result} />
                </div>
              </div>
            </section>

            {result !== null && (
              <>
                <TimelineGantt result={result} statusKey={form.statusKey} onNavigateToProfessional={handleNavigateToProfessional} />
                <MultiplierPanel result={result} />
                <InsightsPanel result={result} />
                <RealityCheckPanel result={result} />
                <PhaseDetailCards result={result} />
                <BudgetSection form={form} />
                <div id="pro-preview">
                  <ProPreviewSection />
                </div>
              </>
            )}

            <CTASection />
          </>
        )}

        {/* ── Fázis kalkulátorok ── */}
        {activeTab === 'fazis' && <FazisKalkulatorok />}

        {/* ── Cikkek ── */}
        {activeTab === 'cikkek' && <Cikkek />}

        {/* ── Szakemberek ── */}
        {activeTab === 'szakemberek' && (
          <Szakemberek
            initialCategory={selectedProfCategory}
            onCategoryConsumed={() => setSelectedProfCategory(null)}
          />
        )}

        {/* ── Pro terv — shows empty state or scrolls to pro content ── */}
        {activeTab === 'pro' && (
          result !== null ? (
            <ProTabRedirect onGo={() => {
              setActiveTab('calculator')
              setTimeout(() => {
                document.getElementById('pro-preview')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }, 100)
            }} />
          ) : (
            <ProEmptyState onGoToCalc={() => { setActiveTab('calculator'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
          )
        )}

        {/* ── Befektetői vízió ── */}
        {activeTab === 'vizió' && (
          <div>
            <StrategicSection />
            <ScalabilitySection />
          </div>
        )}

      </div>
    </div>
  )
}
