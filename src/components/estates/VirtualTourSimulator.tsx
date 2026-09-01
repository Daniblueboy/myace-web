'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Expand, Info, Maximize2, Minus, MoveHorizontal, Pause, Play, Plus, RotateCcw, X } from 'lucide-react';

type VirtualTourSimulatorProps = { estateName: string; images: string[] };

export function VirtualTourSimulator({ estateName, images }: VirtualTourSimulatorProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number; pan: number } | null>(null);
  const [scene, setScene] = useState(0);
  const [pan, setPan] = useState(50);
  const [zoom, setZoom] = useState(1.12);
  const [autoRotate, setAutoRotate] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const resetView = useCallback(() => {
    setPan(50);
    setZoom(1.12);
    setAutoRotate(false);
  }, []);

  const selectScene = useCallback((index: number) => {
    setScene((index + images.length) % images.length);
    setPan(50);
    setZoom(1.12);
  }, [images.length]);

  useEffect(() => {
    if (!autoRotate) return;
    const timer = window.setInterval(() => {
      setPan((current) => (current >= 88 ? 12 : current + 0.18));
    }, 30);
    return () => window.clearInterval(timer);
  }, [autoRotate]);

  const updatePan = (clientX: number) => {
    if (!dragStart.current || !viewportRef.current) return;
    const delta = ((clientX - dragStart.current.x) / viewportRef.current.clientWidth) * 70;
    setPan(Math.max(8, Math.min(92, dragStart.current.pan - delta)));
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStart.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  if (images.length === 0) return null;

  const controlClass = 'inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white shadow-sm transition hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white';

  return (
    <div
      ref={viewportRef}
      className="group relative isolate h-[360px] touch-none overflow-hidden rounded-2xl bg-[#090b10] text-white shadow-2xl md:h-[500px]"
      onPointerDown={(event) => {
        if ((event.target as HTMLElement).closest('button')) return;
        dragStart.current = { x: event.clientX, pan };
        event.currentTarget.setPointerCapture(event.pointerId);
        setAutoRotate(false);
      }}
      onPointerMove={(event) => updatePan(event.clientX)}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') setPan((value) => Math.max(8, value - 4));
        if (event.key === 'ArrowRight') setPan((value) => Math.min(92, value + 4));
        if (event.key === '+' || event.key === '=') setZoom((value) => Math.min(1.55, value + 0.1));
        if (event.key === '-') setZoom((value) => Math.max(1, value - 0.1));
      }}
      role="application"
      tabIndex={0}
      aria-label={`Interactive virtual tour simulation of ${estateName}. Drag or use arrow keys to look around.`}
    >
      <img
        src={images[scene]}
        alt={`${estateName} virtual tour scene ${scene + 1}`}
        draggable={false}
        className="absolute inset-0 h-full w-full select-none object-cover transition-transform duration-150 ease-out"
        style={{ objectPosition: `${pan}% center`, transform: `scale(${zoom})` }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/70" />

      <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3">
        <div className="rounded-xl bg-black/60 px-3 py-2 shadow-lg backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Virtual tour simulation</p>
          <p className="mt-0.5 text-sm font-medium">{estateName} · Scene {scene + 1} of {images.length}</p>
        </div>
        <button type="button" className={controlClass} onClick={() => setShowHelp((value) => !value)} aria-label="Tour instructions">
          <Info className="h-4 w-4" />
        </button>
      </div>

      {showHelp && (
        <div className="absolute right-4 top-16 z-20 max-w-xs rounded-xl border border-white/15 bg-black/80 p-4 text-sm shadow-xl backdrop-blur-md">
          <button type="button" className="absolute right-2 top-2 text-white/70 hover:text-white" onClick={() => setShowHelp(false)} aria-label="Close instructions">
            <X className="h-4 w-4" />
          </button>
          <p className="pr-6 font-semibold">Explore the scene</p>
          <p className="mt-1 text-white/75">Drag or swipe to look around. Use the controls to zoom, rotate, reset, or enter fullscreen.</p>
        </div>
      )}

      {images.length > 1 && (
        <button
          type="button"
          onClick={() => selectScene(scene + 1)}
          className="absolute left-[68%] top-[48%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-xs font-semibold drop-shadow-lg"
          aria-label={`Move to scene ${(scene + 1) % images.length + 1}`}
        >
          <span className="flex h-12 w-12 animate-pulse items-center justify-center rounded-full border-2 border-white bg-primary/90 shadow-[0_0_0_8px_rgb(255_255_255/0.15)]">
            <Expand className="h-5 w-5" />
          </span>
          Next view
        </button>
      )}

      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3">
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/55 p-1.5 shadow-lg backdrop-blur-sm">
          <button type="button" className={controlClass} onClick={() => setAutoRotate((value) => !value)} aria-label={autoRotate ? 'Pause automatic rotation' : 'Start automatic rotation'}>
            {autoRotate ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button type="button" className={controlClass} onClick={() => setZoom((value) => Math.min(1.55, value + 0.1))} aria-label="Zoom in"><Plus className="h-4 w-4" /></button>
          <button type="button" className={controlClass} onClick={() => setZoom((value) => Math.max(1, value - 0.1))} aria-label="Zoom out"><Minus className="h-4 w-4" /></button>
          <button type="button" className={controlClass} onClick={resetView} aria-label="Reset tour view"><RotateCcw className="h-4 w-4" /></button>
          <button type="button" className={controlClass} onClick={() => viewportRef.current?.requestFullscreen()} aria-label="Enter fullscreen tour"><Maximize2 className="h-4 w-4" /></button>
        </div>
        <div className="hidden items-center gap-2 rounded-full bg-black/55 px-3 py-2 text-xs text-white/75 backdrop-blur-sm sm:flex">
          <MoveHorizontal className="h-4 w-4" /> Drag to explore
        </div>
      </div>
    </div>
  );
}
