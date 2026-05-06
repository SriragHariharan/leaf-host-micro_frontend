export const designTokens = {
  colors: {
    brand: {
      50: "#ecfdf5",
      100: "#d1fae5",
      200: "#a7f3d0",
      500: "#10b981",
      600: "#059669",
      700: "#047857",
    },
    surface: {
      page: "#f8fafc",
      card: "#ffffff",
      muted: "#f9fafb",
      overlay: "rgba(2, 6, 23, 0.55)",
    },
    text: {
      primary: "#111827",
      secondary: "#374151",
      muted: "#6b7280",
      inverse: "#ffffff",
    },
    border: {
      subtle: "#e5e7eb",
      strong: "#cbd5e1",
    },
    state: {
      danger: "#dc2626",
      dangerSoft: "#fef2f2",
      dangerBorder: "#fca5a5",
      warning: "#d97706",
      warningSoft: "#fffbeb",
      info: "#4f46e5",
      infoSoft: "#eef2ff",
      success: "#059669",
      successSoft: "#ecfdf5",
    },
    icon: {
      primary: "#374151",
      subtle: "#6b7280",
    },
  },
  typography: {
    fontFamily: {
      sans: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
    },
  },
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    controlX: "1rem",
    controlY: "0.625rem",
    panel: "1rem",
    panelLg: "1.25rem",
    section: "1.5rem",
  },
  radius: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.25rem",
    pill: "9999px",
  },
  shadows: {
    sm: "0 1px 2px rgba(15, 23, 42, 0.06)",
    md: "0 4px 10px rgba(15, 23, 42, 0.08)",
    lg: "0 8px 24px rgba(15, 23, 42, 0.12)",
    brand: "0 8px 24px rgba(5, 150, 105, 0.18)",
  },
  zIndex: {
    base: 1,
    sticky: 40,
    overlay: 50,
    modal: 60,
  },
  transitions: {
    base: "all 200ms ease",
    fast: "all 150ms ease",
    slow: "all 300ms ease",
  },
  layout: {
    container: "1280px",
    containerWide: "1320px",
    topbarHeight: "3.5rem",
    topbarHeightMd: "4rem",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
} as const;

export type DesignTokens = typeof designTokens;
