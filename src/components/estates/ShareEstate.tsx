'use client';

import { Share2, MessageCircle, Link2, Check, Mail, Twitter } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

export function ShareEstate({ name, url, iconOnly = false }: { name: string; url: string; iconOnly?: boolean }) {
  const [copied, setCopied] = useState(false);
  // navigator.share only exists in the browser, and support varies (most
  // mobile browsers, most desktop browsers don't) — check after mount so
  // this doesn't cause a server/client render mismatch.
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
  }, []);

  const shareText = `Check out ${name} on Aceroyal Estates`;

  // Matches the Button `variant="outline"` look, but as a plain element so
  // the label can expand on hover. Padding stays fixed — only the label's
  // own max-width/opacity animate, so there's a single width-driving
  // transition instead of two competing ones (which caused visible jitter
  // when the revealed text was long enough to shift a lot of layout).
  const expandableIconClass =
    'group inline-flex h-9 items-center overflow-hidden rounded-md border bg-background px-3 shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50';
  const expandableLabelClass =
    'max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-[max-width,opacity,margin-left] duration-300 group-hover:ml-2 group-hover:max-w-[100px] group-hover:opacity-100';

  const nativeShare = async () => {
    try {
      await navigator.share({ title: name, text: shareText, url });
    } catch {
      // user cancelled the share sheet — not an error
    }
  };

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${shareText} — ${url}`)}`;
  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;

  const shareEmail = () => {
    const subject = encodeURIComponent(shareText);
    const body = encodeURIComponent(`${shareText}\n\n${url}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Could not copy link');
    }
  };

  // On devices with a native share sheet (most phones), one tap surfaces
  // every installed app — WhatsApp, Messages, Mail, Instagram, whatever's
  // there — instead of us hand-building each integration.
  if (canNativeShare) {
    return iconOnly ? (
      <button type="button" onClick={nativeShare} aria-label="Share Property" className={expandableIconClass}>
        <Share2 className="h-4 w-4 shrink-0" />
        <span className={expandableLabelClass}>Share</span>
      </button>
    ) : (
      <Button variant="outline" className="gap-2" onClick={nativeShare}>
        <Share2 className="h-4 w-4" />
        Share Property
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {iconOnly ? (
          <button type="button" aria-label="Share Property" className={expandableIconClass}>
            <Share2 className="h-4 w-4 shrink-0" />
            <span className={expandableLabelClass}>Share</span>
          </button>
        ) : (
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share Property
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem asChild className="gap-2 cursor-pointer">
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" /> Share on WhatsApp
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="gap-2 cursor-pointer">
          <a href={xHref} target="_blank" rel="noopener noreferrer">
            <Twitter className="h-4 w-4" /> Share on X
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareEmail} className="gap-2 cursor-pointer">
          <Mail className="h-4 w-4" /> Share via Email
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyLink} className="gap-2 cursor-pointer">
          {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy Link'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
