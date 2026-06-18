'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useCanvas, type CanvasState } from './useCanvas';
import { DrawingCanvas } from './DrawingCanvas';
import { Toolbar } from './Toolbar';
import type { RemixData } from './RemixClientPage';

interface Tableau {
  id:        string;
  title:     string;
  thumbnail: string;
}

interface Props {
  tableaux:  Tableau[];
  onCreated: (remix: RemixData) => void;
}

const DEFAULT_STATE: CanvasState = { tool: 'pen', color: '#000000', brushSize: 5 };

export function RemixStudio({ tableaux, onCreated }: Props) {
  const {
    canvasRef, startDraw, draw, endDraw, undo, clear, getBlob,
    canUndo, zoom, resetZoom, hasDrawnRef,
  } = useCanvas();
  const [toolState, setToolState] = useState<CanvasState>(DEFAULT_STATE);
  const [photoId,   setPhotoId]   = useState(tableaux[0]?.id ?? '');
  const [sharing,   setSharing]   = useState(false);
  const [msg,       setMsg]       = useState<{ ok: boolean; text: string } | null>(null);

  async function share() {
    if (!photoId) {
      setMsg({ ok: false, text: 'Sélectionnez un tableau à remixer.' });
      return;
    }
    if (!hasDrawnRef.current) {
      setMsg({ ok: false, text: 'Dessinez quelque chose avant de partager.' });
      return;
    }
    setSharing(true);
    setMsg(null);

    const blob = await getBlob();
    if (!blob) {
      setMsg({ ok: false, text: 'Erreur lors de la lecture du canvas.' });
      setSharing(false);
      return;
    }

    const form = new FormData();
    form.set('file',    new File([blob], 'remix.png', { type: 'image/png' }));
    form.set('photoId', photoId);

    const res  = await fetch('/api/remixes', { method: 'POST', body: form });
    const json = await res.json() as { remix?: RemixData; error?: string };

    if (!res.ok || !json.remix) {
      setMsg({ ok: false, text: json.error ?? 'Erreur lors du partage.' });
      setSharing(false);
      return;
    }

    setMsg({ ok: true, text: 'Remix partagé avec succès !' });
    setSharing(false);
    onCreated(json.remix);
  }

  return (
    <div className="space-y-4">
      {/* Sélecteur de tableau */}
      {tableaux.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Tableau source</p>
          <div className="flex gap-3 flex-wrap">
            {tableaux.map(t => (
              <button
                key={t.id}
                onClick={() => setPhotoId(t.id)}
                aria-pressed={photoId === t.id}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-colors ${
                  photoId === t.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={t.thumbnail}
                    alt={t.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <span className="text-xs text-gray-600 max-w-[72px] truncate">{t.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {tableaux.length === 0 && (
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          Aucun tableau disponible pour remixer.
        </p>
      )}

      {/* Canvas */}
      <DrawingCanvas
        canvasRef={canvasRef}
        state={toolState}
        zoom={zoom}
        onStart={e => startDraw(e, toolState)}
        onMove={e  => draw(e, toolState)}
        onEnd={endDraw}
      />

      {/* Barre d'outils */}
      <Toolbar
        state={toolState}
        canUndo={canUndo}
        zoom={zoom}
        onChange={setToolState}
        onUndo={undo}
        onClear={clear}
        onShare={share}
        sharing={sharing}
        onZoomReset={resetZoom}
      />

      {msg && (
        <p
          role="status"
          className={`text-sm ${msg.ok ? 'text-green-600' : 'text-red-600'}`}
        >
          {msg.text}
        </p>
      )}
    </div>
  );
}
