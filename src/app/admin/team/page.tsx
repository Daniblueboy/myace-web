'use client';

import { useEffect, useState } from 'react';
import { fetchAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Plus, Trash, Edit } from 'lucide-react';
import { useAdminModal } from '@/components/admin/AdminModalProvider';
import Link from 'next/link';

export default function AdminTeamPage() {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { confirmAction, showAlert } = useAdminModal();

  useEffect(() => {
    loadTeam();
  }, []);

  async function loadTeam() {
    try {
      setLoading(true);
      const data = await fetchAPI('/admin/team', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTeam(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = await confirmAction({
      title: 'Delete this team member?',
      description: 'This action cannot be undone.',
      confirmText: 'Delete',
    });
    if (!confirmed) return;
    try {
      await fetchAPI(`/admin/team/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTeam(team.filter((item) => item.id !== id));
    } catch (e) {
      await showAlert({
        title: 'Failed to delete team member',
      });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Team</h2>
          <p className="text-muted-foreground">Manage leadership and staff profiles.</p>
        </div>
        <Link href="/admin/team/new">
          <Button><Plus className="w-4 h-4 mr-2" /> Add Member</Button>
        </Link>
      </div>

      <div className="border rounded-lg bg-white overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-3 font-medium text-slate-500">Name</th>
              <th className="px-6 py-3 font-medium text-slate-500">Role</th>
              <th className="px-6 py-3 font-medium text-slate-500">Status</th>
              <th className="px-6 py-3 font-medium text-slate-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-500">Loading...</td></tr>
            ) : team.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-500">No team members found.</td></tr>
            ) : team.map((member) => (
              <tr key={member.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium">{member.name}</td>
                <td className="px-6 py-4">{member.role}</td>
                <td className="px-6 py-4">
                  {member.active ? 'Active' : 'Inactive'}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Link href={`/admin/team/${member.id}/edit`}>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4 text-blue-500" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(member.id)}>
                    <Trash className="w-4 h-4 text-red-500" />
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
