import { toast, Toaster } from 'react-hot-toast';
import type { ToastOptions } from 'react-hot-toast';
import type { CSSProperties } from 'react';

const baseStyle: CSSProperties = {
  fontSize: '0.875rem',
  fontWeight: 500,
  borderRadius: '0.75rem',
  boxShadow: 'var(--ds-shadow-md)',
  padding: '0.75rem 1rem',
  maxWidth: '22rem',
};

export const toastOptions = {
  position: 'bottom-right' as const,
  duration: 4000,
};

const successStyle: CSSProperties = {
  ...baseStyle,
  background: 'var(--ds-color-success-50)',
  color: 'var(--ds-color-text-primary)',
  border: '1px solid var(--ds-color-brand-200)',
};

const errorStyle: CSSProperties = {
  ...baseStyle,
  background: 'var(--ds-color-danger-50)',
  color: 'var(--ds-color-text-primary)',
  border: '1px solid var(--ds-color-danger-300)',
};

function buildOptions(style: CSSProperties): ToastOptions {
  return {
    position: toastOptions.position,
    duration: toastOptions.duration,
    style,
  };
}

export function showSuccessToast(message: string): void {
  toast.success(message, buildOptions(successStyle));
}

export function showErrorToast(message: string): void {
  toast.error(message, buildOptions(errorStyle));
}

export { toast, Toaster };
