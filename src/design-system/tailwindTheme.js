const tailwindTheme = {
  fontFamily: {
    sans: ["var(--ds-font-family-sans)"],
  },
  colors: {
    ds: {
      brand: {
        50: "var(--ds-color-brand-50)",
        100: "var(--ds-color-brand-100)",
        200: "var(--ds-color-brand-200)",
        500: "var(--ds-color-brand-500)",
        600: "var(--ds-color-brand-600)",
        700: "var(--ds-color-brand-700)",
      },
      text: {
        primary: "var(--ds-color-text-primary)",
        secondary: "var(--ds-color-text-secondary)",
        muted: "var(--ds-color-text-muted)",
      },
      surface: {
        page: "var(--ds-color-surface-page)",
        card: "var(--ds-color-surface-card)",
        muted: "var(--ds-color-surface-muted)",
      },
      border: {
        subtle: "var(--ds-color-border-subtle)",
        strong: "var(--ds-color-border-strong)",
      },
      state: {
        danger: "var(--ds-color-danger-600)",
        dangerSoft: "var(--ds-color-danger-50)",
        warning: "var(--ds-color-warning-600)",
        warningSoft: "var(--ds-color-warning-50)",
        success: "var(--ds-color-success-600)",
        successSoft: "var(--ds-color-success-50)",
        info: "var(--ds-color-info-600)",
        infoSoft: "var(--ds-color-info-50)",
      },
    },
  },
  spacing: {
    "ds-xs": "0.5rem",
    "ds-sm": "0.75rem",
    "control-x": "1rem",
    "control-y": "0.625rem",
    panel: "1rem",
    "panel-lg": "1.25rem",
    section: "1.5rem",
  },
  borderRadius: {
    dsSm: "0.5rem",
    dsMd: "0.75rem",
    dsLg: "1rem",
    dsXl: "1.25rem",
    dsPill: "9999px",
  },
  boxShadow: {
    dsSm: "var(--ds-shadow-sm)",
    dsMd: "var(--ds-shadow-md)",
    dsLg: "var(--ds-shadow-lg)",
    dsBrand: "var(--ds-shadow-brand)",
  },
  zIndex: {
    dsBase: "1",
    dsSticky: "40",
    dsOverlay: "50",
    dsModal: "60",
  },
  transitionDuration: {
    dsFast: "150ms",
    ds: "200ms",
    dsSlow: "300ms",
  },
  maxWidth: {
    dsContainer: "var(--ds-layout-container)",
    dsContainerWide: "var(--ds-layout-container-wide)",
  },
  height: {
    dsTopbar: "var(--ds-topbar-height)",
    dsTopbarMd: "var(--ds-topbar-height-md)",
  },
  minHeight: {
    dsTopbar: "var(--ds-topbar-height)",
    dsTopbarMd: "var(--ds-topbar-height-md)",
  },
  screens: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
};

module.exports = { tailwindTheme };
