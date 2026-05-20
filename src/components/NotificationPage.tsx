import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  AlertCircle,
  Bell,
  CheckCheck,
  Heart,
  MessageCircle,
  Trash2,
  UserPlus,
  ImageIcon,
} from 'lucide-react';
import useAxiosInstance from 'hostApp/useAxiosInstance';
import { NOTIFICATION_PATHS } from '../constants/constants';
import { designRecipes } from '../design-system';
import useNotificationStore from '../helpers/notificationCountStore';
import type {
  ApiResponse,
  NotificationItem,
  NotificationType,
  NotificationsListData,
  UnreadCountData,
} from '../types/notification';
import { getApiErrorMessage } from '../types/notification';

const DEFAULT_AVATAR =
  'https://ui-avatars.com/api/?background=0d9488&color=fff&name=';

function isToday(date: Date): boolean {
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

function groupNotifications(notifications: NotificationItem[]) {
  const today: NotificationItem[] = [];
  const earlier: NotificationItem[] = [];

  for (const n of notifications) {
    const d = new Date(n.createdAt);
    if (isToday(d)) {
      today.push(n);
    } else {
      earlier.push(n);
    }
  }

  return { today, earlier };
}

function getPostId(notification: NotificationItem): string | undefined {
  return notification.postId ?? notification.entityId;
}

function getNavigationPath(notification: NotificationItem): string {
  if (notification.type === 'friend_request') {
    return '/friends';
  }
  const postId = getPostId(notification);
  if (postId && ['like', 'comment', 'post'].includes(notification.type)) {
    return `/post?postID=${encodeURIComponent(postId)}`;
  }
  return `/view-profile/${notification.interactedBy}`;
}

function NotificationSkeleton() {
  return (
    <div className={designRecipes.notificationSkeleton}>
      <div className="h-12 w-12 shrink-0 rounded-full bg-ds-surface-muted" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-3/4 rounded bg-ds-surface-muted" />
        <div className="h-3 w-1/3 rounded bg-ds-surface-muted" />
      </div>
    </div>
  );
}

function TypeBadge({ type }: { type: NotificationType }) {
  const base = designRecipes.notificationTypeBadge;

  switch (type) {
    case 'like':
      return (
        <span className={`${base} bg-ds-state-dangerSoft`}>
          <Heart className="h-3 w-3 fill-ds-state-danger text-ds-state-danger" />
        </span>
      );
    case 'comment':
      return (
        <span className={`${base} bg-ds-state-info/15`}>
          <MessageCircle className="h-3 w-3 text-ds-state-info" />
        </span>
      );
    case 'friend_request':
    case 'friend_accept':
      return (
        <span className={`${base} bg-ds-state-successSoft`}>
          <UserPlus className="h-3 w-3 text-ds-state-success" />
        </span>
      );
    case 'post':
      return (
        <span className={`${base} bg-ds-brand-50`}>
          <ImageIcon className="h-3 w-3 text-ds-brand-600" />
        </span>
      );
    default:
      return (
        <span className={`${base} bg-ds-surface-muted`}>
          <Bell className="h-3 w-3 text-ds-text-muted" />
        </span>
      );
  }
}

function NotificationRow({
  notification,
  onClick,
}: {
  notification: NotificationItem;
  onClick: (n: NotificationItem) => void;
}) {
  const actorName = notification.actor?.username ?? 'Someone';
  const avatarSrc =
    notification.actor?.profilePic ||
    `${DEFAULT_AVATAR}${encodeURIComponent(actorName)}`;

  return (
    <button
      type="button"
      onClick={() => onClick(notification)}
      className={
        notification.isRead
          ? designRecipes.notificationRow
          : designRecipes.notificationRowUnread
      }
    >
      <div className="relative shrink-0">
        <img
          src={avatarSrc}
          alt=""
          className={designRecipes.avatarNotification}
        />
        <TypeBadge type={notification.type} />
      </div>

      <div className="min-w-0 flex-1 pt-0.5">
        <p
          className={`text-sm leading-snug ${
            notification.isRead ? 'text-ds-text-secondary' : 'font-medium text-ds-text-primary'
          }`}
        >
          {notification.content}
        </p>
        <p className="mt-1 text-xs text-ds-text-muted">
          {new Date(notification.createdAt).toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          })}
        </p>
      </div>

      {!notification.isRead && (
        <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-ds-brand-500" aria-hidden />
      )}
    </button>
  );
}

function NotificationSection({
  title,
  items,
  onItemClick,
}: {
  title: string;
  items: NotificationItem[];
  onItemClick: (n: NotificationItem) => void;
}) {
  if (items.length === 0) return null;

  return (
    <section className="space-y-3">
      <h3 className="px-1 text-xs font-semibold uppercase tracking-wider text-ds-text-muted">
        {title}
      </h3>
      <div className="space-y-2">
        {items.map((n) => (
          <NotificationRow key={n.id} notification={n} onClick={onItemClick} />
        ))}
      </div>
    </section>
  );
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();
  const { setNotificationsCount } = useNotificationStore();

  const syncUnreadCount = useCallback(() => {
    axiosInstance
      .get<ApiResponse<UnreadCountData>>(NOTIFICATION_PATHS.count)
      .then((resp) => {
        setNotificationsCount(resp.data.data?.count ?? 0);
      })
      .catch(() => {});
  }, [axiosInstance, setNotificationsCount]);

  const fetchNotifications = useCallback(() => {
    setLoading(true);
    setError(null);

    axiosInstance
      .get<ApiResponse<NotificationsListData>>(NOTIFICATION_PATHS.list)
      .then((resp) => {
        setNotifications(resp.data.data?.notifications ?? []);
        syncUnreadCount();
      })
      .catch((err: unknown) =>
        setError(getApiErrorMessage(err, 'Failed to load notifications')),
      )
      .finally(() => setLoading(false));
  }, [axiosInstance, syncUnreadCount]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications],
  );

  const grouped = useMemo(() => groupNotifications(notifications), [notifications]);

  const markAllAsRead = () => {
    setActionLoading(true);
    axiosInstance
      .put(NOTIFICATION_PATHS.markAllRead)
      .then(() => {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        setNotificationsCount(0);
      })
      .catch((err: unknown) => setError(getApiErrorMessage(err, 'Failed to mark as read')))
      .finally(() => setActionLoading(false));
  };

  const deleteAllNotifications = () => {
    setActionLoading(true);
    axiosInstance
      .delete(NOTIFICATION_PATHS.clear)
      .then(() => {
        setNotifications([]);
        setNotificationsCount(0);
      })
      .catch((err: unknown) =>
        setError(getApiErrorMessage(err, 'Failed to delete notifications')),
      )
      .finally(() => setActionLoading(false));
  };

  const handleNotificationClick = (notification: NotificationItem) => {
    const path = getNavigationPath(notification);

    if (!notification.isRead) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n)),
      );
      setNotificationsCount(Math.max(0, unreadCount - 1));

      axiosInstance
        .patch(NOTIFICATION_PATHS.read(notification.id))
        .catch(() => {});
    }

    navigate(path);
  };

  if (loading) {
    return (
      <div className="mx-auto min-h-[calc(100vh-5rem)] w-full max-w-2xl px-4 py-6 md:px-6">
        <div className="mb-6 h-8 w-48 animate-pulse rounded bg-ds-surface-muted" />
        <div className="space-y-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <NotificationSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error && notifications.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-4">
        <AlertCircle className="mb-4 h-12 w-12 text-ds-state-danger" />
        <h2 className="mb-2 text-xl font-semibold text-ds-text-primary">
          Error loading notifications
        </h2>
        <p className="mb-6 max-w-md text-center text-ds-text-secondary">{error}</p>
        <button
          type="button"
          onClick={fetchNotifications}
          className={`${designRecipes.buttonPrimary} px-5 py-2.5`}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-[calc(100vh-5rem)] w-full max-w-2xl px-4 pb-12 pt-4 md:px-6 md:pt-6">
      <header className={designRecipes.notificationStickyHeader}>
        <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={markAllAsRead}
              disabled={actionLoading || unreadCount === 0}
              className={`${designRecipes.buttonSecondary} inline-flex items-center gap-2 px-3 py-2 text-sm disabled:opacity-50`}
            >
              <CheckCheck className="h-4 w-4" />
              Mark all read
            </button>
            <button
              type="button"
              onClick={deleteAllNotifications}
              disabled={actionLoading || notifications.length === 0}
              className={designRecipes.buttonDangerSecondary}
            >
              <Trash2 className="h-4 w-4" />
              Clear all
            </button>
        </div>
        {error && (
          <p className="mt-3 text-sm text-ds-state-danger" role="alert">
            {error}
          </p>
        )}
      </header>

      {notifications.length === 0 ? (
        <div className={designRecipes.emptyStateCard}>
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-ds-surface-muted">
            <Bell className="h-8 w-8 text-ds-text-muted" />
          </div>
          <h2 className="text-lg font-semibold text-ds-text-primary">You&apos;re all caught up</h2>
          <p className="mt-2 max-w-sm text-sm text-ds-text-secondary">
            When someone likes your post, comments, or sends a friend request, you&apos;ll see it
            here.
          </p>
          <Link
            to="/"
            className={`${designRecipes.buttonPrimary} mt-6 inline-flex px-5 py-2.5 text-sm`}
          >
            Go to feed
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          <NotificationSection
            title="Today"
            items={grouped.today}
            onItemClick={handleNotificationClick}
          />
          <NotificationSection
            title="Earlier"
            items={grouped.earlier}
            onItemClick={handleNotificationClick}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
