'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface PropertyMapProps {
  latitude?: number | null;
  longitude?: number | null;
  mapEmbedUrl?: string | null;
  title: string;
  address: string;
}

export default function PropertyMap({
  latitude,
  longitude,
  mapEmbedUrl,
  title,
  address,
}: PropertyMapProps) {
  if (mapEmbedUrl) {
    return (
      <div className="h-[400px] rounded-lg overflow-hidden border">
        <iframe
          src={mapEmbedUrl}
          title={`Map for ${title}`}
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  // Default to Lagos, Nigeria if no coordinates
  const lat = latitude || 6.5244;
  const lng = longitude || 3.3792;

  return (
    <div className="h-[400px] rounded-lg overflow-hidden border">
      <MapContainer
        center={[lat, lng]}
        zoom={latitude && longitude ? 15 : 10}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>
  <strong>{title}</strong>
            <br />
            {address}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
