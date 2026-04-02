import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Post } from '../feed/PostCard';
import { useMemo, useState } from 'react';

interface SearchTabProps {
  posts: Post[];
  onPostClick?: (post: Post) => void;
}

export function SearchTab({ posts, onPostClick }: SearchTabProps) {
  const [query, setQuery] = useState('');

  const filteredPosts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return posts;
    }

    return posts.filter((post) =>
      `${post.username} ${post.petName} ${post.caption}`.toLowerCase().includes(normalized),
    );
  }, [posts, query]);

  return (
    <div className="bg-white min-h-screen">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search pets, owners, breeds..."
            className="pl-10"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>

      {/* Explore Grid */}
      <div className="grid grid-cols-3 gap-1">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="aspect-square bg-gray-100 cursor-pointer relative"
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
      {filteredPosts.length === 0 && (
        <p className="p-6 text-center text-sm text-gray-500">No results found for "{query}".</p>
      )}
    </div>
  );
}
