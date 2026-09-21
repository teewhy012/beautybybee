export function ServiceIcon({ icon }: { icon: string }) {
  const common = {
    className: "h-8 w-8",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (icon) {
    case "brow":
      return (
        <svg {...common}>
          <path d="M4 9.5c3-2.5 6-2 8 .5M16 9.5c.8-1 2.4-1.6 4-.5" />
          <path d="M12 10.5v.5" />
        </svg>
      );
    case "lash":
      return (
        <svg {...common}>
          <path d="M3 8c2-1.6 5-1.2 6.5.8M21 8c-2-1.6-5-1.2-6.5.8M9.5 12c2.6-1.6 5.4-1.6 8 0" />
          <path d="M12 8V6M4 5l.4 2.6M20 5l-.4 2.6M6.5 6.6 5.4 5M17.5 6.6 18.6 5" />
        </svg>
      );
    case "nails":
      return (
        <svg {...common}>
          <path d="M9 3h6v7.5a3 3 0 0 1-1.2 2.4L12.6 14a2.6 2.6 0 0 1-3.2 0l-1.2-1.1A3 3 0 0 1 9 10.5V3Z" />
          <path d="M6 20.5l.8-4M12 20.5l-.8-4M18 20.5l-.8-4" />
        </svg>
      );
    case "facial":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="9.6" cy="10" r="1.1" />
          <circle cx="14.4" cy="10" r="1.1" />
          <path d="M8.5 13.5c1 1.4 2.2 2 3.5 2s2.5-.6 3.5-2" />
          <path d="M10.5 15.5v2M13.5 15.5v-2" />
        </svg>
      );
    case "makeup":
      return (
        <svg {...common}>
          <path d="M8 3.5h8a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 19V5A1.5 1.5 0 0 1 8 3.5Z" />
          <path d="M9.5 8h5M9.5 11.5h5" />
          <circle cx="12" cy="16" r="1.6" />
        </svg>
      );
    case "body":
      return (
        <svg {...common}>
          <path d="M12 3.5a2.8 2.8 0 1 1 0 5.6 2.8 2.8 0 0 1 0-5.6Z" />
          <path d="M8 10.5h8l-1 8a2.8 2.8 0 0 1-2.8 2.6c-1.6 0-3-1.2-3-2.8l1.2-5.5" />
          <path d="M7 8.2c-1.9.9-3 2.6-3 4.5M17 8.2c1.9.9 3 2.6 3 4.5" />
        </svg>
      );
    default:
      return <svg {...common} />;
  }
}