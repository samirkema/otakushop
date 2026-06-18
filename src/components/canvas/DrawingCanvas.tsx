'use client';
import { useEffect, type RefObject } from 'react';
import type { CanvasState } from './useCanvas';

interface Props {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  state:     CanvasState;
  zoom:      number;
  onStart:   (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => void;
  onMove:    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => void;
  onEnd:     () => void;
}

export function DrawingCanvas({ canvasRef, state, zoom, onStart, onMove, onEnd }: Props) {
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const g = c.getContext('2d');
    if (!g) return;
    g.fillStyle = '#ffffff';
    g.fillRect(0, 0, c.width, c.height);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        aria-label="Canvas de dessin — roulette souris pour zoomer"
        tabIndex={0}
        className="w-full touch-none bg-white block"
        style={{
          cursor:      state.tool === 'eraser' ? 'cell' : 'crosshair',
          aspectRatio: '4/3',
          maxHeight:   '60vh',
          ...(zoom !== 1 && {
            transform:       `scale(${zoom})`,
            transformOrigin: 'top left',
          }),
        }}
        onMouseDown={onStart}
        onMouseMove={onMove}
        onMouseUp={onEnd}
        onMouseLeave={onEnd}
        onTouchStart={onStart}
        onTouchMove={onMove}
        onTouchEnd={onEnd}
      />
    </div>
  );
}
