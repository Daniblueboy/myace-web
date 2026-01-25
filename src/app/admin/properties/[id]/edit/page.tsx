'use client';

import { PropertyForm } from '@/components/admin/PropertyForm';
import { fetchAPI } from '@/lib/api';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Property } from '@/shared';
import { useAdminModal } from '@/components/admin/AdminModalProvider';
import { Button } from '@/components/ui/button';

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState<Property | null>(null);
  const [estates, setEstates] = useState<any[]>([]);
  const { showAlert } = useAdminModal();

  useEffect(() => {
     if (params?.id) {
       fetchAPI(`/admin/properties/${params.id}`, {
         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
       }).then(setProperty).catch(console.error);
     }
     fetchAPI('/admin/estates', {
       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
     })
       .then((data) => setEstates(data))
       .catch(() => setEstates([]));
  }, [params]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      if (!params?.id) return;
      await fetchAPI(`/admin/properties/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(values),
      });
      router.push('/admin/properties');
    } catch (e) {
      console.error(e);
      await showAlert({ title: 'Failed to update offering' });
    } finally {
      setLoading(false);
    }
  };

  if (!property) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Edit Offering</h2>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>
      <PropertyForm initialData={property} onSubmit={handleSubmit} loading={loading} estates={estates} />
    </div>
  );
}
