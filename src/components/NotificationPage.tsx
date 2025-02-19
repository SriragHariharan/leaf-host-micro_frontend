import React, { useState } from 'react';
import { Trash2, Check, Heart, MessageSquare, UserPlus, BellIcon, ImagePlusIcon } from 'lucide-react';

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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-8 h-8 text-red-500" />;
      case 'comment':
        return <MessageSquare className="w-8 h-8 text-blue-500" />;
      case 'follow':
        return <UserPlus className="w-8 h-8 text-green-500" />;
      case 'post':
        return <ImagePlusIcon className="w-8 h-8 text-pink-500" />;
      default:
        return <BellIcon className="w-8 h-8 text-black" />;
    }
  };

  return (
    <div className="p-6 min-h-screen max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
        <div className="space-x-4">
          <button
            className="px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg flex items-center"
          >
            <Check className="w-5 h-5 mr-2" />
            Mark all as read
          </button>
          <button
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg flex items-center"
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
              notification.isRead ? 'bg-white' : 'bg-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  {getNotificationIcon(notification.type)}
                </div>
                <div>
                  <p className="text-gray-800">{notification.content}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              {/* <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-5 h-5" />
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;