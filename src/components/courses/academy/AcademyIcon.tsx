type IconName = 'arrow' | 'book' | 'check' | 'clock' | 'focus' | 'grid' | 'spark' | 'shield' | 'download' | 'search' | 'text' | 'chevron' | 'play' | 'pause' | 'reset';
const paths: Record<IconName, string> = {
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  book: 'M12 5v16m0-16C8 2 4 3 2 4v15c3-1 6-1 10 2 4-3 7-3 10-2V4c-2-1-6-2-10 1Z',
  check: 'm5 12 4 4L19 6',
  clock: 'M12 8v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
  focus: 'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M8 12h8m-4-4v8',
  grid: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  spark: 'm12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z',
  shield: 'm12 2 9 4v6c0 5-6 9-9 10-3-1-9-5-9-10V6l9-4Zm-4 10 3 3 5-6',
  download: 'M12 3v12m-5-5 5 5 5-5M4 15v6h16v-6',
  search: 'm16 16 5 5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',
  text: 'M3 5h12M9 5v16M16 11h6M19 11v10',
  chevron: 'm6 9 6 6 6-6',
  play: 'm7 3 14 9-14 9V3Z',
  pause: 'M8 4v16M16 4v16',
  reset: 'M3 11a9 9 0 1 1 2 7M3 3v8h8',
};
export default function AcademyIcon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}
