import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { useState } from 'react';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow';
  username: string;
  userAvatar: string;
  message: string;
  timestamp: string;
  postImage?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    username: 'sarah_paws',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    message: 'liked your post',
    timestamp: '2h ago',
    postImage: 'https://images.unsplash.com/photo-1734966213753-1b361564bab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2clMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk2ODg5NTV8MA&ixlib=rb-4.1.0&q=80&w=100',
  },
  {
    id: '2',
    type: 'comment',
    username: 'max_the_corgi',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    message: 'commented: "So adorable! 🐾"',
    timestamp: '5h ago',
    postImage: 'https://images.unsplash.com/photo-1622070338539-f86345f216e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJieSUyMGNhdCUyMGN1dGV8ZW58MXx8fHwxNzY5NzMwNDUxfDA&ixlib=rb-4.1.0&q=80&w=100',
  },
  {
    id: '3',
    type: 'follow',
    username: 'bella_beagle',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    message: 'started following you',
    timestamp: '1d ago',
  },
  {
    id: '4',
    type: 'like',
    username: 'charlie_husky',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    message: 'liked your post',
    timestamp: '2d ago',
    postImage: 'https://images.unsplash.com/photo-1654995159231-91401633f72e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JnaSUyMGRvZyUyMGhhcHB5fGVufDF8fHx8MTc2OTc4NDMyMHww&ixlib=rb-4.1.0&q=80&w=100',
  },
];

export function NotificationsTab() {
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());

  const toggleFollow = (username: string) => {
    setFollowedUsers((prev) => {
      const next = new Set(prev);
      if (next.has(username)) {
        next.delete(username);
      } else {
        next.add(username);
      }
      return next;
    });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <h1 className="font-semibold text-lg">Notifications</h1>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-gray-200">
        {mockNotifications.map((notification) => (
          <div key={notification.id} className="flex items-center gap-3 p-4">
            <Avatar className="w-11 h-11">
              <AvatarImage src={notification.userAvatar} alt={notification.username} />
              <AvatarFallback>{notification.username[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold">{notification.username}</span>{' '}
                <span className="text-gray-600">{notification.message}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
            </div>
            {notification.postImage ? (
              <img
                src={notification.postImage}
                alt="Post"
                className="w-11 h-11 object-cover"
              />
            ) : (
              <Button
                variant={followedUsers.has(notification.username) ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => toggleFollow(notification.username)}
              >
                {followedUsers.has(notification.username) ? 'Following' : 'Follow'}
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
