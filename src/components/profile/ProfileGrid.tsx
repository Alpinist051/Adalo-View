import { Post } from '../feed/PostCard';

interface ProfileGridProps {
  posts: Post[];
  onPostClick?: (post: Post) => void;
}

export function ProfileGrid({ posts, onPostClick }: ProfileGridProps) {
  return (
    <div className="grid grid-cols-3 gap-1 bg-white">
      {posts.map((post) => (
        <div
          key={post.id}
          className="aspect-square bg-gray-100 cursor-pointer"
          onClick={() => onPostClick?.(post)}
        >
          <img
            src={post.image}
            alt={post.caption}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
