import { Suspense } from 'react';
import PropertiesClient from './PropertiesClient';

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="container py-12">Loading properties...</div>}>
      <PropertiesClient />
    </Suspense>
  );
}
