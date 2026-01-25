'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';

export function EstateFilter({ estates }: { estates: any[] }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      params.set('estateId', value);
    } else {
      params.delete('estateId');
    }
    replace(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <Select
      defaultValue={searchParams.get('estateId') || 'all'}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Filter by Estate" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Estates</SelectItem>
        {estates.map((estate) => (
          <SelectItem key={estate.id} value={estate.id}>
            {estate.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
