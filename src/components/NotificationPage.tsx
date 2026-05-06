import React, { useEffect, useState } from 'react';
import { 
  Trash2, Check, Heart, MessageSquare, UserPlus, BellIcon, 
  ImagePlusIcon, AlertCircle, Loader2 
} from 'lucide-react';
import useAxiosInstance from 'profileMF/useAxiosInstance';
import { designRecipes } from '../design-system';

// Define the type of a notification
interface Notification {
  id: number;
  type: string;
  content: string;
  timestamp: number;
  isRead: boolean;
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const axiosInstance = useAxiosInstance();

  // Fetch notifications
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    setLoading(true);
    setError(null);

    axiosInstance.get('../notification')
      .then(resp => setNotifications(resp?.data?.data?.notifications || []))
      .catch(err => setError(err?.response?.data?.message || "Failed to load notifications"))
      .finally(() => setLoading(false));
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    axiosInstance.put('../notification')
      .then(() => {
        setNotifications(prev =>
          prev.map(notification => ({ ...notification, isRead: true }))
        );
      })
      .catch(err => setError(err?.response?.data?.message || "Failed to mark as read"));
  };

  // Delete all notifications
  const deleteAllNotifications = () => {
    axiosInstance.delete('../notification')
      .then(() => setNotifications([]))
      .catch(err => setError(err?.response?.data?.message || "Failed to delete notifications"));
  };

  // Get the corresponding icon for each notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart className="w-8 h-8 text-ds-state-danger" />;
      case 'comment': return <MessageSquare className="w-8 h-8 text-ds-state-info" />;
      case 'follow': return <UserPlus className="w-8 h-8 text-ds-state-success" />;
      case 'post': return <ImagePlusIcon className="w-8 h-8 text-ds-brand-600" />;
      default: return <BellIcon className="w-8 h-8 text-ds-text-primary" />;
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-ds-brand-600" />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <AlertCircle className="w-12 h-12 text-ds-state-danger mb-4" />
        <h2 className="text-xl font-semibold text-ds-text-primary mb-2">Error Loading Notifications</h2>
        <p className="text-ds-text-secondary mb-4 text-center">{error}</p>
        <button 
          onClick={fetchNotifications}
          className={`${designRecipes.buttonPrimary} px-4 py-2`}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-ds-text-primary">Notifications</h2>
        <div className="space-x-4">
          <button
            onClick={markAllAsRead}
            className={`${designRecipes.statusSuccess} px-4 py-2 hover:bg-ds-state-successSoft rounded-dsMd flex items-center`}
          >
            <Check className="w-5 h-5 mr-2" />
            Mark all as read
          </button>
          <button
            onClick={deleteAllNotifications}
            className={`${designRecipes.statusDanger} px-4 py-2 hover:bg-ds-state-dangerSoft rounded-dsMd flex items-center`}
          >
            <Trash2 className="w-5 h-5 mr-2" />
            Delete all
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg shadow ${
              notification.isRead ? 'bg-ds-surface-card' : 'bg-ds-surface-muted'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  {getNotificationIcon(notification.type)}
                </div>
                <div>
                  <p className="text-ds-text-primary">{notification.content}</p>
                  <p className="text-sm text-ds-text-muted">
                    {new Date(notification?.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
