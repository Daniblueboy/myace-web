'use client';

import { useEffect, useRef } from 'react';
import { useId } from 'react';

type PanoramaViewer = { destroy: () => void };
type PannellumWindow = Window & {
  pannellum?: {
    viewer: (containerId: string, options: Record<string, unknown>) => PanoramaViewer;
  };
};

interface PropertyPanoramaProps {
  panoramaUrl: string;
}

export default function PropertyPanorama({ panoramaUrl }: PropertyPanoramaProps) {
  const containerId = useId().replace(/:/g, '');
  const viewerRef = useRef<PanoramaViewer | null>(null);

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

    const initViewer = () => {
      const pannellum = (window as PannellumWindow).pannellum;
      if (pannellum && document.getElementById(containerId) && !viewerRef.current) {
        viewerRef.current = pannellum.viewer(containerId, {
          type: 'equirectangular',
          panorama: panoramaUrl,
          autoLoad: true,
          showZoomCtrl: true,
          showFullscreenCtrl: true,
          autoRotate: -1.5,
          autoRotateInactivityDelay: 4000,
        });
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
    };
  }, [containerId, panoramaUrl]);

  return <div id={containerId} className="h-[400px] w-full rounded-lg overflow-hidden border" />;
}
