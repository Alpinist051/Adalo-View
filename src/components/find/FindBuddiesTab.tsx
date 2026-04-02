import { useState } from 'react';
import { MapPin, Clock, Dog, Filter, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { PawIcon } from '../icons/PawIcon';
import { CheckCircle } from 'lucide-react';

interface BuddyPost {
  id: string;
  username: string;
  userAvatar: string;
  petName: string;
  petBreed: string;
  petSize: string;
  location: string;
  time: string;
  date: string;
  message: string;
  distance: string;
  posted: string;
  pace: string;
}

const mockBuddyPosts: BuddyPost[] = [
  {
    id: '1',
    username: 'sarah_and_max',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    petName: 'Max',
    petBreed: 'Golden Retriever',
    petSize: 'Large',
    location: 'Central Park, NY',
    time: '7:00 AM',
    date: 'Tomorrow',
    message: 'Looking for a morning walking buddy! Max is super friendly and loves to play.',
    distance: '0.5 mi away',
    posted: '2h ago',
    pace: 'Moderate',
  },
  {
    id: '2',
    username: 'charlie_owner',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    petName: 'Charlie',
    petBreed: 'Beagle',
    petSize: 'Medium',
    location: 'Riverside Park',
    time: '6:00 PM',
    date: 'Today',
    message: 'Evening walk at the riverside! Charlie is great with other dogs.',
    distance: '1.2 mi away',
    posted: '5h ago',
    pace: 'Casual',
  },
  {
    id: '3',
    username: 'luna_husky',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    petName: 'Luna',
    petBreed: 'Siberian Husky',
    petSize: 'Large',
    location: 'Dog Beach',
    time: '5:30 PM',
    date: 'Saturday',
    message: 'Weekend beach walk! Luna loves running on the sand.',
    distance: '2.8 mi away',
    posted: '1d ago',
    pace: 'Fast',
  },
];

export function FindBuddiesTab() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="p-4 space-y-3">
      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'bg-[#3457D5] hover:bg-[#2A47B0]' : ''}
        >
          All
        </Button>
        <Button
          variant={filter === 'today' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('today')}
          className={filter === 'today' ? 'bg-[#3457D5] hover:bg-[#2A47B0]' : ''}
        >
          Today
        </Button>
        <Button
          variant={filter === 'nearby' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('nearby')}
          className={filter === 'nearby' ? 'bg-[#3457D5] hover:bg-[#2A47B0]' : ''}
        >
          Nearby
        </Button>
        <Button
          variant={filter === 'large' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('large')}
          className={filter === 'large' ? 'bg-[#3457D5] hover:bg-[#2A47B0]' : ''}
        >
          Large Dogs
        </Button>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Info Card */}
      <Card className="p-4 bg-blue-50 border-[#3457D5]/20">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-[#3457D5]/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Dog className="w-5 h-5 text-[#3457D5]" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-1">Find Your Perfect Walking Buddy</h4>
            <p className="text-xs text-gray-600">Connect with nearby pet owners for walks, playtime, and adventures!</p>
          </div>
        </div>
      </Card>

      {/* Buddy Posts */}
      <div className="space-y-3">
        {mockBuddyPosts.map((post) => (
          <Card key={post.id} className="p-4 hover:shadow-md transition-shadow">
            {/* User Info */}
            <div className="flex items-start gap-3 mb-3">
              <Avatar className="w-12 h-12 border-2 border-[#3457D5]/20">
                <AvatarImage src={post.userAvatar} alt={post.username} />
                <AvatarFallback>{post.username[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-sm">{post.username}</p>
                    <p className="text-xs text-gray-500">{post.posted}</p>
                  </div>
                  <Badge variant="secondary" className="bg-[#3457D5]/10 text-[#3457D5] border-[#3457D5]/20">
                    {post.distance}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Pet Info */}
            <div className="flex items-center gap-2 mb-3 p-3 bg-gray-50 rounded-lg">
              <Dog className="w-4 h-4 text-[#3457D5]" />
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-900">
                  {post.petName}
                </span>
                <span className="text-sm text-gray-500 mx-1">•</span>
                <span className="text-sm text-gray-600">{post.petBreed}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {post.petSize}
              </Badge>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{post.location}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">
                    {post.date} at {post.time}
                  </span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {post.pace} pace
                </Badge>
              </div>
            </div>

            {/* Message */}
            <p className="text-sm text-gray-700 mb-3">{post.message}</p>

            {/* Actions */}
            <div className="flex gap-2">
              <Button size="sm" className="flex-1 bg-[#3457D5] hover:bg-[#2A47B0]">
                <CheckCircle className="w-4 h-4 mr-1.5" />
                Join Walk
              </Button>
              <Button variant="outline" size="sm" className="flex-1 border-[#3457D5]/20 text-[#3457D5]">
                <MessageCircle className="w-4 h-4 mr-1" />
                Message
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}