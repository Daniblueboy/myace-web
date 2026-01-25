'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function FAQList({ faqs }: { faqs: any[] }) {
  const [term, setTerm] = useState('');

  const filtered = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(term.toLowerCase()) ||
      f.answer.toLowerCase().includes(term.toLowerCase())
  );

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search questions..."
          className="pl-9"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          <p>No matching questions found.</p>
        </div>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {filtered.map((faq: any, index: number) => (
            <AccordionItem key={faq.id || index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
