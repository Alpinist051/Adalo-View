import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Settings, Grid3x3, Bookmark } from 'lucide-react';

interface ProfileHeaderProps {
  username: string;
  avatar: string;
  bio: string;
  posts: number;
  followers: number;
  following: number;
}

export function ProfileHeader({
  username,
  avatar,
  bio,
  posts,
  followers,
  following,
}: ProfileHeaderProps) {
  return (
    <div className="bg-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h1 className="font-semibold text-lg">{username}</h1>
        <Button variant="ghost" size="icon">
          <Settings className="w-6 h-6" />
        </Button>
      </div>

      {/* Profile Info */}
      <div className="p-4">
        <div className="flex items-center gap-6 mb-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={avatar} alt={username} />
            <AvatarFallback>{username[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-1 justify-around">
            <div className="text-center">
              <p className="font-semibold">{posts}</p>
              <p className="text-sm text-gray-500">posts</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">{followers}</p>
              <p className="text-sm text-gray-500">followers</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">{following}</p>
              <p className="text-sm text-gray-500">following</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-sm mb-1">{username}</p>
          <p className="text-sm">{bio}</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            Edit Profile
          </Button>
          <Button variant="outline" className="flex-1">
            Share Profile
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-t border-gray-200">
        <button className="flex-1 py-3 flex items-center justify-center gap-2 border-t-2 border-black">
          <Grid3x3 className="w-5 h-5" />
        </button>
        <button className="flex-1 py-3 flex items-center justify-center gap-2 border-t-2 border-transparent text-gray-400">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
