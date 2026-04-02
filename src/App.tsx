import { useState, useEffect, useRef } from 'react';
import { PostCard, Post } from './components/feed/PostCard';
import { BottomNav } from './components/navigation/BottomNav';
import { EnhancedProfile } from './components/profile/EnhancedProfile';
import { EditProfile } from './components/profile/EditProfile';
import { ViewOtherProfile } from './components/profile/ViewOtherProfile';
import { ProfileGrid } from './components/profile/ProfileGrid';
import { SearchTab } from './components/search/SearchTab';
import { NotificationsTab } from './components/notifications/NotificationsTab';
import { CreatePostModal } from './components/feed/CreatePostModal';
import { EnhancedWalkingTracker } from './components/walking/EnhancedWalkingTracker';
import { FindPage } from './components/find/FindPage';
import { PetFriendlyMap } from './components/map/PetFriendlyMap';
import { CompactWalkingBar } from './components/feed/CompactWalkingBar';
import { Dialog, DialogContent } from './components/ui/dialog';
import { PawPrint, Activity, Dog } from 'lucide-react';
import { Button } from './components/ui/button';

// Mock data
const mockPosts: Post[] = [
  {
    id: '1',
    username: 'golden_buddy',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    petName: 'Buddy',
    image: 'https://images.unsplash.com/photo-1734966213753-1b361564bab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2clMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk2ODg5NTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Buddy enjoying the sunshine today! 🌞 #GoldenRetriever #HappyDog',
    likes: 342,
    comments: 28,
    timestamp: '2h ago',
  },
  {
    id: '2',
    username: 'whiskers_mom',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    petName: 'Whiskers',
    image: 'https://images.unsplash.com/photo-1622070338539-f86345f216e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJieSUyMGNhdCUyMGN1dGV8ZW58MXx8fHwxNzY5NzMwNDUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Look at those eyes! 😻 Whiskers wants treats again',
    likes: 256,
    comments: 15,
    timestamp: '4h ago',
  },
  {
    id: '3',
    username: 'corgi_adventures',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    petName: 'Mochi',
    image: 'https://images.unsplash.com/photo-1654995159231-91401633f72e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JnaSUyMGRvZyUyMGhhcHB5fGVufDF8fHx8MTc2OTc4NDMyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Mochi\'s smile makes my day! 🐕 Who else has a corgi?',
    likes: 489,
    comments: 42,
    timestamp: '8h ago',
  },
  {
    id: '4',
    username: 'beagle_bailey',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    petName: 'Bailey',
    image: 'https://images.unsplash.com/photo-1715033777082-86139553c35a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFnbGUlMjBwdXBweSUyMHBsYXlpbmd8ZW58MXx8fHwxNzY5ODE1Njg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Playtime is the best time! Bailey can\'t get enough of her toys 🎾',
    likes: 378,
    comments: 31,
    timestamp: '12h ago',
  },
  {
    id: '5',
    username: 'fluffy_snowball',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    petName: 'Snowball',
    image: 'https://images.unsplash.com/photo-1735618603118-89e26b0dcf6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzaWFuJTIwY2F0JTIwd2hpdGV8ZW58MXx8fHwxNzY5NzE3OTc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Snowball living up to her name! So fluffy ☁️ #PersianCat',
    likes: 512,
    comments: 36,
    timestamp: '1d ago',
  },
  {
    id: '6',
    username: 'husky_luna',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    petName: 'Luna',
    image: 'https://images.unsplash.com/photo-1641545410511-68cddb5a630d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodXNreSUyMGRvZyUyMHNub3d8ZW58MXx8fHwxNzY5ODE1Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Luna in her element! Snow days are her favorite ❄️ #HuskyLife',
    likes: 623,
    comments: 47,
    timestamp: '1d ago',
  },
];

const currentUser = {
  username: 'my_pet_diary',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
  bio: '🐾 Pet lover & photographer | Sharing moments with my furry friends',
  posts: 24,
  followers: 1248,
  following: 856,
  pets: [
    {
      id: '1',
      name: 'Max',
      breed: 'Golden Retriever',
      age: '3 years',
      image: 'https://images.unsplash.com/photo-1734966213753-1b361564bab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2clMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk2ODg5NTV8MA&ixlib=rb-4.1.0&q=80&w=300',
      bio: 'Loves fetch and long walks in the park. Best friend ever! 🐕',
    },
    {
      id: '2',
      name: 'Luna',
      breed: 'Siberian Husky',
      age: '2 years',
      image: 'https://images.unsplash.com/photo-1641545410511-68cddb5a630d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodXNreSUyMGRvZyUyMHNub3d8ZW58MXx8fHwxNzY5ODE1Njg4fDA&ixlib=rb-4.1.0&q=80&w=300',
      bio: 'Energetic snow lover. Always ready for an adventure! ❄️',
    },
  ],
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showWalkingTracker, setShowWalkingTracker] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [isWalkingBarCollapsed, setIsWalkingBarCollapsed] = useState(false);
  const lastScrollYRef = useRef(0);
  const isWalkingBarCollapsedRef = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [viewingProfile, setViewingProfile] = useState<{username: string; avatar: string} | null>(null);

  // Handle scroll to collapse walking bar
  useEffect(() => {
    if (activeTab !== 'home') {
      setIsWalkingBarCollapsed(false);
      isWalkingBarCollapsedRef.current = false;
      return;
    }

    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }

    const handleScroll = () => {
      const currentScrollY = scrollContainer.scrollTop;
      const scrollingDown = currentScrollY > lastScrollYRef.current;
      const shouldCollapse = currentScrollY > 140 && scrollingDown;
      const shouldExpand = currentScrollY < 80 || !scrollingDown;

      // Use hysteresis to avoid rapid collapse/expand flicker around the threshold.
      if (shouldCollapse && !isWalkingBarCollapsedRef.current) {
        setIsWalkingBarCollapsed(true);
        isWalkingBarCollapsedRef.current = true;
      } else if (shouldExpand && isWalkingBarCollapsedRef.current) {
        setIsWalkingBarCollapsed(false);
        isWalkingBarCollapsedRef.current = false;
      }

      lastScrollYRef.current = currentScrollY;
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [activeTab]);

  const handleTabChange = (tab: string) => {
    if (tab === 'create') {
      setShowCreateModal(true);
    } else {
      setActiveTab(tab);
      setShowWalkingTracker(false);
    }
  };

  const handleAvatarClick = (username: string, avatar: string) => {
    // Don't navigate to own profile when clicking own avatar in feed
    if (username === currentUser.username) {
      setActiveTab('profile');
      return;
    }
    setViewingProfile({ username, avatar });
  };

  // Generate mock profile data for viewed user
  const getProfileData = (username: string, avatar: string) => {
    // Mock data based on username
    const profiles: Record<string, any> = {
      golden_buddy: {
        bio: '🐕 Proud golden retriever dad | Adventure lover | San Francisco',
        posts: 89,
        followers: 2456,
        following: 342,
        education: {
          degree: 'B.A. in Environmental Science',
          school: 'UC Santa Cruz',
          year: '2018'
        },
        occupation: {
          title: 'Park Ranger',
          company: 'Golden Gate National Recreation Area'
        },
        pets: [
          {
            id: '1',
            name: 'Buddy',
            breed: 'Golden Retriever',
            age: '4 years',
            image: 'https://images.unsplash.com/photo-1734966213753-1b361564bab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2clMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk2ODg5NTV8MA&ixlib=rb-4.1.0&q=80&w=300',
            bio: 'The happiest golden retriever you\'ll ever meet! Loves swimming and making new friends. 🌊',
          },
        ],
      },
      whiskers_mom: {
        bio: '🐱 Cat mom to the sweetest tabby | Coffee & cuddles | Portland, OR',
        posts: 156,
        followers: 3821,
        following: 512,
        education: {
          degree: 'M.F.A. in Creative Writing',
          school: 'Portland State University',
          year: '2020'
        },
        occupation: {
          title: 'Freelance Writer',
          company: 'Self-Employed'
        },
        pets: [
          {
            id: '1',
            name: 'Whiskers',
            breed: 'Tabby Cat',
            age: '5 years',
            image: 'https://images.unsplash.com/photo-1622070338539-f86345f216e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJieSUyMGNhdCUyMGN1dGV8ZW58MXx8fHwxNzY5NzMwNDUxfDA&ixlib=rb-4.1.0&q=80&w=300',
            bio: 'Queen of the house. Loves naps, treats, and judging humans. 👑',
          },
        ],
      },
      corgi_adventures: {
        bio: '🎾 Corgi parent | Hiking enthusiast | Capturing cute moments',
        posts: 234,
        followers: 5643,
        following: 892,
        education: {
          degree: 'B.S. in Photography',
          school: 'Rochester Institute of Technology',
          year: '2019'
        },
        occupation: {
          title: 'Wildlife Photographer',
          company: 'National Geographic'
        },
        pets: [
          {
            id: '1',
            name: 'Mochi',
            breed: 'Pembroke Welsh Corgi',
            age: '3 years',
            image: 'https://images.unsplash.com/photo-1654995159231-91401633f72e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JnaSUyMGRvZyUyMGhhcHB5fGVufDF8fHx8MTc2OTc4NDMyMHww&ixlib=rb-4.1.0&q=80&w=300',
            bio: 'Short legs, big personality! Professional treat inspector and adventure buddy. 🥾',
          },
        ],
      },
      beagle_bailey: {
        bio: '🐶 Beagle enthusiast | Dog trainer | Sharing training tips',
        posts: 178,
        followers: 4123,
        following: 634,
        education: {
          degree: 'Certified Dog Trainer',
          school: 'Karen Pryor Academy',
          year: '2021'
        },
        occupation: {
          title: 'Professional Dog Trainer',
          company: 'Happy Paws Training Center'
        },
        pets: [
          {
            id: '1',
            name: 'Bailey',
            breed: 'Beagle',
            age: '2 years',
            image: 'https://images.unsplash.com/photo-1715033777082-86139553c35a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFnbGUlMjBwdXBweSUyMHBsYXlpbmd8ZW58MXx8fHwxNzY5ODE1Njg3fDA&ixlib=rb-4.1.0&q=80&w=300',
            bio: 'Playful beagle with endless energy! Loves toys, treats, and belly rubs. 🎾',
          },
        ],
      },
      fluffy_snowball: {
        bio: '☁️ Persian cat guardian | Fluffy cloud enthusiast | NYC',
        posts: 267,
        followers: 6892,
        following: 423,
        education: {
          degree: 'MBA',
          school: 'Columbia Business School',
          year: '2017'
        },
        occupation: {
          title: 'Marketing Director',
          company: 'Luxury Pet Brands Inc.'
        },
        pets: [
          {
            id: '1',
            name: 'Snowball',
            breed: 'Persian Cat',
            age: '4 years',
            image: 'https://images.unsplash.com/photo-1735618603118-89e26b0dcf6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzaWFuJTIwY2F0JTIwd2hpdGV8ZW58MXx8fHwxNzY5NzE3OTc1fDA&ixlib=rb-4.1.0&q=80&w=300',
            bio: 'The fluffiest cloud you\'ve ever seen. Enjoys grooming sessions and being adored. ✨',
          },
        ],
      },
      husky_luna: {
        bio: '❄️ Husky mom | Winter lover | Adventure photographer',
        posts: 312,
        followers: 8234,
        following: 1156,
        education: {
          degree: 'B.F.A. in Photography',
          school: 'University of Alaska Anchorage',
          year: '2016'
        },
        occupation: {
          title: 'Outdoor Adventure Photographer',
          company: 'Mountain & Trail Magazine'
        },
        pets: [
          {
            id: '1',
            name: 'Luna',
            breed: 'Siberian Husky',
            age: '3 years',
            image: 'https://images.unsplash.com/photo-1641545410511-68cddb5a630d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodXNreSUyMGRvZyUyMHNub3d8ZW58MXx8fHwxNzY5ODE1Njg4fDA&ixlib=rb-4.1.0&q=80&w=300',
            bio: 'Born for the snow! Vocal husky who loves outdoor adventures and howling at sirens. 🐺',
          },
        ],
      },
    };

    return profiles[username] || {
      bio: '🐾 Pet lover',
      posts: 42,
      followers: 1234,
      following: 567,
      pets: [],
    };
  };

  const renderContent = () => {
    if (showWalkingTracker) {
      return <EnhancedWalkingTracker onBack={() => setShowWalkingTracker(false)} />;
    }

    if (showEditProfile) {
      return (
        <EditProfile
          username={currentUser.username}
          avatar={currentUser.avatar}
          bio={currentUser.bio}
          pets={currentUser.pets}
          education={{
            degree: 'B.S. in Computer Science',
            school: 'University of California, Berkeley',
            year: '2020'
          }}
          occupation={{
            title: 'Software Engineer',
            company: 'Tech Company Inc.'
          }}
          onBack={() => setShowEditProfile(false)}
          onSave={(data) => {
            console.log('Profile updated:', data);
            // Here you would update the user data
          }}
        />
      );
    }

    // Show other user's profile
    if (viewingProfile) {
      const profileData = getProfileData(viewingProfile.username, viewingProfile.avatar);
      // Filter posts by the user we're viewing
      const userPosts = mockPosts.filter(post => post.username === viewingProfile.username);
      
      return (
        <div className="pb-20 max-w-md mx-auto">
          <ViewOtherProfile
            username={viewingProfile.username}
            avatar={viewingProfile.avatar}
            bio={profileData.bio}
            posts={profileData.posts}
            followers={profileData.followers}
            following={profileData.following}
            pets={profileData.pets}
            onBack={() => setViewingProfile(null)}
            isFollowing={false}
            userPosts={userPosts}
            education={profileData.education}
            occupation={profileData.occupation}
          />
        </div>
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <div className="pb-20 bg-gray-50 min-h-screen">
            {/* Header with logo and title */}
            <div className="bg-white sticky top-0 z-10 shadow-sm">
              <div className="h-14 flex items-center gap-2 px-4 border-b border-gray-100">
                <Dog className="w-6 h-6 text-[#3457D5]" />
                <h1 className="text-xl font-bold text-gray-900">Pawchio</h1>
              </div>
            </div>

            {/* Compact Walking Bar - now below header */}
            <div className="sticky top-14 z-10">
              <CompactWalkingBar
                todayDistance={3.2}
                lifetimeDistance={128.4}
                weeklyProgress={18.4}
                weeklyGoal={25}
                recentBadges={['🏃', '⚡', '🔥']}
                onExpand={() => setShowWalkingTracker(true)}
                isCollapsed={isWalkingBarCollapsed}
              />
            </div>

            <div className="max-w-md mx-auto pt-2">
              {/* Feed with floating cards */}
              {mockPosts.map((post) => (
                <PostCard key={post.id} post={post} onAvatarClick={handleAvatarClick} />
              ))}
            </div>
          </div>
        );

      case 'find':
        return (
          <div className="pb-20 max-w-md mx-auto">
            <FindPage />
          </div>
        );

      case 'map':
        return (
          <div className="pb-20 max-w-md mx-auto">
            <PetFriendlyMap />
          </div>
        );

      case 'search':
        return (
          <div className="pb-20 max-w-md mx-auto">
            <SearchTab posts={mockPosts} />
          </div>
        );

      case 'notifications':
        return (
          <div className="pb-20 max-w-md mx-auto">
            <NotificationsTab />
          </div>
        );

      case 'profile':
        return (
          <div className="pb-20 max-w-md mx-auto">
            <EnhancedProfile
              username={currentUser.username}
              avatar={currentUser.avatar}
              bio={currentUser.bio}
              posts={currentUser.posts}
              followers={currentUser.followers}
              following={currentUser.following}
              pets={currentUser.pets}
              isOwnProfile={true}
              onEditProfile={() => setShowEditProfile(true)}
            />
            <ProfileGrid posts={mockPosts.slice(0, 6)} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-[100dvh] w-full overflow-hidden bg-gradient-to-b from-green-50 via-blue-50 to-white">
      <div className="relative mx-auto h-full w-full max-w-md">
        <main ref={scrollContainerRef} className="h-full overflow-y-auto">
          {renderContent()}
        </main>
        
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {showCreateModal && (
        <CreatePostModal
          onClose={() => setShowCreateModal(false)}
          username={currentUser.username}
          userAvatar={currentUser.avatar}
        />
      )}
    </div>
  );
}
