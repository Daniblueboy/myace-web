'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useId } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Info,
  Maximize2,
  Move,
  Pause,
  Play,
  Plus,
  Minus,
  RotateCcw,
  X,
} from 'lucide-react';

type PanoramaViewer = {
  destroy: () => void;
  getHfov: () => number;
  setHfov: (hfov: number, animated?: boolean) => void;
  getPitch: () => number;
  getYaw: () => number;
  lookAt: (pitch: number, yaw: number, hfov: number, animated?: boolean) => void;
  startAutoRotate: (speed?: number) => void;
  stopAutoRotate: () => void;
  toggleFullscreen: () => void;
  loadScene: (sceneId: string, pitch?: number, yaw?: number, hfov?: number) => void;
  getScene: () => string;
};
type PannellumWindow = Window & {
  pannellum?: {
    viewer: (containerId: string, options: Record<string, unknown>) => PanoramaViewer;
  };
};

interface PropertyPanoramaProps {
  panoramaUrls: string[];
  estateName?: string;
}

const MIN_HFOV = 50;
const MAX_HFOV = 120;

export default function PropertyPanorama({ panoramaUrls, estateName }: PropertyPanoramaProps) {
  const containerId = useId().replace(/:/g, '');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<PanoramaViewer | null>(null);
  const initialViewRef = useRef({ pitch: 0, yaw: 0, hfov: 100 });
  const [ready, setReady] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);

  const sceneIds = useMemo(() => panoramaUrls.map((_, i) => `scene${i}`), [panoramaUrls]);

  useEffect(() => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-pannellum="true"]',
    );
    const existingStyle = document.querySelector<HTMLLinkElement>(
      'link[data-pannellum="true"]',
    );

    if (!existingStyle) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/vendor/pannellum/pannellum.css';
      link.setAttribute('data-pannellum', 'true');
      document.head.appendChild(link);
    }

    const scenes = Object.fromEntries(
      panoramaUrls.map((url, i) => [
        sceneIds[i],
        { type: 'equirectangular', panorama: url },
      ]),
    );

    const initViewer = () => {
      const pannellum = (window as PannellumWindow).pannellum;
      if (pannellum && document.getElementById(containerId) && !viewerRef.current) {
        const viewer = pannellum.viewer(containerId, {
          default: { firstScene: sceneIds[0], autoLoad: true },
          scenes,
          showControls: false,
          showZoomCtrl: false,
          showFullscreenCtrl: false,
        });
        viewerRef.current = viewer;
        window.setTimeout(() => {
          try {
            initialViewRef.current = {
              pitch: viewer.getPitch(),
              yaw: viewer.getYaw(),
              hfov: viewer.getHfov(),
            };
          } catch {
            // viewer not fully ready yet — reset falls back to defaults
          }
          setReady(true);
        }, 300);
      }
    };

    if (existingScript) {
      if ((window as PannellumWindow).pannellum) initViewer();
      else existingScript.addEventListener('load', initViewer, { once: true });
    } else {
      const script = document.createElement('script');
      script.src = '/vendor/pannellum/pannellum.js';
      script.async = true;
      script.setAttribute('data-pannellum', 'true');
      script.addEventListener('load', initViewer, { once: true });
      document.body.appendChild(script);
    }

    return () => {
      existingScript?.removeEventListener('load', initViewer);
      viewerRef.current?.destroy();
      viewerRef.current = null;
      setReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerId, panoramaUrls.join('|')]);

  const zoom = (direction: 1 | -1) => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    const next = Math.min(MAX_HFOV, Math.max(MIN_HFOV, viewer.getHfov() + direction * 10));
    viewer.setHfov(next, true);
  };

  const resetView = () => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    const { pitch, yaw, hfov } = initialViewRef.current;
    viewer.lookAt(pitch, yaw, hfov, true);
    setAutoRotate(false);
    viewer.stopAutoRotate();
  };

  const toggleAutoRotate = () => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    if (autoRotate) {
      viewer.stopAutoRotate();
    } else {
      viewer.startAutoRotate(-2);
    }
    setAutoRotate((value) => !value);
  };

  const goToScene = (index: number) => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    const nextIndex = (index + sceneIds.length) % sceneIds.length;
    viewer.loadScene(sceneIds[nextIndex]);
    setSceneIndex(nextIndex);
    setAutoRotate(false);
  };

  const controlClass =
    'inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white shadow-sm transition hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-40';

  if (panoramaUrls.length === 0) return null;

  return (
    <div
      ref={wrapperRef}
      className="group relative isolate h-[400px] overflow-hidden rounded-2xl bg-[#090b10] text-white shadow-2xl"
    >
      <div id={containerId} className="absolute inset-0" style={{ height: '100%', width: '100%' }} />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/70 opacity-60" />

      <div className="pointer-events-none absolute left-4 right-4 top-4 flex items-start justify-between gap-3">
        <div className="pointer-events-auto rounded-xl bg-black/60 px-3 py-2 shadow-lg backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">360&deg; Virtual Tour</p>
          <p className="mt-0.5 text-sm font-medium">
            {estateName}
            {sceneIds.length > 1 && ` · Scene ${sceneIndex + 1} of ${sceneIds.length}`}
          </p>
        </div>
        <button
          type="button"
          className={`${controlClass} pointer-events-auto`}
          onClick={() => setShowHelp((value) => !value)}
          aria-label="Tour instructions"
        >
          <Info className="h-4 w-4" />
        </button>
      </div>

      {showHelp && (
        <div className="absolute right-4 top-16 z-20 max-w-xs rounded-xl border border-white/15 bg-black/80 p-4 text-sm shadow-xl backdrop-blur-md">
          <button
            type="button"
            className="absolute right-2 top-2 text-white/70 hover:text-white"
            onClick={() => setShowHelp(false)}
            aria-label="Close instructions"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="pr-6 font-semibold">Explore the space</p>
          <p className="mt-1 text-white/75">
            Drag or swipe to look around.
            {sceneIds.length > 1 && ' Use the arrows to move between rooms/areas.'} Use the controls to zoom, rotate, reset, or enter fullscreen.
          </p>
        </div>
      )}

      {sceneIds.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => goToScene(sceneIndex - 1)}
            disabled={!ready}
            className={`${controlClass} absolute left-4 top-1/2 -translate-y-1/2`}
            aria-label="Previous scene"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => goToScene(sceneIndex + 1)}
            disabled={!ready}
            className={`${controlClass} absolute right-4 top-1/2 -translate-y-1/2`}
            aria-label="Next scene"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}

      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3">
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/15 bg-black/55 p-1.5 shadow-lg backdrop-blur-sm">
          <button
            type="button"
            className={controlClass}
            onClick={toggleAutoRotate}
            disabled={!ready}
            aria-label={autoRotate ? 'Pause automatic rotation' : 'Start automatic rotation'}
          >
            {autoRotate ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button type="button" className={controlClass} onClick={() => zoom(-1)} disabled={!ready} aria-label="Zoom in">
            <Plus className="h-4 w-4" />
          </button>
          <button type="button" className={controlClass} onClick={() => zoom(1)} disabled={!ready} aria-label="Zoom out">
            <Minus className="h-4 w-4" />
          </button>
          <button type="button" className={controlClass} onClick={resetView} disabled={!ready} aria-label="Reset tour view">
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            type="button"
            className={controlClass}
            onClick={() => viewerRef.current?.toggleFullscreen()}
            disabled={!ready}
            aria-label="Enter fullscreen tour"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
        <div className="pointer-events-none hidden items-center gap-2 rounded-full bg-black/55 px-3 py-2 text-xs text-white/75 backdrop-blur-sm sm:flex">
          <Move className="h-4 w-4" /> Drag to explore
        </div>
      </div>
    </div>
  );
}
