/** Notification WebSocket URL (from env; falls back for legacy hardcoded value) */
export const NOTIFICATION_SERVICE_URL =
  process.env.REACT_APP_NOTIFICATION_SERVICE_URL ?? 'wss://34.93.237.154:2005';

/**
 * Gateway-relative paths from user axios baseURL (/api/v1/user).
 * ../notification hops to the notification service via the API gateway.
 */
export const NOTIFICATION_PATHS = {
  list: '../notification',
  count: '../notification/count',
  markAllRead: '../notification',
  clear: '../notification',
  read: (id: string) => `../notification/${id}/read`,
} as const;
