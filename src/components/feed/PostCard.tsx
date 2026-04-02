import { Heart, MessageCircle, Send, MoreHorizontal, Bookmark } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { useState } from 'react';

export interface Post {
  id: string;
  username: string;
  userAvatar: string;
  petName: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
}

interface PostCardProps {
  post: Post;
  onPostClick?: (post: Post) => void;
  onAvatarClick?: (username: string, userAvatar: string) => void;
}

export function PostCard({ post, onPostClick, onAvatarClick }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <Card className="mb-[12px] mx-4 overflow-hidden shadow-lg rounded-3xl border-0 hover:shadow-xl transition-shadow duration-200 mt-[0px] mr-[16px] ml-[16px] p-[0px]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-2 bg-white">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onAvatarClick?.(post.username, post.userAvatar)}>
          <Avatar className="w-10 h-10 border-2 border-[#3457D5]/20">
            <AvatarImage src={post.userAvatar} alt={post.username} />
            <AvatarFallback>{post.username[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{post.username}</p>
            <p className="text-xs text-gray-500">{post.timestamp}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Image */}
      <div className="w-full aspect-square bg-gray-100">
        <img
          src={post.image}
          alt={post.petName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Actions - Tighter spacing */}
      <div className="px-4 pt-[0px] pb-[12px] space-y-2 bg-white pr-[16px] pl-[16px] m-[0px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${liked ? 'text-red-500' : ''}`}
              onClick={handleLike}
            >
              <Heart className={`w-6 h-6 ${liked ? 'fill-red-500' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MessageCircle className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Send className="w-6 h-6" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${bookmarked ? 'text-[#3457D5]' : ''}`}
            onClick={handleBookmark}
          >
            <Bookmark className={`w-6 h-6 ${bookmarked ? 'fill-[#3457D5]' : ''}`} />
          </Button>
        </div>

        {/* Likes */}
        <p className="font-semibold text-sm">{likeCount.toLocaleString()} likes</p>

        {/* Caption */}
        <div>
          <p className="text-sm">
            <span className="font-semibold mr-2">{post.username}</span>
            {post.caption}
          </p>
        </div>

        {/* Comments */}
        {post.comments > 0 && (
          <button className="text-sm text-gray-500 hover:text-gray-700">
            View all {post.comments} comments
          </button>
        )}
      </div>
    </Card>
  );
}