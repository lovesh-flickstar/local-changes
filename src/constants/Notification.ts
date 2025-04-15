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

export const notifications: Notification[] = [
    // === Today ===
    {
      id: '1',
      type: 'follow-request',
      user: { username: 'James_levis', avatar: 'https://i.pravatar.cc/150?img=60' },
      timestamp: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
    },
    {
      id: '2',
      type: 'comment',
      user: { username: 'dua_lipa', avatar: 'https://i.pravatar.cc/150?img=47' },
      content: 'heheheheheheheh😂🧡.',
      postImage: "../compressed/avatar5_compressed_compressed_compressed-transformed.webp",
      timestamp: new Date(Date.now() - 32 * 60 * 1000), // 32 mins ago
    },
    {
      id: '3',
      type: 'like',
      user: { username: 'dua_lipa', avatar: 'https://i.pravatar.cc/150?img=47' },
      postImage: 'https://source.unsplash.com/random/80x80?2',
      timestamp: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 21 days ago (appears in "This Month")
    },
    {
      id: '4',
      type: 'followed-you',
      user: { username: 'mavshi_lol', avatar: 'https://i.pravatar.cc/150?img=39' },
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 mins ago
    },
  
    // === This Week ===
    {
      id: '5',
      type: 'comment',
      user: { username: 'dua_lipa', avatar: 'https://i.pravatar.cc/150?img=47' },
      content: 'Its looks good man!!🔥😂.',
      postImage: 'https://source.unsplash.com/random/80x80?3',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
    {
      id: '6',
      type: 'login-attempt',
      user: { username: 'System Alert' },
      content: 'Did you just sign in?',
      postImage: 'https://source.unsplash.com/random/80x80?clock',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
    {
      id: '7',
      type: 'quest',
      user: { username: 'dua_lipa', avatar: 'https://i.pravatar.cc/150?img=47' },
      content: 'Visit my dairy store n I’ll pay...',
      postImage: 'https://source.unsplash.com/random/80x80?4',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    },
    {
      id: '8',
      type: 'follow-back',
      user: { username: 'dua_lipa', avatar: 'https://i.pravatar.cc/150?img=47' },
      timestamp: new Date(Date.now() - 32 * 60 * 1000), // 32 mins ago
    },
    {
      id: '9',
      type: 'repost',
      user: { username: 'kiski_lana', avatar: 'https://i.pravatar.cc/150?img=36' },
      content: 'Your post reposted',
      postImage: 'https://source.unsplash.com/random/80x80?6',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
  
    // === This Month ===
    {
      id: '10',
      type: 'like',
      user: { username: 'dua_lipa', avatar: 'https://i.pravatar.cc/150?img=47' },
      content: 'liked your post and also commented on post: idiot🙃.',
      postImage: 'https://source.unsplash.com/random/80x80?plant',
      timestamp: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    },
    {
      id: '11',
      type: 'quest',
      user: { username: 'dua_lipa', avatar: 'https://i.pravatar.cc/150?img=47' },
      content: 'applied for your Visit my dairy Quest',
      postImage: 'https://source.unsplash.com/random/80x80?mountain',
      timestamp: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    },
    {
      id: '12',
      type: 'repost',
      user: { username: 'dua_lipa', avatar: 'https://i.pravatar.cc/150?img=47' },
      content: 'tagged you in a post!',
      postImage: 'https://source.unsplash.com/random/80x80?ocean',
      timestamp: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
    },
  ];
  