import type { NavigationIconName } from './navigation-system';

export const productDestinations = [
  { href: '/profile', label: 'My workspace', icon: 'home' },
  { href: '/courses', label: 'Learning', icon: 'book' },
  { href: '/countries', label: 'Countries', icon: 'globe' },
  { href: '/compare', label: 'Compare countries', icon: 'compare' },
  { href: '/plan', label: 'My plan', icon: 'target' },
  { href: '/community', label: 'Community', icon: 'compass' },
  { href: '/atlas', label: 'Ask Atlas', icon: 'spark' },
] as const satisfies readonly { href: string; label: string; icon: NavigationIconName }[];
const tools = ['/profile', '/dashboard', '/courses', '/countries', '/compare', '/country-fit', '/plan', '/community', '/atlas', '/passport', '/documents', '/certificates', '/notifications', '/global-key', '/rooms', '/admin', '/intelligence', '/members', '/ranking'];
export function isProductRoute(pathname: string) { return tools.some(route => pathname === route || pathname.startsWith(`${route}/`)); }
export function isStudyRoute(pathname: string) { return /^\/courses\/[^/]+\/(study|lessons|certification)(\/|$)/.test(pathname); }
