const ICONS = {
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 12l9 5 9-5M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  grid: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="4" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
      <rect x="4" y="14" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="14" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  docs: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 3v5h5M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 8h3l2-2h6l2 2h3v11H4V8z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  pulse: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 12h4l2-5 4 10 2-5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  engineering: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4l8 14H4L12 4z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 10v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  production: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  site: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  pm: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

export function SolutionIcon({ name, className }) {
  return <span className={className}>{ICONS[name] || ICONS.layers}</span>;
}
