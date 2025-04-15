export type NotificationType = 
  | 'follow_request'
  | 'comment'
  | 'like'
  | 'repost'
  | 'quest'
  | 'login_attempt'
  | 'follow_back';

export interface Notification {
  id: string;
  type: NotificationType;
  user: {
    username: string;
    avatar?: string;
  };
  content?: string;
  timestamp: Date;
  read: boolean;
  meta?: {
    questTitle?: string;
    postPreview?: string;
    location?: string;
  };
}