import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Settings, Grid3x3, Bookmark, Share2, MessageCircle, Dog } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { WalkingStatsProfile } from './WalkingStatsProfile';
import { EducationCareerScroll } from './EducationCareerScroll';

interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  image: string;
  bio: string;
}

interface EnhancedProfileProps {
  username: string;
  avatar: string;
  bio: string;
  posts: number;
  followers: number;
  following: number;
  pets: Pet[];
  isOwnProfile?: boolean;
  onEditProfile?: () => void;
}

export function EnhancedProfile({
  username,
  avatar,
  bio,
  posts,
  followers,
  following,
  pets,
  isOwnProfile = true,
  onEditProfile,
}: EnhancedProfileProps) {
  return (
    <div className="bg-white min-h-screen">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <h1 className="font-semibold text-lg">{username}</h1>
        <div className="flex gap-2">
          {isOwnProfile ? (
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MessageCircle className="w-5 h-5" />
              </Button>
            </>
          )}
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

        {/* Education and Occupation Section */}
        <div className="mb-4">
          <EducationCareerScroll 
            education={{
              degree: 'B.S. in Computer Science',
              school: 'University of California, Berkeley',
              year: '2020'
            }}
            occupation={{
              title: 'Software Engineer',
              company: 'Tech Company Inc.'
            }}
          />
        </div>

        <div className="flex gap-2 mb-4">
          {isOwnProfile ? (
            <>
              <Button variant="outline" className="flex-1 border-[#3457D5]/20" onClick={onEditProfile}>
                Edit Profile
              </Button>
              <Button variant="outline" className="flex-1 border-[#3457D5]/20">
                Share Profile
              </Button>
            </>
          ) : (
            <>
              <Button className="flex-1 bg-[#3457D5] hover:bg-[#2A47B0]">
                Follow
              </Button>
              <Button variant="outline" className="flex-1 border-[#3457D5]/20">
                Message
              </Button>
            </>
          )}
        </div>

        {/* Walking Statistics - Prominent Section */}
        <WalkingStatsProfile lifetimeDistance={128.4} petName="Max & Luna" />

        {/* Pets Section */}
        <div className="mt-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Dog className="w-5 h-5 text-[#3457D5]" />
            <h3 className="font-semibold">My Pets</h3>
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

      {/* Content Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="w-full grid grid-cols-2 border-t border-gray-200">
          <TabsTrigger value="posts" className="flex items-center gap-2">
            <Grid3x3 className="w-4 h-4" />
            <span>Posts</span>
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <Bookmark className="w-4 h-4" />
            <span>Saved</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="mt-0">
          <div className="grid grid-cols-3 gap-1">
            {/* Posts grid will be rendered here */}
          </div>
        </TabsContent>
        
        <TabsContent value="saved" className="mt-0">
          <div className="p-8 text-center text-gray-500">
            <Bookmark className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No saved posts yet</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}