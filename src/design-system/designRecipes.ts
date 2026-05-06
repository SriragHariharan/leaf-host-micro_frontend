export const designRecipes = {
  modalOverlay: "ds-modal-overlay",
  modalContainer: "ds-modal-container",
  modalHeader: "ds-modal-header",
  inputBase: "ds-input",
  inputError: "ds-input-error",
  buttonPrimary: "ds-btn-primary",
  buttonSecondary: "ds-btn-secondary",
  iconButton: "ds-icon-btn",
  panel: "ds-panel",
  topbarShell: "border border-ds-border-subtle bg-ds-surface-card shadow-dsLg rounded-dsLg",
  navItemBase:
    "relative inline-flex items-center justify-center gap-1.5 rounded-dsMd border px-2 md:px-3 transition-all duration-ds focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-brand-500/50",
  navItemActive: "border-ds-brand-200 bg-ds-brand-50 text-ds-brand-700 shadow-dsBrand",
  navItemIdle:
    "border-transparent text-ds-text-secondary hover:-translate-y-0.5 hover:border-ds-border-subtle hover:bg-ds-surface-card hover:text-ds-text-primary hover:shadow-dsSm",
  badgeDanger:
    "inline-flex items-center justify-center rounded-dsPill border border-ds-surface-card bg-ds-state-danger px-1 text-xs font-semibold leading-none text-ds-text-inverse shadow-dsSm",
  statusSuccess:
    "inline-flex items-center rounded-dsPill border border-ds-brand-100 bg-ds-state-successSoft px-3 py-1.5 text-sm font-medium text-ds-state-success",
  statusWarning:
    "inline-flex items-center rounded-dsPill border border-ds-state-warning/30 bg-ds-state-warningSoft px-3 py-1.5 text-sm font-medium text-ds-state-warning",
  statusDanger:
    "inline-flex items-center rounded-dsPill border border-ds-state-danger/30 bg-ds-state-dangerSoft px-3 py-1.5 text-sm font-medium text-ds-state-danger",
} as const;

export type DesignRecipeName = keyof typeof designRecipes;
