export type NotificationType =
  | "like"
  | "comment"
  | "friend_request"
  | "post"
  | "friend_accept";

export interface NotificationActor {
  username: string;
  profilePic?: string | null;
}

export interface NotificationItem {
  id: string;
  userID: string;
  content: string;
  type: NotificationType;
  isRead: boolean;
  interactedBy: string;
  postId?: string;
  entityId?: string;
  entityType?: string;
  createdAt: string;
  actor?: NotificationActor;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T;
}

export interface NotificationsListData {
  notifications: NotificationItem[];
}

export interface UnreadCountData {
  count: number;
}

export interface ApiErrorBody {
  message?: string;
}

export function getApiErrorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === "object" && "response" in err) {
    const response = (err as { response?: { data?: ApiErrorBody } }).response;
    if (response?.data?.message) {
      return response.data.message;
    }
  }
  return fallback;
}
