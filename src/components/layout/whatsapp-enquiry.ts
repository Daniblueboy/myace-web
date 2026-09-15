import { Home, ShoppingBag, HelpCircle, LifeBuoy, type LucideIcon } from 'lucide-react';

export const WHATSAPP_NUMBER = '2349156549709';

export type EnquiryOption = {
  label: string;
  icon: LucideIcon;
  message: (context: string) => string;
};

export const ENQUIRY_OPTIONS: EnquiryOption[] = [
  {
    label: 'General Enquiry',
    icon: HelpCircle,
    message: (context) => `Hello Aceroyal Estates, I have a question${context}.`,
  },
  {
    label: 'Book an Inspection',
    icon: Home,
    message: (context) => `Hello Aceroyal Estates, I'd like to book an inspection${context}.`,
  },
  {
    label: 'Enquire to Purchase',
    icon: ShoppingBag,
    message: (context) => `Hello Aceroyal Estates, I'm interested in purchasing a property${context}.`,
  },
  {
    label: 'Support',
    icon: LifeBuoy,
    message: (context) => `Hello Aceroyal Estates, I need some support${context}.`,
  },
];

// Approximates the estate name from its slug (e.g. "alpha-garden-city" ->
// "Alpha Garden City") rather than fetching it — this runs in global layout
// chrome mounted on every page, so a data fetch just to personalize a
// WhatsApp message isn't worth the added latency/complexity.
export function estateLabelFromPath(pathname: string) {
  const match = pathname.match(/^\/estates\/([^/]+)$/);
  if (!match) return null;
  return match[1]
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
