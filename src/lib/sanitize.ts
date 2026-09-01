import type { IOptions } from 'sanitize-html';

// sanitize-html's own defaults are more restrictive than DOMPurify's (no
// img/iframe/video), which is what this replaced isomorphic-dompurify with
// — see the commit that swapped it: DOMPurify pulls in jsdom for its
// server-side path, which crashes on Vercel (an ESM-only transitive
// dependency that a CommonJS require() can't load). sanitize-html has no
// such dependency, but needs its allowlist widened to match what backend-
// sourced rich text (blog posts, promo "details") actually uses.
export const SANITIZE_OPTIONS: IOptions = {
  allowedTags: [
    'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'blockquote',
    'ul', 'ol', 'li', 'a', 'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'iframe', 'video', 'source', 'span', 'div', 'table', 'thead', 'tbody',
    'tr', 'td', 'th', 'figure', 'figcaption',
  ],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
    img: ['src', 'alt', 'width', 'height'],
    iframe: ['src', 'title', 'allow', 'allowfullscreen', 'frameborder'],
    video: ['controls', 'poster', 'preload'],
    source: ['src', 'type'],
    '*': ['class'],
  },
  allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com'],
};
