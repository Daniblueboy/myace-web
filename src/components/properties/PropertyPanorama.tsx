'use client';

import { useEffect, useRef } from 'react';
import { useId } from 'react';

interface PropertyPanoramaProps {
  panoramaUrl: string;
}

export default function PropertyPanorama({ panoramaUrl }: PropertyPanoramaProps) {
  const containerId = useId().replace(/:/g, '');
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-pannellum="true"]',
    );
    const existingStyle = document.querySelector<HTMLLinkElement>(
      'link[data-pannellum="true"]',
    );

    if (!existingStyle) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css';
      link.setAttribute('data-pannellum', 'true');
      document.head.appendChild(link);
    }

    const initViewer = () => {
      // @ts-ignore
      if (window.pannellum && document.getElementById(containerId)) {
        // @ts-ignore
        window.pannellum.viewer(containerId, {
          type: 'equirectangular',
          panorama: panoramaUrl,
          autoLoad: true,
          showZoomCtrl: true,
        });
      }
    };

    if (existingScript) {
      initViewer();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js';
    script.async = true;
    script.setAttribute('data-pannellum', 'true');
    script.onload = () => initViewer();
    document.body.appendChild(script);
  }, [containerId, panoramaUrl]);

  return <div id={containerId} className="h-[400px] w-full rounded-lg overflow-hidden border" />;
}
