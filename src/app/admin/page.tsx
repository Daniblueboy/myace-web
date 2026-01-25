'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Users, Eye, TrendingUp, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchAPI } from '@/lib/api';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Offerings', value: '12', icon: Building, change: '+2 this week' },
    { title: 'Total Leads', value: '45', icon: Users, change: '+5 today' },
    { title: 'Page Views', value: '1,234', icon: Eye, change: '+12% vs last week' },
    { title: 'Active Promos', value: '3', icon: TrendingUp, change: 'Running now' },
  ];

  const exportNewsletter = async () => {
    try {
      const data = await fetchAPI('/admin/newsletter', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const headers = ['ID', 'Email', 'Date'];
      const rows = (data || []).map((item: any) => [
        item.id,
        item.email,
        new Date(item.createdAt).toLocaleString(),
      ]);
      const csvContent = [headers.join(','), ...rows.map((row: string[]) => row.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success('Newsletter CSV exported');
    } catch (error) {
      toast.error('Failed to export newsletter subscribers');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your platform's performance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-500 text-center py-10">
              No recent leads to display.
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start" onClick={exportNewsletter}>
              <Download className="w-4 h-4 mr-2" /> Export Newsletter Subscribers
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
