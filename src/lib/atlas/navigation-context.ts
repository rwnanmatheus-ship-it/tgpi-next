import { getSuperAppModule } from '../super-app';
import type { GuideTopic } from './guide-copy';

export type AtlasNavigationContext = { topic: GuideTopic; country?: string; learningCourse?: { id: string; title: string; projectBrief?: string } };

export function atlasNavigationContext(pathname: string): AtlasNavigationContext | undefined {
  if (pathname === '/community' || pathname.startsWith('/community/')) return { topic: 'community' };
  if (pathname === '/pricing' || pathname === '/premium') return { topic: 'premium' };
  if (pathname === '/documents') return { topic: 'documents' };
  const destination = getSuperAppModule(pathname);
  if (!destination || destination.id === 'atlas') return undefined;
  const country = /^\/countries\/([a-z-]+)$/.exec(pathname)?.[1];
  return { topic: destination.id, country };
}
