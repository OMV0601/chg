/** Two cupped hands holding a sprout, echoing the organisation's own mark. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M20 19c0-4.4 3.1-8 7-8 0 4.4-3.1 8-7 8Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M20 19c0-4.4-3.1-8-7-8 0 4.4 3.1 8 7 8Z"
        fill="currentColor"
        opacity="0.55"
      />
      <path d="M20 18v6" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path
        d="M7 22c0 7.2 5.8 13 13 13s13-5.8 13-13"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M12 24c0 4.4 3.6 8 8 8s8-3.6 8-8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}
