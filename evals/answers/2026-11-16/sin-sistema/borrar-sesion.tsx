import { useEffect, useId, useRef } from "react";

type DeleteSessionSheetProps = {
  open: boolean;
  sessionName?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function DeleteSessionSheet({
  open,
  sessionName,
  loading = false,
  onConfirm,
  onCancel,
}: DeleteSessionSheetProps) {
  const titleId = useId();
  const descId = useId();
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    cancelRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onCancel();
    };
    document.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, loading, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-black/50"
        aria-hidden="true"
        onClick={() => !loading && onCancel()}
      />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="relative w-full max-w-md rounded-t-2xl bg-white p-6 shadow-xl sm:rounded-2xl dark:bg-neutral-900"
      >
        <div
          className="mx-auto mb-4 h-1 w-10 rounded-full bg-neutral-300 sm:hidden dark:bg-neutral-700"
          aria-hidden="true"
        />

        <h2
          id={titleId}
          className="text-lg font-semibold text-neutral-900 dark:text-neutral-50"
        >
          ¿Borrar esta sesión?
        </h2>

        <p
          id={descId}
          className="mt-2 text-sm text-neutral-600 dark:text-neutral-300"
        >
          {sessionName ? (
            <>
              Vas a borrar <strong>{sessionName}</strong>.{" "}
            </>
          ) : null}
          Se perderá su registro de ejercicios y series. Esta acción no se
          puede deshacer.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-300 px-5 text-sm font-medium text-neutral-900 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-50 dark:hover:bg-neutral-800 dark:focus-visible:ring-neutral-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            aria-busy={loading}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-red-600 px-5 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:opacity-60"
          >
            {loading ? "Borrando…" : "Borrar sesión"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteSessionSheet;
