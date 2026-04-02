import { useState } from 'react';
import { MapPin, Clock, Dog, Filter, Plus, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface BuddyPost {
  id: string;
  username: string;
  userAvatar: string;
  petName: string;
  petBreed: string;
  location: string;
  time: string;
  date: string;
  message: string;
  distance: string;
  posted: string;
}

const mockBuddyPosts: BuddyPost[] = [
  {
    id: '1',
    username: 'sarah_and_max',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    petName: 'Max',
    petBreed: 'Golden Retriever',
    location: 'Central Park, NY',
    time: '7:00 AM',
    date: 'Tomorrow',
    message: 'Looking for a morning walking buddy! Max is super friendly and loves to play.',
    distance: '0.5 mi away',
    posted: '2h ago',
  },
  {
    id: '2',
    username: 'charlie_owner',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    petName: 'Charlie',
    petBreed: 'Beagle',
    location: 'Riverside Park',
    time: '6:00 PM',
    date: 'Today',
    message: 'Evening walk at the riverside! Charlie is great with other dogs. Let\'s walk together!',
    distance: '1.2 mi away',
    posted: '5h ago',
  },
  {
    id: '3',
    username: 'luna_husky',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    petName: 'Luna',
    petBreed: 'Siberian Husky',
    location: 'Dog Beach',
    time: '5:30 PM',
    date: 'Saturday',
    message: 'Weekend beach walk! Luna loves running on the sand. Looking for energetic dogs!',
    distance: '2.8 mi away',
    posted: '1d ago',
  },
];

export function BuddyFinder() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [filter, setFilter] = useState('all');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 pb-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="font-bold text-xl">Walking Buddies</h1>
              <p className="text-sm text-gray-500">Find walking partners nearby</p>
            </div>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-green-500 hover:bg-green-600">
                  <Plus className="w-4 h-4 mr-1" />
                  Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Find a Walking Buddy</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="location"
                        placeholder="Central Park, NY"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input id="time" type="time" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pet-info">Your Pet</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your pet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="max">Max - Golden Retriever</SelectItem>
                        <SelectItem value="bella">Bella - Labrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell others about your walking plans..."
                      className="min-h-[100px]"
                    />
                  </div>

                  {/* Map Preview Placeholder */}
                  <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">Map preview</p>
                    </div>
                  </div>

                  <Button className="w-full bg-green-500 hover:bg-green-600">
                    Post Request
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-green-500 hover:bg-green-600' : ''}
            >
              All
            </Button>
            <Button
              variant={filter === 'today' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('today')}
              className={filter === 'today' ? 'bg-green-500 hover:bg-green-600' : ''}
            >
              Today
            </Button>
            <Button
              variant={filter === 'nearby' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('nearby')}
              className={filter === 'nearby' ? 'bg-green-500 hover:bg-green-600' : ''}
            >
              Nearby
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Buddy Posts */}
      <div className="p-4 space-y-3">
        {mockBuddyPosts.map((post) => (
          <Card key={post.id} className="p-4 hover:shadow-md transition-shadow">
            {/* User Info */}
            <div className="flex items-start gap-3 mb-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={post.userAvatar} alt={post.username} />
                <AvatarFallback>{post.username[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-sm">{post.username}</p>
                    <p className="text-xs text-gray-500">{post.posted}</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {post.distance}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Pet Info */}
            <div className="flex items-center gap-2 mb-3 p-2 bg-blue-50 rounded-lg">
              <Dog className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                {post.petName} - {post.petBreed}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{post.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">
                  {post.date} at {post.time}
                </span>
              </div>
            </div>

            {/* Message */}
            <p className="text-sm text-gray-700 mb-3">{post.message}</p>

            {/* Actions */}
            <div className="flex gap-2">
              <Button size="sm" className="flex-1 bg-green-500 hover:bg-green-600">
                Join Walk
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
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
