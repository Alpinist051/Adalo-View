import { X, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useState } from 'react';

interface CreatePostModalProps {
  onClose: () => void;
  username: string;
  userAvatar: string;
}

export function CreatePostModal({
  onClose,
  username,
  userAvatar,
}: CreatePostModalProps) {
  const [caption, setCaption] = useState('');

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6" />
          </Button>
          <h2 className="font-semibold">New Post</h2>
          <Button variant="ghost" className="text-blue-500 font-semibold">
            Share
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex gap-3 mb-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={userAvatar} alt={username} />
              <AvatarFallback>{username[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold text-sm mb-2">{username}</p>
              <Textarea
                placeholder="What's your pet up to?"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="min-h-[120px] border-none p-0 resize-none focus-visible:ring-0"
              />
            </div>
          </div>

          {/* Image placeholder */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Add photos or videos</p>
            <Button variant="outline" size="sm" className="mt-3">
              Select from gallery
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
