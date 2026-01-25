'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download } from 'lucide-react';
import { fetchAPI } from '@/lib/api';
import { toast } from 'sonner';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    enquiryType: '',
    search: '',
  });

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    try {
      const data = await fetchAPI('/admin/leads', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setLeads(data);
    } catch (error) {
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  }

  const filteredLeads = leads.filter((lead) => {
    if (filters.type && lead.type !== filters.type) return false;
    if (filters.enquiryType && lead.enquiryType !== filters.enquiryType) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        lead.fullName?.toLowerCase().includes(searchLower) ||
        lead.email?.toLowerCase().includes(searchLower) ||
        lead.phone?.includes(searchLower)
      );
    }
    return true;
  });

  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Type', 'Enquiry Type', 'Office State', 'Message', 'Date'];
    const rows = filteredLeads.map((lead) => [
      lead.id,
      lead.fullName,
      lead.email,
      lead.phone,
      lead.type,
      lead.enquiryType || '',
      lead.officeState || '',
      `"${lead.message?.replace(/"/g, '""') || ''}"`,
      new Date(lead.createdAt).toLocaleString(),
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('CSV exported successfully');
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Lead Submissions</h1>
          <p className="text-muted-foreground mt-2">
            View and manage all contact form and property enquiry submissions
          </p>
        </div>
        <Button onClick={exportToCSV} disabled={filteredLeads.length === 0}>
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Search</label>
            <Input
              placeholder="Search by name, email, or phone..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All types</SelectItem>
                <SelectItem value="GENERAL">General</SelectItem>
                <SelectItem value="PROPERTY_ENQUIRY">Property Enquiry</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Enquiry Type</label>
            <Select
              value={filters.enquiryType}
              onValueChange={(value) => setFilters({ ...filters, enquiryType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All enquiries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All enquiries</SelectItem>
                <SelectItem value="GENERAL">General</SelectItem>
                <SelectItem value="INSPECTION">Inspection</SelectItem>
                <SelectItem value="PURCHASE">Purchase</SelectItem>
                <SelectItem value="SUPPORT">Support</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Enquiry</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  No leads found
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-mono text-sm">{lead.id}</TableCell>
                  <TableCell className="font-medium">{lead.fullName}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{lead.email}</div>
                      <div className="text-muted-foreground">{lead.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={lead.type === 'PROPERTY_ENQUIRY' ? 'default' : 'secondary'}>
                      {lead.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{lead.enquiryType || 'N/A'}</Badge>
                  </TableCell>
                  <TableCell>{lead.officeState || 'N/A'}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <div className="mt-4 text-sm text-muted-foreground">
        Showing {filteredLeads.length} of {leads.length} leads
      </div>
    </div>
  );
}
