import React, { useEffect, useRef } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const DeleteConfirmationDialog: React.FC = () => {
  const deleteConfirmation = useAppStore((state) => state.deleteConfirmation);
  const resolveDeleteConfirmation = useAppStore((state) => state.resolveDeleteConfirmation);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!deleteConfirmation) return;
    confirmButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') resolveDeleteConfirmation(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deleteConfirmation, resolveDeleteConfirmation]);

  if (!deleteConfirmation) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) resolveDeleteConfirmation(false);
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-confirmation-title"
        aria-describedby="delete-confirmation-description"
        className="w-full max-w-md rounded-2xl border border-[var(--color-border-primary)] bg-[var(--color-bg-card)] p-5 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-full bg-red-50 p-2 text-red-600 dark:bg-red-950/40 dark:text-red-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h2 id="delete-confirmation-title" className="text-base font-semibold text-[var(--color-text-primary)]">
                {deleteConfirmation.title}
              </h2>
              <p id="delete-confirmation-description" className="mt-1.5 text-sm leading-6 text-[var(--color-text-secondary)]">
                {deleteConfirmation.description}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => resolveDeleteConfirmation(false)}
            className="rounded-lg p-1 text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)]"
            aria-label="Close deletion confirmation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => resolveDeleteConfirmation(false)}
            className="rounded-lg border border-[var(--color-border-primary)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]"
          >
            {deleteConfirmation.cancelLabel ?? 'Cancel'}
          </button>
          <button
            ref={confirmButtonRef}
            type="button"
            onClick={() => resolveDeleteConfirmation(true)}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            {deleteConfirmation.confirmLabel ?? 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};
