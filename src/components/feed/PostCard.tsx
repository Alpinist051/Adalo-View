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
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentCount, setCommentCount] = useState(post.comments);
  const [comments, setComments] = useState<string[]>([]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/post/${post.id}`;
    const shareText = `${post.username}: ${post.caption}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: `${post.petName}'s post`, text: shareText, url: shareUrl });
        return;
      } catch {
        // User cancelled share sheet. Fall back to copy behavior.
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
    } catch {
      // Clipboard not available in some webviews; ignore silently.
    }
  };

  const handleAddComment = () => {
    const normalized = commentText.trim();
    if (!normalized) {
      return;
    }

    setComments((prev) => [...prev, normalized]);
    setCommentCount((prev) => prev + 1);
    setCommentText('');
    setShowComments(true);
  };

  const handleMoreOptions = async () => {
    const copyText = `${post.username}: ${post.caption}`;
    try {
      await navigator.clipboard.writeText(copyText);
    } catch {
      // Best-effort only.
    }
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
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleMoreOptions}>
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
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${showComments ? 'text-[#3457D5]' : ''}`}
              onClick={() => setShowComments((prev) => !prev)}
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleShare}>
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
        {commentCount > 0 && (
          <button className="text-sm text-gray-500 hover:text-gray-700" onClick={() => setShowComments((prev) => !prev)}>
            {showComments ? 'Hide comments' : `View all ${commentCount} comments`}
          </button>
        )}

        {showComments && (
          <div className="space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-2">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <p key={`${post.id}-comment-${index}`} className="text-sm text-gray-700">
                  <span className="mr-1 font-semibold">you</span>
                  {comment}
                </p>
              ))
            ) : (
              <p className="text-xs text-gray-500">No local comments yet. Start the conversation.</p>
            )}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
                className="h-8 flex-1 rounded-md border border-gray-200 px-2 text-sm outline-none focus:border-[#3457D5]"
                placeholder="Write a comment..."
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    handleAddComment();
                  }
                }}
              />
              <Button size="sm" className="h-8 bg-[#3457D5] px-3 text-xs hover:bg-[#2A47B0]" onClick={handleAddComment}>
                Post
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
