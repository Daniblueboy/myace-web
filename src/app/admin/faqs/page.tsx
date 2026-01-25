'use client';

import { useEffect, useState } from 'react';
import { fetchAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Plus, Trash, Edit } from 'lucide-react';
import Link from 'next/link';
import { useAdminModal } from '@/components/admin/AdminModalProvider';

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { confirmAction, showAlert } = useAdminModal();

  useEffect(() => {
    loadFaqs();
  }, []);

  async function loadFaqs() {
    try {
      setLoading(true);
      const data = await fetchAPI('/admin/faqs', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setFaqs(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = await confirmAction({
      title: 'Delete this FAQ?',
      description: 'This action cannot be undone.',
      confirmText: 'Delete',
    });
    if (!confirmed) return;
    try {
      await fetchAPI(`/admin/faqs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setFaqs(faqs.filter(f => f.id !== id));
    } catch (e) {
      await showAlert({ title: 'Failed to delete FAQ' });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-3xl font-bold tracking-tight">FAQs</h2>
           <p className="text-muted-foreground">Manage frequently asked questions.</p>
        </div>
        <Link href="/admin/faqs/new">
          <Button><Plus className="w-4 h-4 mr-2" /> Add FAQ</Button>
        </Link>
      </div>

      <div className="border rounded-lg bg-white overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b">
             <tr>
               <th className="px-6 py-3 font-medium text-slate-500">Question</th>
               <th className="px-6 py-3 font-medium text-slate-500">Answer</th>
               <th className="px-6 py-3 font-medium text-slate-500 text-right">Actions</th>
             </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
               <tr><td colSpan={3} className="px-6 py-12 text-center text-slate-500">Loading...</td></tr>
            ) : faqs.length === 0 ? (
               <tr><td colSpan={3} className="px-6 py-12 text-center text-slate-500">No FAQs found.</td></tr>
            ) : faqs.map((faq) => (
               <tr key={faq.id} className="hover:bg-slate-50">
                 <td className="px-6 py-4 font-medium">{faq.question}</td>
                 <td className="px-6 py-4 truncate max-w-md">{faq.answer}</td>
                 <td className="px-6 py-4 text-right space-x-2">
                    <Link href={`/admin/faqs/${faq.id}/edit`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4 text-blue-500" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(faq.id)}>
                      <Trash className="w-4 h-4 text-red-500"/>
                    </Button>
                 </td>
               </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
