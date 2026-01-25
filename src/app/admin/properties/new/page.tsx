'use client';

import { PropertyForm } from '@/components/admin/PropertyForm';
import { fetchAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAdminModal } from '@/components/admin/AdminModalProvider';
import { Button } from '@/components/ui/button';

export default function NewPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [estates, setEstates] = useState<any[]>([]);
  const { showAlert } = useAdminModal();

  useEffect(() => {
    fetchAPI('/admin/estates', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((data) => setEstates(data))
      .catch(() => setEstates([]));
  }, []);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await fetchAPI('/admin/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(values),
      });
      router.push('/admin/properties');
    } catch (e) {
      console.error(e);
      await showAlert({ title: 'Failed to create offering' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Create Offering</h2>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>
      <PropertyForm onSubmit={handleSubmit} loading={loading} estates={estates} />
    </div>
  );
}
