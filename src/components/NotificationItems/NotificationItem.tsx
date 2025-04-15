import avatar from '../../assets/compressed/avatar1_compressed_compressed_compressed_compressed_compressed-transformed-transformed.webp';
import postimg from '../../assets/compressed/post3-transformed-transformed_compressed_compressed_compressed-transformed-transformed.webp'
import React from 'react';

interface Notification {
  id: string;
  type: 'follow-request' | 'comment' | 'like' | 'followed-you' | 'follow-back' | 'quest' | 'login-attempt' | 'repost';
  user: {
    username: string;
    avatar?: string;
  };
  content?: string;
  postImage?: string;
  timestamp: Date;
}

interface NotificationsProps {
  notifications: Notification[];
}

export const NotificationComponent: React.FC<NotificationsProps> = ({ notifications }) => {
//   const formatTime = (date: Date) => {
//     const diff = Math.floor((Date.now() - date.getTime()) / 60000);
//     if (diff < 1) return 'Just now';
//     if (diff < 60) return `${diff}m`;
//     const hours = Math.floor(diff / 60);
//     if (hours < 24) return `${hours}h`;
//     const days = Math.floor(hours / 24);
//     return `${days}d`;
//   };

  return (
    <div className="w-full flex flex-col gap-2 text-white">
      {/* Example: You can dynamically split into sections like "Today", "This Week", "This Month" */}
      <Section title="Today" notifications={notifications.slice(0, 3)} />
      <Section title="This week" notifications={notifications.slice(3, 7)} />
      <Section title="This Month" notifications={notifications.slice(7)} />
    </div>
  );
};

interface SectionProps {
  title: string;
  notifications: Notification[];
}

const Section: React.FC<SectionProps> = ({ title, notifications }) => (
  <div className="mb-2 fontPrimary">
    <h2 className="px-4 mb-7 text-sm font-semibold text-gray-400 uppercase">{title}</h2>
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div key={notification.id} className="flex items-start px-4">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={notification.user.avatar || avatar}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="ml-4 flex-1">
            <div className="flex justify-between items-start flex-wrap md:flex-nowrap">
              <div>
                <p className="text-sm leading-tight text-white">
                  <span className="font-semibold">{notification.user.username}</span>{' '}
                  {getNotificationMessage(notification)}{!notification.content &&<span className='text-xs pl-3 text-white mt-1'>{"2m"}</span> }
                </p>
                {notification.content && (
                  <p className="text-sm text-gray-400 mt-1">{notification.content} <span className='text-xs pl-3 text-white mt-1'>{"10m"}</span></p>
                  
                )}
                
              </div>

              {/* Post Image or Icon */}
              {notification.postImage && (
                <img
                  src={ postimg}
                  alt="post"
                  className="w-12 h-12 rounded-md object-cover ml-4 border border-gray-700"
                />
              )}

{notification.type === 'follow-request' && (
              <div className="mt-2 flex space-x-2">
                <button className="px-3 py-0.5 text-sm font-medium bg-blue-600 rounded-md hover:bg-blue-700">
                  Accept
                </button>
                <button className="px-3 py-0.5 text-sm font-medium bg-gray-700 rounded-md hover:bg-gray-600">
                  Remove
                </button>
              </div>
            )}
            {notification.type === 'followed-you' && (
              <div className="">
                <button className="px-4 py-0.5 text-sm font-medium bg-blue-600 rounded-md hover:bg-blue-700">
                  Follow back
                </button>
              </div>
            )}
            </div>

            {/* Action buttons */}
           

          </div>
        </div>
      ))}
    </div>
  </div>
);

const getNotificationMessage = (notification: Notification) => {
  switch (notification.type) {
    case 'comment':
      return 'Commented on your post:';
    case 'like':
      return 'liked your post.';
    case 'follow-request':
      return 'requested to follow you.';
    case 'followed-you':
      return 'Started following you.';
    case 'follow-back':
      return 'Followed you back.';
    case 'quest':
      return 'Created a Quest, GoFlick :';
    case 'login-attempt':
      return 'Unusual login attempt';
    case 'repost':
      return 'Your post reposted by';
    default:
      return '';
  }
};

