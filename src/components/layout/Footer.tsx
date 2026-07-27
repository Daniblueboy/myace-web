import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="premium-footer py-12 text-slate-200">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="space-y-4">
          <img src="/images/cropped-cropped-logo-jpeg.jpg" alt="AceRoyal Estates" className="h-12 w-auto" />
          <p className="text-sm text-slate-400">
            Premium real estate solutions in Nigeria. Helping you find your dream property with ease and trust.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white"><Facebook className="w-5 h-5" /></Link>
            <Link href="#" className="hover:text-white"><Instagram className="w-5 h-5" /></Link>
            <Link href="#" className="hover:text-white"><Twitter className="w-5 h-5" /></Link>
            <Link href="#" className="hover:text-white"><Linkedin className="w-5 h-5" /></Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/estates" className="hover:text-white">Estates</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            <li>Property Sales</li>
            <li>Property Management</li>
            <li>Real Estate Advisory</li>
            <li>Land Surveying</li>
            <li>Legal Documentation</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <span>123 Admiralty Way, Lekki Phase 1, Lagos, Nigeria</span>
            </li>
            <li className="flex gap-3">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <span>+234 801 234 5678</span>
            </li>
            <li className="flex gap-3">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <span>info@aceroyalestates.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div>
          &copy; {new Date().getFullYear()} Aceroyal Estates. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <Link href="/terms" className="hover:text-white">Terms &amp; Conditions</Link>
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
