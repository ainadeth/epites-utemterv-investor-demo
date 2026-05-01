/**
 * Modal — renders through a React portal to document.body.
 * This makes it immune to overflow:hidden, transform, backdrop-filter,
 * and sticky/fixed ancestors that would otherwise trap fixed positioning.
 */
import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import React from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  /** 'sm'≈384px  'md'≈512px  'lg'≈672px  'xl'≈896px  default='md' */
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const SIZE_MAP = {
  sm:  'sm:max-w-sm',
  md:  'sm:max-w-md',
  lg:  'sm:max-w-2xl',
  xl:  'sm:max-w-4xl',
}

export function Modal({ isOpen, onClose, children, size = 'md' }: ModalProps) {
  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div
      // Overlay — covers everything including sticky header
      className="fixed inset-0 flex items-end sm:items-center justify-center sm:p-6"
      style={{
        zIndex: 9999,
        background: 'rgba(0,0,0,.48)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      }}
      onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
        // Close when clicking the backdrop (not the panel itself)
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {/* Panel */}
      <div
        className={`relative w-full ${SIZE_MAP[size]} flex flex-col rounded-t-3xl sm:rounded-3xl overflow-hidden`}
        style={{
          background: 'var(--surface)',
          boxShadow: '0 24px 80px rgba(0,0,0,.28)',
          maxHeight: '92dvh',
        }}
        onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}  // don't bubble to overlay
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}

/** Standard close button — put inside the modal header */
export function ModalCloseBtn({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="w-8 h-8 rounded-xl flex items-center justify-center border transition-all hover:scale-105 shrink-0"
      style={{ borderColor: 'var(--border)', color: 'var(--tx-muted)', background: 'var(--surface-subtle)' }}
      aria-label="Bezárás"
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </button>
  )
}

/** Scrollable body region of a modal */
export function ModalBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-y-auto flex-1 px-6 py-5 ${className}`}>
      {children}
    </div>
  )
}

/** Standard header row */
export function ModalHeader({
  title, subtitle, onClose,
}: { title: ReactNode; subtitle?: ReactNode; onClose: () => void }) {
  return (
    <div
      className="flex items-center justify-between gap-3 px-6 py-5 border-b shrink-0"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--tx-primary)' }}>{title}</p>
        {subtitle && (
          <p className="text-[11px] mt-0.5" style={{ color: 'var(--tx-muted)' }}>{subtitle}</p>
        )}
      </div>
      <ModalCloseBtn onClose={onClose} />
    </div>
  )
}

/** Standard footer row */
export function ModalFooter({ children }: { children: ReactNode }) {
  return (
    <div
      className="px-6 py-4 border-t shrink-0 flex items-center justify-between gap-3"
      style={{ borderColor: 'var(--border)', background: 'var(--surface-subtle)' }}
    >
      {children}
    </div>
  )
}
