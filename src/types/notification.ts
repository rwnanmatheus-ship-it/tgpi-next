export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  timeLabel?: string;
  href?: string;
  unread?: boolean;
  createdAt?: string;
};

export type NotificationDocument = Omit<NotificationItem, "id">;
