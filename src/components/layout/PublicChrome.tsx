'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MessageCircle, Home, ShoppingBag, HelpCircle, LifeBuoy } from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const WHATSAPP_NUMBER = '2349156549709';

const ENQUIRY_OPTIONS = [
  {
    label: 'General Enquiry',
    icon: HelpCircle,
    message: (context: string) => `Hello Aceroyal Estates, I have a question${context}.`,
  },
  {
    label: 'Book an Inspection',
    icon: Home,
    message: (context: string) => `Hello Aceroyal Estates, I'd like to book an inspection${context}.`,
  },
  {
    label: 'Enquire to Purchase',
    icon: ShoppingBag,
    message: (context: string) => `Hello Aceroyal Estates, I'm interested in purchasing a property${context}.`,
  },
  {
    label: 'Support',
    icon: LifeBuoy,
    message: (context: string) => `Hello Aceroyal Estates, I need some support${context}.`,
  },
];

// Approximates the estate name from its slug (e.g. "alpha-garden-city" ->
// "Alpha Garden City") rather than fetching it — this is a global layout
// component mounted on every page, so a data fetch just to personalize a
// WhatsApp message isn't worth the added latency/complexity.
function estateLabelFromPath(pathname: string) {
  const match = pathname.match(/^\/estates\/([^/]+)$/);
  if (!match) return null;
  return match[1]
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const estateLabel = estateLabelFromPath(pathname);
  const context = estateLabel ? ` regarding ${estateLabel}` : '';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">{children}</main>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
            aria-label="Chat with us on WhatsApp"
          >
            <MessageCircle className="h-5 w-5" />
            Chat with us
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="top">
          {ENQUIRY_OPTIONS.map((option) => (
            <DropdownMenuItem key={option.label} asChild className="gap-2 cursor-pointer">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(option.message(context))}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <option.icon className="h-4 w-4" /> {option.label}
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Footer />
    </div>
  );
}
