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

export function ShareEstate({ name, url }: { name: string; url: string }) {
  const [copied, setCopied] = useState(false);
  // navigator.share only exists in the browser, and support varies (most
  // mobile browsers, most desktop browsers don't) — check after mount so
  // this doesn't cause a server/client render mismatch.
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
  }, []);

  const shareText = `Check out ${name} on Aceroyal Estates`;

  const nativeShare = async () => {
    try {
      await navigator.share({ title: name, text: shareText, url });
    } catch {
      // user cancelled the share sheet — not an error
    }
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`${shareText} — ${url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const shareX = () => {
    const text = encodeURIComponent(shareText);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer');
  };

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
    return (
      <Button variant="outline" className="gap-2" onClick={nativeShare}>
        <Share2 className="h-4 w-4" />
        Share Property
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share Property
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={shareWhatsApp} className="gap-2 cursor-pointer">
          <MessageCircle className="h-4 w-4" /> Share on WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareX} className="gap-2 cursor-pointer">
          <Twitter className="h-4 w-4" /> Share on X
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
