'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { MangaKind } from '@/lib/supabase/types';

interface MangaReaderProps {
  pages: string[];
  kind: MangaKind;
  workId: string;
  initialPage: number;
  title: string;
}

// ─── Sauvegarde debounced ─────────────────────────────────────────────────────

function useSaveProgress(workId: string) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (page: number) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        fetch('/api/reading-progress', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ workId, pageNumber: page }),
        }).catch(() => {});
      }, 1000);
    },
    [workId],
  );
}

// ─── Mode Webtoon (scroll vertical continu) ───────────────────────────────────

function WebtoonReader({
  pages,
  workId,
  initialPage,
  title,
}: {
  pages: string[];
  workId: string;
  initialPage: number;
  title: string;
}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const saveProgress = useSaveProgress(workId);

  // Scroll vers la page initiale au montage (reprise de lecture)
  useEffect(() => {
    if (initialPage > 1) {
      containerRefs.current[initialPage - 1]?.scrollIntoView({ behavior: 'instant' });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Détecte la page courante via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let best: { idx: number; ratio: number } | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = containerRefs.current.indexOf(entry.target as HTMLDivElement);
          if (idx === -1) continue;
          if (!best || entry.intersectionRatio > best.ratio) {
            best = { idx, ratio: entry.intersectionRatio };
          }
        }
        if (best !== null) {
          const page = best.idx + 1;
          setCurrentPage(page);
          saveProgress(page);
        }
      },
      { threshold: [0.25, 0.5, 0.75] },
    );

    const els = containerRefs.current;
    els.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [saveProgress]);

  return (
    <div className="flex flex-col items-center bg-gray-950">
      {/* Barre de progression */}
      <div className="sticky top-14 z-30 w-full bg-gray-900/90 backdrop-blur-sm text-center py-1.5 text-xs text-gray-400">
        {title} — {currentPage} / {pages.length}
      </div>

      {pages.map((url, i) => (
        <div
          key={i}
          ref={(el) => { containerRefs.current[i] = el; }}
          className="w-full max-w-2xl"
        >
          <Image
            src={url}
            alt={`${title} — page ${i + 1}`}
            width={0}
            height={0}
            sizes="(max-width: 672px) 100vw, 672px"
            style={{ width: '100%', height: 'auto' }}
            priority={i < 3}
          />
        </div>
      ))}

      <div className="py-8 text-gray-500 text-sm">— Fin —</div>
    </div>
  );
}

// ─── Mode Manga / BD (page par page) ─────────────────────────────────────────

function PageReader({
  pages,
  workId,
  initialPage,
  title,
}: {
  pages: string[];
  workId: string;
  initialPage: number;
  title: string;
}) {
  const [current, setCurrent] = useState(Math.max(1, Math.min(initialPage, pages.length)));
  const saveProgress = useSaveProgress(workId);
  const total = pages.length;

  const goTo = useCallback(
    (page: number) => {
      const clamped = Math.max(1, Math.min(page, total));
      setCurrent(clamped);
      saveProgress(clamped);
      window.scrollTo({ top: 0, behavior: 'instant' });
    },
    [total, saveProgress],
  );

  // Navigation clavier
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(current + 1);
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goTo(current - 1);
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [current, goTo]);

  const url = pages[current - 1];

  return (
    <div className="flex flex-col items-center bg-gray-950 min-h-screen">
      {/* Barre de navigation */}
      <div className="sticky top-14 z-30 w-full bg-gray-900/90 backdrop-blur-sm flex items-center justify-between px-4 py-2 text-sm text-gray-300">
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 1}
          aria-label="Page précédente"
          className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← Préc.
        </button>
        <span className="tabular-nums">{title} — {current} / {total}</span>
        <button
          onClick={() => goTo(current + 1)}
          disabled={current === total}
          aria-label="Page suivante"
          className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Suiv. →
        </button>
      </div>

      {/* Page courante */}
      <div className="w-full max-w-2xl px-0 py-0 flex-1 flex items-start justify-center">
        <Image
          src={url}
          alt={`${title} — page ${current}`}
          width={0}
          height={0}
          sizes="(max-width: 672px) 100vw, 672px"
          style={{ width: '100%', height: 'auto' }}
          priority
        />
      </div>

      {/* Navigation bas */}
      <div className="flex gap-4 py-6">
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 1}
          aria-label="Page précédente"
          className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← Préc.
        </button>
        <button
          onClick={() => goTo(current + 1)}
          disabled={current === total}
          aria-label="Page suivante"
          className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Suiv. →
        </button>
      </div>
    </div>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────

export function MangaReader({ pages, kind, workId, initialPage, title }: MangaReaderProps) {
  if (kind === 'webtoon') {
    return (
      <WebtoonReader
        pages={pages}
        workId={workId}
        initialPage={initialPage}
        title={title}
      />
    );
  }

  return (
    <PageReader
      pages={pages}
      workId={workId}
      initialPage={initialPage}
      title={title}
    />
  );
}

// ─── Bandeau reprise de lecture ───────────────────────────────────────────────

export function ResumePrompt({
  savedPage,
  total,
  title,
  onResume,
  onRestart,
}: {
  savedPage: number;
  total: number;
  title: string;
  onResume: () => void;
  onRestart: () => void;
}) {
  return (
    <div
      role="alertdialog"
      aria-label="Reprendre la lecture"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white rounded-xl shadow-2xl px-6 py-4 flex flex-col sm:flex-row items-center gap-4 max-w-sm w-full mx-4"
    >
      <p className="text-sm text-center sm:text-left">
        <span className="font-semibold">{title}</span> — reprendre à la page {savedPage} / {total} ?
      </p>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={onResume}
          className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors"
        >
          Reprendre
        </button>
        <button
          onClick={onRestart}
          className="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
        >
          Début
        </button>
      </div>
    </div>
  );
}
