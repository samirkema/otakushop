'use client';
import type { CanvasState, Tool } from './useCanvas';

const COLORS = [
  '#000000', '#ef4444', '#3b82f6', '#22c55e',
  '#f59e0b', '#8b5cf6', '#ec4899', '#ffffff',
] as const;

const SIZES = [2, 5, 10, 20] as const;

interface Props {
  state:       CanvasState;
  canUndo:     boolean;
  zoom:        number;
  onChange:    (s: CanvasState) => void;
  onUndo:      () => void;
  onClear:     () => void;
  onShare:     () => void;
  sharing:     boolean;
  onZoomReset: () => void;
}

export function Toolbar({ state, canUndo, zoom, onChange, onUndo, onClear, onShare, sharing, onZoomReset }: Props) {
  const patch = (p: Partial<CanvasState>) => onChange({ ...state, ...p });

  return (
    <div className="flex flex-wrap items-center gap-3 bg-white rounded-xl border border-gray-200 px-4 py-3">
      {/* Outil */}
      <div className="flex gap-1" role="group" aria-label="Outil de dessin">
        {(['pen', 'eraser'] as Tool[]).map(t => (
          <button
            key={t}
            onClick={() => patch({ tool: t })}
            aria-pressed={state.tool === t}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              state.tool === t
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {t === 'pen' ? '✏️ Crayon' : '◻ Gomme'}
          </button>
        ))}
      </div>

      <div className="h-6 w-px bg-gray-200" aria-hidden="true" />

      {/* Couleurs */}
      <div className="flex gap-1.5 items-center" role="group" aria-label="Couleur du pinceau">
        {COLORS.map(c => (
          <button
            key={c}
            title={c}
            onClick={() => patch({ color: c, tool: 'pen' })}
            aria-pressed={state.color === c && state.tool === 'pen'}
            className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              state.color === c && state.tool === 'pen'
                ? 'border-indigo-500 scale-110'
                : 'border-gray-300'
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>

      <div className="h-6 w-px bg-gray-200" aria-hidden="true" />

      {/* Taille */}
      <div className="flex gap-1 items-center" role="group" aria-label="Taille du pinceau">
        {SIZES.map(s => (
          <button
            key={s}
            onClick={() => patch({ brushSize: s })}
            title={`${s} px`}
            aria-pressed={state.brushSize === s}
            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
              state.brushSize === s
                ? 'bg-indigo-100 border border-indigo-400'
                : 'hover:bg-gray-100'
            }`}
          >
            <span
              className="block rounded-full bg-gray-700"
              style={{ width: Math.min(s * 1.8, 22), height: Math.min(s * 1.8, 22) }}
            />
          </button>
        ))}
      </div>

      <div className="h-6 w-px bg-gray-200" aria-hidden="true" />

      {/* Zoom */}
      <div className="flex items-center gap-1.5" aria-label="Niveau de zoom">
        <span className="text-xs text-gray-500 tabular-nums">{Math.round(zoom * 100)}%</span>
        {zoom !== 1 && (
          <button
            onClick={onZoomReset}
            title="Réinitialiser le zoom"
            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors"
          >
            1:1
          </button>
        )}
      </div>

      <div className="flex-1" />

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ↩ Annuler
        </button>
        <button
          onClick={onClear}
          className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          Effacer
        </button>
        <button
          onClick={onShare}
          disabled={sharing}
          className="px-4 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:opacity-50 transition-colors"
        >
          {sharing ? 'Partage…' : '↑ Partager'}
        </button>
      </div>
    </div>
  );
}
