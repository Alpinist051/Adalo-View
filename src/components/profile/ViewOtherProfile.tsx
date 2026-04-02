import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { ArrowLeft, Share2, MessageCircle, Dog } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { WalkingStatsProfile } from './WalkingStatsProfile';
import { EducationCareerScroll } from './EducationCareerScroll';
import { ProfileGrid } from './ProfileGrid';
import { useState } from 'react';

interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  image: string;
  bio: string;
}

interface ViewOtherProfileProps {
  username: string;
  avatar: string;
  bio: string;
  posts: number;
  followers: number;
  following: number;
  pets: Pet[];
  onBack?: () => void;
  isFollowing?: boolean;
  userPosts?: any[]; // Array of post data to display in grid
  education?: {
    degree: string;
    school: string;
    year?: string;
  };
  occupation?: {
    title: string;
    company: string;
  };
}

export function ViewOtherProfile({
  username,
  avatar,
  bio,
  posts,
  followers,
  following,
  pets,
  onBack,
  isFollowing = false,
  userPosts = [],
  education,
  occupation,
}: ViewOtherProfileProps) {
  const [followingState, setFollowingState] = useState(isFollowing);

  const copyProfileLink = async () => {
    const profileUrl = `${window.location.origin}/profile/${username}`;
    try {
      await navigator.clipboard.writeText(profileUrl);
    } catch {
      // Clipboard may be unavailable in some webviews.
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <h1 className="font-semibold text-lg">{username}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={copyProfileLink}>
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-4">
        <div className="flex items-center gap-6 mb-4">
          <Avatar className="w-20 h-20 border-2 border-[#3457D5]">
            <AvatarImage src={avatar} alt={username} />
            <AvatarFallback>{username[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-1 justify-around">
            <div className="text-center">
              <p className="font-bold text-lg">{posts}</p>
              <p className="text-xs text-gray-500">posts</p>
            </div>
            <div className="text-center cursor-pointer">
              <p className="font-bold text-lg">{followers}</p>
              <p className="text-xs text-gray-500">followers</p>
            </div>
            <div className="text-center cursor-pointer">
              <p className="font-bold text-lg">{following}</p>
              <p className="text-xs text-gray-500">following</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="font-semibold mb-1">{username}</p>
          <p className="text-sm text-gray-700">{bio}</p>
        </div>

        {/* Education and Career Section */}
        <div className="mb-4">
          <EducationCareerScroll 
            education={education}
            occupation={occupation}
          />
        </div>

        {/* Action Buttons - Follow/Message */}
        <div className="flex gap-2 mb-4">
          <Button 
            className={`flex-1 ${followingState ? 'bg-gray-200 text-gray-900 hover:bg-gray-300' : 'bg-[#3457D5] hover:bg-[#2A47B0]'}`}
            onClick={() => setFollowingState((prev) => !prev)}
          >
            {followingState ? 'Following' : 'Follow'}
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-[#3457D5]/20 text-[#3457D5]"
            onClick={() => (window.location.href = `mailto:${username}@pawchio.app`)}
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Message
          </Button>
        </div>

        {/* Walking Statistics */}
        <WalkingStatsProfile lifetimeDistance={95.6} petName="Buddy" />

        {/* Pets Section */}
        <div className="mt-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Dog className="w-5 h-5 text-[#3457D5]" />
            <h3 className="font-semibold">Their Pets</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {pets.map((pet) => (
              <Card key={pet.id} className="overflow-hidden border-[#3457D5]/20">
                <div className="aspect-square bg-gray-100">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h4 className="font-semibold text-sm">{pet.name}</h4>
                      <p className="text-xs text-gray-500">{pet.breed}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs bg-[#3457D5]/10 text-[#3457D5]">
                      {pet.age}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">{pet.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="border-t border-gray-200">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full grid grid-cols-2 h-12 rounded-none bg-white border-b">
            <TabsTrigger value="posts" className="data-[state=active]:text-[#3457D5] data-[state=active]:border-b-2 data-[state=active]:border-[#3457D5] rounded-none">
              Posts
            </TabsTrigger>
            <TabsTrigger value="tagged" className="data-[state=active]:text-[#3457D5] data-[state=active]:border-b-2 data-[state=active]:border-[#3457D5] rounded-none">
              Tagged
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="mt-0">
            <ProfileGrid posts={userPosts} />
          </TabsContent>
          
          <TabsContent value="tagged" className="mt-0">
            <div className="p-8 text-center text-gray-500">
              <p className="text-sm">No tagged posts yet</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
